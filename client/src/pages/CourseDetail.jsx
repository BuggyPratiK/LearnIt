import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '../store/userStore';
import Loading from '../components/Loading';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CourseDetail = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const { userEmail } = useUserStore();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                // Since there is no /course/:id route, we fetch all and find the one.
                const response = await axios.get(`${API_BASE_URL}/course/preview`);
                setCourse(response.data.courses.find(c => c._id === courseId));
            } catch (error) {
                console.error("Error fetching course details:", error);
            }
        };
        fetchCourse();
    }, [courseId]);

    const handlePurchase = async () => {
        if (!userEmail) {
            navigate('/signin');
            return;
        }
        try {
            await axios.post(`${API_BASE_URL}/course/purchase`,
                { courseId: course._id },
                { headers: { 'token': localStorage.getItem('userToken') } }
            );
            alert('Course purchased successfully!');
            navigate('/purchased');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to purchase course.');
        }
    };

    if (!course) return <Loading />;

    return (
        <div className="container mx-auto p-8">
            <div className="p-8 mt-8 bg-gray-300 dark:bg-gray-900 shadow-2xl rounded-xl overflow-hidden md:flex transform hover:-translate-y-2  transition-transform-colors duration-300">
                <img src={course.imageUrl} alt={course.title} className="md:w-1/2 object-cover transition duration-300 ease-in-out hover:scale-105" />
                <div className="p-8 md:w-1/2 flex flex-col justify-center">
                    <h1 className="text-4xl font-bold mb-4">{course.title}</h1>
                    <p className="text-gray-300 mb-6">{course.description}</p>
                    <p className="text-3xl font-bold text-blue-600 mb-6">${course.price}</p>
                    <button onClick={handlePurchase} className="w-full bg-green-500 dark:bg-green-600 text-white text-xl/7 font-bold  py-3 px-6 rounded-lg hover:bg-green-600 dark:hover:bg-green-700 transition duration-300">
                        {userEmail ? 'Purchase Now' : 'Sign In to Purchase'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;

