import { Link } from 'react-router-dom';

const Landing = () => (
    <div className="h-[150vh] bg-gradient-to-b from-background to-muted dark:from-background dark:to-background/60 transition-colors duration-500">
        <main className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-5xl font-extrabold leading-tight mb-4">Unlock Your Potential with LearnIt</h1>
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

