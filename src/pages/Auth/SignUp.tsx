import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import '@/styles/button.css';
import '@/styles/input.css';
import AuthNavbar from '@/components/navbar/AuthNavbar';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthProvider';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { getUserInfos } from '@/queries/user.queries';
import toast from 'react-hot-toast';

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

type UserSubmitForm = {
    email: string;
    password: string;
    password_confirmation: string;
};

export default function SignUp() {
    const navigate = useNavigate();
    const { setUser } = useContext(AuthContext);
    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid'),
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match'),
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
            .post(VITE_API_ENDPOINT + '/v1/auth/signup', data, {
                withCredentials: true,
            })
            .then(async () => {
                navigate('/login');
                toast.success('Account created');
            })
            .catch((error) => {
                console.log(error.response.data);
                toast.error('Error during signup');
            });
    };

    return (
        <>
            <AuthNavbar to="/login" buttonText="Log in" />
            <div className="flex h-screen w-full flex-col items-center justify-center gap-9 bg-abstract bg-cover bg-no-repeat">
                <div className="flex flex-col items-center justify-center gap-9 rounded-xl bg-slate-50 bg-opacity-40 p-8 backdrop-blur-sm">
                    <h1 className="text-slate-50">Sign up to SPL!T</h1>
                    <form className="flex flex-col gap-4" method="POST" onSubmit={handleSubmit(onSubmit)}>
                        <div className="text-bold flex flex-col gap-2">
                            <input {...register('email')} placeholder="Email address" type="text" className="auth-input" />
                            <div className="invalid-feedback font-bold text-red-500">{errors.email?.message}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <input {...register('password')} placeholder="Password" type="password" className="auth-input" />
                            <div className="invalid-feedback font-bold text-red-500">{errors.password?.message}</div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <input {...register('password_confirmation')} placeholder="Confirm password" type="password" className="auth-input" />
                            <div className="invalid-feedback font-bold text-red-500">{errors.password_confirmation?.message}</div>
                        </div>
                        <button type="submit" className="auth-submit-button">
                            <h3>Create account</h3>
                        </button>
                    </form>
                </div>
                <Link to="/error" className="flex items-center justify-center gap-[10px]">
                    <ArrowLeftIcon className="h-[20px] w-[20px] fill-white" />
                    <h3 className="text-slate-50">Other log in options</h3>
                </Link>
            </div>
        </>
    );
}
