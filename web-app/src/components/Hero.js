import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <div className="hero min-h-[80vh] bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8 lg:gap-16 py-12">
        {/* Hero Image/Illustration */}
        <div className="lg:w-1/2 flex justify-center">
          <Image
            src="/globe.svg"
            alt="PeoplePulse Platform Illustration"
            width={500}
            height={500}
            className="max-w-sm rounded-lg shadow-2xl animate-float"
          />
        </div>

        {/* Hero Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left">
          {/* Eyebrow text with gradient */}
          
          
          {/* Main heading with gradient text */}
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            <span className="text-primary">Seamless Recruitment.</span>
            <br />
            <span>Structured Scheduling</span>
          </h1>
          
          {/* Description with better line height and size */}
          <p className="py-6 text-lg text-base-content/80 leading-relaxed max-w-2xl">
            <span className='font-semibold text-purple-700'>Welcome to PeoplePulse</span>, your all-in-one solution for efficient recruitment 
            and scheduling. Streamline your hiring process and manage interviews 
            effortlessly with our user-friendly platform.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-8">
            <button className="btn btn-primary btn-lg rounded-full px-8 hover:shadow-lg transition-all">
              Get Started
            </button>
            <button className="btn btn-ghost btn-lg rounded-full px-8">
              Learn More →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;