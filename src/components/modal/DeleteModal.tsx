import { Dialog } from '@headlessui/react';
import { useRef } from 'react';
import '@/styles/input.css';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    title: string;
    titleClass?: string;
    label: string;
    textLeftButton: string;
    textRightButton: string;
    onClickLeftButton?: () => void;
    onClickRightButton?: () => void;
}

export default function DeleteModal({
    isOpen,
    setIsOpen,
    title,
    titleClass,
    label,
    textLeftButton,
    textRightButton,
    onClickLeftButton,
    onClickRightButton,
}: ModalProps) {
    const completeButtonRef = useRef(null);

    return (
        <Dialog initialFocus={completeButtonRef} open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 w-min">
            <div className="fixed inset-0 bg-gray-950/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="rounded-lg border border-light-gray bg-slate-50 max-w-[550px]">
                    <div className="flex flex-col gap-[10px] border-b border-light-gray p-8">
                        <h1 className={titleClass}>{title}</h1>
                        <p className="text-gray-950">{label}</p>
                    </div>
                    <div className="flex flex-row justify-between p-8">
                        <button onClick={onClickLeftButton} className="cancel">
                            {textLeftButton}
                        </button>
                        <button ref={completeButtonRef} onClick={onClickRightButton} className="next bg-red-500 hover:bg-red-600">
                            {textRightButton}
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
