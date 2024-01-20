import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';

interface Question {
    question: string;
    answer: string;
}

interface FaqProps {
    questionList: Question[];
}

export default function Faq({ questionList }: FaqProps) {
    return (
        <div className="w-full lg:px-4 pb-64 lg:pt-16 lg:max-w-[80%]">
            <div className="flex w-full flex-col gap-2 rounded-2xl bg-gray-800 p-2">
                {questionList.map(({ question, answer }, index) => (
                    <Disclosure key={index} as="div">
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                                    <h3>{question}</h3>
                                    <ChevronUpIcon className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`} />
                                </Disclosure.Button>
                                <Disclosure.Panel className="px-4 pb-2 pt-4 text-sm text-gray-500">
                                    <p>{answer}</p>
                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>
                ))}
            </div>
        </div>
    );
}
