import { Transaction } from '@/components/layout/HistoryLayout';
import { findSplitById } from '@/queries/split.queries';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export interface Member {
    id: string;
    display_name: string;
    email: string;
    me: boolean;
}

interface Split {
    id: string;
    display_name: string;
    description: string;
    owner: string;
    members: Member[];
    transactions: Transaction[];
}

export const defaultSplit: Split = {
    id: '',
    display_name: '',
    description: '',
    owner: '',
    members: [],
    transactions: [],
};

export const SplitContext = createContext<{
    split: Split;
    setSplit: (split: Split) => void;
    updateSplit: (split_id: string) => void;
}>({
    split: defaultSplit,
    setSplit: () => {},
    updateSplit: () => {},
});

export default function SplitProvider({ children }: PropsWithChildren<{}>) {
    const [split, setSplit] = useState<Split>(defaultSplit);
    const params = useParams();

    const updateSplit = (split_id: string) => {
        findSplitById(split_id).then((response) => {
            console.log(response);
            setSplit({
                id: response[0].id,
                display_name: response[0].display_name,
                description: response[0].description,
                owner: response[0].owner_id,
                members: response[0].users,
                transactions: response[0].transactions,
            });
        });
    };

    useEffect(() => {
        if (params.id === undefined) return;
        updateSplit(params.id);
    }, [params]);

    return <SplitContext.Provider value={{ split, setSplit, updateSplit }}>{children}</SplitContext.Provider>;
}
