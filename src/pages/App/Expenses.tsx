import CreateTransactionButton from '@/components/layout/CreateTransactionButton';
import DetailLayout from '@/components/layout/DetailLayout';
import HistoryLayout from '@/components/layout/HistoryLayout';
import CreateTransactionModal from '@/components/modal/CreateTransactionModal';
import AppNavbar from '@/components/navbar/AppNavbar';
import { Member, SplitContext } from '@/context/SplitProvider';
import { createTransaction } from '@/queries/split.queries';
import { useContext, useState } from 'react';

interface TransactionData {
    title: string;
    amount: string;
    splitId: string;
    payedById?: string;
    payedForIds: string[];
}

export default function Expenses() {
    const [openCreateTransactionModal, setOpenCreateTransactionModal] = useState(false);
    const { split } = useContext(SplitContext);
    const [selectedMember, setSelectedMember] = useState<Member | undefined>(split?.members?.[0]);
    const [historyRefresh, setHistoryRefresh] = useState(false); // Ajout de l'état de rafraîchissement

    const openCreateTransactionModalHandler = () => {
        setOpenCreateTransactionModal(true);
    };

    const onCreateSplit = (selected: Member | undefined) => {
        const name = document.querySelector<HTMLInputElement>('input[name="name"]')?.value;
        const amount = document.querySelector<HTMLInputElement>('input[name="amount"]')?.value;

        const payedForCheckboxes = document.querySelectorAll<HTMLInputElement>('input[name="payed_for"]');
        const payedForMembers = Array.from(payedForCheckboxes)
            .filter((checkbox) => checkbox.checked)
            .map((checkbox) => {
                const memberId = checkbox.dataset.memberId;
                const member = split?.members.find((m) => m.id === memberId);
                return member;
            });

        const data: TransactionData = {
            title: name ?? '',
            amount: amount ?? '',
            splitId: split.id,
            payedById: selected?.id ?? '',
            payedForIds: payedForMembers.map((member) => member?.id ?? ''),
        };

        createTransaction(data)
            .then(() => {
                setOpenCreateTransactionModal(false);
                setSelectedMember(selected);
                setHistoryRefresh((prev) => !prev);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    return (
        <>
            <AppNavbar section="Expenses" dashboard={false} />
            <div className="flex flex-col gap-[40px] bg-slate-50 p-10 px-[5%] md:px-[20%] xl:px-[30%]">
                <div className="flex flex-col gap-[40px] ">
                    <CreateTransactionButton onClick={openCreateTransactionModalHandler} />
                    <DetailLayout row={true} />
                </div>
                <HistoryLayout historyRefresh={historyRefresh} />
            </div>
            {openCreateTransactionModal && (
                <CreateTransactionModal
                    isOpen={openCreateTransactionModal}
                    setIsOpen={() => setOpenCreateTransactionModal(false)}
                    textLeftButton="Cancel"
                    textRightButton="Create"
                    onClickLeftButton={() => setOpenCreateTransactionModal(false)}
                    onClickRightButton={(selected: Member | undefined) => {
                        onCreateSplit(selected);
                    }}
                    selected={selectedMember}
                />
            )}
        </>
    );
}
