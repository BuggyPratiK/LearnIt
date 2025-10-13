import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import Loading from '../components/Loading';

const API_BASE_URL = 'http://localhost:3000/api/v1';

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
            }
        };
        fetchCourses();
    }, []);

    if (courses === null) return <Loading />;

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

