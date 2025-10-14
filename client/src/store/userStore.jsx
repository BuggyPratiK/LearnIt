import { create } from 'zustand';

const useUserStore = create((set) => ({
  userEmail: null,
  isLoading: true, // Start with loading true

  // A single login function for both users and admins
  login: (email, tokenType) => {
    // We store a simple flag to know if a user of that type is logged in.
    // The actual JWT token is still stored separately by the sign-in components.
    localStorage.setItem(tokenType, 'true'); 
    localStorage.setItem('userEmail', email);
    set({ userEmail: email, isLoading: false });
  },

  // A single logout function that clears all possible session types
  logout: () => {
    localStorage.removeItem('userToken'); // The flag for user
    localStorage.removeItem('adminToken'); // The flag for admin
    localStorage.removeItem('token'); // The user's actual JWT
    localStorage.removeItem('adminToken'); // The admin's actual JWT (in case it's named this)
    localStorage.removeItem('userEmail');
    set({ userEmail: null });
  },

  // Check for either token on application startup
  initialize: () => {
    const userToken = localStorage.getItem('userToken');
    const adminToken = localStorage.getItem('adminToken');
    const email = localStorage.getItem('userEmail');
    if ((userToken || adminToken) && email) {
      set({ userEmail: email, isLoading: false });
    } else {
      set({ isLoading: false }); // Finish loading even if not logged in
    }
  }
}));

// Initialize the store once when the app loads to check for existing sessions
useUserStore.getState().initialize();

export default useUserStore;

