import { Link, useNavigate } from 'react-router-dom';
import useUserStore from '../store/userStore';

const Appbar = () => {
    const { userEmail, isLoading, logout } = useUserStore();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(); // Call the unified logout function
        navigate('/'); // Redirect to homepage after logout
    };

    // Don't render anything until the store has checked for existing tokens
    if (isLoading) {
        return <header className="bg-white shadow-md"><nav className="container mx-auto px-6 py-4 h-[68px]"></nav></header>;
    }

    return (
        <header className="bg-white shadow-md sticky top-0 z-50">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800">LearnIt</Link>
                <div className="flex items-center space-x-4">
                    <Link to="/courses" className="text-gray-600 hover:text-blue-500 transition duration-300">Courses</Link>
                    {userEmail ? (
                        <>
                            <Link to="/purchased" className="text-gray-600 hover:text-blue-500 transition duration-300">My Courses</Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/signin" className="text-gray-600 hover:text-blue-500 transition duration-300">Sign In</Link>
                            <Link to="/signup" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Appbar;
