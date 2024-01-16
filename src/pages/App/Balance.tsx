import MemberLayout from '@/components/layout/MemberLayout';
import AppNavbar from '@/components/navbar/AppNavbar';
import { SplitContext } from '@/context/SplitProvider';
import { useContext } from 'react';

export default function Balance() {
    const { split } = useContext(SplitContext);

    const calculateBalance = (user_id: string) => {
        const positive = split.transactions
            .filter((transaction) => transaction.payedBy.id === user_id)
            .map((transaction) => transaction.amount)
            .reduce((a, b) => a + b, 0);
        const negative = split.transactions
            .map((transaction) => {
                if (transaction.payedFor?.find((user) => user.id === user_id)) {
                    return transaction.amount / transaction.payedFor.length;
                } else return 0;
            })
            .reduce((a, b) => a + b, 0);

        return positive - negative;
    };

    const getBalanceClass = (balance: number) => {
        if (balance > 0) {
            return 'text-green-linear';
        } else if (balance < 0) {
            return 'text-purple-linear';
        } else {
            return 'text-gray-950';
        }
    };

    return (
        <>
            <AppNavbar section="Balance" dashboard={false} />
            <div className="flex flex-col gap-[40px] bg-slate-50 p-10 px-[5%] md:px-[20%] xl:px-[30%]">
                <MemberLayout additionalClass={''} />
                {split && split.members && (
                    <div className="flex flex-col gap-[40px]">
                        {split.members.map((member, index) => (
                            <div key={index} className={'flex flex-row justify-between gap-[40px] rounded-lg border border-light-gray p-10'}>
                                <p className="text-gray-950">{member.display_name ? member.display_name : member.email}</p>
                                <p className={`font-medium ${getBalanceClass(calculateBalance(member.id))}`}>{calculateBalance(member.id)}€</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
