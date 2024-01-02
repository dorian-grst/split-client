import { Dialog, Listbox, Transition } from '@headlessui/react';
import InputGroupModal from './InputGroupModal';
import { Fragment, useContext, useState } from 'react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { Member, SplitContext } from '@/context/SplitProvider';
import axios from 'axios';

interface CreateTransactionModalProps {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    textLeftButton: string;
    textRightButton: string;
    onClickLeftButton?: () => void;
    onClickRightButton?: () => void;
}

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

type TransactionSubmitForm = {
    name: string;
    amount: string;
    payed_by: string;
};

export default function CreateTransactionModal({ isOpen, setIsOpen, textLeftButton, textRightButton, onClickLeftButton, onClickRightButton }: CreateTransactionModalProps) {
    const { split } = useContext(SplitContext);
    const [selected, setSelected] = useState<Member | undefined>(split?.members?.[0]);

    const onSubmit = (data: TransactionSubmitForm) => {
        axios
            .post(VITE_API_ENDPOINT + '/v1/transaction', data, {
                withCredentials: true,
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    return (
        <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50 w-min">
            <div className="fixed inset-0 bg-gray-950/30" aria-hidden="true" />
            <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                <Dialog.Panel className="rounded-lg border border-light-gray bg-white">
                    <form
                        method="POST"
                        onSubmit={() => {}}
                    >
                        <div className="flex flex-col gap-[20px] border-b border-light-gray p-8">
                            <h1 className="text-purple-linear">Create transaction</h1>
                            <InputGroupModal label="Name" placeholder="Travel" />
                            <InputGroupModal label="Amount" placeholder="100 €" />
                            <div className="flex flex-col gap-2">
                                <p className="text-gray-950">Payed by</p>
                                <Listbox value={selected} onChange={setSelected}>
                                    <div className="relative mt-1">
                                        <Listbox.Button className="form-input w-[400px] cursor-default rounded-lg bg-white text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm">
                                            <span className="block truncate">{selected?.display_name}</span>
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
                                                                    <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{member.display_name}</span>
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
