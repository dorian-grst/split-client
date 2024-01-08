import { Menu, Transition } from '@headlessui/react';
import { BellIcon, BellAlertIcon } from '@heroicons/react/24/outline';
import AlertDropdown from './AlertDropdown';

export default function NotificationDropdown({}) {
    const notifications = [
        { text: "Dorian vous invite a rejoindre 'DO3'" },
        { text: "Dorian vous invite a rejoindre 'DO3'" },
        { text: "Dorian vous invite a rejoindre 'DO3'" },
        { text: "Dorian vous invite a rejoindre 'DO3'" },
    ];

    const hasNotifications = notifications.length > 0;

    return (
        <Menu as="div" className="relative flex items-center justify-center">
            <Menu.Button>{hasNotifications ? <BellAlertIcon className="h-[28px] w-[28px] text-gray-950" /> : <BellIcon className="h-[28px] w-[28px] text-gray-950" />}</Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="p2 absolute right-0 top-4 flex min-w-[300px] flex-col rounded-lg border border-light-gray bg-white p-2">
                    {notifications.map((notification, index) => (
                        <Menu.Item key={index}>
                            <AlertDropdown text={notification.text} onClick={() => {}} />
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
