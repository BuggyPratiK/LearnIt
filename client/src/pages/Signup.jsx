import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import FormCard from '../components/FormCard';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/signup`, { firstName, lastName, email, password });
            setMessage(`${response.data.message}. Redirecting to sign in...`);
            setTimeout(() => navigate('/signin'), 2000);
        } catch (error) {
            setMessage(error.response?.data?.message || "An error occurred during signup.");
        }
    };

    return (
        <FormCard title="Create an Account" buttonText="Sign Up" onSubmit={handleSignup} message={message}>
            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="First Name" onChange={e => setFirstName(e.target.value)} />
            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="text" placeholder="Last Name" onChange={e => setLastName(e.target.value)} />
            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
             <p className="text-center text-sm text-gray-600">
                Already have an account? <Link to="/signin" className="text-blue-500 hover:underline">Sign In</Link>
            </p>
        </FormCard>
    );
};

export default Signup;

