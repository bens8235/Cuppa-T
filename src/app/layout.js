import "./globals.css";
import { ClerkProvider, UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";

export const metadata = {
  title: "Cuppa T",
  description: "Cuppa T",
};

export default function RootLayout({ children }) {
  const { userId } = auth();
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Link href="/">
            <h2>Cuppa T🍵</h2>
          </Link>
          {userId && <UserButton afterSignOutUrl="/" />}
          {!userId && <Link href="/sign-in">Sign in</Link>}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
