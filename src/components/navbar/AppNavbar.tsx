import { Link } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import ProfileDropdown from '@/components/dropdown/ProfileDropdown';
import SplitDropdown from '@/components/dropdown/SplitDropdown';
import { useState } from 'react';
import BasicModal from '@/components/modal/BasicModal';
import AddModal from '@/components/modal/AddModal';

const Container = tw.div`
flex
flex-col
justify-between
px-10
py-7
gap-7
border-b
border-light-gray
`;

const TopBar = tw.div`
flex
flex-row
justify-between
`;

const links = [
    { path: '/teamID', text: 'Overview' },
    { path: '/teamID/equality', text: 'Equality' },
    { path: '/teamID/settings', text: 'Settings' },
    { path: '/teamID/account', text: 'Account' },
];

const actualTeam = 'Team 1';

interface AppNavbarProps {
    section: string;
}

export default function AppNavbar({ section }: AppNavbarProps) {
    const [openJoinSplitModal, setJoinSplitModal] = useState(false);
    const [openCreateSplitModal, setCreateSplitModal] = useState(false);
    const [openAddModal, setAddModal] = useState(false);

    return (
        <>
            <Container>
                <TopBar>
                    <div className="flex flex-row items-center justify-center gap-10">
                        <h2 className="font-bold">SPL!T</h2>
                        <SplitDropdown actualTeam={actualTeam} onJoinSplitClick={() => setJoinSplitModal(true)} onCreateSplitClick={() => setCreateSplitModal(true)} />
                    </div>
                    <ProfileDropdown onJoinSplitClick={() => setJoinSplitModal(true)} onCreateSplitClick={() => setCreateSplitModal(true)} />
                </TopBar>
                <nav className="flex w-min flex-row gap-[20px]">
                    {links.map((link, index) => (
                        <Link key={index} to={link.path} className="font-medium text-gray transition duration-300 hover:text-black">
                            <h3>{link.text}</h3>
                        </Link>
                    ))}
                </nav>
            </Container>
            <div className="text-abstract border-b border-light-gray px-10 py-7">
                <h1>{section}</h1>
            </div>
            {openJoinSplitModal && (
                <BasicModal
                    isOpen={openJoinSplitModal}
                    setIsOpen={setJoinSplitModal}
                    title="Join a Split"
                    titleClass="text-green-linear"
                    label="Split code"
                    placeholder="Copy the Split link here"
                    textLeftButton="Cancel"
                    textRightButton="Join the Split"
                    onClickLeftButton={() => setJoinSplitModal(false)}
                    onClickRightButton={() => setJoinSplitModal(false)}
                />
            )}
            {openCreateSplitModal && (
                <BasicModal
                    isOpen={openCreateSplitModal}
                    setIsOpen={setCreateSplitModal}
                    title="Create a Split"
                    titleClass="text-purple-linear"
                    label="Split name"
                    placeholder="My Split"
                    textLeftButton="Cancel"
                    textRightButton="Continue"
                    onClickLeftButton={() => setCreateSplitModal(false)}
                    onClickRightButton={() => {
                        setCreateSplitModal(false);
                        setAddModal(true);
                    }}
                />
            )}
            {openAddModal && (
                <AddModal
                    isOpen={openAddModal}
                    setIsOpen={setAddModal}
                    title="Create a Split"
                    titleClass="text-purple-linear"
                    label="Add members to your split"
                    placeholder="dorian.grasset.contact@gmail.com"
                    textLeftButton="Cancel"
                    textRightButton="Create the Split"
                    onClickLeftButton={() => setAddModal(false)}
                    onClickRightButton={() => setAddModal(false)}
                />
            )}
        </>
    );
}
