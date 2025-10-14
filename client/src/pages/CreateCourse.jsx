import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormCard from '../components/FormCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CreateCourse = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleCreate = async () => {
        try {
            const token = localStorage.getItem('adminToken');
            await axios.post(`${API_BASE_URL}/admin/course`, 
                { title, description, price: Number(price), imageUrl },
                { headers: { token } }
            );
            navigate('/admin/dashboard');
        } catch (error) {
            setMessage(error.response?.data?.message || "Failed to create course.");
        }
    };

    return (
        <FormCard title="Create New Course" buttonText="Create Course" onSubmit={handleCreate} message={message}>
            <input className="w-full p-2 border rounded" type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
            <input className="w-full p-2 border rounded" type="text" placeholder="Description" onChange={e => setDescription(e.target.value)} />
            <input className="w-full p-2 border rounded" type="number" placeholder="Price" onChange={e => setPrice(e.target.value)} />
            <input className="w-full p-2 border rounded" type="text" placeholder="Image URL" onChange={e => setImageUrl(e.target.value)} />
        </FormCard>
    );
};

export default CreateCourse;