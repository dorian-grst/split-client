import AppNavbar from '@/components/navbar/AppNavbar';
import BasicSetting from '@/components/layout/BasicSetting';
import InputGroupModal from '@/components/modal/InputGroupModal';
import { useContext, useEffect, useState } from 'react';
import { SplitContext } from '@/context/SplitProvider';
import { updateSplitDescription, updateSplitDisplayName } from '@/queries/split.queries';

export default function Settings() {
    const { split, setSplit } = useContext(SplitContext);
    const [newDisplayName, setNewDisplayName] = useState('');
    const [newDescription, setNewDescription] = useState('');

    useEffect(() => {
        setNewDisplayName(split.display_name ? split.display_name : '');
        setNewDescription(split.description ? split.description : '');
    }, [split.display_name, split.description]);

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
            <div className="flex flex-row gap-10 p-10 bg-slate-50 md:px-[20%] xl:px-[30%] px-[5%]">
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
                    <BasicSetting title={'Delete split'} textButton="Delete Split" borderColor="border-red-500" buttonColor="bg-red-600" backgroundColor="bg-red-100">
                        <p className="text-gray-950">Permanently remove your Team and all of its contents from the Vercel platform. This action is not reversible — please continue with caution.</p>
                    </BasicSetting>
                </div>
            </div>
        </>
    );
}
