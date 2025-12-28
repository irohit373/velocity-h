'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase, IndianRupee, Calendar, X } from 'lucide-react';
import ApplyJobModal from './ApplyJobModal';

// Component to display individual job posting card
// Shows job details and allows users to apply
export default function JobCard({ job }) {
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Format date to readable string (e.g., "Jan 15, 2024")
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -4 }}
        className="card bg-base-100 shadow hover:shadow-xl transition-shadow cursor-pointer"
        onClick={() => setIsDetailsOpen(true)}
      >
        <div className="card-body">
          <h3 className="card-title">{job.job_title}</h3>

          <div className="space-y-2 text-sm opacity-70">
            {job.location && (
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                {job.location}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Briefcase size={16} />
              {job.required_experience_years} years experience
            </div>
            {job.salary_range && (
              <div className="flex items-center gap-2">
                <IndianRupee size={16} />
                {job.salary_range}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              Posted {formatDate(job.created_at)}
            </div>
          </div>

          {job.tags && job.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {job.tags.map((tag, index) => (
                <span key={index} className="badge badge-outline badge-sm">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="card-actions">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsApplyOpen(true);
              }}
              className="btn btn-primary btn-block"
            >
              Apply Now
            </button>
          </div>
        </div>
      </motion.div>

      {/* Job Details Modal */}
      {isDetailsOpen && (
        <div className="modal modal-open">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="modal-box max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between mb-6">
              <h2 className="text-3xl font-bold">{job.job_title}</h2>
              <button 
                onClick={() => setIsDetailsOpen(false)} 
                className="btn btn-sm btn-circle btn-ghost"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                {job.location && (
                  <div className="flex gap-3 p-3 bg-base-200 rounded-lg">
                    <MapPin size={20} className="opacity-60" />
                    <div>
                      <div className="text-xs opacity-70">Location</div>
                      <div className="font-medium">{job.location}</div>
                    </div>
                  </div>
                )}
                <div className="flex gap-3 p-3 bg-base-200 rounded-lg">
                  <Briefcase size={20} className="opacity-60" />
                  <div>
                    <div className="text-xs opacity-70">Experience</div>
                    <div className="font-medium">{job.required_experience_years} years</div>
                  </div>
                </div>
                {job.salary_range && (
                  <div className="flex gap-3 p-3 bg-base-200 rounded-lg">
                    <IndianRupee size={20} className="opacity-60" />
                    <div>
                      <div className="text-xs opacity-70">Salary</div>
                      <div className="font-medium">{job.salary_range}</div>
                    </div>
                  </div>
                )}
                <div className="flex gap-3 p-3 bg-base-200 rounded-lg">
                  <Calendar size={20} className="opacity-60" />
                  <div>
                    <div className="text-xs opacity-70">Posted</div>
                    <div className="font-medium">{formatDate(job.created_at)}</div>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {job.tags && job.tags.length > 0 && (
                <div>
                  <h3 className="font-semibold mb-3">Required Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, index) => (
                      <span key={index} className="badge badge-outline">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Description */}
              <div>
                <h3 className="font-semibold mb-3">Job Description</h3>
                <div className="p-4 bg-base-200 rounded-lg">
                  <p className="text-base-content/80 whitespace-pre-line">
                    {job.job_description}
                  </p>
                </div>
              </div>

              {/* Expiry Date */}
              {job.expiry_date && (
                <div className="alert alert-warning">
                  <Calendar size={18} />
                  <span>Application deadline: {formatDate(job.expiry_date)}</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="modal-action">
              <button 
                onClick={() => setIsDetailsOpen(false)} 
                className="btn btn-ghost"
              >
                Close
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDetailsOpen(false);
                  setIsApplyOpen(true);
                }}
                className="btn btn-primary"
              >
                Apply Now
              </button>
            </div>
          </motion.div>
          <div className="modal-backdrop bg-black/50" onClick={() => setIsDetailsOpen(false)}></div>
        </div>
      )}

      {isApplyOpen && (
        <ApplyJobModal
          job={job}
          onClose={() => setIsApplyOpen(false)}
        />
      )}
    </>
  );
}