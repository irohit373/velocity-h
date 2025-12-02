import "./globals.css";
import { getCurrentUser } from "@/lib/auth";
import { UserProvider } from "@/providers/UserProvider";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "VELOCITY H",
  description: "AI Powered Platform For Recruitment & Scheduling",
};

export default async function RootLayout({ children }) {
  // Server-side: Fetch user data once per request
  // This runs on the server, so it can use cookies() safely
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        {/* Wrap entire app in UserProvider to share user data */}
        <UserProvider user={user}>
          <Navbar />
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
