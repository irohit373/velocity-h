import React from 'react';
import Image from 'next/image';

const AboutUs = () => {
  const values = [
    {
      title: "Innovation",
      description: "Pushing boundaries in recruitment technology with AI-driven solutions.",
      icon: "window.svg"
    },
    {
      title: "Efficiency",
      description: "Streamlining processes to save time and resources in talent acquisition.",
      icon: "file.svg"
    },
    {
      title: "Transparency",
      description: "Clear, honest communication throughout the hiring journey.",
      icon: "globe.svg"
    }
  ];

  return (
    <div className="min-h-screen py-16 bg-base-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-6">About PeoplePulse</h1>
          <div className="w-24 h-1 bg-primary mx-auto mb-8"></div>
          <p className="text-xl text-base-content/80 max-w-2xl mx-auto">
            Transforming the way companies hire and manage talent through innovative technology and human-centered design.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-base-content/80 mb-6 leading-relaxed">
              At PeoplePulse, we're on a mission to revolutionize the recruitment industry 
              by making hiring processes more efficient, transparent, and enjoyable for everyone involved.
            </p>
            <p className="text-lg text-base-content/80 leading-relaxed">
              We believe in creating tools that not only streamline workflows but also foster 
              meaningful connections between companies and candidates.
            </p>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full max-w-md">
              <Image
                src="/PeoplePulse.png"
                alt="Our Mission Illustration"
                width={400}
                height={400}
                className="drop-shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="card bg-base-200 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="card-body items-center text-center">
                  <div className="w-16 h-16 mb-4">
                    <Image
                      src={`/${value.icon}`}
                      alt={value.title}
                      width={64}
                      height={64}
                      className="opacity-80"
                    />
                  </div>
                  <h3 className="card-title mb-2">{value.title}</h3>
                  <p className="text-base-content/70">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-12">Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member Card */}
            <div className="card bg-base-200 hover:shadow-lg transition-shadow duration-300">
              <div className="card-body items-center text-center">
                <div className="avatar mb-4">
                  <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <Image
                      src="/window.svg"
                      alt="Team Member"
                      width={96}
                      height={96}
                      className="bg-base-300"
                    />
                  </div>
                </div>
                <h3 className="card-title mb-1">Rohit Deshmukh</h3>
                <p className="text-sm text-primary mb-2">CEO & Founder</p>
                <p className="text-base-content/70">
                  Passionate about creating innovative solutions for the recruitment industry.
                </p>
              </div>
            </div>

            {/* Add more team member cards here */}
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default AboutUs;