import db from "./connection.js";

export function getUserByUsername(username) {
  const stmt = db.prepare(
    `SELECT * FROM users
        WHERE github_username = ?`,
  );
  return stmt.get(username);
}

export function upsertUser(userData) {
  const stmt = db.prepare(`

            INSERT INTO users(
            github_id,github_username, display_name,avatar_url,bio, location , followers,following,public_repos, cached_at)
            VALUES (

                @github_id, @github_username, @display_name , @avatar_url , @bio , @location, @followers, @following, @public_repos,@cached_at
            )
            ON CONFLICT(github_username) DO UPDATE SET

                display_name = @display_name,
                avatar_url = @avatar_url,
                bio = @bio,
                location = @location,
                followers = @followers,
                following = @following,
                public_repos = @public_repos,
                cached_at = @cached_at
             

        `);

  return stmt.run(userData);
}

export function getUserId(username) {
  const stmt = db.prepare(`
      SELECT id FROM users WHERE github_username = ?
      `);

  const row = stmt.get(username);
  return row ? row.id : null;
}

export function upsertRepo(repoData) {
  const stmt = db.prepare(`
    INSERT INTO repositories (
    user_id, github_repo_id,repo_name , description,
    language, stars, forks , is_fork , pushed_at , cached_at) VALUES
    (
      @user_id, @github_repo_id , @repo_name, @description , @language, @stars, @forks ,@is_fork, @pushed_at, @cached_at
    )
    ON CONFLICT (github_repo_id) DO UPDATE SET

      repo_name = @repo_name,
      description = @description, 
      language = @language,
      stars  = @stars,
      forks = @forks,
      pushed_at = @pushed_at,
      cached_at = @cached_at

    `);
  return stmt.run(repoData);
}

export function getRepoByGithubId(githubRepoId) {
  const stmt = db.prepare(
    `
     SELECT * FROM repositories WHERE github_repo_id = ?`,
  );
  return stmt.get(githubRepoId);
}

export function getRepoByUserId(userId) {
  const stmt = db.prepare(
    `
      SELECT * FROM repositories
      WHERE user_id = ?
      ORDER BY stars DESC
      LIMIT 6
    `,
  );
  return stmt.all(userId);
}

export function upsertLanguages(repoId, languages) {
  const deleteStmt = db.prepare(`DELETE FROM repo_languages WHERE repo_id = ?`);

  deleteStmt.run(repoId);

  const insertStmt =
    db.prepare(`INSERT INTO repo_languages (repo_id, language , bytes)
  VALUES (? , ? , ?)`);

  for (const [language, bytes] of Object.entries(languages)) {
    insertStmt.run(repoId, language, bytes);
  }
}

export function getLanguagesByUserId(userId) {
  const stmt = db.prepare(
    `
      SELECT 
        r1.language,
        SUM (r1.bytes) AS total_bytes
        FROM repo_languages r1
        JOIN repositories r ON r.id = r1.repo_id
        WHERE r.user_id = ?
        GROUP BY r1.language
        ORDER BY total_bytes DESC 
    `,
  );
  return stmt.all(userId);
}

export function upsertCommit(commitData) {
  const stmt = db.prepare(
    `
      INSERT OR IGNORE INTO commit_events(
        user_id, repo_id, sha, committed_at,hour_of_day, day_of_week
      )VALUES (
      @user_id,@repo_id,@sha,@committed_at,@hour_of_day , @day_of_week
      )
    `,
  );
  return stmt.run(commitData);
}

export function getHeatmapData(userId) {
  const stmt = db.prepare(
    `
      SELECT 
        DATE(committed_at) AS date,
        COUNT (*) AS count
        FROM commit_events
        WHERE user_id = ?
          AND committed_at >= DATE('now', '-52 weeks')
        GROUP BY DATE(committed_at)
        ORDER BY date ASC
    `,
  );
  return stmt.all(userId);
}

