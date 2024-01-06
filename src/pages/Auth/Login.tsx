import '@/styles/button.css';
import '@/styles/input.css';
import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import AuthNavbar from '@/components/navbar/AuthNavbar';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, getUserInfos } from '@/context/AuthProvider';
import axios from 'axios';
import { useContext } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

type UserSubmitForm = {
    email: string;
    password: string;
};

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function Login() {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid'),
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data: UserSubmitForm) => {
        axios
            .post(VITE_API_ENDPOINT + '/v1/auth/login', data, {
                withCredentials: true,
            })
            .then(async () => {
                const userInfos = await getUserInfos();
                setUser(userInfos);
                navigate('/dashboard');
            })
            .catch((error) => {
                toast.error('Error during login');
                throw error;
            });
    };

    return (
        <>
            <AuthNavbar to="/signup" buttonText="Sign Up" />
            <div className="flex h-screen w-full flex-col items-center justify-center gap-9 bg-abstract bg-cover bg-no-repeat">
                <div className="flex flex-col items-center justify-center gap-9 rounded-xl bg-white bg-opacity-40 p-8 backdrop-blur-sm">
                    <h1 className="text-white">Log in to SPL!T</h1>
                    <form name="form-connexion" className="flex flex-col gap-4" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-bold flex flex-col gap-2">
                            <input {...register('email')} placeholder="Email address" type="text" className="auth-input" />
                            <div className="invalid-feedback font-bold text-red-500">{errors.email?.message}</div>
                        </div>
                        <div className="text-bold flex flex-col gap-2">
                            <input {...register('password')} placeholder="Password" type="password" className="auth-input" />
                            <div className="invalid-feedback font-bold text-red-500">{errors.password?.message}</div>
                        </div>
                        <button type="submit" className="auth-submit-button">
                            <h3>Connexion</h3>
                        </button>
                    </form>
                </div>
                <Link to="/error" className="flex items-center justify-center gap-[10px]">
                    <ArrowLeftIcon className="h-[20px] w-[20px] fill-white" />
                    <h3 className="text-white">Other log in options</h3>
                </Link>
            </div>
        </>
    );
}
