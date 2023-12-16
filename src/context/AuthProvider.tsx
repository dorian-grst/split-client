import { PropsWithChildren, createContext, useState } from 'react';

interface User {
    id: string;
    email: string;
    splits: [];
}

export const defaultUser: User = {
    id: '',
    email: '',
    splits: [],
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

    return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
}
