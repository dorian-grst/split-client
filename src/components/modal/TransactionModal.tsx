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
    payedFor: User[];
    textLeftButton: string;
    textRightButton: string;
    onClickLeftButton?: () => void;
    onClickRightButton?: () => void;
}

interface User {
    id: string;
    email: string;
    display_name: string | null;
    remember_me_token: string | null;
    created_at: string;
    updated_at: string;
}

export default function TransactionModal({ isOpen, setIsOpen, title, amount, date, author, payedFor, textLeftButton, textRightButton, onClickLeftButton, onClickRightButton }: Transaction) {
    const completeButtonRef = useRef(null);

    return (
        <Dialog initialFocus={completeButtonRef} open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-gray-950/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="min-w-[350px] rounded-lg border border-light-gray bg-slate-50 lg:min-w-[550px]">
                    <div className="flex flex-col gap-[10px] border-b border-light-gray p-8">
                        <h1 className="text-purple-linear">{title}</h1>
                        <div className="flex flex-row justify-between">
                            <h3 className="text-green-linear font-bold">{amount} €</h3>
                            <h3 className="text-gray-950">{date}</h3>
                        </div>
                        <div className="flex flex-row gap-1 truncate">
                            <h3 className="whitespace-nowrap text-gray-950">Payed by</h3>
                            <h3 className="text-gray-950">{author}</h3>
                        </div>
                        {payedFor && (
                            <div className="truncate">
                                <h3 className="text-gray-950">Payed for</h3>
                                {payedFor.map((user: User) => (
                                    <div key={user.id}>
                                        <h3 className="text-gray-950">• {user.display_name ? user.display_name : user.email}</h3>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div></div>
                    <div className="flex flex-row justify-between p-8">
                        <button onClick={onClickLeftButton} className="cancel">
                            {textLeftButton}
                        </button>
                        <button ref={completeButtonRef} onClick={onClickRightButton} className="next bg-gray-900">
                            {textRightButton}
                        </button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
