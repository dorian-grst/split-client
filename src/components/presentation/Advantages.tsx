import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface AdvantagesProps {
    text: string;
    released: boolean;
}

export default function Advantages({ text, released }: AdvantagesProps) {
    const iconClass = `w-3 h-3 text-white`;
    return (
        <div className="flex flex-row items-center justify-center gap-3">
            <div className="rounded-full border p-[2px] text-white">{released ? <CheckIcon className={iconClass} /> : <XMarkIcon className={iconClass} />}</div>
            <p className="text-white">{text}</p>
        </div>
    );
}
