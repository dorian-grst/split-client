import { useContext, useState } from 'react';
import AddModal from '../modal/AddModal';
import { SplitContext } from '@/context/SplitProvider';
import { AuthContext } from '@/context/AuthProvider';

interface MemberLayoutProps {
    additionalClass: string;
}

export default function MemberLayout({ additionalClass }: MemberLayoutProps) {
    const [openAddModal, setOpenAddModal] = useState(false);
    const { split } = useContext(SplitContext);
    const { user } = useContext(AuthContext);

    const openAddModalHandler = () => {
        setOpenAddModal(true);
    };

    const closeAddModalHandler = () => {
        setOpenAddModal(false);
    };

    return (
        <div className={`flex flex-col gap-[20px] rounded-lg border border-light-gray p-10 ${additionalClass}`}>
            <div className="flex flex-row items-center justify-between">
                <h3 className="font-semibold text-gray-950">Members</h3>
                {split.members && split.members.length > 0 && (
                    <button onClick={openAddModalHandler} className="next font-medium">
                        Add
                    </button>
                )}
            </div>

            <div className="flex flex-col gap-[10px]">
                {split.members ? (
                    split.members.map((member) => (
                        <h3 key={member.id} className={`hover:text-green-linear font-medium ${member.id == user.id ? 'text-purple-linear' : 'text-gray'}`}>
                            {member.display_name || member.email}
                        </h3>
                    ))
                ) : (
                    <p>No members available</p>
                )}
            </div>

            {openAddModal && (
                <AddModal
                    isOpen={openAddModal}
                    setIsOpen={closeAddModalHandler}
                    title="Add member(s)"
                    titleClass="text-purple-linear"
                    label="Generate & share the invite code to one friend !"
                    placeholder="split/invites/token"
                    textLeftButton="Close"
                    onClickLeftButton={closeAddModalHandler}
                />
            )}
        </div>
    );
}
