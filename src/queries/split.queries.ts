import axios from 'axios';
import toast from 'react-hot-toast';

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const findSplitById = async (splitId: string) => {
    try {
        const response = await axios.get(VITE_API_ENDPOINT + '/v1/split/' + splitId, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        toast.error('An error occured while fetching your split.');
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
        toast.error('An error occured while fetching your transactions.');
        console.error(error);
    }
};

export const updateSplitDisplayName = async (newDisplayName: string, splitId: string) => {
    try {
        const response = await axios.patch(
            VITE_API_ENDPOINT + '/v1/split/' + splitId + '/displayname',
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

export const updateSplitDescription = async (newDescription: string, splitId: string) => {
    try {
        const response = await axios.patch(
            VITE_API_ENDPOINT + '/v1/split/' + splitId + '/description',
            {
                description: newDescription,
            },
            { withCredentials: true }
        );
        toast.success('Description updated!');
        console.log(response.data);
    } catch (error) {
        toast.error('An error occured while updating your description.');
        console.error(error);
    }
};

export const generateInvitation = async (splitId: string) => {
    try {
        const response = await axios.post(
            VITE_API_ENDPOINT + '/v1/split/' + splitId + '/invitation',
            { splitId: splitId },
            {
                withCredentials: true,
            }
        );
        toast.success('Invitation code generated successfully');
        return response.data;
    } catch (error) {
        toast.error('Error generating invitation code');
        console.error(error);
    }
};

export const getInvitationsBySplitId = async (splitId: string) => {
    try {
        const response = await axios.get(VITE_API_ENDPOINT + '/v1/split/' + splitId + '/invitations', {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        toast.error('Error fetching invitations');
        console.error(error);
    }
};

export const deleteInvitationByToken = async (splitId: string, token: string) => {
    try {
        const response = await axios.delete(VITE_API_ENDPOINT + '/v1/split/' + splitId + '/invitation/' + token, {
            withCredentials: true,
        });
        toast.success('Invitation deleted successfully');
        return response.data;
    } catch (error) {
        toast.error('Error deleting invitation');
        console.error(error);
    }
};

export const joinSplit = async (token: string) => {
    try {
        const response = await axios.post(
            VITE_API_ENDPOINT + '/v1/split/join',
            { token: token },
            {
                withCredentials: true,
            }
        );
        toast.success('Split joined successfully');
        return response.data;
    } catch (error) {
        toast.error('Error joining split');
        console.error(error);
    }
};
