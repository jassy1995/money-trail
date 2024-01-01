import { useState, Fragment } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { MdUpload } from "react-icons/md";
import UploadCard from '../components/UploadCard';
import UploadForm from '../components/modals/UploadForm';
import { useGetPaymentRecords } from "../services/apis/payment";
import BallLoader from '../components/globals/BallLoader';
import { LoaderIndicator } from '../components/globals/LoaderIndicator';
import ViewDetail from '../components/modals/ViewDetail';
import useDebouncedSearch from '../hooks/useSearch';
import NoRecordFound from '../components/globals/NoRecordFound';

export default function Home() {
    const [open, setOpen] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [isSearched, setIsSearched] = useState(false);
    const [searchParam, setSearchParam] = useState('');
    const [requestDetail, setRequestDetail] = useState({});
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useGetPaymentRecords({ pageSize: 1, isSearched, searchParam });

    const searchRef = useDebouncedSearch((query) => {
        if (query) {
            setIsSearched(true);
            setSearchParam(query);
        } else {
            setIsSearched(false);
        }
    }, 800);


    if (status === 'pending') return <LoaderIndicator counts={[1, 2, 3]} />
    else if (status === 'error') return <p>{error.message}</p>
    else {
        return (
            <DashboardLayout>
                <UploadForm open={open} setClose={() => setOpen(false)} title='Upload file' />
                <ViewDetail open={openView} request={requestDetail} setClose={() => setOpenView(false)} title='View Detail' />
                {
                    status === 'pending' || (isFetching && !isFetchingNextPage) && !isSearched ? <LoaderIndicator counts={[1, 2, 3]} />
                        : status === 'error' ? (<p>{error.message}</p>)
                            : (
                                <div className='flex flex-col'>
                                    <div className='flex flex-col space-y-4 w-full'>

                                        <div className='p-5 bg-white flex justify-between items-center card'>
                                            <h5 className="title m-0 hidden ss:block">
                                                <span>Customers</span>
                                                {!isFetching && <span className="bg-red-500 text-white text-sm rounded-full inline-flex justify-center items-center font-medium px-2 py-[1px] ml-2">{data?.pages[data.pages.length - 1]?.data?.total}</span>}
                                            </h5>
                                            <div className="m-0 ss:w-1/3 lg:w-1/2">
                                                <input ref={searchRef} type="search" name="search" id="search" className="form-control rounded-full px-3 py-2 border border-[#e0e3e6]"
                                                    placeholder="Search.." />
                                            </div>
                                            <button onClick={() => setOpen(true)} className="border border-slate-200 px-3 py-[5px] rounded-full inline-flex justify-center items-center">
                                                <MdUpload className='text-[#9BA3AF] xs:w-5 xs:h-5 w-6 h-6' />
                                                <span className='text-[#9BA3AF] hidden xs:block'>New upload</span>
                                            </button>
                                        </div>

                                        {isSearched && isFetching && <LoaderIndicator counts={[1, 2, 3]} />}
                                        {(isSearched && !isFetching && !data?.pages[data.pages.length - 1]?.data?.response.length) && <NoRecordFound />}
                                        {(!isFetching || isFetching && !isSearched) && data?.pages?.map((group, i) => (
                                            <Fragment key={i}>
                                                {
                                                    group?.data.response?.map((record, i) => (
                                                        <UploadCard key={i} record={record} setCurrentRequest={() => {
                                                            setRequestDetail(record); setOpenView(true);
                                                        }} />
                                                    ))
                                                }
                                            </Fragment>

                                        ))}
                                    </div>
                                    <div className='mt-4 text-center'>
                                        {(data?.pages[data.pages.length - 1]?.data?.end?.toString() === 'false' && !isFetchingNextPage) &&
                                            <button className='border border-slate-300 rounded-md inline-flex justify-center items-center px-3 card py-2 text-slate-600 font-medium hover:bg-slate-200' onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                                                Load more
                                            </button>
                                        }
                                        {(data?.pages[data.pages.length - 1]?.data?.end?.toString() === 'true' && !isFetching && !isFetchingNextPage) && <div className='inline-flex justify-center items-center text-slate-400 font-normal w-full italic'>Nothing more to load! You have reach the end of the records.</div>}
                                        {isFetchingNextPage && <div className='inline-flex justify-center items-center text-slate-400 font-normal w-full italic'>
                                            <BallLoader />
                                        </div>}
                                    </div>
                                </div>
                            )



                }
            </DashboardLayout >
        )

    }

}

