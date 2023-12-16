import { MagnifyingGlassIcon, ChevronUpDownIcon, CheckIcon, PlusIcon } from '@heroicons/react/20/solid';
import { FingerPrintIcon } from '@heroicons/react/24/outline';
import ButtonDropdown from '@/components/dropdown/ButtonDropdown';
import { Menu, Transition } from '@headlessui/react';

const teamList = [
    {
        name: 'Team 1',
        actual: true,
    },
    {
        name: 'Team 2',
        actual: false,
    },
];

interface SplitMenuProps {
    actualTeam: string;
    onJoinSplitClick: () => void;
    onCreateSplitClick: () => void;
}

export default function SplitMenu({ actualTeam, onJoinSplitClick, onCreateSplitClick }: SplitMenuProps) {
    return (
        <Menu as="div" className="relative">
            <Menu.Button className="flex flex-row gap-[10px] rounded-lg px-3 py-2 font-medium transition duration-300 hover:bg-light-gray focus:outline-none">
                <p>{actualTeam}</p>
                <ChevronUpDownIcon className="h-[20px] w-[20px]" />
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="absolute left-0 top-4 flex w-min flex-col rounded-lg border border-light-gray bg-white">
                    <Menu.Item disabled={true}>
                        <div className="flex flex-row items-center justify-center gap-[10px] border-b border-light-gray px-4 py-4">
                            <MagnifyingGlassIcon className="h-[20px] w-[20px]" />
                            <input placeholder="Find Split" className="leading-none focus:outline-none"></input>
                        </div>
                    </Menu.Item>
                    <Menu.Items className="flex flex-col px-2 pb-2 pt-4">
                        <Menu.Item>
                            <h3 className="px-3 pb-2 font-bold">Teams</h3>
                        </Menu.Item>
                        {teamList.map((team, index) => (
                            <Menu.Item key={index}>
                                <ButtonDropdown
                                    text={team.name}
                                    icon={team.actual ? <CheckIcon /> : null}
                                    onClick={function (): void {}}
                                    additionalClasses="flex w-full flex-row items-center justify-between gap-4"
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
