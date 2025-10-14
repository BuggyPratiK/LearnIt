import { create } from 'zustand';

const useUserStore = create((set) => ({
  userEmail: localStorage.getItem('userEmail') || null,
  isLoading: true,
  setUser: (email) => {
    set({ userEmail: email, isLoading: false });
  },
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    set({ userEmail: null });
  },
  initialize: () => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('userEmail');
    if (token && email) {
      set({ userEmail: email, isLoading: false });
    } else {
      set({ isLoading: false });
    }
  }
}));

// Initialize the store on application load
useUserStore.getState().initialize();

export default useUserStore;