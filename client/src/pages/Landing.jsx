import { Link } from 'react-router-dom';

const Landing = () => (
    <div className="bg-gray-50">
        <main className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-4">Unlock Your Potential with LearnIt</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">Discover a world of knowledge with our expert-led courses. Start your learning journey today.</p>
            <div>
                <Link to="/courses" className="bg-blue-500 text-white text-lg font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                    Explore Courses
                </Link>
            </div>
        </main>
    </div>
);

export default Landing;

