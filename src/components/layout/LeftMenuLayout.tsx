import CreateTransactionButton from '@/components/layout/CreateTransactionButton';
import DetailLayout from '@/components/layout/DetailLayout';
import MemberLayout from '@/components/layout/MemberLayout';
import CreateTransactionModal from '@/components/modal/CreateTransactionModal';
import { useState } from 'react';

export default function LeftMenuLayout() {
    const [openCreateTransactionModal, setOpenCreateTransactionModal] = useState(false);

    const openCreateTransactionModalHandler = () => {
        setOpenCreateTransactionModal(true);
    };

    const closeCreateTransactionModalHandler = () => {
        setOpenCreateTransactionModal(false);
    };

    return (
        <div className="flex flex-col gap-[40px]">
            <CreateTransactionButton onClick={openCreateTransactionModalHandler} />
            <DetailLayout />
            <MemberLayout />
            {openCreateTransactionModal && (
                <CreateTransactionModal
                    isOpen={openCreateTransactionModal}
                    setIsOpen={closeCreateTransactionModalHandler}
                    textLeftButton="Cancel"
                    textRightButton="Create"
                    onClickLeftButton={closeCreateTransactionModalHandler}
                    onClickRightButton={() => {
                        closeCreateTransactionModalHandler();
                    }}
                />
            )}
        </div>
    );
}
