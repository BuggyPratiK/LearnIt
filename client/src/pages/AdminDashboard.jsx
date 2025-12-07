import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../components/Loading';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminDashboard = () => {
    const [courses, setCourses] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    // This function will be reused to refresh the course list after a delete
    const fetchAdminCourses = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/admin/course/bulk`, {
                headers: { token }
            });
            setCourses(response.data.courses);
        } catch (error) {
            console.error("Failed to fetch admin courses:", error);
            navigate('/admin/signin'); // Redirect if not authenticated
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/admin/signin');
        } else {
            fetchAdminCourses();
        }
    }, [navigate, token]);

    // --- NEW: Handle Delete Functionality ---
    const handleDelete = async (courseId) => {
        // Use a confirmation dialog to prevent accidental deletion
        if (window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
            try {
                await axios.delete(`${API_BASE_URL}/admin/course/${courseId}`, {
                    headers: { token }
                });
                // After successful deletion, refresh the course list to update the UI
                fetchAdminCourses();
            } catch (error) {
                console.error("Failed to delete course:", error);
                alert("Failed to delete the course. Please try again.");
            }
        }
    };

    if (courses === null) return <Loading />;

    return (
        <div className="container mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl mb-20 mt-5 font-bold">Admin Dashboard</h1>
                <button
                    onClick={() => navigate('/admin/create-course')}
                    className="bg-green-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-800 transition duration-300">
                    + Create New Course
                </button>
            </div>
            {courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {courses.map(course => (
                        // --- UPDATED: Course card with more details and buttons ---
                        <div key={course._id} className="bg-card text-card-foreground dark:bg-gray-900 rounded-xl shadow-xl overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 border border-border cursor-pointer">
                            <img src={course.imageUrl} alt={course.title} className="w-full h-48 object-cover" onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/e2e8f0/e2e8f0?text=Image" }} />
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">{course.title}</h2>
                                <p className="text-xl font-semibold text-blue-500 dark:text-blue-400">${course.price}</p>
                                <div className="flex justify-end space-x-2">
                                    <button
                                        onClick={() => navigate(`/admin/edit-course/${course._id}`)}
                                        className="bg-blue-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(course._id)}
                                        className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300">
                                        Delete
                                    </button>
                                </div>
                            </div>
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
