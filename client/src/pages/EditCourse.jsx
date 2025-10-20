import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import FormCard from '../components/FormCard';
import Loading from '../components/Loading';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const EditCourse = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        const getCourseDetails = async () => {
            if (!token) {
                navigate('/admin/signin');
                return;
            }
            try {
                const response = await axios.get(`${API_BASE_URL}/admin/course/bulk`, { headers: { token } });
                const courseToEdit = response.data.courses.find(c => c._id === courseId);
                if (courseToEdit) {
                    setCourse(courseToEdit);
                } else {
                    setMessage("Course not found.");
                }
            } catch (error) {
                setMessage("Failed to fetch course details.");
            }
        };
        getCourseDetails();
    }, [courseId, token, navigate]);

    const handleUpdate = async () => {
        try {
            await axios.put(`${API_BASE_URL}/admin/course`, 
                { ...course, courseId: course._id },
                { headers: { token } }
            );
            navigate('/admin/dashboard');
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to update course.");
        }
    };

    const handleChange = (e) => {
        setCourse({ ...course, [e.target.name]: e.target.value });
    };
    
    if (!course) return <Loading />;

    return (
        <FormCard title="Edit Course" buttonText="Save Changes" onSubmit={handleUpdate} message={message}>
            <input name="title" className="dark:bg-gray-700 dark:text-white dark:placeholder:text-white w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Title" value={course.title} onChange={handleChange} />
            <input name="description" className="dark:bg-gray-700 dark:text-white dark:placeholder:text-white w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Description" value={course.description} onChange={handleChange} />
            <input name="price" className="dark:bg-gray-700 dark:text-white dark:placeholder:text-white w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="number" placeholder="Price" value={course.price} onChange={handleChange} />
            <input name="imageUrl" className="dark:bg-gray-700 dark:text-white dark:placeholder:text-white w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Image URL" value={course.imageUrl} onChange={handleChange} />
        </FormCard>
    );
};

export default EditCourse;

