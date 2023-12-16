import tw from 'tailwind-styled-components';
import { Link } from 'react-router-dom';

const Container = tw.div`
absolute
flex
w-full
justify-between
px-48
pt-11
`;

const LogoContainer = tw.div`
flex
justify-center
items-center
gap-[10px]
`;

const Circle = tw.div`
w-[24px]
h-[24px]
rounded-full
bg-white
`;

interface AuthNavbarProps {
    to: string;
    buttonText: string;
}

export default function AuthNavbar({ to, buttonText }: AuthNavbarProps) {
    return (
        <Container>
            <LogoContainer>
                <Circle />
                <h2 className="font-bold text-white">SPL!T</h2>
            </LogoContainer>
            <Link to={to} className="auth-navbar-button">
                <p>{buttonText}</p>
            </Link>
        </Container>
    );
}
