import React from 'react';

interface ButtonMenuProps {
    text: string;
    onClick: () => void;
    additionalClasses?: string;
    textClasses?: string;
}

const AlertDropdown = React.forwardRef<HTMLButtonElement, ButtonMenuProps>(({ text, onClick, additionalClasses, textClasses }, ref) => {
    const buttonClasses = `flex w-full cursor-default flex-row items-center justify-between font-medium rounded-lg px-3 py-2 hover:bg-light-gray ${additionalClasses || ''}`;

    return (
        <div className={buttonClasses} onClick={onClick}>
            <div className="flex flex-row items-center justify-center gap-5">
                <h3 className={`text-left ${textClasses}`}>{text}</h3>
                <div className="flex flex-row items-center justify-center gap-2">
                    <button className="cancel border-green-primary px-3 py-2 text-green-primary">y</button>
                    <button className="cancel border-purple-primary px-3  py-2 text-purple-primary ">n</button>
                </div>
            </div>
        </div>
    );
});

export default AlertDropdown;
