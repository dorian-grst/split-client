import { Link, useNavigate, useParams } from 'react-router-dom';
import ProfileDropdown from '@/components/dropdown/ProfileDropdown';
import SplitDropdown from '@/components/dropdown/SplitDropdown';
import { SetStateAction, useContext, useState } from 'react';
import BasicModal from '@/components/modal/BasicModal';
import NotificationDropdown from '../dropdown/NotificationDropdown';
import logo from '@/assets/black_logo.svg';
import { createSplit, findSplitById, joinSplit } from '@/queries/split.queries';
import { SplitContext } from '@/context/SplitProvider';

interface AppNavbarProps {
    section: string;
    dashboard: boolean;
}

export default function AppNavbar({ section, dashboard }: AppNavbarProps) {
    const [openJoinSplitModal, setJoinSplitModal] = useState(false);
    const [openCreateSplitModal, setCreateSplitModal] = useState(false);
    const [groupName, setGroupName] = useState('');
    const { id } = useParams();
    const { split, setSplit, updateSplit } = useContext(SplitContext);
    const navigate = useNavigate();

    const links = [
        { path: '/splits/' + id, text: 'Overview' },
        { path: '/splits/' + id + '/expenses', text: 'Expenses' },
        { path: '/splits/' + id + '/balance', text: 'Balance' },
        { path: '/splits/' + id + '/settings', text: 'Settings' },
    ];

    const [joinSplitToken, setJoinSplitToken] = useState('');

    const handleJoinSplitInputChange = (value: string) => {
        setJoinSplitToken(value);
    };

    const handleJoinSplitClick = () => {
        joinSplit(joinSplitToken).then(() => {
            setJoinSplitModal(false);
        });
    };

    const handleInputChange = (value: SetStateAction<string>) => {
        setGroupName(value);
    };

    const handleCreateSplitClick = () => {
        createSplit(groupName).then(async (data) => {
            updateSplit(split.id);
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
        <div className="px-[5%] md:px-[20%] xl:px-[30%]">
            <div className="flex flex-col justify-between gap-7 border-b border-light-gray bg-slate-50 py-7 sticky top-0">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center justify-center gap-5 sm:gap-10">
                        <Link to="/" className="flex items-center justify-center gap-[10px]">
                            <img src={logo} alt="logo" />
                            <h2 className="font-bold">SPL!T</h2>
                        </Link>
                        {!dashboard && <SplitDropdown onJoinSplitClick={() => setJoinSplitModal(true)} onCreateSplitClick={() => setCreateSplitModal(true)} />}
                    </div>
                    <div className="flex flex-row items-center justify-center gap-5 sm:gap-10">
                        {!dashboard && <NotificationDropdown />}
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
            <div className="border-b border-light-gray bg-slate-50 py-7 text-gray-950">
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
                    onClickRightButton={handleJoinSplitClick}
                    onInputChange={handleJoinSplitInputChange}
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
        </div>
    );
}
