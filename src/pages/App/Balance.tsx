import MemberLayout from '@/components/layout/MemberLayout';
import AppNavbar from '@/components/navbar/AppNavbar';

export default function Balance() {
    return (
        <>
            <AppNavbar section="Balance" dashboard={false} />
            <div className="flex flex-col gap-[40px] bg-slate-50 p-10 px-[5%] md:px-[20%] xl:px-[30%]">
                <MemberLayout additionalClass={''}/>
            </div>
        </>
    );
}
