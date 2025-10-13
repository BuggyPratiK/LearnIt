import { create } from 'zustand';

// A centralized store for managing user authentication state.
const useUserStore = create((set) => ({
    isLoading: true, // To check if auth state has been loaded initially
    userEmail: null,
    setUser: (email) => set({ userEmail: email, isLoading: false }),
    setLoading: (loading) => set({ isLoading: loading }),
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userEmail');
        set({ userEmail: null, isLoading: false });
    },
}));

export default useUserStore;

