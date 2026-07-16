const BASE_URL = "https://api.github.com";

function getHeaders() {
  return {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    Accept: "application/vnd.github.v3+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function githubFetch(url) {
  const response = await fetch(url, { headers: getHeaders() });

  if (!response.ok) {
    const error = new Error(`GitHub API error: ${response.status}`);
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function fetchRepoCommits(username, repoName) {
  try {
    const since = new Date();
    since.setFullYear(since.getFullYear() - 1);

    const data = await githubFetch(
      `${BASE_URL}/repos/${username}/${repoName}/commits?author=${username}&since=${since.toISOString()}&per_page=100`,
    );

    return data.map((item) => {
      const committedAt = item.commit.author.date;
      const date = new Date(committedAt);

      return {
        sha: item.sha,
        committed_at: committedAt,
        hour_of_day: date.getHours(),
        day_of_week: date.getDay(),
        repo_name: repoName,
      };
    });
  } catch (error) {
    if (error.status === 409) {
      console.log(`Skipping ${repoName}: no commits or empty repository.`);
      return [];
    }

    console.error(`Could not fetch commits for ${repoName}:`, error.message);
    return [];
  }
}

export async function fetchUser(username) {
  const data = await githubFetch(`${BASE_URL}/users/${username}`);

  return {
    github_id: data.id,
    github_username: data.login,
    display_name: data.name,
    avatar_url: data.avatar_url,
    bio: data.bio,
    location: data.location,
    followers: data.followers,
    following: data.following,
    public_repos: data.public_repos,
  };
}

export async function fetchRepos(username) {
  const data = await githubFetch(
    `${BASE_URL}/users/${username}/repos?per_page=100&sort=pushed`,
  );

  return data.map((repo) => ({
    github_repo_id: repo.id,
    repo_name: repo.name,
    description: repo.description,
    language: repo.language,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    is_fork: repo.fork ? 1 : 0,
    pushed_at: repo.pushed_at,
  }));
}

export async function fetchRepoLanguages(username, repoName) {
  try {
    const data = await githubFetch(
      `${BASE_URL}/repos/${username}/${repoName}/languages`,
    );

    return data;
  } catch (error) {
    console.error(
      `Could not find fetch languages for${repoName}:`,
      error.message,
    );
    return {};
  }
}

export async function fetchEvents(username) {
  const data = await githubFetch(
    `${BASE_URL}/users/${username}/events?per_page=100`,
  );

  const pushEvents = data.filter((event) => event.type === "PushEvent");

  const commits = [];

  for (const event of pushEvents) {
    const repoName = event.repo.name.split("/")[1];
    const date = new Date(event.created_at);

    for (const commit of event.payload.commits) {
      commits.push({
        sha: commit.sha,
        committed_at: event.created_at,
        hour_of_day: date.getHours(),
        day_of_week: date.getDay(),
        repo_name: repoName,
      });
    }
  }

  return commits;
}
