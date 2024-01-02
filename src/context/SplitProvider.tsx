import axios from 'axios';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export interface Member {
    id: string;
    display_name: string;
    email: string;
    me: boolean;
}

interface Split {
    id: string;
    name: string;
    owner: string;
    members: Member[];
    transactions: string[];
}

export const findSplitById = async (splitId: string) => {
    try {
        const response = await axios.get(VITE_API_ENDPOINT + '/v1/split/' + splitId, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const findAllTransactions = async (splitId: string) => {
    try {
        const response = await axios.get(VITE_API_ENDPOINT + '/v1/split/' + splitId + '/transactions', {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const defaultSplit: Split = {
    id: '2c303584-b576-4a00-9097-9d9d8c218f03',
    name: '',
    owner: '',
    members: [],
    transactions: [],
};

export const SplitContext = createContext<{
    split: Split;
    setSplit: (split: Split) => void;
}>({
    split: defaultSplit,
    setSplit: () => {},
});

export default function SplitProvider({ children }: PropsWithChildren<{}>) {
    const [split, setSplit] = useState<Split>(defaultSplit);

    useEffect(() => {
        async function fetchSplitInfos() {
            const splitInfo = await findSplitById(split.id);
            setSplit({
                id: splitInfo[0].id,
                name: splitInfo[0].display_name,
                owner: splitInfo[0].owner_id,
                members: splitInfo[0].users,
                transactions: splitInfo[0].transactions,
            });
        }
        fetchSplitInfos();
    }, []);

    return <SplitContext.Provider value={{ split, setSplit }}>{children}</SplitContext.Provider>;
}
