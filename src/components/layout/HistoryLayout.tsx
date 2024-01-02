import TransactionLayout from '@/components/layout/TransactionLayout';
import { useContext, useEffect, useState } from 'react';
import TransactionModal from '../modal/TransactionModal';
import { SplitContext, findAllTransactions } from '@/context/SplitProvider';

const transactionsList = [
    {
        id: 1,
        title: 'Loyer',
        amount: 500,
        date: '2021-09-01',
        author: 'Dorian',
    },
    {
        id: 2,
        title: 'Courses alimentaires',
        amount: -150,
        date: '2021-09-05',
        author: 'Alice',
    },
    {
        id: 3,
        title: 'Salaire',
        amount: 2000,
        date: '2021-09-15',
        author: 'Bob',
    },
    {
        id: 4,
        title: "Facture d'électricité",
        amount: -80,
        date: '2021-09-20',
        author: 'Charlie',
    },
    {
        id: 5,
        title: 'Achat de vêtements',
        amount: -120,
        date: '2021-09-25',
        author: 'Eva',
    },
    {
        id: 6,
        title: 'Remboursement ami',
        amount: 50,
        date: '2021-10-01',
        author: 'Frank',
    },
    {
        id: 7,
        title: 'Frais de restaurant',
        amount: -75,
        date: '2021-10-05',
        author: 'Grace',
    },
    {
        id: 8,
        title: "Prime de fin d'année",
        amount: 500,
        date: '2021-12-15',
        author: 'Henry',
    },
    {
        id: 9,
        title: "Cadeau d'anniversaire",
        amount: -40,
        date: '2022-01-10',
        author: 'Ivy',
    },
    {
        id: 10,
        title: 'Remboursement prêt',
        amount: 200,
        date: '2022-02-01',
        author: 'James',
    },
];

interface Transaction {
    id: number;
    title: string;
    amount: number;
    date: string;
    author: string;
}

export default function HistoryLayout() {
    const [openTransactionModal, setTransactionModal] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [transactions, setTransactions] = useState<Transaction[]>([]); // state to store transactions
    const { split } = useContext(SplitContext);

    const openModal = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setTransactionModal(true);
    };

    const closeModal = () => {
        setSelectedTransaction(null);
        setTransactionModal(false);
    };

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const result = await findAllTransactions(split.id);
                setTransactions(result.transactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, []);

    const isTransactionEmpty = transactions.length === 0;

    return (
        <div className={`flex w-full flex-col ${isTransactionEmpty ? 'justify-center' : ''} gap-[20px] rounded-lg border border-light-gray p-10`}>
            <div className="flex flex-col">
                {isTransactionEmpty ? (
                    <p className="text-center text-gray-400">No transactions yet!</p>
                ) : (
                    transactions.map((transaction: Transaction) => (
                        <TransactionLayout
                            key={transaction.id}
                            title={transaction.title}
                            amount={transaction.amount}
                            date={transaction.date}
                            author={transaction.author}
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
                    date={selectedTransaction.date}
                    author={selectedTransaction.author}
                    textLeftButton="Close"
                    textRightButton="Modify"
                    onClickLeftButton={closeModal}
                    onClickRightButton={closeModal}
                />
            )}
        </div>
    );
}
