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

export const updateSplitDisplayName = async (newDisplayName: string, splitId: string) => {
    try {
        const response = await axios.patch(
            VITE_API_ENDPOINT + '/v1/split/' + splitId,
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

export const generateInvitation = async (splitId: string) => {
    try {
        const response = await axios.post(
            VITE_API_ENDPOINT + '/v1/split/' + splitId + '/invitation',
            { splitId: splitId },
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
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
        console.error(error);
    }
};

export const deleteInvitationByToken = async (splitId: string, token: string) => {
    try {
        const response = await axios.delete(VITE_API_ENDPOINT + '/v1/split/' + splitId + '/invitation/' + token, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
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
