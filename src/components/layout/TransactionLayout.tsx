interface Transaction {
    title: string;
    amount: number;
    date: string;
    author: string;
    onClick?: () => void;
}

export default function TransactionLayout({ title, amount, date, author, onClick }: Transaction) {
    return (
        <button onClick={onClick} className="flex flex-col justify-between rounded-lg px-3 py-2 transition duration-300 hover:bg-slate-100">
            <div className="flex flex-row justify-between w-full items-start text-left gap-8">
                <h3 className="text-purple-linear font-bold truncate">{title}</h3>
                <h3 className="text-green-linear font-bold flex-wrap whitespace-nowrap">{amount} €</h3>
            </div>
            <div className="flex flex-row justify-between items-end gap-8 w-full">
                <div className="flex flex-col items-start flex-wrap truncate">
                    <p className="font-medium">payed by</p>
                    <p className="font-medium">{author}</p>
                </div>
                <p className="font-medium flex-wrap whitespace-nowrap">{date}</p>
            </div>
        </button>
    );
}
