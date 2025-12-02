// Mark this component as a client-side component (for interactivity)
"use client";

// Import required dependencies
import Link from "next/link"; // Next.js Link for navigation
import dynamic from "next/dynamic"; // Dynamic import to load components on client-side only
import animationData from "../../public/lottie_animation/animation-02/watermelon-pack-animation-02.json"; // Lottie animation JSON

// Load Lottie component only on client-side (not during server-side rendering)
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Navbar is now in layout.jsx, no need to import here */}
      
      {/* Main container with gradient background */}
      <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-br from-blue-50 to-pink-50">
      
      {/* Content wrapper with max width and padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        
        {/* Two-column grid layout: Text on left, Animation on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Hero Text and CTA Button */}
          <div className="text-center lg:text-left space-y-6">
            
            {/* Main Heading */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold">
              <span className="block text-gray-900">FIND YOUR</span>
              <span className="block bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-600 bg-clip-text text-transparent animate-pulse">
                SOUL JOB
              </span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg sm:text-xl text-gray-600 max-w-lg mx-auto lg:mx-0">
              Discover opportunities that align with your passion and skills. Your dream career is just a click away.
            </p>
            
            {/* Call-to-Action Button */}
            <div className="pt-2">
              <Link
                href="/jobs"
                className="inline-block bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                JOB LIST
              </Link>
            </div>
          </div>

          {/* Right Column - Animated Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg">
              <Lottie animationData={animationData} loop autoplay />
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}
