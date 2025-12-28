'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';

export default function AddJobModal({ onClose }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    job_title: '',
    job_description: '',
    required_experience_years: 0,
    location: '',
    salary_range: '',
    tags: '',
    expiry_date: '',
  });

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

      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: tagsArray,
          required_experience_years: parseInt(formData.required_experience_years.toString()),
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create job');
      }

      // Close modal first for better UX
      onClose();
      
      // Force a hard refresh to show new job
      window.location.reload();
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
        className="modal-box max-w-2xl"
      >
        <div className="flex justify-between mb-6">
          <h3 className="font-bold text-2xl">Create New Job</h3>
          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="alert alert-error">
              <span>{error}</span>
            </div>
          )}

          <label className="form-control">
            <span className="label label-text font-medium">Job Title *</span>
            <input
              type="text"
              value={formData.job_title}
              onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
              className="input input-bordered"
              required
            />
          </label>

          <label className="form-control">
            <span className="label label-text font-medium">Job Description *</span>
            <textarea
              value={formData.job_description}
              onChange={(e) => setFormData({ ...formData, job_description: e.target.value })}
              rows={6}
              className="textarea textarea-bordered resize-none"
              required
            />
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            <label className="form-control">
              <span className="label label-text font-medium">Experience (Years)</span>
              <input
                type="number"
                min="0"
                value={formData.required_experience_years}
                onChange={(e) => setFormData({ ...formData, required_experience_years: parseInt(e.target.value) })}
                className="input input-bordered"
              />
            </label>

            <label className="form-control">
              <span className="label label-text font-medium">Location</span>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="input input-bordered"
                placeholder="e.g., Remote, NYC"
              />
            </label>
          </div>

          <label className="form-control">
            <span className="label label-text font-medium">Salary Range</span>
            <input
              type="text"
              value={formData.salary_range}
              onChange={(e) => setFormData({ ...formData, salary_range: e.target.value })}
              className="input input-bordered"
              placeholder="e.g., $80k - $120k"
            />
          </label>

          <label className="form-control">
            <span className="label label-text font-medium">Tags (comma-separated)</span>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="input input-bordered"
              placeholder="e.g., JavaScript, React"
            />
          </label>

          <label className="form-control">
            <span className="label label-text font-medium">Expiry Date</span>
            <input
              type="date"
              value={formData.expiry_date}
              onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
              className="input input-bordered"
            />
          </label>

          {loading && (
            <div className="alert alert-info">
              <Loader2 className="animate-spin" size={20} />
              <span>AI is generating job summary... This may take a moment.</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              {loading ? 'Creating...' : 'Create Job'}
            </button>
          </div>
        </form>
      </motion.div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
} 