import { Dialog } from '@headlessui/react';
import { useRef } from 'react';
import '@/styles/input.css';

interface Transaction {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    title: string;
    amount: number;
    date: string;
    author: string;
    textLeftButton: string;
    textRightButton: string;
    onClickLeftButton?: () => void;
    onClickRightButton?: () => void;
}

export default function TransactionModal({ isOpen, setIsOpen, title, amount, date, author, textLeftButton, textRightButton, onClickLeftButton, onClickRightButton }: Transaction) {
    const completeButtonRef = useRef(null);

    return (
        <Dialog initialFocus={completeButtonRef} open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="w-min min-w-[500px] rounded-lg border border-light-gray bg-white">
                    <div className="flex flex-col gap-[10px] border-b border-light-gray p-8">
                        <h1 className="text-purple-linear">{title}</h1>
                        <h3 className="text-green-linear font-semibold">{amount} €</h3>
                        <div className="flex flex-row justify-between">
                            <h3 className="text-black">Payed by {author}</h3>
                            <h3 className="text-black">{date}</h3>
                        </div>
                    </div>
                    <div></div>
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
