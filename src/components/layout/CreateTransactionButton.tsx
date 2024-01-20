export default function CreateTransactionButton({ onClick }: { onClick: () => void }) {
    return (
        <button onClick={onClick} className="create-transaction-button bg-gray-900">
            <h3>Create transaction</h3>
        </button>
    );
}
