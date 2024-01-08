import axios from 'axios';
import toast from 'react-hot-toast';

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

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

export const getAllSplitUsers = async (userId: string) => {
    try {
        const response = await axios.get(VITE_API_ENDPOINT + '/v1/user/' + userId + '/splits', {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        toast.error('An error occured while fetching your splits.');
        console.error(error);
    }
};
