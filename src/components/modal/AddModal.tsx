import { Dialog } from '@headlessui/react';
import { DocumentDuplicateIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import '@/styles/input.css';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { generateInvitation } from '@/context/SplitProvider';
import { useParams } from 'react-router-dom';

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    title: string;
    titleClass?: string;
    label: string;
    placeholder: string;
    textLeftButton: string;
    textRightButton?: string;
    onClickLeftButton?: () => void;
    onClickRightButton?: () => void;
}

export default function AddModal({ isOpen, setIsOpen, title, titleClass, label, placeholder, textLeftButton, textRightButton, onClickLeftButton, onClickRightButton }: ModalProps) {
    const [isGenerateCodeClicked, setIsGenerateCodeClicked] = useState(false);
    const [invitationToken, setInvitationToken] = useState('');
    const { id } = useParams();

    const handleGenerateCodeClick = () => {
        if (id) {
            generateInvitation(id).then((data) => {
                toast.success('Invitation code generated successfully');
                setIsGenerateCodeClicked(true);
                setInvitationToken(data.invitation.token);
            });
        }
    };

    const handleCopyToClipboard = () => {
        navigator.clipboard
            .writeText(invitationToken)
            .then(() => toast.success('Invitation copied to clipboard'))
            .catch((error) => console.error('Failed to copy to clipboard:', error));
    };

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 w-min">
            <div className="fixed inset-0 bg-gray-950/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="rounded-lg border border-light-gray bg-white">
                    <div className="flex flex-col gap-[10px] border-b border-light-gray p-8">
                        <h1 className={titleClass}>{title}</h1>
                        <h3 className="text-gray-950">{label}</h3>
                        {isGenerateCodeClicked ? (
                            <div className="flex flex-row gap-[10px]">
                                <input value={invitationToken} placeholder={placeholder} readOnly className="form-input" />
                                <button onClick={handleCopyToClipboard} className="delete-modal-button">
                                    <DocumentDuplicateIcon className="h-[20px] w-[20px]" />
                                </button>
                            </div>
                        ) : (
                            <button className="generate-modal-button" onClick={handleGenerateCodeClick}>
                                <ArrowPathIcon className="h-[16px] w-[16px]" />
                                <h3 className="leading-none">Generate an invite code</h3>
                            </button>
                        )}
                    </div>
                    <div className="flex flex-row justify-between p-8">
                        <button onClick={onClickLeftButton} className="cancel">
                            {textLeftButton}
                        </button>
                        {textRightButton && (
                            <button onClick={onClickRightButton} className="next">
                                {textRightButton}
                            </button>
                        )}
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
