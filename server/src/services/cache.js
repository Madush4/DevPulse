import {
  fetchUser,
  fetchRepos,
  fetchRepoLanguages,
  fetchEvents,
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

  try {
    const userData = await fetchUser(username);
    apiCallUsed++;

    userData.cached_at = new Date().toISOString();
    upsertUser(userData);

    const userId = getUserId(username);

    const repos = await fetchRepos(username);
    apiCallUsed++;

    for (const repo of repos) {
      upsertRepo({
        ...repo,
        user_id: userId,
        cached_at: new Date().toISOString(),
      });

      if (!repo.is_fork) {
        const languages = await fetchRepoLanguages(username, repo.repo_name);
        apiCallUsed++;

        const savedRepo = getRepoByGithubId(repo.github_repo_id);
        if (savedRepo && Object.keys(languages).length > 0) {
          upsertLanguages(savedRepo.id, languages);
        }
      }
    }

    const commits = await fetchEvents(username);
    apiCallUsed++;

    for (const commit of commits) {
      const matchingRepo = repos.find((r) => r.repo_name === commit.repo_name);
      const savedRepo = matchingRepo
        ? getRepoByGithubId(matchingRepo.github_repo_id)
        : null;

      upsertCommit({
        user_id: userId,
        repo_id: savedRepo ? savedRepo.id : null,
        sha: commit.sha,
        committed_at: commit.committed_at,
        hour_of_day: commit.hour_of_day,
        day_of_week: commit.day_of_week,
      });
    }

    const profile = getFullProfile(username);

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
      `Cache refreshed for ${username} - ${apiCallUsed} API calls used.`,
    );
    return getFullProfile(username);
  } catch (error) {
    const userId = getUserId(username);
    if (userId) {
      logCacheFetch(userId, "error", "auto", apiCallUsed);
    }

    throw error;
  }
}
