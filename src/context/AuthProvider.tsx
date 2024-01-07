import axios from 'axios';
import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

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

export const updateUserDisplayName = async (newDisplayName: string, userId: string) => {
    try {
        const response = await axios.patch(
            VITE_API_ENDPOINT + '/v1/user/' + userId,
            {
                displayName: newDisplayName,
            },
            { withCredentials: true }
        );
        toast.success('Display name updated!');
        console.log(response.data);
    } catch (error) {
        toast.error('An error occured while updating your display name.');
        console.error(error);
    }
};

export async function getUserInfos(): Promise<{
    id: string;
    email: string;
    display_name: string;
}> {
    const user = await axios.get(VITE_API_ENDPOINT + '/v1/auth/me', {
        withCredentials: true,
    });
    return await user.data;
}

export const getAllUserSplits = async (userId: string) => {
    try {
        const response = await axios.get(VITE_API_ENDPOINT + '/v1/user/' + userId + '/splits', {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
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
