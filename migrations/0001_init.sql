-- Core domain: an "activity" caregivers can browse — what it develops,
-- why it helps, and how to run it.
CREATE TABLE activities (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL, -- exercise | fine_motor | brain | general
  summary TEXT NOT NULL DEFAULT '',
  benefits TEXT NOT NULL DEFAULT '', -- what it develops / helps with
  steps TEXT NOT NULL DEFAULT '[]', -- JSON array of how-to steps for caregivers
  video_url TEXT,
  created_at TEXT NOT NULL,
  updated_at TEXT
);

CREATE INDEX idx_activities_category ON activities(category);
