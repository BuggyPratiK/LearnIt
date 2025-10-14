import { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import FormCard from '../components/FormCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const AdminSignin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            // Hitting the admin signin endpoint
            const response = await axios.post(`${API_BASE_URL}/admin/signin`, { email, password });
            // Store the admin token separately
            localStorage.setItem('adminToken', response.data.token);
            navigate('/admin/dashboard'); // Redirect to the new admin dashboard
        } catch (error) {
            setMessage(error.response?.data?.message || "Invalid credentials.");
        }
    };

    return (
        <FormCard title="Admin Sign In" buttonText="Sign In" onSubmit={handleSignin} message={message}>
            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <p className="text-center text-sm text-gray-600">
            Need to create a new admin account? <Link to="/admin/signup" className="text-blue-500 hover:underline">Sign Up</Link>
            </p>
        </FormCard>
    );
};

export default AdminSignin;