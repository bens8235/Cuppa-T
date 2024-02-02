CREATE TABLE profiles (
    id SERIAL PRIMARY key, 
    clerk_user_id text, 
    username text, 
    bio text
);

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY, 
    title text, 
    content text, 
    profile_id INTEGER References profiles(id)
);