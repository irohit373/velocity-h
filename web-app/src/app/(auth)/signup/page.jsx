'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Mail, Lock, User, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import animationData from '../../../../public/lottie_animation/animation-02/watermelon-pack-animation-02.json';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

export default function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
        });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/4 -left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.06, 0.03]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-1/4 -right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"
        />
      </div>

      <div className="min-h-screen flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Column - Branding & Animation */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col justify-center space-y-8"
          >
            <div className="space-y-4 text-center lg:text-left">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="badge badge-primary badge-lg gap-2 shadow-lg inline-flex"
              >
                <Sparkles size={16} className="animate-pulse" />
                Join Today - It's Free!
              </motion.div>
              
              <h1 className="text-5xl font-bold leading-tight">
                Start Your{" "}
                <motion.span
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 5, repeat: Infinity }}
                  className="bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_auto] bg-clip-text text-transparent"
                >
                  Career Journey
                </motion.span>
              </h1>
              
              <p className="text-xl opacity-70">
                Join thousands of professionals finding their dream jobs
              </p>
            </div>

            {/* Lottie Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="w-full max-w-md mx-auto relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-full blur-2xl opacity-20 animate-pulse" />
                <Lottie animationData={animationData} loop autoplay />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column - Sign Up Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full"
          >
            <div className="card bg-base-100/80 backdrop-blur-lg shadow-2xl border border-base-300">
              <div className="card-body p-8">
                <div className="text-center mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg"
                  >
                    <User className="text-white" size={32} />
                  </motion.div>
                  <h2 className="text-3xl font-bold mb-2">Create Account</h2>
                  <p className="opacity-70">Start your journey today</p>
                </div>
        
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="alert alert-error mb-4"
                  >
                    <span>{error}</span>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="form-control">
                      <span className="label label-text font-semibold">Full Name</span>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="text-base-content/40" size={20} />
                        </div>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="input input-bordered w-full pl-12"
                          placeholder="John Doe"
                          required
                        />
                      </div>
                    </label>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="form-control">
                      <span className="label label-text font-semibold">Email</span>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Mail className="text-base-content/40" size={20} />
                        </div>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="input input-bordered w-full pl-12"
                          placeholder="you@example.com"
                          required
                        />
                      </div>
                    </label>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label className="form-control">
                      <span className="label label-text font-semibold">Password</span>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <Lock className="text-base-content/40" size={20} />
                        </div>
                        <input
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="input input-bordered w-full pl-12"
                          placeholder="••••••••"
                          required
                        />
                      </div>
                    </label>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.button
                      type="submit"
                      disabled={loading}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn btn-primary btn-block btn-lg gap-2 shadow-lg"
                    >
                      {loading ? (
                        <>
                          <span className="loading loading-spinner"></span>
                          Creating account...
                        </>
                      ) : (
                        <>
                          Create Account
                          <ArrowRight size={20} />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </form>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="flex items-center gap-2 mt-4 p-3 bg-success/10 rounded-lg border border-success/20"
                >
                  <CheckCircle className="text-success" size={20} />
                  <p className="text-sm opacity-80">Free forever - No credit card required</p>
                </motion.div>

                <div className="divider">OR</div>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="text-center text-sm opacity-70"
                >
                  Already have an account?{' '}
                  <Link href="/signin" className="link link-primary font-semibold">
                    Sign in
                  </Link>
                </motion.p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
