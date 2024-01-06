import { Dialog, Listbox, Transition } from '@headlessui/react';
import InputGroupModal from './InputGroupModal';
import { Fragment, useContext, useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Member, SplitContext } from '@/context/SplitProvider';

interface CreateTransactionModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    textLeftButton: string;
    textRightButton: string;
    selected: Member | undefined;
    onClickLeftButton?: () => void;
    onClickRightButton: (selected: Member | undefined) => void; // Mettez à jour la signature
}

export default function CreateTransactionModal({ isOpen, setIsOpen, textLeftButton, textRightButton, selected: selectedValue, onClickLeftButton, onClickRightButton }: CreateTransactionModalProps) {
    const { split } = useContext(SplitContext);
    const [selected, setSelected] = useState<Member | undefined>(split?.members?.[0]);

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 w-min">
            <div className="fixed inset-0 bg-gray-950/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="rounded-lg border border-light-gray bg-white">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            onClickRightButton(selected);
                        }}
                    >
                        <div className="flex flex-col gap-[20px] border-b border-light-gray p-8">
                            <h1 className="text-purple-linear">Create transaction</h1>
                            <InputGroupModal name="name" label="Name" placeholder="Travel" />
                            <InputGroupModal name="amount" label="Amount" placeholder="100 €" />
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-950">Payed by</p>
                                <Listbox value={selected} onChange={setSelected}>
                                    <div className="relative mt-1">
                                        <Listbox.Button className="form-input w-[400px] cursor-default rounded-lg bg-white text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm">
                                            <span className="block truncate">{selected?.display_name ? selected?.display_name : selected?.email}</span>
                                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </span>
                                        </Listbox.Button>
                                        <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                                            {split?.members && split.members.length > 0 && (
                                                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                                                    {split?.members.map((member, idx) => (
                                                        <Listbox.Option
                                                            key={idx}
                                                            className={({ active }) =>
                                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-green-100 text-green-500' : 'text-gray-900'}`
                                                            }
                                                            value={member}
                                                        >
                                                            {({ selected }) => (
                                                                <>
                                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                                        {member.display_name ? member.display_name : member.email}
                                                                    </span>
                                                                    {selected ? (
                                                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                                                                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                        </span>
                                                                    ) : null}
                                                                </>
                                                            )}
                                                        </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                            )}
                                        </Transition>
                                    </div>
                                </Listbox>
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-950">Payed for</p>
                                {split.members ? (
                                    split.members.map((member) => (
                                        <div className="flex flex-row items-center gap-2" key={member.id}>
                                            <input
                                                type="checkbox"
                                                id={`payed_for_${member.id}`}
                                                name="payed_for"
                                                value={member.id}
                                                data-member-id={member.id}
                                                className="border-light-gray"
                                            />
                                            <label htmlFor={`payed_for_${member.id}`}>{member.display_name ? member.display_name : member.email}</label>
                                        </div>
                                    ))
                                ) : (
                                    <p>No members available</p>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-row justify-between p-8">
                            <button onClick={onClickLeftButton} className="cancel">
                                {textLeftButton}
                            </button>
                            <button type="submit" className="next">
                                {textRightButton}
                            </button>
                        </div>
                    </form>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
}
