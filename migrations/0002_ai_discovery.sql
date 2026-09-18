-- Tracks how an activity entered the catalog, so AI-generated entries stay
-- distinguishable from ones a caregiver/admin wrote by hand.
ALTER TABLE activities ADD COLUMN source TEXT NOT NULL DEFAULT 'manual'; -- manual | ai
ALTER TABLE activities ADD COLUMN source_url TEXT; -- reference link the AI drew the idea from
