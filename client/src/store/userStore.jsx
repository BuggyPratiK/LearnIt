import { create } from 'zustand';

/*
  Zustand store for managing authentication (both user and admin).
  This store:
  - Handles login/logout for both user and admin roles.
  - Persists user info and tokens in localStorage.
  - Automatically checks if a session exists on app startup.
*/

const useUserStore = create((set) => ({
  // State variables
  userEmail: null,  // Stores currently logged-in user/admin email.
  role: null,       // Can be either "user" or "admin".
  isLoading: true,  // While checking stored sessions during app start.

  // -----------------------------
  // Login function
  // -----------------------------
  // Called after a successful sign-in request.
  // Stores JWT token and user info in localStorage.
  // 'role' determines which type of token is stored (userToken/adminToken).
  // Updates the Zustand state accordingly.
  login: (email, role, token) => {
    localStorage.setItem(`${role}Token`, token);  // e.g. "adminToken" or "userToken"
    localStorage.setItem('userEmail', email);
    localStorage.setItem('role', role);

    // Update Zustand store state
    set({ userEmail: email, role, isLoading: false });
  },

  // -----------------------------
  // Logout function
  // -----------------------------
  // Clears all localStorage items related to login.
  // Works for both user and admin sessions.
  logout: () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('role');

    // Reset Zustand state
    set({ userEmail: null, role: null });
  },

  // -----------------------------
  // Initialize function
  // -----------------------------
  // Called automatically when the app starts (see bottom of file).
  // Checks if there's a valid session stored in localStorage.
  // If found, sets userEmail and role so the UI knows you're logged in.
  // If not found, marks loading as complete anyway.
  initialize: () => {
    const email = localStorage.getItem('userEmail');
    const role = localStorage.getItem('role');
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');

    // If a token + email + role exist, restore the session.
    if ((userToken || adminToken) && email && role) {
      set({ userEmail: email, role, isLoading: false });
    } else {
      // No session found, mark as finished loading
      set({ isLoading: false });
    }
  },
}));


// Run initialize() immediately when the store is first imported.
// This ensures session restoration happens on app startup.
useUserStore.getState().initialize();

export default useUserStore;
