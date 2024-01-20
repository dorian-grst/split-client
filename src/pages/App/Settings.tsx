import AppNavbar from '@/components/navbar/AppNavbar';
import BasicSetting from '@/components/layout/BasicSetting';
import InputGroupModal from '@/components/modal/InputGroupModal';
import { useContext, useEffect, useState } from 'react';
import { SplitContext } from '@/context/SplitProvider';
import { deleteSplit, leaveSplit, updateSplitDescription, updateSplitDisplayName } from '@/queries/split.queries';
import DeleteModal from '@/components/modal/DeleteModal';
import { useNavigate, useParams } from 'react-router-dom';

export default function Settings() {
    const { split, setSplit } = useContext(SplitContext);
    const [newDisplayName, setNewDisplayName] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [openDeleteSplitModal, setDeleteSplitModal] = useState(false);
    const [openLeaveSplitModal, setLeaveSplitModal] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        setNewDisplayName(split.display_name ? split.display_name : '');
        setNewDescription(split.description ? split.description : '');
    }, [split.display_name, split.description]);

    const handleDeleteSplit = () => {
        if (id) {
            deleteSplit(id).then(() => {
                setDeleteSplitModal(false);
                navigate('/dashboard');
            });
        }
    };

    const handleLeaveSplit = () => {
        if (id) {
            leaveSplit(id).then(() => {
                setLeaveSplitModal(false);
                navigate('/dashboard');
            });
        }
    };

    const handleSaveDisplayNameButtonClick = () => {
        updateSplitDisplayName(newDisplayName, split.id);
        setSplit({ ...split, display_name: newDisplayName });
    };

    const handleSaveDescriptionButtonClick = () => {
        updateSplitDescription(newDescription, split.id);
        setSplit({ ...split, description: newDescription });
    };

    const handleInputChange = (value: string, setterFunction: React.Dispatch<React.SetStateAction<string>>) => {
        setterFunction(value);
    };

    return (
        <>
            <AppNavbar section="Settings" dashboard={false} />
            <div className="flex flex-row gap-10 bg-slate-50 p-10 px-[5%] md:px-[20%] xl:px-[30%]">
                <div className="flex w-full flex-col gap-10">
                    <BasicSetting title={'Split name'} textButton="Save" onClick={handleSaveDisplayNameButtonClick}>
                        <InputGroupModal
                            value={newDisplayName}
                            label="This is your split’s visible name. For example, the name of your company or department."
                            placeholder="Voyage"
                            onChange={(value) => handleInputChange(value, setNewDisplayName)}
                        />
                    </BasicSetting>
                    <BasicSetting title={'Split description'} textButton="Save" onClick={handleSaveDescriptionButtonClick}>
                        <InputGroupModal
                            value={newDescription}
                            label="This is your split’s visible description."
                            placeholder="This split is for our trip to the moon."
                            onChange={(value) => handleInputChange(value, setNewDescription)}
                        />
                    </BasicSetting>
                    <BasicSetting
                        title={'Leave split'}
                        textButton="Leave"
                        borderColor="border-red-500"
                        buttonColor="bg-red-500 hover:bg-red-600"
                        backgroundColor="bg-red-100"
                        onClick={() => setLeaveSplitModal(true)}
                    >
                        <p className="text-gray-950">Leave the split permanently and delete all your content from the platform. This action is not reversible.</p>
                    </BasicSetting>
                    <BasicSetting
                        title={'Delete split'}
                        textButton="Delete"
                        borderColor="border-red-500"
                        buttonColor="bg-red-500 hover:bg-red-600"
                        backgroundColor="bg-red-100"
                        onClick={() => setDeleteSplitModal(true)}
                    >
                        <p className="text-gray-950">Permanently remove your split and all of its contents from the platform. This action is not reversible.</p>
                    </BasicSetting>
                </div>
            </div>
            {openDeleteSplitModal && (
                <DeleteModal
                    isOpen={openDeleteSplitModal}
                    setIsOpen={setDeleteSplitModal}
                    title="Delete split"
                    titleClass="text-red-600"
                    label="Deleting the split is a permanent action, leading to the removal of all associated content and members. Take note that this process is irreversible, and there is no option for recovery once the group is deleted."
                    textLeftButton="Cancel"
                    textRightButton="Delete split"
                    onClickLeftButton={() => setDeleteSplitModal(false)}
                    onClickRightButton={handleDeleteSplit}
                />
            )}
            {openLeaveSplitModal && (
                <DeleteModal
                    isOpen={openLeaveSplitModal}
                    setIsOpen={setLeaveSplitModal}
                    title="Leave split"
                    titleClass="text-red-600"
                    label="Leaving will remove you from the group, and you will lose access to its content and members. This action is not reversible, and rejoining may require an invitation."
                    textLeftButton="Cancel"
                    textRightButton="Leave split"
                    onClickLeftButton={() => setLeaveSplitModal(false)}
                    onClickRightButton={handleLeaveSplit}
                />
            )}
        </>
    );
}
