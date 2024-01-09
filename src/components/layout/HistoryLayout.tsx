import TransactionLayout from '@/components/layout/TransactionLayout';
import { useEffect, useState } from 'react';
import TransactionModal from '../modal/TransactionModal';
import { useParams } from 'react-router-dom';
import { deleteTransactionById, findAllTransactions } from '@/queries/split.queries';

interface Transaction {
    id: string;
    title: string;
    amount: number;
    created_at: string;
    payed_by_id: string;
    payedBy?: {
        id: string;
        email: string;
        display_name: string | null;
        remember_me_token: string | null;
        created_at: string;
        updated_at: string;
    };
}

interface HistoryLayoutProps {
    historyRefresh: boolean;
}

export default function HistoryLayout({ historyRefresh }: HistoryLayoutProps) {
    const [openTransactionModal, setTransactionModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [refreshAtDelete, setRefreshAtDelete] = useState(false);
    const { id } = useParams();

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
            setRefreshAtDelete((prevState) => !prevState);
        });
    };

    useEffect(() => {
        if (id)
            findAllTransactions(id).then((result) => {
                setTransactions(result);
            });
    }, [id, historyRefresh, refreshAtDelete]);

    const formatDate = (rawDate: string | number | Date) => {
        const formattedDate = new Date(rawDate);
        const year = formattedDate.getFullYear();
        const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
        const day = String(formattedDate.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const isTransactionEmpty = transactions && transactions.length === 0;

    return (
        <div className={`flex w-full flex-col ${isTransactionEmpty ? 'justify-center' : ''} gap-[20px] bg-slate-50 rounded-lg border border-light-gray p-10`}>
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
                            author={transaction.payedBy?.display_name ? transaction.payedBy?.display_name : transaction.payedBy?.email || ''}
                            onClick={() => openModal(transaction)}
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
                    textLeftButton="Close"
                    textRightButton="Delete"
                    onClickLeftButton={closeModal}
                    onClickRightButton={() => handleDeleteTransaction(selectedTransaction.id)}
                />
            )}
        </div>
    );
}
