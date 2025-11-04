import "./globals.css";
import Image from "next/image";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" data-theme="pastel">
        <body className="antialiased min-h-screen bg-gray-600">
          <div className="flex flex-col min-h-screen">
            {/* Navbar container with subtle shadow and border */}
            <header className="sticky top-0 z-30 bg-base-100/95 backdrop-blur-sm border-b border-base-200">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                
                <div className="flex items-center justify-between h-16">
                  {/* Logo on the left */}
                  <div className="flex items-center gap-2">
                    <Image 
                      src="/globe.svg"
                      alt="PeoplePulse Logo"
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                    <span className="font-semibold text-lg">PeoplePulse</span>
                  </div>

                  {/* Navigation buttons - only shown when signed in */}
                  <div className="hidden md:flex items-center gap-4">
                    <SignedIn>
                      <Link href="/recruiting" className="btn btn-ghost rounded-3xl border-purple-700">Recruiting</Link>
                      <Link href="/scheduling" className="btn btn-ghost rounded-3xl border-purple-700">Scheduling</Link>
                    </SignedIn>
                  </div>

                  {/* Auth buttons on the right */}
                  <div className="flex items-center gap-2">
                    <SignedOut>
                      <SignInButton mode="modal" className="btn btn-ghost" />
                      <SignUpButton mode="modal" className="btn btn-primary hover:btn-primary-focus transition-colors rounded-4xl" />
                    </SignedOut>
                    <SignedIn>
                      <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                  </div>
                </div>
              </div>
            </header>
            
            {/* Main content */}
            <main className="flex-1">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </div>
            </main>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
