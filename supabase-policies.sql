-- Supabase Row Level Security (RLS) Policies for ColloQ
-- Enable RLS on all tables and define policies for access control

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE join_requests ENABLE ROW LEVEL SECURITY;

-- Users table policies
-- Users can read their own profile and update it
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- Public can read basic user info for discovery (name, bio, availability, goals)
-- But not sensitive info like email
-- Note: Supabase auth handles user creation, so no INSERT policy needed here

-- Skills table policies
-- Skills are public read-only
CREATE POLICY "Public read skills" ON skills
    FOR SELECT USING (true);

-- User skills policies
-- Users can view and manage their own skills
CREATE POLICY "Users can view own skills" ON user_skills
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own skills" ON user_skills
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own skills" ON user_skills
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own skills" ON user_skills
    FOR DELETE USING (auth.uid() = user_id);

-- Teams table policies
-- Public can read teams for discovery
CREATE POLICY "Public read teams" ON teams
    FOR SELECT USING (true);

-- Only authenticated users can create teams
CREATE POLICY "Authenticated users can create teams" ON teams
    FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

-- Team creators (admins) can update their teams
CREATE POLICY "Team admins can update teams" ON teams
    FOR UPDATE USING (
        auth.uid() IN (
            SELECT user_id FROM team_members
            WHERE team_id = teams.id AND role = 'admin'
        )
    );

-- Team members policies
-- Team members can view team membership
CREATE POLICY "Team members can view membership" ON team_members
    FOR SELECT USING (
        auth.uid() = user_id OR
        auth.uid() IN (
            SELECT user_id FROM team_members tm
            WHERE tm.team_id = team_members.team_id
        )
    );

-- Team admins can add members (when accepting join requests)
CREATE POLICY "Team admins can manage members" ON team_members
    FOR ALL USING (
        auth.uid() IN (
            SELECT user_id FROM team_members tm
            WHERE tm.team_id = team_members.team_id AND tm.role = 'admin'
        )
    );

-- Join requests policies
-- Users can view their own requests
CREATE POLICY "Users can view own requests" ON join_requests
    FOR SELECT USING (auth.uid() = user_id);

-- Users can create requests to join teams
CREATE POLICY "Users can create join requests" ON join_requests
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Team admins can view and update requests for their teams
CREATE POLICY "Team admins can manage requests" ON join_requests
    FOR SELECT USING (
        auth.uid() IN (
            SELECT user_id FROM team_members
            WHERE team_id = join_requests.team_id AND role = 'admin'
        )
    );

CREATE POLICY "Team admins can update requests" ON join_requests
    FOR UPDATE USING (
        auth.uid() IN (
            SELECT user_id FROM team_members
            WHERE team_id = join_requests.team_id AND role = 'admin'
        )
    );

-- Prevent duplicate pending requests (handled by UNIQUE constraint, but policy for safety)
-- Note: The UNIQUE (team_id, user_id) in schema prevents duplicates at DB level
