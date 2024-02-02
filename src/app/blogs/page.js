import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export default async function BlogPage() {
  const { userId } = auth();

  const user =
    await sql`SELECT * FROM profiles where clerk_user_id = ${userId}`;

  let posts = "";
  if (user.rowCount !== 0) {
    posts =
      await sql`SELECT * FROM blogs where profile_id = ${user.rows[0].id}`;
  }

  async function handleAddBlog(formData) {
    "use server";
    const title = formData.get("title");
    const content = formData.get("content");
    await sql`INSERT INTO blogs (title, content, profile_id) VALUES (${title}, ${content}, ${user.rows[0].id}) `;
    revalidatePath("/blogs");
    revalidatePath("/allblogs");
  }

  return (
    <div>
      {user.rowCount === 0 && (
        <Link href="profile">
          <p>Create Profile</p>
        </Link>
      )}
      {user.rowCount !== 0 && (
        <div>
          <form action={handleAddBlog}>
            <h2>Create New Blog post</h2>
            <input name="title" placeholder="Name of blog" />
            <textarea name="content" placeholder="write your blog"></textarea>
            <button>Submit</button>
          </form>
          <div>
            <h3>My Blog Posts</h3>
            {posts.rows.map((post) => {
              return (
                <div key={post.content}>
                  <h4>{post.title}</h4>
                  <p>{post.content}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
