import { ArrowLeftIcon } from '@heroicons/react/20/solid';
import tw from 'tailwind-styled-components';
import '@/styles/button.css';
import '@/styles/input.css';
import AuthNavbar from '@/components/navbar/AuthNavbar';
import { Link } from 'react-router-dom';

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

export default function SignUp() {
    return (
        <>
            <AuthNavbar to="/login" buttonText="Log in" />
            <FormContainer>
                <h1 className="text-white">Sign up to SPL!T</h1>
                <form name="form-connexion" className="flex flex-col gap-4">
                    <input name="email" placeholder="Email address" type="text" className="auth-input" />
                    <input name="password" placeholder="Password" type="text" className="auth-input" />
                    <input name="confirm_password" placeholder="Confirm password" type="text" className="auth-input" />
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
