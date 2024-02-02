import { auth } from "@clerk/nextjs";
import { sql } from "@vercel/postgres";
import Link from "next/link";
import PopOver from "./components/Popover";

export default async function Home() {
  const { userId } = auth();

  const user =
    await sql`SELECT * FROM profiles where clerk_user_id = ${userId}`;
  return (
    <>
      {userId && user.rowCount === 0 && (
        <div>
          <Link href="/profile">
            <p>Create Profile</p>
          </Link>
        </div>
      )}
      {userId && user.rowCount !== 0 && (
        <div>
          <PopOver />
        </div>
      )}
    </>
  );
}
