import axios from 'axios';
import toast from 'react-hot-toast';

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const createSplit = async (displayName: string) => {
    try {
        const response = await axios.post(
            VITE_API_ENDPOINT + '/v1/split',
            { displayName: displayName },
            {
                withCredentials: true,
            }
        );
        toast.success('Split created successfully');
        return response.data;
    } catch (error) {
        toast.error('Error creating split');
        console.error(error);
    }
};

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

interface TransactionData {
    title: string;
    amount: string;
    splitId: string; // Remplacez le type par celui approprié
    payedById?: string; // Remplacez le type par celui approprié
    payedForIds: string[]; // Remplacez le type par celui approprié
}

export const createTransaction = async (data: TransactionData) => {
    try {
        const response = await axios.post(VITE_API_ENDPOINT + '/v1/transaction', data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        toast.error('An error occured while creating your transaction.');
        console.error(error);
    }
};

interface NotificationData {
    userId: string;
    splitId: string;
}

export const createNotification = async (data: NotificationData) => {
    try {
        const response = await axios.post(VITE_API_ENDPOINT + '/v1/split/' + data.splitId + '/notification', data, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getNotificationsBySplitId = async (splitId: string) => {
    try {
        const response = await axios.get(VITE_API_ENDPOINT + '/v1/split/' + splitId + '/notifications', {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
}

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

export const deleteTransactionById = async (transactionId: string) => {
    try {
        const response = await axios.delete(VITE_API_ENDPOINT + '/v1/transaction/' + transactionId + '/delete', {
            withCredentials: true,
        });
        toast.success('Transaction deleted successfully');
        return response.data;
    } catch (error) {
        toast.error('Error deleting transaction');
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

export const deleteNotificationById = async (notificationId: string) => {
    try {
        const response = await axios.delete(VITE_API_ENDPOINT + '/v1/split/notification/' + notificationId + '/delete', {
            withCredentials: true,
        });
        toast.success('Notification deleted successfully');
        return response.data;
    } catch (error) {
        toast.error('Error deleting notification');
        console.error(error);
    }
}

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
