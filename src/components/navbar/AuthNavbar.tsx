import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';
import logo from '@/assets/white_logo.svg';

const Container = tw.div`
absolute
flex
w-full
justify-between
px-48
pt-11
`;

interface AuthNavbarProps {
    to: string;
    buttonText: string;
}

export default function AuthNavbar({ to, buttonText }: AuthNavbarProps) {
    return (
        <Container>
            <Link to="/" className="flex items-center justify-center gap-3">
                <img src={logo} alt="logo" />
                <h2 className="font-bold text-white">SPL!T</h2>
            </Link>
            <Link to={to} className="auth-navbar-button">
                <p>{buttonText}</p>
            </Link>
        </Container>
    );
}
