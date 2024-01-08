import BasicModal from '@/components/modal/BasicModal';
import AppNavbar from '@/components/navbar/AppNavbar';
import { AuthContext } from '@/context/AuthProvider';
import { SplitContext } from '@/context/SplitProvider';
import { createSplit, findSplitById, joinSplit } from '@/queries/split.queries';
import { getAllSplitUsers } from '@/queries/user.queries';
import { SetStateAction, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Split {
    id: string;
    display_name: string;
    members: string[];
}

export default function Dashboard() {
    const [openJoinSplitModal, setJoinSplitModal] = useState(false);
    const [openCreateSplitModal, setCreateSplitModal] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [refreshSplitList, setRefreshSplitList] = useState(false);

    const handleInputChange = (value: SetStateAction<string>) => {
        setGroupName(value);
    };

    const [joinSplitToken, setJoinSplitToken] = useState('');

    const handleJoinSplitInputChange = (value: string) => {
        setJoinSplitToken(value);
    };

    const handleJoinSplitClick = () => {
        joinSplit(joinSplitToken).then(() => {
            setJoinSplitModal(false);
            setRefreshSplitList((prevState) => !prevState);
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

    const [response, setResponse] = useState<{ splits: Split[] }>({ splits: [] });
    const { user } = useContext(AuthContext);
    const { setSplit } = useContext(SplitContext);
    const navigate = useNavigate();
    useEffect(() => {
        getAllSplitUsers(user.id).then((response) => {
            setResponse(response);
        });
    }, [refreshSplitList]);

    return (
        <>
            <AppNavbar section="Dashboard" dashboard={true} />

            <div className="px-[20%] py-10">
                <div className="flex w-full flex-col gap-10 rounded-lg border border-light-gray p-10">
                    <div className="flex flex-row items-center justify-between">
                        <h3 className="text-center text-gray-950">{response.splits.length === 0 ? 'No Split yet !' : 'Choose a split !'}</h3>
                        <div className="flex flex-row gap-10">
                            <button className="text-purple-linear rounded-md border border-purple-primary px-3 py-2" onClick={() => setCreateSplitModal(true)}>
                                Create Split
                            </button>
                            <button className="text-green-linear rounded-md border border-green-primary px-3 py-2" onClick={() => setJoinSplitModal(true)}>
                                Join Split
                            </button>
                        </div>
                    </div>

                    {response.splits.map((splitItem) => (
                        <button
                            key={splitItem.id}
                            className="rounded-lg border border-light-gray p-10 hover:bg-light-gray"
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
                            <div className="flex flex-row items-center justify-start gap-10" key={splitItem.id}>
                                <div className="h-[64px] w-[64px] rounded-full bg-abstract bg-cover bg-no-repeat focus:outline-none"></div>
                                <h3 className='text-gray-950'>{splitItem.display_name}</h3>
                                <h4>{/* Ajoutez ici le contenu que vous souhaitez afficher pour chaque splitItem */}</h4>
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
