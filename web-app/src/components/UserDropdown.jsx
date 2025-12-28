'use client';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, LayoutDashboard, Briefcase, Calendar, Settings, LogOut } from 'lucide-react';

export default function UserDropdown({ user }) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/signin';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const getInitials = (name, email) => {
    if (name) {
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email[0].toUpperCase();
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 h-10 rounded-full bg-primary text-primary-content flex items-center justify-center">
          <span className="text-sm font-semibold">{getInitials(user.name, user.email)}</span>
        </div>
      </div>
      
      <motion.ul
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.15 }}
        tabIndex={0}
        className="menu dropdown-content bg-base-100 rounded-box z-50 mt-3 w-56 p-2 shadow border"
      >
        <li className="menu-title">
          <div className="flex gap-2">
            <User size={16} />
            <div>
              <div className="font-semibold">{user.name || 'User'}</div>
              <div className="text-xs opacity-70">{user.email}</div>
            </div>
          </div>
        </li>
        
        <div className="divider my-1"></div>
        
        {/* Menu Items */}
        <li>
          <a onClick={() => router.push('/dashboard')} className="gap-3">
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </a>
        </li>
        <li>
          <a onClick={() => router.push('/dashboard/recruitment')} className="gap-3">
            <Briefcase size={18} />
            <span>Recruitment</span>
          </a>
        </li>
        <li>
          <a onClick={() => router.push('/dashboard/scheduling')} className="gap-3">
            <Calendar size={18} />
            <span>Scheduling</span>
          </a>
        </li>
        <li>
          <a onClick={() => router.push('/dashboard/settings')} className="gap-3">
            <Settings size={18} />
            <span>Settings</span>
          </a>
        </li>
        
        <div className="divider my-1"></div>
        
        <li>
          <a onClick={handleLogout} className="text-error gap-3">
            <LogOut size={18} />
            <span>Logout</span>
          </a>
        </li>
      </motion.ul>
    </div>
  );
}