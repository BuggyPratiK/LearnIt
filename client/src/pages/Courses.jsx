import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import Loading from '../components/Loading';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Courses = () => {
    const [courses, setCourses] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/course/preview`);
                setCourses(response.data.courses);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setCourses([]); // Set to empty array on error to stop loading
            }
        };
        fetchCourses();
    }, []);

    // Still loading
    if (courses === null) {
        return <Loading />;
    }

    // Finished loading, but no courses
    if (courses.length === 0) {
        return (
            <div className="text-center p-10">
                <h1 className="text-3xl font-bold mb-4">No Courses Found</h1>
                <p className="text-gray-600">Please check back later or contact an admin to add courses.</p>
                <Link to="/" className="mt-4 inline-block bg-blue-500 text-white px-6 py-2 rounded-lg">Go Home</Link>
            </div>
        );
    }

    // Finished loading and there are courses
    return (
        <div className="bg-gray-100 min-h-screen p-8">
            <h1 className="text-4xl font-bold mb-8 text-center">Explore Our Courses</h1>
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {courses.map(course => (
                    <CourseCard key={course._id} course={course} onClick={() => navigate(`/course/${course._id}`)} />
                ))}
            </div>
        </div>
    );
};

export default Courses;