

CREATE TABLE IF NOT EXISTS users (

        id INTEGER PRIMARY KEY AUTOINCREMENT,
        github_id INTEGER UNIQUE,
        github_username TEXT UNIQUE NOT NULL,
        display_name TEXT,
        avatar_url TEXT,
        bio TEXT,
        location TEXT,
        followers INTEGER DEFAULT 0,
        following INTEGER DEFAULT 0,
        public_repos INTEGER DEFAULT 0,
        cached_at DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS repositories (

        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        github_repo_id INTEGER UNIQUE,
        repo_name TEXT NOT NULL,
        description TEXT,
        language TEXT,
        stars INTEGER DEFAULT 0,
        forks INTEGER DEFAULT 0,
        is_fork INTEGER DEFAULT 0,
        cached_at DATETIME,
        pushed_at  DATETIME,

        CONSTRAINT user_fk FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS repo_languages (

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    repo_id INTEGER NOT NULL,
    language TEXT,
    bytes INTEGER DEFAULT 0,

     CONSTRAINT repo_fk2 FOREIGN KEY (repo_id) REFERENCES repositories (id) ON DELETE CASCADE

);

CREATE TABLE IF NOT EXISTS commit_events(


        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        repo_id INTEGER,
        sha TEXT UNIQUE,
        committed_at DATETIME NOT NULL,
        hour_of_day INTEGER,
        day_of_week INTEGER,

        CONSTRAINT user2_fk FOREIGN KEY (user_id) REFERENCES users (id)
         ON DELETE CASCADE,

        CONSTRAINT repo_fk FOREIGN KEY ( repo_id) REFERENCES repositories (id) 
        ON DELETE SET NULL

);

CREATE TABLE IF NOT EXISTS ai_summaries (

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL UNIQUE,
    summary_text TEXT,
    strengths TEXT,
    improvements TEXT,
    generated_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT user_fk3 FOREIGN KEY (user_id) REFERENCES users (id)

    ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cache_log (

    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    status TEXT NOT NULL,
    source TEXT,
    fetched_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    api_calls_used INTEGER DEFAULT 0,

    CONSTRAINT user_fK4 FOREIGN KEY (user_id) REFERENCES users (id)
    
    ON DELETE CASCADE
);