import {
  fetchUser,
  fetchRepos,
  fetchRepoLanguages,
  fetchRepoCommits,
} from "./github.js";

import { generateSummary } from "./ai.js";

import {
  getUserByUsername,
  getUserId,
  upsertUser,
  upsertRepo,
  getRepoByGithubId,
  upsertLanguages,
  upsertCommit,
  upsertAiSummary,
  logCacheFetch,
  getFullProfile,
} from "../db/queries.js";

const CACHE_TTL = 60 * 60 * 1000;

export function isCacheFresh(username) {
  const user = getUserByUsername(username);

  if (!user || !user.cached_at) return false;

  const cachedAt = new Date(user.cached_at).getTime();
  const now = Date.now();
  const age = now - cachedAt;

  return age < CACHE_TTL;
}

export async function refreshCache(username) {
  let apiCallUsed = 0;
  let savedUserId = null;
  let realUsername = username;

  try {
    const userData = await fetchUser(username);
    apiCallUsed++;

    realUsername = userData.github_username;

    userData.cached_at = new Date().toISOString();
    upsertUser(userData);

    const userId = getUserId(realUsername);
    savedUserId = userId;

    if (!userId) {
      throw new Error(`User ID not found after saving user: ${realUsername}`);
    }

    const repos = await fetchRepos(realUsername);
    apiCallUsed++;

    for (const repo of repos) {
      upsertRepo({
        ...repo,
        user_id: userId,
        cached_at: new Date().toISOString(),
      });

      if (!repo.is_fork) {
        const languages = await fetchRepoLanguages(
          realUsername,
          repo.repo_name,
        );
        apiCallUsed++;

        const savedRepo = getRepoByGithubId(repo.github_repo_id);

        if (savedRepo && Object.keys(languages).length > 0) {
          upsertLanguages(savedRepo.id, languages);
        }
      }
    }

    let totalCommitsFetched = 0;

    for(const repo of repos) {
      if (repo.is_fork) continue;

      const savedRepo = getRepoByGithubId(repo.github_repo_id);

      if (!savedRepo) continue;

      const commits = await fetchRepoCommits(realUsername, repo.repo_name);
      apiCallUsed++;
      totalCommitsFetched += commits.length;

      for (const commit of commits) {
        upsertCommit({
          user_id: userId,
          repo_id: savedRepo.id,
          sha: commit.sha,
          committed_at: commit.committed_at,
          hour_of_day: commit.hour_of_day,
          day_of_week: commit.day_of_week,
        });
      }
    }

    console.log("Total repo commits fetched:", totalCommitsFetched);
    const debugProfile = getFullProfile(realUsername);

    console.log("Debug stats after saving commits:", debugProfile.stats);
    console.log("Debug heatmap count:", debugProfile.heatmap.length);
    console.log("Debug weekly count:", debugProfile.weekly_commits.length);
    const profile = getFullProfile(realUsername);

    if (profile && profile.stats.total_commits > 0) {
      const aiResult = await generateSummary(profile);

      upsertAiSummary(
        userId,
        aiResult.summary,
        aiResult.strengths,
        aiResult.improvements,
      );
    }

    logCacheFetch(userId, "success", "auto", apiCallUsed);

    console.log(
      `Cache refreshed for ${realUsername} - ${apiCallUsed} API calls used.`,
    );

    return getFullProfile(realUsername);
  } catch (error) {
    console.error(`Refresh cache failed for ${realUsername}:`, error);

    if (savedUserId) {
      logCacheFetch(savedUserId, "error", "auto", apiCallUsed);
    }

    throw error;
  }
}
