import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
    const [courses, setCourses] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminCourses = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const response = await axios.get(`${API_BASE_URL}/admin/course/bulk`, {
                    headers: { token }
                });
                setCourses(response.data.courses);
            } catch (error) {
                console.error("Failed to fetch admin courses:", error);
                navigate('/admin/signin'); // Redirect if not authenticated
            }
        };
        fetchAdminCourses();
    }, [navigate]);

    if (courses === null) return <Loading />;

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">My Courses</h1>
                <button 
                    onClick={() => navigate('/admin/create-course')}
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                    + Create New Course
                </button>
            </div>
            {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* You can reuse your CourseCard component here */}
                    {courses.map(course => (
                        <div key={course._id} className="bg-white p-4 rounded shadow">
                            <h2 className="font-bold">{course.title}</h2>
                            <p>${course.price}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>You have not created any courses yet.</p>
            )}
        </div>
    );
};

export default AdminDashboard;