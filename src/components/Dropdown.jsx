import { useMemo, useState } from 'react';
import useGlobalStore from '../stores/global';
import { HiChevronDown } from "react-icons/hi";
import { IoMdPower, IoMdSettings } from "react-icons/io";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { auth_user } = useGlobalStore(state => state.data);
    const updateUser = useGlobalStore((state) => state.setAuthUser);

    const logout = () => {
        updateUser(null);
        localStorage.removeItem('money_trail_user');
        navigate('/auth')
    }

    const generateFullName = (firstName, lastName) => {
        if (!firstName && !lastName) {
            return 'friend';
        } else if (!firstName || !lastName) {
            return (firstName || lastName).charAt(0).toUpperCase() + (firstName || lastName).slice(1).toLowerCase();
        } else {
            const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
            const formattedLastName = lastName.charAt(0).toUpperCase() + lastName.slice(1).toLowerCase();
            return `${formattedFirstName} ${formattedLastName}`;
        }
    }

    const fullName = useMemo(() => {
        return generateFullName(auth_user?.firstname, auth_user?.lastname), [auth_user?.firstname, auth_user?.lastname]
    });
    return (
        <div className='relative'>
            <div onClick={() => setIsOpen(!isOpen)} className='flex items-end space-x-[2px] cursor-pointer'>
                <h1 className='hidden xs:block'>Hi, {fullName}</h1>
                <FaUserCircle className='block xs:hidden w-7 h-7' />
                <HiChevronDown className='font-bold text-black' />
            </div>
            {isOpen &&
                <ul className='absolute top-8 right-0  border bg-white card w-52 flex flex-col text-sm'>
                    <li className='border-b py-3 hover:bg-slate-100 cursor-pointer'>
                        <span className='flex items-center space-x-2 px-5'>
                            < FaRegUserCircle />
                            <span className='capitalize'>{fullName}</span>
                        </span>
                    </li>
                    <li className='flex items-center space-x-2 px-5 hover:bg-slate-100 py-3 cursor-pointer'>
                        <IoMdSettings />
                        <span className='capitalize'>settings</span>
                    </li>
                    <li onClick={logout} className='flex items-center space-x-2 px-5 hover:bg-slate-100 py-3 cursor-pointer text-red-500'>
                        <IoMdPower />
                        <span className='capitalize'>logout</span>
                    </li>

                </ul>
            }
        </div>
    )
}
