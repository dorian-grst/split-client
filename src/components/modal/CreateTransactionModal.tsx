import { Dialog } from '@headlessui/react';
import InputGroupModal from './InputGroupModal';

interface CreateTransactionModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    textLeftButton: string;
    textRightButton: string;
    onClickLeftButton?: () => void;
    onClickRightButton?: () => void;
}

export default function CreateTransactionModal({ isOpen, setIsOpen, textLeftButton, textRightButton, onClickLeftButton, onClickRightButton }: CreateTransactionModalProps) {
    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 w-min">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="rounded-lg border border-light-gray bg-white">
                    <div className="flex flex-col gap-[20px] border-b border-light-gray p-8">
                        <h1 className="text-purple-linear">Create transaction</h1>
                        <InputGroupModal label="Name" placeholder="Travel" />
                        <InputGroupModal label="Amount" placeholder="100 €" />
                        <InputGroupModal label="Payed by" placeholder="Dorian" />
                    </div>
                    <div className="flex flex-row justify-between p-8">
                        <button onClick={onClickLeftButton} className="cancel">
                            {textLeftButton}
                        </button>
                        <button onClick={onClickRightButton} className="next">
                            {textRightButton}
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
