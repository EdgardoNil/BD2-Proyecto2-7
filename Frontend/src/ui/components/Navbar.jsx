import { useContext, Fragment } from 'react';
import { Disclosure, Menu, Transition, MenuItem, MenuItems, MenuButton } from '@headlessui/react'
import { useNavigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../../auth/context/AuthContext';
import Logo from '../../assets/logo.svg'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const usuario = [
    { ID: 1, FotoPerfil: 'https://guatemalavisible.net/wp-content/uploads/2023/06/Bernardo_Arevalo_SEMILLA.jpg' },]


export default function Navbar({ navigation }) {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const onLogout = () => {
        logout();
        navigate('/login', {
            replace: true
        });
    }

    const onNavigate = (route) => {

        navigate(route, {
          replace: false
        });
    
      }

    return (
        <>
            <Disclosure as="nav" className="bg-primary-100">
                <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                    <div className="relative flex h-16 items-center justify-between">
                        <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                            <div className="flex flex-shrink-0 items-center">
                                <img
                                    className="h-8 w-auto sm:h-10"
                                    src={Logo}
                                    alt="Fithub Logo"
                                />
                            </div>
                            <div className="hidden sm:ml-6 sm:block">
                                <div className="flex space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            // href={item.href}
                                            onClick={() => onNavigate(item.href)}
                                            className={classNames(
                                                item.current ? 'bg-bg-100 text-white' : 'text-gray-300 hover:bg-primary-200 hover:text-white',
                                                'rounded-md px-3 py-2 text-m font-medium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                            {/* Profile dropdown */}
                            <Menu as="div" className="relative ml-3">
                                <div>
                                    {usuario.map((usuario) => (
                                        <MenuButton key={usuario.ID} className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src={`${usuario.FotoPerfil}`}
                                                alt=""
                                            />
                                        </MenuButton>
                                    ))}
                                </div>
                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95"
                                >
                                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-bg200 py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <MenuItem>
                                            {({ active }) => (
                                                <a
                                                    onClick={onLogout}
                                                    className={classNames(active ? 'bg-primary-300' : '', 'block px-4 py-2 text-sm text-text100')}
                                                >
                                                    Salir
                                                </a>
                                            )}
                                        </MenuItem>
                                    </MenuItems>
                                </Transition>
                            </Menu>
                        </div>
                    </div>
                </div>



            </Disclosure>
            <div className='px-5'>
                <Outlet />
            </div>
        </>
    );
}
