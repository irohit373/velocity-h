'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import JobCard from '@/components/jobs/JobCard';
import JobCardSkeleton from '@/components/JobCardSkeleton';

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    minExperience: '',
    maxExperience: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await fetch('/api/jobs?public=true');
      const data = await response.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = !searchTerm || 
      job.job_title?.toLowerCase().includes(searchLower) ||
      job.location?.toLowerCase().includes(searchLower) ||
      job.tags?.some(tag => tag.toLowerCase().includes(searchLower));

    const matchesLocation = !filters.location || 
      job.location?.toLowerCase().includes(filters.location.toLowerCase());
    const matchesMinExp = !filters.minExperience || 
      job.required_experience_years >= parseInt(filters.minExperience);
    const matchesMaxExp = !filters.maxExperience || 
      job.required_experience_years <= parseInt(filters.maxExperience);

    return matchesSearch && matchesLocation && matchesMinExp && matchesMaxExp;
  });

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({ location: '', minExperience: '', maxExperience: '' });
  };

  const hasActiveFilters = searchTerm || filters.location || filters.minExperience || filters.maxExperience;

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-100 py-12 px-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.03, 0.05, 0.03]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-1/4 -left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.03, 0.06, 0.03]
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl sm:text-5xl font-bold mb-2">
            Discover Your Next <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Opportunity</span>
          </h1>
          <p className="text-lg sm:text-xl opacity-70">Explore opportunities that match your skills and aspirations</p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card bg-base-100 shadow-2xl border border-base-300 mb-6"
        >
          <div className="card-body p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search Input */}
              <label className="input input-bordered flex items-center gap-2 flex-1">
                <Search size={20} />
                <input
                  type="text"
                  className="grow"
                  placeholder="Search by job title, location, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </label>

              {/* Filter Toggle */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`btn ${showFilters ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={20} />
                Filters
                {hasActiveFilters && <span className="badge badge-secondary">•</span>}
              </motion.button>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="divider my-2"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <label className="form-control">
                    <span className="label label-text">Location</span>
                    <input
                      type="text"
                      placeholder="e.g., Remote, NYC"
                      className="input input-bordered input-sm"
                      value={filters.location}
                      onChange={(e) => setFilters({...filters, location: e.target.value})}
                    />
                  </label>
                  <label className="form-control">
                    <span className="label label-text">Min Experience</span>
                    <input
                      type="number"
                      placeholder="0"
                      min="0"
                      className="input input-bordered input-sm"
                      value={filters.minExperience}
                      onChange={(e) => setFilters({...filters, minExperience: e.target.value})}
                    />
                  </label>
                  <label className="form-control">
                    <span className="label label-text">Max Experience</span>
                    <input
                      type="number"
                      placeholder="20"
                      min="0"
                      className="input input-bordered input-sm"
                      value={filters.maxExperience}
                      onChange={(e) => setFilters({...filters, maxExperience: e.target.value})}
                    />
                  </label>
                </div>
                {hasActiveFilters && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    className="btn btn-ghost btn-sm self-end mt-2"
                    onClick={clearFilters}
                  >
                    <X size={16} />
                    Clear Filters
                  </motion.button>
                )}
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Results Count */}
        {!loading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6 opacity-70"
          >
            Showing <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="text-primary font-semibold"
            >{filteredJobs.length}</motion.span> of {jobs.length} opportunities
          </motion.p>
        )}

        {/* Job Cards */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.08,
                  delayChildren: 0.2
                }
              }
            }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredJobs.map((job) => (
              <JobCard key={job.job_id} job={job} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center py-12"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mb-6"
            >
              <div className="w-20 h-20 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Search size={40} className="text-primary" />
              </div>
            </motion.div>
            <p className="text-lg opacity-50 mb-4">
              {hasActiveFilters 
                ? 'No opportunities match your criteria'
                : 'No open positions at the moment'}
            </p>
            {hasActiveFilters && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary"
                onClick={clearFilters}
              >
                Clear Filters
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
