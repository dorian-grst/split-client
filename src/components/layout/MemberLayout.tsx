import { useState } from 'react';
import AddModal from '../modal/AddModal';

const membersList = [
    {
        id: 1,
        name: 'Dorian',
        me: true,
    },
    {
        id: 2,
        name: 'Louis',
        me: false,
    },
    {
        id: 3,
        name: 'Tristan',
        me: false,
    },
    {
        id: 4,
        name: 'Mathias',
        me: false,
    },
    {
        id: 5,
        name: 'Nathael',
        me: false,
    },
];

function MemberLayout() {
    const [openAddModal, setOpenAddModal] = useState(false);

    const openAddModalHandler = () => {
        setOpenAddModal(true);
    };

    const closeAddModalHandler = () => {
        setOpenAddModal(false);
    };

    return (
        <div className="flex w-min min-w-[300px] flex-col gap-[20px] rounded-lg border border-light-gray p-10">
            <div className="flex flex-row items-center justify-between">
                <h3 className="font-semibold text-black">Members</h3>
                <button onClick={openAddModalHandler} className="next">
                    Add
                </button>
            </div>

            <div className="flex flex-col gap-[10px]">
                {membersList.map((member) => (
                    <h3 key={member.id} className={`hover:text-green-linear cursor-pointer font-medium ${member.me ? 'text-purple-linear' : 'text-gray'}`}>
                        {member.name}
                    </h3>
                ))}
            </div>

            {/* Affichage de la modal */}
            {openAddModal && (
                <AddModal
                    isOpen={openAddModal}
                    setIsOpen={closeAddModalHandler}
                    title="Add member(s)"
                    titleClass="text-purple-linear"
                    label="Add members to your Split!"
                    placeholder="dorian.grasset.contact@gmail.com"
                    textLeftButton="Cancel"
                    textRightButton="Add member(s)"
                    onClickLeftButton={closeAddModalHandler}
                    onClickRightButton={() => {
                        // Logique pour ajouter le(s) membre(s)
                        closeAddModalHandler(); // Fermer la AddModal après l'ajout
                    }}
                />
            )}
        </div>
    );
}

export default MemberLayout;