export function getWeeklyCommits(userId) {
  const stmt = db.prepare(
    `
      SELECT 
      STRFTIME('%Y-%W', committed_at) AS week,
      COUNT (*) AS count 
      FROM commit_events
      WHERE user_id = ?
        AND committed_at >= DATE ('now' , '-26 weeks')
      GROUP BY week
      ORDER BY week ASC
    `,
  );
  return stmt.all(userId);
}

export function getCommitStats(userId) {
  const stmt = db.prepare(
    `
    SELECT DISTINCT DATE (committed_at) as date
    FROM commit_events
    WHERE user_id = ?
    ORDER BY date DESC
  `,
  );

  const dates = stmt.all(userId).map((row) => row.date);

  const totalCommits = db
    .prepare(
      `
      SELECT 
      COUNT (*) AS count
      FROM commit_events
      WHERE user_id = ? 
    `,
    )
    .get(userId).count;

  if (dates.length === 0) {
    return { current_streak: 0, longest_streak: 0, total_commits: 0 };
  }

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 1;
  const today = new Date().toISOString().split("T")[0];

  const mostRecent = dates[0];
  const dayDiff = Math.floor(
    (new Date(today) - new Date(mostRecent)) / (1000 * 60 * 60 * 24),
  );

  if (dayDiff > 1) {
    currentStreak = 0;
  } else {
    currentStreak = 1;
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1]);
      const curr = new Date(dates[i]);
      const diff = Math.floor((prev - curr) / (1000 * 60 * 60 * 24));
      if (diff == 1) {
        currentStreak++;
      } else {
        break;
      }
    }
  }

  tempStreak = 1;
  for (let i = 1; i < dates.length; i++) {
    const prev = new Date(dates[i - 1]);
    const curr = new Date(dates[i]);
    const diff = Math.floor((prev - curr) / (1000 * 60 * 60 * 24));
    if (diff == 1) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 1;
    }
  }

  longestStreak = Math.max(longestStreak, currentStreak);

  return {
    current_streak: currentStreak,
    longest_streak: longestStreak,
    total_commits: totalCommits,
  };
}

//AI summery

export function upsertAiSummary(userId, summary, strengths, improvements) {
  const stmt = db.prepare(
    `
        INSERT INTO ai_summaries (
          user_id , summary_text, strengths , improvements , generated_at 
        ) VALUES (
          ?, ? , ? , ? , CURRENT_TIMESTAMP 
        )

        ON CONFLICT(user_id) DO UPDATE SET

        summary_text = excluded.summary_text,
        strengths = excluded.strengths , 
        improvements = excluded.improvements,
        generated_at  = CURRENT_TIMESTAMP 

      `,
  );

  return stmt.run(
    userId,
    summary,
    JSON.stringify(strengths),
    JSON.stringify(improvements),
  );
}

export function getAiSummary(userId) {
  const stmt = db.prepare(
    `
        SELECT * FROM ai_summaries 
        WHERE user_id = ?  
      `,
  );
  const row = stmt.get(userId);
  if (!row) return null;

  return {
    ...row,
    strengths: JSON.parse(row.strengths || "[]"),
    improvements: JSON.parse(row.improvements || "[]"),
  };
}

//cache log

export function logCacheFetch(userId, status, source, apiCallsUsed) {
  const stmt = db.prepare(
    `
      INSERT INTO cache_log (user_id, status , source , api_calls_used)
      VALUES (?,?,?,?)
    `,
  );
  return stmt.run(userId, status, source, apiCallsUsed);
}

export function getFullProfile(username) {
  const user = getUserByUsername(username);
  if (!user) return null;

  const repos = getRepoByUserId(user.id);
  const languages = getLanguagesByUserId(user.id);
  const heatmap = getHeatmapData(user.id);
  const weekly = getWeeklyCommits(user.id);
  const stats = getCommitStats(user.id);
  const aiSummary = getAiSummary(user.id);

  return {
    user,
    repos,
    languages,
    heatmap,
    weekly_commits: weekly,
    stats,
    ai: aiSummary,
  };
}
