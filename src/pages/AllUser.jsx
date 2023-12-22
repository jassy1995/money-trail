import { useState, useRef } from 'react';
import DashboardLayout from '../components/DashboardLayout';
// import UserTable from '../components/tables/UserTable';
import Navbar from '../components/Navbar';
import useWindowSize from '../hooks/useWindowSize';
import useToggle from '../hooks/useToggle';
import useGlobalStore from '../stores/global';
import Button from '../components/globals/Button';
import UserForm from '../components/modals/AddUserForm';
import { useGetUsers } from '../services/apis/user';
import { IoSearch } from "react-icons/io5"
import http from '../lib/http';
import Spinner from '../components/globals/Spinner';
import { sortAlphabetically } from "../lib/util"



export default function AllUser() {
    const [limit] = useState(100);
    const [page, setPage] = useState(1)
    const { data: users, isLoading, isError, error, isFetching, isPreviousData } = useGetUsers({ page, limit });
    const { width } = useWindowSize();
    const [value, toggleValue] = useToggle(width <= 768 ? false : true);
    const setOpenAddUser = useGlobalStore((state) => state.setOpenAddUser);
    const openAddUser = useGlobalStore(({ data }) => data.isUserFormOpen);
    const [content, setContent] = useState('form');
    const [detail, setDetail] = useState({});
    const [searchResult, setSearchResult] = useState([])
    const [searched, setSearch] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const userRef = useRef(null);

    const handleDetail = (d) => {
        setDetail(d)
    }

    const handlePrevious = () => {
        setPage(old => Math.max(old - 1, 0))
        handleScrollToTop()
    }

    const handleNext = () => {
        setPage(old => old + 1)
        handleScrollToTop()
    }

    const handleChange = (e) => {
        if (!e.target.value) {
            setSearch(false)
            setIsSearching(false)
            setSearchResult([]);
            setSearchValue("")
            return;
        }
        setSearchValue(e.target.value)
    }

    const handleSearch = async () => {
        try {
            setSearch(true)
            setIsSearching(true)
            const { data } = await http.get(`/search-user?search=${searchValue}`)
            setSearchResult(data.data)
            setIsSearching(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleSorting = (items) => {
        return sortAlphabetically(items)
    }

    const handleScrollToTop = () => {
        if (userRef.current) {
            userRef.current.scrollTop = 0;
        }
    };

    return (
        <DashboardLayout isOpen={value} toggleValue={toggleValue}>
            <UserForm
                open={openAddUser}
                setClose={() => { setOpenAddUser(false); setContent('form'); setDetail({}) }}
                content={content}
                detail={detail}
            />
            <nav className="w-full bg-[#0084C7] px-4 sm:px-12 py-4 h-[360px]">
                <Navbar isOpen={value} toggleValue={toggleValue} title='users' />
            </nav>
            <div className='-mt-[240px]  px-4 sm:px-12 flex flex-col md:flex-row justify-between w-full space-y-6 space-x-0 md:space-x-6 md:space-y-0'>
                <div className='w-full rounded-md'>
                    <div className='bg-white shadow-md rounded-md flex flex-col space-y-[100px] xs:space-y-[70px] w-full relative'>
                        <div className='flex flex-col-reverse xs:flex-row justify-between absolute bg-white mb-20 pt-4 w-full px-6'>
                            <div className='w-full flex items-center space-x-3 max-w-[400px] mt-4 xs:mt-0 mb-2'>
                                <input type="text" className='border border-slate-200 rounded-lg w-full py-1 outline-none px-2 text-slate-600 input-focus' placeholder='search user' value={searchValue} onChange={handleChange} />
                                <button disabled={isSearching || !searchValue} onClick={handleSearch} className='rounded-lg bg-[#0084C7] p-2 text-white disabled:opacity-75 disabled:cursor-not-allowed'><IoSearch className='font-semibold' /></button>
                            </div>
                            <div className='flex items-center space-x-3 sm:space-x-10'>
                                <div className='w-full whitespace-nowrap'><span className='text-slate-500'>Total:</span> <strong>{users?.data?.total}</strong></div>
                                <div className='w-full whitespace-nowrap'><span className='text-slate-500'>Page:</span> <strong>{page}</strong></div>
                                <Button handler={() => { setContent('form'); setOpenAddUser(true) }}>New</Button>
                            </div>
                        </div>
                        <div className='overflow-y-auto h:[400px] xs:h-[500px] pr-6 pl-6 pb-6 rounded-sm' ref={userRef}>
                            {isLoading && <div className='flex flex-col justify-center items-center h-[500px]'>
                                <Spinner />
                            </div>}
                            {isSearching && <div className='flex flex-col justify-center items-center h-[500px]'>
                                <Spinner />
                            </div>}
                            {/* {!isLoading && !isError && !isSearching && (searchResult?.length || users?.data?.data?.length) &&
                                <UserTable users={searched ? handleSorting(searchResult) : handleSorting(users.data.data)} sendDetail={(e) => handleDetail(e)} openForm={() => {
                                    setContent('detail'); setOpenAddUser(true)
                                }} />
                            } */}
                            {(!isSearching && !searchResult.length) || (!isLoading && !isError && !users?.data?.data?.length) && <div className='flex flex-col justify-center items-center h-[70%]'>
                                <p className='text-slate-500'>No result at the moment.</p>
                            </div>}

                        </div>
                    </div>
                    {!searched &&
                        <div className='flex flex-col justify-center items-center space-y-3 my-3 xs:mt-6 xs:mb-0'>
                            {isFetching && !isLoading && <Spinner />}
                            {!isFetching &&
                                <div className="flex flex-row mx-auto">
                                    <button onClick={handlePrevious} disabled={isLoading || isFetching || page === 1} type="button" className="bg-gray-800 text-white rounded-l-md border-r border-gray-100 py-2 hover:bg-[#0084C7] hover:text-white px-3 disabled:opacity-75 disabled:cursor-not-allowed">
                                        <div className="flex flex-row align-middle">
                                            <svg className="w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd"></path>
                                            </svg>
                                            <p className="ml-2">Prev</p>
                                        </div>
                                    </button>
                                    <button onClick={handleNext} disabled={isLoading || isFetching || users.data.data.length < limit} type="button" className="bg-gray-800 text-white rounded-r-md py-2 border-l border-gray-200 hover:bg-[#0084C7] hover:text-white px-3 disabled:opacity-75 disabled:cursor-not-allowed">
                                        <div className="flex flex-row align-middle">
                                            <span className="mr-2">Next</span>
                                            <svg className="w-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                            </svg>
                                        </div>
                                    </button>
                                </div>

                            }
                        </div>
                    }
                </div>
            </div>
        </DashboardLayout>
    )
}
