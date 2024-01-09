interface Transaction {
    title: string;
    amount: number;
    date: string;
    author: string;
    onClick?: () => void;
}

export default function TransactionLayout({ title, amount, date, author, onClick }: Transaction) {
    return (
        <button onClick={onClick} className="flex flex-row justify-between rounded-lg px-3 py-2 transition duration-300 hover:bg-slate-100">
            <div className="flex flex-col items-start gap-2 text-left">
                <h3 className="text-purple-linear font-bold">{title}</h3>
                <p className="font-medium">payed by {author}</p>
            </div>
            <div className="flex flex-col items-end gap-2 text-right">
                <h3 className="text-green-linear font-bold">{amount} €</h3>
                <p className="font-medium">{date}</p>
            </div>
        </button>
    );
}
