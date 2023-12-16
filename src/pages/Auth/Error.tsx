import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';

const Container = tw.div`
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
text-white
`;

export default function Error() {
    return (
        <Container>
            <h1>Not implemented yet :/</h1>
            <Link to="/login" className="flex items-center justify-center gap-[10px]">
                <p>Go back</p>
                <ArrowUturnLeftIcon className="h-[14px] w-[14px] fill-white" />
            </Link>
        </Container>
    );
}
