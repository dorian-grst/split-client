import BasicSetting from '@/components/layout/BasicSetting';
import InputGroupModal from '@/components/modal/InputGroupModal';
import AppNavbar from '@/components/navbar/AppNavbar';
import { AuthContext } from '@/context/AuthProvider';
import { updateUserDisplayName } from '@/queries/user.queries';
import { useContext, useEffect, useState } from 'react';

export default function Account() {
    const { user } = useContext(AuthContext);
    const [newDisplayName, setNewDisplayName] = useState('');

    useEffect(() => {
        setNewDisplayName(user.display_name || '');
    }, [user.display_name]);

    const handleDisplayNameChange = (value: string) => {
        setNewDisplayName(value);
    };

    const handleSaveButtonClick = () => {
        updateUserDisplayName(newDisplayName, user.id);
    };

    return (
        <div>
            <AppNavbar section="Account" dashboard={true} />
            <div className="flex flex-row gap-10 bg-slate-50 py-10 md:px-[20%] xl:px-[30%] px-[5%]">
                <div className="flex w-full flex-col gap-10">
                    <BasicSetting title="Display name" textButton="Save" onClick={handleSaveButtonClick}>
                        <InputGroupModal value={newDisplayName} label="This is your visible display name." placeholder="Rapidement" onChange={handleDisplayNameChange} />
                    </BasicSetting>
                    <BasicSetting title="Delete account" textButton="Delete Account" borderColor="border-red-500" buttonColor="bg-red-600" backgroundColor="bg-red-100">
                        <p className="text-gray-950">Permanently remove your account and all of its contents from the platform. This action is not reversible.</p>
                    </BasicSetting>
                </div>
            </div>
        </div>
    );
}
