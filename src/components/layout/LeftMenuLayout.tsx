import CreateTransactionButton from '@/components/layout/CreateTransactionButton';
import DetailLayout from '@/components/layout/DetailLayout';
import MemberLayout from '@/components/layout/MemberLayout';
import CreateTransactionModal from '@/components/modal/CreateTransactionModal';
import { Member, SplitContext } from '@/context/SplitProvider';
import { createTransaction } from '@/queries/split.queries';
import { useContext, useState } from 'react';

interface TransactionData {
    title: string;
    amount: string;
    splitId: string;
    payedById?: string;
    usersIds: string[];
}

export default function LeftMenuLayout({}) {
    const [openCreateTransactionModal, setOpenCreateTransactionModal] = useState(false);
    const { split, updateSplit } = useContext(SplitContext);
    const [selectedMember, setSelectedMember] = useState<Member | undefined>(split?.members?.[0]);

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
            usersIds: payedForMembers.map((member) => member?.id ?? ''),
        };

        createTransaction(data)
            .then(() => {
                setOpenCreateTransactionModal(false);
                setSelectedMember(selected);
                updateSplit(split.id);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    return (
        <div className="flex flex-col gap-[40px] bg-slate-50 sm:flex-row">
            <div className="flex flex-col gap-[40px] sm:w-1/2">
                <CreateTransactionButton onClick={openCreateTransactionModalHandler} />
                <DetailLayout />
            </div>
            <MemberLayout additionalClass={'sm:w-1/2'} />
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
        </div>
    );
}
