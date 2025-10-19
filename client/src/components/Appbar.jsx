import { Link, useNavigate } from 'react-router-dom';
import { ModeToggle } from "./ModeToggle";
import useUserStore from '../store/userStore';

const Appbar = () => {
  const { userEmail, isLoading, logout } = useUserStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isLoading) {
    return (
      <header className="bg-background shadow-md">
        <nav className="container mx-auto px-6 py-4 h-[68px]"></nav>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg text-foreground transition-colors duration-300">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Title */}
        <Link
          to="/"
          className="text-2xl font-bold text-foreground hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
        >
          LearnIt
        </Link>

        {/* Links + Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/courses"
            className="text-foreground/80 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
          >
            Courses
          </Link>

          {userEmail ? (
            <>
              <Link
                to="/purchased"
                className="text-foreground/80 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                My Courses
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-foreground/80 hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* Theme Toggle */}
          <ModeToggle />
        </div>
      </nav>
    </header>
  );
};

export default Appbar;
