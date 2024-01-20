import { AuthContext } from "@/context/AuthProvider";
import { SplitContext } from "@/context/SplitProvider";
import { useContext, useEffect, useState } from "react";

export default function DetailLayout({ row = false }: { row?: boolean }) {
    const [totalCost, setTotalCost] = useState<number>(0);
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const flexDirectionClass = row ? 'flex-row gap-10' : 'flex-col gap-[10px]';
    const { user } = useContext(AuthContext);
    const { split } = useContext(SplitContext);

    useEffect(() => {
        if (split && user) {
            const userTransactions = split.transactions.filter(
                (transaction: any) => transaction.payed_by_id === user.id
            );

            const costForUser = userTransactions.reduce(
                (acc: number, transaction: any) => acc + transaction.amount,
                0
            );

            const expense = split.transactions.reduce(
                (acc: number, transaction: any) => acc + transaction.amount,
                0
            );

            setTotalCost(costForUser);
            setTotalExpense(expense);
        }
    }, [user.id, split]);

    return (
        <div className="flex gap-[20px] rounded-lg border border-light-gray p-10 w-full flex-col">
            <h3 className="font-semibold text-gray-950">Details</h3>
            <div className={`flex ${flexDirectionClass}`}>
                <div className="whitespace-nowrap">
                    <h1 className="text-gray-950 font-bold">{totalCost} €</h1>
                    <p className="text-gray-950 font-medium">My total cost</p>
                </div>
                <div className="whitespace-nowrap">
                    <h1 className="text-gray-950 font-bold">{totalExpense} €</h1>
                    <p className="text-gray-950 font-medium">Total of expense</p>
                </div>
            </div>
        </div>
    );
}

