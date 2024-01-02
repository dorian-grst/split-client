import AppNavbar from '@/components/navbar/AppNavbar';
import LeftMenuLayout from '@/components/layout/LeftMenuLayout';
import BasicSetting from '@/components/layout/BasicSetting';
import InputGroupModal from '@/components/modal/InputGroupModal';

const teamName = 'Team 1';

export default function Settings() {
    return (
        <>
            <AppNavbar section="Settings" dashboard={false} />
            <div className="flex flex-row gap-10 p-10">
                <LeftMenuLayout />
                <div className="flex w-full flex-col gap-10">
                    <BasicSetting title={'Split name'} rule="Please use 32 characters at maximum." textButton="Save">
                        <InputGroupModal value={teamName} label="This is your split’s visible name. For example, the name of your company or department." placeholder="Dodos project" />
                    </BasicSetting>
                    <BasicSetting title={'Delete split'} textButton="Delete Split" borderColor="border-red-500" buttonColor="bg-red-600" backgroundColor="bg-red-100">
                        <p className="text-gray-950">Permanently remove your Team and all of its contents from the Vercel platform. This action is not reversible — please continue with caution.</p>
                    </BasicSetting>
                </div>
            </div>
        </>
    );
}
