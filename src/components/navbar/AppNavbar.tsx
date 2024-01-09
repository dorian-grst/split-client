import { Link, useNavigate, useParams } from 'react-router-dom';
import ProfileDropdown from '@/components/dropdown/ProfileDropdown';
import SplitDropdown from '@/components/dropdown/SplitDropdown';
import { SetStateAction, useContext, useState } from 'react';
import BasicModal from '@/components/modal/BasicModal';
import NotificationDropdown from '../dropdown/NotificationDropdown';
import logo from '@/assets/black_logo.svg';
import { createSplit, findSplitById } from '@/queries/split.queries';
import { SplitContext } from '@/context/SplitProvider';

interface AppNavbarProps {
    section: string;
    dashboard: boolean;
}

export default function AppNavbar({ section, dashboard }: AppNavbarProps) {
    const [openJoinSplitModal, setJoinSplitModal] = useState(false);
    const [openCreateSplitModal, setCreateSplitModal] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [refreshSplitDropdown, setRefreshSplitDropdown] = useState(false);
    const { id } = useParams();
    const { setSplit } = useContext(SplitContext);
    const navigate = useNavigate();

    const links = [
        { path: '/splits/' + id, text: 'Overview' },
        { path: '/splits/' + id + '/equality', text: 'Equality' },
        { path: '/splits/' + id + '/settings', text: 'Settings' },
    ];

    const handleInputChange = (value: SetStateAction<string>) => {
        setGroupName(value);
    };

    const handleCreateSplitClick = () => {
        createSplit(groupName).then(async (data) => {
            setRefreshSplitDropdown((prevState) => !prevState);
            setCreateSplitModal(false);
            setGroupName('');
            const splitInfo = await findSplitById(data.split.id);
            setSplit({
                id: splitInfo[0].id,
                display_name: splitInfo[0].display_name,
                description: splitInfo[0].description,
                owner: splitInfo[0].owner_id,
                members: splitInfo[0].users,
                transactions: splitInfo[0].transactions,
            });
            navigate('/splits/' + data.split.id);
        });
    };

    return (
        <>
            <div className="flex flex-col justify-between gap-7 border-b border-light-gray bg-slate-50 px-10 py-7">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center justify-center gap-10">
                        <Link to="/" className="flex items-center justify-center gap-[10px]">
                            <img src={logo} alt="logo" />
                            <h2 className="font-bold">SPL!T</h2>
                        </Link>
                        {!dashboard && <SplitDropdown onJoinSplitClick={() => setJoinSplitModal(true)} onCreateSplitClick={() => setCreateSplitModal(true)} refresh={refreshSplitDropdown} />}
                    </div>
                    <div className="flex flex-row items-center justify-center gap-10">
                        <NotificationDropdown />
                        <ProfileDropdown onJoinSplitClick={() => setJoinSplitModal(true)} onCreateSplitClick={() => setCreateSplitModal(true)} />
                    </div>
                </div>
                {!dashboard && (
                    <nav className="flex w-min flex-row gap-[20px]">
                        {links.map((link, index) => (
                            <Link key={index} to={link.path} className="text-gray font-medium text-gray-950 transition duration-300 hover:text-gray-900">
                                <h3>{link.text}</h3>
                            </Link>
                        ))}
                    </nav>
                )}
            </div>
            <div className="bg-slate-50 border-b border-light-gray px-10 py-7 text-gray-950">
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
                    onClickRightButton={() => {
                        setJoinSplitModal(false);
                    }}
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
                    onClickRightButton={handleCreateSplitClick}
                    onInputChange={handleInputChange}
                />
            )}
        </>
    );
}
