'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

// Modal component for editing existing job postings
// Allows updating job details and triggering AI summary regeneration
export default function EditJobModal({ job, onClose, onUpdate }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    job_title: job.job_title,
    job_description: job.job_description,
    required_experience_years: job.required_experience_years,
    location: job.location || '',
    salary_range: job.salary_range || '',
    tags: Array.isArray(job.tags) ? job.tags.join(', ') : '',
    expiry_date: job.expiry_date 
      ? new Date(job.expiry_date).toISOString().split('T')[0] 
      : '',
    is_active: job.is_active,
  });

  // Submit updated job data to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Convert tags string to array
      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(Boolean);

      const response = await fetch(`/api/jobs/${job.job_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
          required_experience_years: parseInt(formData.required_experience_years.toString()),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update job');
      }

      const { job: updatedJob } = await response.json();
      onUpdate(updatedJob);
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal modal-open">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className="modal-box max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">Edit Job</h2>
          <button onClick={onClose} className="btn btn-ghost btn-sm btn-circle">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-2">Job Title *</label>
            <input
              type="text"
              value={formData.job_title}
              onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Job Description *</label>
            <textarea
              value={formData.job_description}
              onChange={(e) => setFormData({ ...formData, job_description: e.target.value })}
              rows={6}
              className="textarea textarea-bordered w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Experience (Years)</label>
              <input
                type="number"
                min="0"
                value={formData.required_experience_years}
                onChange={(e) => setFormData({ ...formData, required_experience_years: parseInt(e.target.value) })}
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input input-bordered w-full"
                placeholder="e.g., Remote, NYC"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Salary Range</label>
            <input
              type="text"
              value={formData.salary_range}
              onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
              className="input input-bordered w-full"
              placeholder="e.g., $80k - $120k"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="input input-bordered w-full"
              placeholder="e.g., JavaScript, React"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Expiry Date</label>
            <input
              type="date"
              value={formData.expiry_date}
              onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex items-center gap-2 py-2">
            <input
              type="checkbox"
              id="is_active"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="checkbox checkbox-primary"
            />
            <label htmlFor="is_active" className="text-sm font-medium cursor-pointer">
              Job is Active
            </label>
          </div>

          {/* Submit Button */}
          <div className="modal-action">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              <span>{loading ? 'Updating...' : 'Update Job'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}