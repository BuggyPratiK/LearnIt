import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useUserStore from '../store/userStore';
import FormCard from '../components/FormCard';

const API_BASE_URL = 'http://localhost:3000/api/v1';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setUser } = useUserStore();
    const navigate = useNavigate();

    const handleSignin = async () => {
        try {
            const response = await axios.post(`${API_BASE_URL}/user/signin`, { email, password });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userEmail', email); // Workaround: store email on login
            setUser(email);
            navigate('/courses');
        } catch (error) {
            setMessage(error.response?.data?.message || "Invalid credentials.");
        }
    };

    return (
        <FormCard title="Sign In to LearnIt" buttonText="Sign In" onSubmit={handleSignin} message={message}>
            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <p className="text-center text-sm text-gray-600">
                New here? <Link to="/signup" className="text-blue-500 hover:underline">Create an account</Link>
            </p>
        </FormCard>
    );
};

export default Signin;

