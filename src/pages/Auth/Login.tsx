import tw from 'tailwind-styled-components';
import '@/styles/button.css';
import '@/styles/input.css';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import AuthNavbar from '@/components/navbar/AuthNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthProvider';
import axios from 'axios';
import { useContext } from 'react';
import toast from 'react-hot-toast';

const FormContainer = tw.div`
flex 
flex-col 
gap-9 
items-center 
justify-center 
w-full
h-screen 
bg-abstract 
bg-cover 
bg-no-repeat
`;

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function Login() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            email: { value: string };
            password: { value: string };
        };
        axios
            .post(VITE_API_ENDPOINT + '/v1/auth/login', target, {
                withCredentials: true,
            })
            .then((response) => {
                setUser(response.data);
                navigate('/teamID');
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    toast.error('Mot de passe invalide');
                } else {
                    throw error;
                }
            });
    };

    return (
        <>
            <AuthNavbar to="/signup" buttonText="Sign Up" />
            <FormContainer>
                <h1 className="text-white">Log in to SPL!T</h1>
                <form name="form-connexion" className="flex flex-col gap-4" method="POST" onSubmit={handleSubmit}>
                    <input name="email" placeholder="Email address" type="text" required className="auth-input" />
                    <input name="password" placeholder="Password" type="password" required className="auth-input" />
                    <button type="submit" className="auth-submit-button">
                        <h3>Connexion</h3>
                    </button>
                </form>
                <Link to="/error" className="flex items-center justify-center gap-[10px]">
                    <ArrowLeftIcon className="h-[20px] w-[20px] fill-white" />
                    <h3 className="text-white">Other log in options</h3>
                </Link>
            </FormContainer>
        </>
    );
}
