import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import Link from "next/link";

export default async function AllBlogs() {
  const { userId } = auth();

  const user =
    await sql`SELECT * FROM profiles where clerk_user_id = ${userId}`;
  const allBlogs =
    await sql`SELECT blogs.title, blogs.content, profiles.username FROM blogs JOIN profiles ON blogs.profile_id = profiles.id`;

  return (
    <div>
      {user.rowCount === 0 && (
        <Link href="profile">
          <p>Create Profile</p>
        </Link>
      )}
      <div>
        {user.rowCount !== 0 && (
          <>
            <h2>All Blogs</h2>
            <hr />
            {allBlogs.rows.map((blog) => {
              return (
                <div key={blog.content}>
                  <h3>{`User: ${blog.username}`}</h3>
                  <h4>{blog.title}</h4>
                  <p>{blog.content}</p>
                  <hr />
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
}
