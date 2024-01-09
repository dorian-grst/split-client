import { Link } from 'react-router-dom';
import { ArrowUturnLeftIcon } from '@heroicons/react/20/solid';

export default function Error() {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-9 bg-abstract bg-cover bg-no-repeat text-slate-50">
            <h1>Not implemented yet :/</h1>
            <Link to="/login" className="flex items-center justify-center gap-[10px]">
                <p>Go back</p>
                <ArrowUturnLeftIcon className="h-[14px] w-[14px] fill-white" />
            </Link>
        </div>
    );
}
