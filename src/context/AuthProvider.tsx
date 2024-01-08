import { getUserInfos } from '@/queries/user.queries';
import { PropsWithChildren, createContext, useEffect, useState } from 'react';

interface User {
    id: string;
    email: string;
    display_name: string;
}

export const defaultUser: User = {
    id: '',
    email: '',
    display_name: '',
};

export const AuthContext = createContext<{
    user: User;
    setUser: (auth: User) => void;
}>({
    user: defaultUser,
    setUser: () => {},
});

export default function AuthProvider({ children }: PropsWithChildren<{}>) {
    const [user, setUser] = useState<User>(defaultUser);

    useEffect(() => {
        async function fetchUserInfos() {
            const userInfos = await getUserInfos();
            setUser(userInfos);
        }
        fetchUserInfos();
    }, []);

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
