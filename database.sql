-- Articles table
CREATE TABLE articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Policies for articles table
-- Anyone can read articles
CREATE POLICY "Articles are viewable by everyone"
ON articles FOR SELECT
USING (true);

-- Users can insert their own articles
CREATE POLICY "Users can insert their own articles"
ON articles FOR INSERT
WITH CHECK (auth.uid() = author_id);

-- Users can update their own articles
CREATE POLICY "Users can update their own articles"
ON articles FOR UPDATE
USING (auth.uid() = author_id);

-- Users can delete their own articles
CREATE POLICY "Users can delete their own articles"
ON articles FOR DELETE
USING (auth.uid() = author_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();