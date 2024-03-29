import BasicModal from '@/components/modal/BasicModal';
import AppNavbar from '@/components/navbar/AppNavbar';
import { AuthContext } from '@/context/AuthProvider';
import { SplitContext } from '@/context/SplitProvider';
import { createNotification, createSplit, findSplitById, joinSplit } from '@/queries/split.queries';
import { getAllSplitUsers } from '@/queries/user.queries';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Split {
    id: string;
    display_name: string;
    description: string;
    members: string[];
}

interface DataValue {
    userId: string;
    splitId: string;
}

export default function Dashboard() {
    const [openJoinSplitModal, setJoinSplitModal] = useState(false);
    const [openCreateSplitModal, setCreateSplitModal] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [refreshSplitList, setRefreshSplitList] = useState(false);
    const [response, setResponse] = useState<{ splits: Split[] }>({ splits: [] });
    const { user } = useContext(AuthContext);
    const { setSplit } = useContext(SplitContext);
    const navigate = useNavigate();

    const handleInputChange = (value: SetStateAction<string>) => {
        setGroupName(value);
    };

    const [joinSplitToken, setJoinSplitToken] = useState('');

    const handleJoinSplitInputChange = (value: string) => {
        setJoinSplitToken(value);
    };

    const handleJoinSplitClick = () => {
        joinSplit(joinSplitToken).then((response) => {
            setJoinSplitModal(false);
            setRefreshSplitList((prevState) => !prevState);
            const data: DataValue = {
                userId: user.id,
                splitId: response.split[0].id,
            };
            createNotification(data);
        });
    };

    const handleCreateSplitClick = () => {
        createSplit(groupName).then(async (data) => {
            setRefreshSplitList((prevState) => !prevState);
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

    useEffect(() => {
        getAllSplitUsers(user.id).then((response) => {
            setResponse(response);
        });
    }, [refreshSplitList, user.id]);

    return (
        <>
            <AppNavbar section="Dashboard" dashboard={true} />

            <div className="bg-slate-50 px-[5%] py-10 md:px-[20%] xl:px-[30%]">
                <div className="flex w-full flex-col gap-10 rounded-lg border border-light-gray p-10">
                    <div className="flex sm:flex-row flex-col items-start gap-10 sm:items-center justify-between">
                        <h3 className="text-center text-gray-950">{response.splits.length === 0 ? 'No Split yet !' : 'Choose a split !'}</h3>
                        <div className="flex flex-row gap-5">
                            <button className="text-purple-linear rounded-md border border-purple-primary px-3 py-2" onClick={() => setCreateSplitModal(true)}>
                                Create
                            </button>
                            <button className="text-green-linear rounded-md border border-green-primary px-3 py-2" onClick={() => setJoinSplitModal(true)}>
                                Join
                            </button>
                        </div>
                    </div>

                    {response.splits.map((splitItem) => (
                        <button
                            key={splitItem.id}
                            className="rounded-lg border border-light-gray p-10 hover:bg-slate-100"
                            onClick={async () => {
                                const splitInfo = await findSplitById(splitItem.id);
                                setSplit({
                                    id: splitInfo[0].id,
                                    display_name: splitInfo[0].display_name,
                                    description: splitInfo[0].description,
                                    owner: splitInfo[0].owner_id,
                                    members: splitInfo[0].users,
                                    transactions: splitInfo[0].transactions,
                                });
                                navigate('/splits/' + splitItem.id);
                            }}
                        >
                            <div className="flex flex-col items-start justify-center gap-5" key={splitItem.id}>
                                <div className="flex flex-row items-center justify-start gap-10">
                                    <div className="h-[32px] w-[32px] rounded-full bg-abstract bg-cover bg-no-repeat focus:outline-none sm:h-[64px] sm:w-[64px]"></div>
                                    <h3 className="text-gray-950 font-medium">{splitItem.display_name}</h3>
                                </div>
                                {splitItem.description && <h4 className="text-gray-950">{splitItem.description}</h4>}
                            </div>
                        </button>
                    ))}
                </div>
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
        </>
    );
}
