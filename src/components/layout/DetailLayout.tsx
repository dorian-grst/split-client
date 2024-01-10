const totalCost = 104;
const totalExpense = 56;

export default function DetailLayout({ row = false }: { row?: boolean }) {
    const flexDirectionClass = row ? 'flex-row gap-10' : 'flex-col gap-[10px]';

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

