import { Link } from 'react-router-dom';
import logo from '@/assets/white_logo.svg';

interface AuthNavbarProps {
    to: string;
    buttonText: string;
}

export default function AuthNavbar({ to, buttonText }: AuthNavbarProps) {
    return (
        <div className="absolute flex w-full justify-between px-48 pt-11">
            <Link to="/" className="flex items-center justify-center gap-3">
                <img src={logo} alt="logo" />
                <h2 className="font-bold text-slate-50">SPL!T</h2>
            </Link>
            <Link to={to} className="auth-navbar-button">
                <p>{buttonText}</p>
            </Link>
        </div>
    );
}
