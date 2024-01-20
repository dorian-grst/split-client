import { ChevronUpDownIcon, PlusIcon } from '@heroicons/react/20/solid';
import { FingerPrintIcon } from '@heroicons/react/24/outline';
import ButtonDropdown from '@/components/dropdown/ButtonDropdown';
import { Menu, Transition } from '@headlessui/react';
import { useContext, useEffect, useState } from 'react';
import { SplitContext } from '@/context/SplitProvider';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '@/context/AuthProvider';
import { findSplitById } from '@/queries/split.queries';
import { getAllSplitUsers } from '@/queries/user.queries';

interface Split {
    id: string;
    display_name: string;
}

interface SplitMenuProps {
    onJoinSplitClick: () => void;
    onCreateSplitClick: () => void;
}

export default function SplitDropdown({ onJoinSplitClick, onCreateSplitClick }: SplitMenuProps) {
    const [response, setResponse] = useState<{ splits: Split[] }>({ splits: [] });
    const { user } = useContext(AuthContext);
    const { split, setSplit } = useContext(SplitContext);
    const navigate = useNavigate();

    useEffect(() => {
        getAllSplitUsers(user.id).then((response) => {
            setResponse(response);
        });
    }, [user.id, split]);

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="flex flex-row gap-[10px] rounded-lg px-3 py-2 font-medium transition duration-300 hover:bg-slate-100">
                <p className="text-gray-950">{split.display_name}</p>
                <ChevronUpDownIcon className="h-[20px] w-[20px] text-gray-950" />
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="absolute left-0 flex w-min min-w-[200px] max-w-[200px] flex-col rounded-lg border border-light-gray bg-slate-50 sm:min-w-[250px] sm:max-w-[250px]">
                    <Menu.Items className="flex flex-col px-2 pb-2 pt-4">
                        <Menu.Item>
                            <h3 className="px-3 pb-2 font-bold">Teams</h3>
                        </Menu.Item>
                        {response.splits.map((splitItem, index) => (
                            <Menu.Item key={index}>
                                <ButtonDropdown
                                    text={splitItem.display_name}
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
                                    additionalClasses="flex truncate w-full flex-row items-center justify-between gap-4"
                                />
                            </Menu.Item>
                        ))}
                        <Menu.Item>
                            <ButtonDropdown text="Create Split" icon={<PlusIcon />} onClick={onCreateSplitClick} textClasses="text-purple-linear" iconClasses="text-purple-primary" />
                        </Menu.Item>
                        <Menu.Item>
                            <ButtonDropdown text="Join Split" icon={<FingerPrintIcon />} onClick={onJoinSplitClick} textClasses="text-green-linear" iconClasses="text-green-primary" />
                        </Menu.Item>
                    </Menu.Items>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
