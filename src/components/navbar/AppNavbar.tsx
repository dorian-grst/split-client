import { Link, useParams } from 'react-router-dom';
import tw from 'tailwind-styled-components';
import ProfileDropdown from '@/components/dropdown/ProfileDropdown';
import SplitDropdown from '@/components/dropdown/SplitDropdown';
import { SetStateAction, useState } from 'react';
import BasicModal from '@/components/modal/BasicModal';
import AddModal from '@/components/modal/AddModal';
import axios from 'axios';
import toast from 'react-hot-toast';
import NotificationDropdown from '../dropdown/NotificationDropdown';
import logo from '@/assets/black_logo.svg';

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

const actualTeam = 'Team 1';

interface AppNavbarProps {
    section: string;
    dashboard: boolean;
}

export default function AppNavbar({ section, dashboard }: AppNavbarProps) {
    const [openJoinSplitModal, setJoinSplitModal] = useState(false);
    const [openCreateSplitModal, setCreateSplitModal] = useState(false);
    const [openAddModal, setAddModal] = useState(false);
    const [groupName, setGroupName] = useState('');
    const { id } = useParams();

    const links = [
        { path: '/splits/' + id, text: 'Overview' },
        { path: '/splits/' + id + '/equality', text: 'Equality' },
        { path: '/splits/' + id + '/settings', text: 'Settings' },
        { path: '/account', text: 'Account' },
    ];

    const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

    const handleInputChange = (value: SetStateAction<string>) => {
        setGroupName(value);
    };

    const handleRightButtonClick = () => {
        setCreateSplitModal(false);
        setAddModal(true);
    };

    const handleCreateSplitClick = () => {
        setAddModal(false);
        axios
            .post(
                VITE_API_ENDPOINT + '/v1/split',
                { displayName: groupName },
                {
                    withCredentials: true,
                }
            )
            .then((response) => {
                console.log(response);
                toast.success('Split created successfully');
            })
            .catch((error) => {
                console.log(error);
                toast.error('Error during split creation');
            });
        setGroupName('');
    };

    return (
        <>
            <Container>
                <TopBar>
                    <div className="flex flex-row items-center justify-center gap-10">
                        <div className="flex items-center justify-center gap-[10px]">
                            <img src={logo} alt="logo" />
                            <h2 className="font-bold">SPL!T</h2>
                        </div>
                        {!dashboard && <SplitDropdown actualTeam={actualTeam} onJoinSplitClick={() => setJoinSplitModal(true)} onCreateSplitClick={() => setCreateSplitModal(true)} />}
                    </div>
                    <div className="flex flex-row items-center justify-center gap-10">
                        <NotificationDropdown />
                        <ProfileDropdown onJoinSplitClick={() => setJoinSplitModal(true)} onCreateSplitClick={() => setCreateSplitModal(true)} />
                    </div>
                </TopBar>
                {!dashboard && (
                    <nav className="flex w-min flex-row gap-[20px]">
                        {links.map((link, index) => (
                            <Link key={index} to={link.path} className="text-gray font-medium transition duration-300 hover:text-gray-950">
                                <h3>{link.text}</h3>
                            </Link>
                        ))}
                    </nav>
                )}
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
                    onClickRightButton={handleRightButtonClick}
                    onInputChange={handleInputChange}
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
                    onClickRightButton={handleCreateSplitClick}
                />
            )}
        </>
    );
}
