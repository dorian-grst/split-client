import TransactionLayout from '@/components/layout/TransactionLayout';
import { useContext, useEffect, useState } from 'react';
import TransactionModal from '../modal/TransactionModal';
import { deleteTransactionById } from '@/queries/split.queries';
import { SplitContext } from '@/context/SplitProvider';

interface User {
    id: string;
    email: string;
    display_name: string | null;
    remember_me_token: string | null;
    created_at: string;
    updated_at: string;
}

export interface Transaction {
    id: string;
    title: string;
    amount: number;
    created_at: string;
    payedBy: User;
    payedFor?: User[];
}

export default function HistoryLayout({}) {
    const [openTransactionModal, setTransactionModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const { split, updateSplit } = useContext(SplitContext);

    const openModal = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setTransactionModal(true);
    };

    const closeModal = () => {
        setSelectedTransaction(null);
        setTransactionModal(false);
    };

    const handleDeleteTransaction = async (transactionId: string) => {
        deleteTransactionById(transactionId).then(() => {
            closeModal();
            updateSplit(split.id);
        });
    };

    useEffect(() => {
        setTransactions(split.transactions);
    }, [split]);

    const formatDate = (rawDate: string | number | Date) => {
        const formattedDate = new Date(rawDate);
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const day = String(formattedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const isTransactionEmpty = transactions && transactions.length === 0;

    return (
        <div className={`flex w-full flex-col ${isTransactionEmpty ? 'justify-center' : ''} gap-[20px] rounded-lg border border-light-gray bg-slate-50 p-10`}>
            <div className="flex flex-col">
                {isTransactionEmpty ? (
                    <p className="text-center text-gray-400">No transactions yet!</p>
                ) : (
                    transactions &&
                    transactions.map((transaction: Transaction) => (
                        <TransactionLayout
                            key={transaction.id}
                            title={transaction.title}
                            amount={transaction.amount}
                            date={formatDate(transaction.created_at)}
                            author={transaction.payedBy?.display_name ? transaction.payedBy?.display_name : transaction.payedBy?.email}
                            onClick={() => {
                                openModal(transaction);
                            }}
                        />
                    ))
                )}
            </div>
            {selectedTransaction && (
                <TransactionModal
                    isOpen={openTransactionModal}
                    setIsOpen={closeModal}
                    title={selectedTransaction.title}
                    amount={selectedTransaction.amount}
                    date={formatDate(selectedTransaction.created_at)}
                    author={selectedTransaction.payedBy?.display_name ? selectedTransaction.payedBy?.display_name : selectedTransaction.payedBy?.email || ''}
                    payedFor={selectedTransaction.payedFor ? selectedTransaction.payedFor : []}
                    textLeftButton="Close"
                    textRightButton="Delete"
                    onClickLeftButton={closeModal}
                    onClickRightButton={() => handleDeleteTransaction(selectedTransaction.id)}
                />
            )}
        </div>
    );
}
