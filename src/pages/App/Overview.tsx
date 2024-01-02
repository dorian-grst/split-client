import AppNavbar from '@/components/navbar/AppNavbar';
import HistoryLayout from '@/components/layout/HistoryLayout';
import LeftMenuLayout from '@/components/layout/LeftMenuLayout';

export default function Overview() {
    return (
        <>
            <AppNavbar section="Overview" dashboard={false} />
            <div className="flex flex-row gap-[40px] p-10">
                <LeftMenuLayout />
                <HistoryLayout />
            </div>
        </>
    );
}
