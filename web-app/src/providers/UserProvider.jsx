'use client';

import { createContext, useContext } from 'react';

// Create a Context for user data
const UserContext = createContext(null);

/**
 * UserProvider Component
 * Wraps the app and provides user data to all child components
 * 
 * @param {Object} user - User object from server-side authentication
 * @param {ReactNode} children - Child components that can access user data
 */
export function UserProvider({ user, children }) {
  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

/**
 * useUser Hook
 * Custom hook to access user data in any Client Component
 * 
 * @returns {Object|null} User object if authenticated, null otherwise
 * 
 * @example
 * function MyComponent() {
 *   const user = useUser();
 *   return <div>{user ? user.email : 'Not logged in'}</div>;
 * }
 */
export function useUser() {
  const context = useContext(UserContext);
  // No error throwing - returning null is valid (user not logged in)
  return context;
}
