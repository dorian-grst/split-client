import { ArrowRightOnRectangleIcon, PlusIcon } from '@heroicons/react/20/solid';
import { FingerPrintIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';
import ButtonDropdown from '@/components/dropdown/ButtonDropdown';
import { Menu, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, defaultUser } from '@/context/AuthProvider';
import { useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ProfileMenuProps {
    onJoinSplitClick: () => void;
    onCreateSplitClick: () => void;
}

const VITE_API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export default function ProfileMenu({ onJoinSplitClick, onCreateSplitClick }: ProfileMenuProps) {
    const navigate = useNavigate();
    const { user, setUser } = useContext(AuthContext);

    function handleClick() {
        navigate('/teamID/settings');
    }

    function handleLogOut() {
        axios
            .post(
                VITE_API_ENDPOINT + '/v1/auth/logout',
                {},
                {
                    withCredentials: true,
                }
            )
            .then(() => {
                setUser(defaultUser);
                navigate('/login');
                toast.success('Vous avez été déconnecté');
            })
            .catch(() => {
                toast.error('Erreur lors de la déconnexion');
            });
    }

    const menuButtons = [
        { text: 'Account settings', icon: <Cog6ToothIcon />, onClick: handleClick, additionalClasses: 'text-black' },
        { text: 'Create Split', icon: <PlusIcon />, onClick: onCreateSplitClick, additionalClasses: 'text-black' },
        { text: 'Join Split', icon: <FingerPrintIcon />, onClick: onJoinSplitClick, additionalClasses: 'text-black' },
        { text: 'Log out', icon: <ArrowRightOnRectangleIcon />, onClick: handleLogOut, additionalClasses: 'text-red' },
    ];

    return (
        <Menu as="div" className="relative">
            <Menu.Button className="h-[28px] w-[28px] rounded-full bg-abstract bg-cover bg-no-repeat focus:outline-none" />
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="absolute right-0 top-4 flex w-min flex-col rounded-lg border border-light-gray bg-white px-2 pb-2 pt-4">
                    <Menu.Item>
                        <h3 className="px-3 pb-2 font-medium text-black">{user.email}</h3>
                    </Menu.Item>
                    {menuButtons.map((button, index) => (
                        <Menu.Item key={index}>
                            <ButtonDropdown text={button.text} icon={button.icon} onClick={button.onClick} additionalClasses={button.additionalClasses} />
                        </Menu.Item>
                    ))}
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
