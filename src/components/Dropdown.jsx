import { useState } from 'react';
import { HiChevronDown } from "react-icons/hi";
import { IoMdPower, IoMdSettings } from "react-icons/io";
import { FaRegUserCircle, FaUserCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className='relative'>
            <div onClick={() => setIsOpen(!isOpen)} className='flex items-end space-x-[2px] cursor-pointer'>
                <h1 className='hidden xs:block'>Hi, Babatunde Joseph</h1>
                <FaUserCircle className='block xs:hidden w-7 h-7' />
                <HiChevronDown className='font-bold text-black' />
            </div>
            {isOpen &&
                <ul className='absolute top-8 right-0  border bg-white card w-48 flex flex-col text-sm'>
                    <li className='border-b py-3 hover:bg-slate-100 cursor-pointer'>
                        <span className='flex items-center space-x-2 px-5'>
                            < FaRegUserCircle />
                            <span className='capitalize'> Babatunde Joseph</span>
                        </span>
                    </li>
                    <li className='flex items-center space-x-2 px-5 hover:bg-slate-100 py-3 cursor-pointer'>
                        <IoMdSettings />
                        <span className='capitalize'>settings</span>
                    </li>
                    <Link to={`/auth`}>
                        <li className='flex items-center space-x-2 px-5 hover:bg-slate-100 py-3 cursor-pointer text-red-500'>
                            <IoMdPower />
                            <span className='capitalize'>logout</span>
                        </li>
                    </Link>
                </ul>
            }
        </div>
    )
}
