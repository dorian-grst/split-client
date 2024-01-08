import { Dialog } from '@headlessui/react';
import { DocumentDuplicateIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import '@/styles/input.css';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { deleteInvitationByToken, generateInvitation, getInvitationsBySplitId } from '@/queries/split.queries';

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

interface Invitation {
    id: number;
    splitId: string;
    userId: number;
    token: string;
}

export default function AddModal({ isOpen, setIsOpen, title, titleClass, label, placeholder, textLeftButton, textRightButton, onClickLeftButton, onClickRightButton }: ModalProps) {
    const [isGenerateCodeClicked, setIsGenerateCodeClicked] = useState(false);
    const [invitationToken, setInvitationToken] = useState('');
    const [invitationsData, setInvitationsData] = useState<Invitation[]>([]); // Utilisation du type Invitation
    const { id } = useParams();

    const handleCopyToClipboard = (token: string) => {
        navigator.clipboard
            .writeText(token)
            .then(() => toast.success('Invitation copied to clipboard'))
            .catch((error) => console.error('Failed to copy to clipboard:', error));
    };

    const [refreshEffect, setRefreshEffect] = useState(false);

    const handleGenerateCodeClick = () => {
        if (id) {
            generateInvitation(id).then((data) => {
                toast.success('Invitation code generated successfully');
                setIsGenerateCodeClicked(true);
                setInvitationToken(data.invitation.token);
            });
        }
    };

    const handleDeleteInvitation = async (token: string) => {
        if (id) {
            try {
                await deleteInvitationByToken(id, token);
                toast.success('Invitation deleted successfully');
                setRefreshEffect((prev) => !prev); // Modification de l'état pour forcer le rafraîchissement du useEffect
            } catch (error) {
                console.error('Error deleting invitation:', error);
                toast.error('Error deleting invitation');
            }
        }
    };

    useEffect(() => {
        if (id) getInvitationsBySplitId(id).then((data) => setInvitationsData(data));
    }, [id, refreshEffect]);

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 w-min">
            <div className="fixed inset-0 bg-gray-950/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="rounded-lg border border-light-gray bg-white">
                    <div className="flex flex-col gap-[20px] border-b border-light-gray p-8">
                        <h1 className={titleClass}>{title}</h1>
                        <div className="flex flex-col gap-[10px]">
                            <h3 className="text-gray-950">{label}</h3>
                            {isGenerateCodeClicked ? (
                                <div className="flex flex-row gap-[10px]">
                                    <input value={invitationToken} placeholder={placeholder} readOnly className="form-input" />
                                    <button onClick={() => handleCopyToClipboard(invitationToken)} className="copy-modal-button">
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
                        {invitationsData && invitationsData.length > 0 && (
                            <div className="flex flex-col gap-[10px]">
                                <h3 className="text-gray-950">Unused invitation code still active :</h3>
                                <div className="flex flex-col gap-2">
                                    {invitationsData.map((invitation) => (
                                        <div key={invitation.id} className="flex flex-row items-center justify-between ">
                                            <div>{invitation.token}</div>
                                            <div className="flex flex-row gap-2">
                                                <button onClick={() => handleCopyToClipboard(invitation.token)} className="copy-modal-button">
                                                    <DocumentDuplicateIcon className="h-[14px] w-[14px]" />
                                                </button>
                                                <button onClick={() => handleDeleteInvitation(invitation.token)} className="delete-modal-button">
                                                    <TrashIcon className="h-[14px] w-[14px]" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
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
