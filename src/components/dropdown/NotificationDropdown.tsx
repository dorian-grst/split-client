import { Menu, Transition } from '@headlessui/react';
import { BellIcon, BellAlertIcon } from '@heroicons/react/24/outline';
import AlertDropdown from './AlertDropdown';
import { useEffect, useState } from 'react';
import { deleteNotificationById, getNotificationsBySplitId } from '@/queries/split.queries';
import { useParams } from 'react-router-dom';

interface User {
    id: string;
    email: string;
    display_name: string | null;
}

interface Notification {
    id: string;
    user_id: string;
    split: string;
    user: User;
}

export default function NotificationDropdown() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [refresh, setRefresh] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            getNotificationsBySplitId(id).then((response) => {
                setNotifications(response);
            });
        }
    }, [id, refresh]);

    const hasNotifications = notifications.length > 0;

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="flex">{hasNotifications ? <BellAlertIcon className="h-[28px] w-[28px] text-gray-950" /> : <BellIcon className="h-[28px] w-[28px] text-gray-950" />}</Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="absolute right-0 flex w-min min-w-[200px] max-w-[200px] lg:min-w-[300px] lg:max-w-[300px] flex-col rounded-lg border border-light-gray bg-slate-50 p-2">
                    {hasNotifications ? (
                        notifications.map((notification, index) => (
                            <Menu.Item key={index}>
                                <AlertDropdown
                                    text={notification.user.display_name ? notification.user.display_name : notification.user.email + ' a rejoint le split !'}
                                    onClick={() => {
                                        deleteNotificationById(notification.id).then(() => {
                                            setRefresh((prev) => !prev);
                                        });
                                    }}
                                />
                            </Menu.Item>
                        ))
                    ) : (
                        <p>No notifications available</p>
                    )}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
