import AppNavbar from '@/components/navbar/AppNavbar';
import { AuthContext, getAllUserSplits } from '@/context/AuthProvider';
import { SplitContext, findSplitById } from '@/context/SplitProvider';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Split {
    id: string;
    display_name: string;
    members: string[];
}

export default function Dashboard() {
    const [response, setResponse] = useState<{ splits: Split[] }>({ splits: [] });
    const { user } = useContext(AuthContext);
    const { setSplit } = useContext(SplitContext);
    const navigate = useNavigate();
    useEffect(() => {
        getAllUserSplits(user.id).then((response) => {
            setResponse(response);
        });
    }, []);

    return (
        <>
            <AppNavbar section="Dashboard" dashboard={true} />

            <div className="px-[20%] py-10">
                <div className="flex w-full flex-col gap-10 rounded-lg border border-light-gray p-10">
                    <div className="flex flex-row justify-between">
                        <h2 className="text-center font-medium">{response.splits.length === 0 ? 'No Split yet !' : 'Choose a split !'}</h2>
                        <div className="flex flex-row gap-10">
                            <button className="text-purple-linear rounded-md border border-purple-primary px-3 py-2">Create Split</button>
                            <button className="text-green-linear rounded-md border border-green-primary px-3 py-2">Join Split</button>
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
                                    name: splitInfo[0].display_name,
                                    owner: splitInfo[0].owner_id,
                                    members: splitInfo[0].users,
                                    transactions: splitInfo[0].transactions,
                                });
                                navigate('/splits/' + splitItem.id);
                            }}
                        >
                            <div className="flex flex-row items-center justify-start gap-10" key={splitItem.id}>
                                <div className="h-[64px] w-[64px] rounded-full bg-abstract bg-cover bg-no-repeat focus:outline-none"></div>
                                <h3>{splitItem.display_name}</h3>
                                <h4>{/* Ajoutez ici le contenu que vous souhaitez afficher pour chaque splitItem */}</h4>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}
