"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { 
  Briefcase, Users, TrendingUp, Sparkles, Zap, Target, 
  Clock, CheckCircle, BarChart3, Calendar, Mail, Brain,
  Shield, Rocket, Award, Star, ChevronRight, ArrowRight
} from "lucide-react";
import animationData from "../../public/lottie_animation/animation-02/watermelon-pack-animation-02.json";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      {/* Hero Section - Candidate Focused */}
      <div className="relative hero min-h-[calc(100vh-3.5rem)] bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              opacity: [0.03, 0.05, 0.03]
            }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [0, -90, 0],
              opacity: [0.03, 0.06, 0.03]
            }}
            transition={{ duration: 25, repeat: Infinity }}
            className="absolute -bottom-1/2 -right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"
          />
        </div>

        <div className="hero-content max-w-7xl mx-auto px-4 py-12 lg:py-0 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
            
            {/* Left Column - Hero Text */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="text-center lg:text-left space-y-6"
            >
              <motion.div variants={itemVariants} className="space-y-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="badge badge-primary badge-lg gap-2 shadow-lg"
                >
                  <Sparkles size={16} className="animate-pulse" />
                  AI-Powered Job Matching
                </motion.div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                  Land Your{" "}
                  <motion.span
                    animate={{ 
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_auto] bg-clip-text text-transparent"
                  >
                    Dream Career
                  </motion.span>
                  <br />
                  <span className="text-4xl sm:text-5xl lg:text-6xl opacity-80">Today!</span>
                </h1>
              </motion.div>
              
              <motion.p variants={itemVariants} className="text-lg sm:text-xl opacity-70 max-w-lg mx-auto lg:mx-0">
                Discover your perfect career match with our AI-powered platform. 
                <span className="text-primary font-semibold"> Find opportunities</span> that align with your skills and aspirations.
              </motion.p>
              
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/jobs" className="btn btn-primary btn-lg gap-2 shadow-lg">
                    <Briefcase size={20} />
                    Explore Opportunities
                    <ArrowRight size={20} />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/signup" className="btn btn-outline btn-lg gap-2">
                    <Rocket size={20} />
                    Get Started Free
                  </Link>
                </motion.div>
              </motion.div>

              {/* Animated Stats */}
              <motion.div 
                variants={itemVariants}
                className="stats stats-vertical sm:stats-horizontal shadow-xl bg-base-100/80 backdrop-blur-sm w-full border border-base-300 overflow-hidden"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.1)" }}
                  className="stat place-items-center"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="stat-value text-primary text-3xl"
                  >
                    500+
                  </motion.div>
                  <div className="stat-desc font-semibold">Active Jobs</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(167, 139, 250, 0.1)" }}
                  className="stat place-items-center"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, delay: 0.2, repeat: Infinity }}
                    className="stat-value text-secondary text-3xl"
                  >
                    2K+
                  </motion.div>
                  <div className="stat-desc font-semibold">Happy Candidates</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(196, 181, 253, 0.1)" }}
                  className="stat place-items-center"
                >
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, delay: 0.4, repeat: Infinity }}
                    className="stat-value text-accent text-3xl"
                  >
                    95%
                  </motion.div>
                  <div className="stat-desc font-semibold">Success Rate</div>
                </motion.div>
              </motion.div>

              {/* Trust Badges */}
              <motion.div variants={itemVariants} className="flex items-center gap-4 justify-center lg:justify-start flex-wrap">
                <div className="flex items-center gap-2 text-sm opacity-70">
                  <CheckCircle size={16} className="text-success" />
                  <span>Trusted Platform</span>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-70">
                  <Shield size={16} className="text-info" />
                  <span>100% Secure</span>
                </div>
                <div className="flex items-center gap-2 text-sm opacity-70">
                  <Star size={16} className="text-warning" />
                  <span>4.9/5 Rating</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              className="flex justify-center lg:justify-end relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-md lg:max-w-lg relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-20 animate-pulse" />
                <Lottie animationData={animationData} loop autoplay />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* How It Works - For Candidates */}
      <div className="bg-gradient-to-b from-base-100 to-base-200 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center"
            >
              <Target className="text-white" size={32} />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Your Journey to <span className="text-primary">Success</span>
            </h2>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              Get hired in 3 simple steps. We make job hunting effortless!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Briefcase, title: "Browse Jobs", desc: "Explore 500+ opportunities tailored to your skills", bgColor: "bg-primary", badgeColor: "badge-primary", step: "01" },
              { icon: Zap, title: "Apply Instantly", desc: "One-click applications with AI-optimized profiles", bgColor: "bg-secondary", badgeColor: "badge-secondary", step: "02" },
              { icon: Rocket, title: "Get Hired", desc: "Fast-track interviews with top companies", bgColor: "bg-accent", badgeColor: "badge-accent", step: "03" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ scale: 1.05, rotate: 1 }}
                className="relative"
              >
                <div className="card bg-base-100 shadow-2xl border-2 border-primary/10 hover:border-primary transition-all overflow-hidden">
                  <div className="absolute top-0 right-0 text-8xl font-bold opacity-5">
                    {item.step}
                  </div>
                  <div className="card-body items-center text-center relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                      className={`w-20 h-20 rounded-2xl ${item.bgColor} flex items-center justify-center mb-4 shadow-lg`}
                    >
                      <item.icon className="text-white" size={40} />
                    </motion.div>
                    <div className={`badge ${item.badgeColor} badge-lg mb-2`}>{item.step}</div>
                    <h3 className="card-title text-2xl">{item.title}</h3>
                    <p className="opacity-70">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* For HR - Platform Features */}
      <div className="bg-gradient-to-br from-base-200 via-base-100 to-base-200 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="badge badge-primary badge-lg gap-2 mb-4">
              <Users size={16} />
              For HR Professionals
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Complete <span className="text-primary">Recruitment SaaS</span> Platform
            </h2>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              Everything you need to hire top talent, powered by AI and designed for efficiency
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: "AI Candidate Scoring", desc: "Automatically rank applicants with ML-powered analysis", color: "primary" },
              { icon: Calendar, title: "Smart Scheduling", desc: "Auto-schedule interviews with Google Calendar integration", color: "secondary" },
              { icon: BarChart3, title: "Analytics Dashboard", desc: "Real-time insights into your recruitment pipeline", color: "accent" },
              { icon: Mail, title: "Email Automation", desc: "Automated candidate communications at every stage", color: "info" },
              { icon: Shield, title: "Secure & Compliant", desc: "Enterprise-grade security with data encryption", color: "success" },
              { icon: Clock, title: "Save 80% Time", desc: "Reduce time-to-hire with automated workflows", color: "warning" }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <div className={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all border-l-4 border-${feature.color} h-full border border-base-300`}>
                  <div className="card-body">
                    <motion.div
                      whileHover={{ rotate: [0, -10, 10, 0] }}
                      transition={{ duration: 0.5 }}
                      className={`w-14 h-14 rounded-xl bg-${feature.color}/10 flex items-center justify-center mb-3 group-hover:bg-${feature.color}/20 transition-colors`}
                    >
                      <feature.icon className={`text-${feature.color}`} size={28} />
                    </motion.div>
                    <h3 className="card-title text-lg">{feature.title}</h3>
                    <p className="opacity-70 text-sm">{feature.desc}</p>
                    <div className="card-actions mt-2">
                      <motion.div
                        whileHover={{ x: 5 }}
                        className={`flex items-center gap-1 text-${feature.color} text-sm font-semibold cursor-pointer`}
                      >
                        Learn more <ChevronRight size={16} />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-b from-base-200 to-base-100 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="badge badge-secondary badge-lg gap-2 mb-4">
                <Award size={16} />
                Why Choose Us
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                The Smartest Way to <span className="text-primary">Recruit</span>
              </h2>
              <div className="space-y-4">
                {[
                  "AI-powered candidate matching with 95% accuracy",
                  "Reduce hiring time from weeks to days",
                  "Automated scheduling with calendar sync",
                  "Real-time collaboration with your team",
                  "Data-driven insights for better decisions",
                  "24/7 support from recruitment experts"
                ].map((benefit, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center gap-3"
                  >
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0"
                    >
                      <CheckCircle className="text-success" size={18} />
                    </motion.div>
                    <span className="text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "10K+", label: "Jobs Posted", icon: Briefcase, color: "primary" },
                  { value: "5K+", label: "Companies", icon: Users, color: "secondary" },
                  { value: "80%", label: "Time Saved", icon: Clock, color: "accent" },
                  { value: "4.9★", label: "User Rating", icon: Star, color: "warning" }
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, type: "spring" }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="card bg-base-100 shadow-xl border-2 border-primary/20"
                  >
                    <div className="card-body items-center text-center p-6">
                      <stat.icon size={32} className={`mb-2 text-${stat.color}`} />
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className={`text-4xl font-bold text-${stat.color}`}
                      >
                        {stat.value}
                      </motion.div>
                      <div className="text-sm opacity-70">{stat.label}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-base-200 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Loved by <span className="text-primary">Thousands</span>
            </h2>
            <p className="text-lg opacity-70">See what our users have to say</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.15 }
              }
            }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { name: "Sarah Johnson", role: "Software Engineer", text: "Found my dream job in just 2 weeks! The AI matching is incredible.", rating: 5 },
              { name: "Michael Chen", role: "HR Manager", text: "Cut our hiring time by 70%. Best recruitment tool we've ever used!", rating: 5 },
              { name: "Emily Davis", role: "Product Designer", text: "The interview scheduling feature saved me so much time. Highly recommend!", rating: 5 }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="card bg-base-100 shadow-2xl border border-base-300"
              >
                <div className="card-body">
                  <div className="flex gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star className="text-warning fill-warning" size={20} />
                      </motion.div>
                    ))}
                  </div>
                  <p className="italic opacity-80 mb-4">"{testimonial.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="avatar placeholder">
                      <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center">
                        <span className="text-xl">{testimonial.name[0]}</span>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm opacity-60">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="relative hero bg-gradient-to-br from-primary via-secondary to-accent py-24 overflow-hidden">
        {/* Animated Background */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 15, repeat: Infinity }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "50px 50px"
          }}
        />

        <div className="hero-content text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
            >
              <Rocket className="text-white" size={40} />
            </motion.div>
            
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
              Your Dream Job Awaits!
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join <span className="font-bold">10,000+</span> professionals who discovered amazing career opportunities. 
              Your perfect role is just one click away!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/signup" className="btn btn-lg bg-white text-primary hover:bg-base-100 gap-2 shadow-2xl">
                  <Rocket size={20} />
                  Start Your Journey
                  <ArrowRight size={20} />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/jobs" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-primary gap-2">
                  <Briefcase size={20} />
                  Explore Opportunities
                </Link>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-8 flex items-center justify-center gap-6 text-white/80 text-sm flex-wrap"
            >
              <div className="flex items-center gap-2">
                <CheckCircle size={16} />
                <span>100% Free Platform</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} />
                <span>Trusted by Thousands</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
