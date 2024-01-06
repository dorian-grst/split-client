import { Dialog } from '@headlessui/react';
import { PlusCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import '@/styles/input.css';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    title: string;
    titleClass?: string;
    label: string;
    placeholder: string;
    textLeftButton: string;
    textRightButton: string;
    onClickLeftButton?: () => void;
    onClickRightButton?: () => void;
}

export default function AddModal({ isOpen, setIsOpen, title, titleClass, label, placeholder, textLeftButton, textRightButton, onClickLeftButton, onClickRightButton }: ModalProps) {
    let completeButtonRef = useRef(null);
    const [inputs, setInputs] = useState<string[]>(['']);

    const handleAddMemberClick = () => {
        setInputs((prevInputs) => [...prevInputs, '']);
    };

    const handleDeleteButtonClick = (index: number) => {
        setInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));
    };

    return (
        <Dialog initialFocus={completeButtonRef} open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 w-min">
            <div className="fixed inset-0 bg-gray-950/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="rounded-lg border border-light-gray bg-white">
                    <div className="flex flex-col gap-[10px] border-b border-light-gray p-8">
                        <h1 className={titleClass}>{title}</h1>
                        <h3 className="text-gray-950">{label}</h3>
                        {inputs.map((input, index) => (
                            <div key={index} className="flex flex-row gap-[10px]">
                                <input
                                    value={input}
                                    onChange={(e) =>
                                        setInputs((prevInputs) => {
                                            const newInputs = [...prevInputs];
                                            newInputs[index] = e.target.value;
                                            return newInputs;
                                        })
                                    }
                                    placeholder={placeholder}
                                    className="form-input"
                                />
                                <button onClick={() => handleDeleteButtonClick(index)} className="delete-modal-button">
                                    <XMarkIcon className="h-[20px] w-[20px]" />
                                </button>
                            </div>
                        ))}
                        <button onClick={handleAddMemberClick} className="add-modal-button">
                            <PlusCircleIcon className="h-[20px] w-[20px]" />
                            <h3 className="leading-none">Add member</h3>
                        </button>
                    </div>
                    <div className="flex flex-row justify-between p-8">
                        <button onClick={onClickLeftButton} className="cancel">
                            {textLeftButton}
                        </button>
                        <button ref={completeButtonRef} onClick={onClickRightButton} className="next">
                            {textRightButton}
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
