import React from 'react';

interface ButtonMenuProps {
    text: string;
    icon?: React.ReactElement | null;
    onClick: () => void;
    additionalClasses?: string;
    textClasses?: string;
    iconClasses?: string;
}

const ButtonDropdown = React.forwardRef<HTMLButtonElement, ButtonMenuProps>(({ text, icon, onClick, additionalClasses, textClasses, iconClasses }, ref) => {
    const buttonClasses = `flex w-full flex-row items-center justify-between font-medium text-gray-950 rounded-lg px-3 py-2 hover:bg-light-gray ${additionalClasses || ''}`;

    return (
        <button ref={ref} className={buttonClasses} onClick={onClick}>
            <h3 className={textClasses}>{text}</h3>
            {icon && React.cloneElement(icon, { className: `h-[20px] w-[20px] ${iconClasses || ''}` })}
        </button>
    );
});

export default ButtonDropdown;
