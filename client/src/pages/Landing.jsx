import { Link } from 'react-router-dom';

const Landing = () => (
    <div className="h-[120vh] bg-gradient-to-tl from-background via-blue-300/50 to-blue-500/50 dark:from-gray-900/80 dark:via-gray-950/60 dark:to-gray-950 transition-colors duration-500">
        <main className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-500 to-purple-700 bg-clip-text text-transparent leading-tight mb-4">Unlock Your Potential with LearnIt</h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">Discover a world of knowledge with our expert-led courses. Start your learning journey today.</p>
            <div>
                <Link to="/courses" className="bg-primary text-primary-foreground text-lg font-semibold px-8 py-3 rounded-lg shadow-md hover:opacity-90 transition duration-300">
                    Explore Courses
                </Link>
            </div>
        </main>
    </div>
);

export default Landing;

