import Dropdown from './Dropdown';

export default function Navbar() {
    return (
        <>
            <nav className='flex justify-between items-center bg-red-40 p-2'>
                <img src="../../../clan.png" alt="not exist" className='h-[30px] xs:h-[36px] max-w-[100%] rounded-full object-cover ' />
                <Dropdown />
            </nav>
        </>
    )
}
