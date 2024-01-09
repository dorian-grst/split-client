import React from 'react';
import { TrashIcon, CheckIcon } from '@heroicons/react/24/outline';

interface ButtonMenuProps {
    text: string;
    onClick: () => void;
    additionalClasses?: string;
    textClasses?: string;
}

const AlertDropdown = React.forwardRef<HTMLButtonElement, ButtonMenuProps>(({ text, onClick, additionalClasses, textClasses }, ref) => {
    const buttonClasses = `flex w-full cursor-default flex-row items-center justify-between font-medium rounded-lg px-3 py-2 hover:bg-slate-100 ${additionalClasses || ''}`;

    return (
        <div className={buttonClasses} onClick={onClick}>
            <div className="flex flex-row items-center justify-center gap-5">
                <h3 className={`text-left text-gray-950 ${textClasses}`}>{text}</h3>
                <div className="flex flex-row items-center justify-center gap-2">
                    <button className="cancel border-green-primary px-2 py-1 text-green-primary">
                        <CheckIcon className="h-4 w-4" />
                    </button>
                    <button className="cancel border-purple-primary px-2 py-1 text-purple-primary ">
                        <TrashIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
});

export default AlertDropdown;
