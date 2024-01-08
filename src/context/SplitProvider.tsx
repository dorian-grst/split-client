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
    owner: string;
    members: Member[];
    transactions: string[];
}

export const defaultSplit: Split = {
    id: '',
    display_name: '',
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
    const { id } = useParams();

    useEffect(() => {
        async function fetchSplitInfos() {
            if (id) {
                try {
                    const splitInfo = await findSplitById(id);
                    setSplit({
                        id: splitInfo[0].id,
                        display_name: splitInfo[0].display_name,
                        owner: splitInfo[0].owner_id,
                        members: splitInfo[0].users,
                        transactions: splitInfo[0].transactions,
                    });
                } catch (error) {
                    console.error('Error fetching split information:', error);
                    // Gérer l'erreur, par exemple rediriger vers une page d'erreur.
                }
            }
        }
        fetchSplitInfos();
    }, []);

    return <SplitContext.Provider value={{ split, setSplit }}>{children}</SplitContext.Provider>;
}
