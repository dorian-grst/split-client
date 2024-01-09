import CreateTransactionButton from '@/components/layout/CreateTransactionButton';
import DetailLayout from '@/components/layout/DetailLayout';
import MemberLayout from '@/components/layout/MemberLayout';
import CreateTransactionModal from '@/components/modal/CreateTransactionModal';
import { Member, SplitContext } from '@/context/SplitProvider';
import axios from 'axios';
import { useContext, useState } from 'react';

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

interface LeftMenuLayoutProps {
    refreshHistory?: () => void;
}

export default function LeftMenuLayout({ refreshHistory }: LeftMenuLayoutProps) {
    const [openCreateTransactionModal, setOpenCreateTransactionModal] = useState(false);
    const { split } = useContext(SplitContext);
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

        const data = {
            title: name,
            amount: amount,
            splitId: split.id,
            payedById: selected?.id,
            payedForIds: payedForMembers.map((member) => member?.id),
        };

        axios
            .post(VITE_API_ENDPOINT + '/v1/transaction', data, {
                withCredentials: true,
            })
            .then(() => {
                setOpenCreateTransactionModal(false);
                setSelectedMember(selected);
                if (refreshHistory) refreshHistory();
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    return (
        <div className="flex flex-col gap-[40px] bg-slate-50">
            <CreateTransactionButton onClick={openCreateTransactionModalHandler} />
            <DetailLayout />
            <MemberLayout />
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
