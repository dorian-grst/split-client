import BasicSetting from '@/components/layout/BasicSetting';
import DeleteModal from '@/components/modal/DeleteModal';
import InputGroupModal from '@/components/modal/InputGroupModal';
import AppNavbar from '@/components/navbar/AppNavbar';
import { AuthContext } from '@/context/AuthProvider';
import { deleteAccount, updateUserDisplayName } from '@/queries/user.queries';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Account() {
    const { user } = useContext(AuthContext);
    const [newDisplayName, setNewDisplayName] = useState('');
    const [openDeleteAccountModal, setDeleteAccountModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setNewDisplayName(user.display_name || '');
    }, [user.display_name]);

    const handleDeleteAccount = () => {
        deleteAccount(user.id);
        setDeleteAccountModal(false);
        navigate('/');
    };

    const handleDisplayNameChange = (value: string) => {
        setNewDisplayName(value);
    };

    const handleSaveButtonClick = () => {
        updateUserDisplayName(newDisplayName, user.id);
    };

    return (
        <>
            <div>
                <AppNavbar section="Account" dashboard={true} />
                <div className="flex flex-row gap-10 bg-slate-50 px-[5%] py-10 md:px-[20%] xl:px-[30%]">
                    <div className="flex w-full flex-col gap-10">
                        <BasicSetting title="Display name" textButton="Save" onClick={handleSaveButtonClick}>
                            <InputGroupModal value={newDisplayName} label="This is your visible display name." placeholder="Rapidement" onChange={handleDisplayNameChange} />
                        </BasicSetting>
                        <BasicSetting
                            title="Delete account"
                            textButton="Delete"
                            borderColor="border-red-500"
                            buttonColor="bg-red-500 hover:bg-red-600"
                            backgroundColor="bg-red-100"
                            onClick={() => setDeleteAccountModal(true)}
                        >
                            <p className="text-gray-950">Permanently remove your account and all of its contents from the platform. This action is not reversible.</p>
                        </BasicSetting>
                    </div>
                </div>
            </div>
            {openDeleteAccountModal && (
                <DeleteModal
                    isOpen={openDeleteAccountModal}
                    setIsOpen={setDeleteAccountModal}
                    title="Delete account"
                    titleClass="text-red-600"
                    label="This action is irreversible and will result in the permanent loss of all your data. Proceed only if you are certain, as recovery is not possible once the account is deleted."
                    textLeftButton="Cancel"
                    textRightButton="Delete account"
                    onClickLeftButton={() => setDeleteAccountModal(false)}
                    onClickRightButton={handleDeleteAccount}/>
            )}
        </>
    );
}
