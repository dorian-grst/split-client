import AppNavbar from '@/components/navbar/AppNavbar';
import HistoryLayout from '@/components/layout/HistoryLayout';
import LeftMenuLayout from '@/components/layout/LeftMenuLayout';
import { useState } from 'react';

export default function Overview() {
    const [historyRefresh, setHistoryRefresh] = useState(false);

    const refreshHistory = () => {
        setHistoryRefresh((prevRefresh) => !prevRefresh);
    };

    return (
        <>
            <AppNavbar section="Overview" dashboard={false} />
            <div className="flex flex-col gap-[40px] bg-slate-50 p-10 px-[5%] md:px-[20%] xl:px-[30%]">
                <LeftMenuLayout refreshHistory={refreshHistory} />
                <HistoryLayout historyRefresh={historyRefresh} />
            </div>
        </>
    );
}
