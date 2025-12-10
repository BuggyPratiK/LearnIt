import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '../store/userStore';
import CourseCard from '../components/CourseCard';
import Loading from '../components/Loading';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const PurchasedCourses = () => {
    const [courses, setCourses] = useState(null);
    const navigate = useNavigate();
    const { logout } = useUserStore();
    const token = localStorage.getItem('userToken');

    useEffect(() => {
        if (!token) {
            navigate('/signin');
            return;
        }

        const fetchPurchased = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/user/purchases`, {
                    headers: { token }
                });
                setCourses(response.data.courseData);
            } catch (error) {
                console.error("Error fetching purchased courses:", error);
                // If token is invalid or expired, log the user out
                logout();
                navigate('/signin');
            }
        };

        fetchPurchased();
    }, [navigate, token, logout]);

    if (courses === null) return <Loading />;
    if (courses.length === 0) {
        return (
            <div className="text-center p-10 min-h-screen bg-background transition-colors duration-300">
                <h1 className="text-3xl font-bold mb-4">My Learning</h1>
                <p className="text-gray-600 dark:text-gray-300">You haven't purchased any courses yet.</p>
                <Link to="/courses" className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition duration-300">Explore Courses</Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen p-8 bg-background transition-colors duration-300">
            <h1 className="text-4xl font-bold mb-20 text-center">My Purchased Courses</h1>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map(course => (
                    <CourseCard key={course._id} course={course} onClick={() => alert("You can start learning now!")} />
                ))}
            </div>
        </div>
    );
};

export default PurchasedCourses;

