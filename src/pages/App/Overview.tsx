import AppNavbar from '@/components/navbar/AppNavbar';
import HistoryLayout from '@/components/layout/HistoryLayout';
import LeftMenuLayout from '@/components/layout/LeftMenuLayout';

export default function Overview() {

    return (
        <>
            <AppNavbar section="Overview" dashboard={false} />
            <div className="flex flex-col gap-[40px] bg-slate-50 p-10 px-[5%] md:px-[20%] xl:px-[30%]">
                <LeftMenuLayout />
                <HistoryLayout />
            </div>
        </>
    );
}
