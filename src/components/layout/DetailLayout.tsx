const totalCost = 104;
const totalExpense = 56;

export default function DetailLayout() {
    return (
        <div className="flex w-min min-w-[300px] flex-col gap-[20px] rounded-lg border border-light-gray p-10">
            <h3 className="font-semibold text-gray-950">Details</h3>
            <div className="flex flex-col gap-[10px]">
                <div>
                    <h1 className="text-abstract font-bold">{totalCost} €</h1>
                    <p className="font-medium">My total cost</p>
                </div>
                <div>
                    <h1 className="text-abstract font-bold">{totalExpense} €</h1>
                    <p className="font-medium">Total of expense</p>
                </div>
            </div>
        </div>
    );
}
