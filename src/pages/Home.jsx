import { useState, Fragment } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { MdUpload } from "react-icons/md";
import UploadCard from '../components/UploadCard';
import UploadForm from '../components/modals/UploadForm';
import { useGetPaymentRecords } from "../services/apis/payment";
import LazyLoader from '../components/globals/LazyLoader';



const LoaderIndicator = () => {
    return (
        <div className='flex flex-col'>
            {
                [1, 2, 3].map((r, i) => (
                    <LazyLoader key={i} />
                ))
            }
        </div>
    )
}

export default function Home() {
    const [open, setOpen] = useState(false);
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useGetPaymentRecords({ pageSize: 2 });




    if (status === 'pending') return <LoaderIndicator />
    else if (status === 'error') return <p>{error.message}</p>
    else {
        return (
            <DashboardLayout>
                <UploadForm open={open} setClose={() => setOpen(false)} title='Upload file' />
                {
                    status === 'pending' ? <LoaderIndicator />
                        : status === 'error' ? (<p>{error.message}</p>)
                            : (
                                <div className='flex flex-col'>
                                    <div className='flex flex-col space-y-4 w-full'>

                                        <div className='p-5 bg-white flex justify-between items-center card'>
                                            <h5 className="title m-0 hidden ss:block">
                                                <span>Customers</span>
                                                <span className="bg-red-500 text-white text-sm rounded-full inline-flex justify-center items-center font-medium px-2 py-[1px] ml-2">{data?.pages[0]?.data?.total}</span>
                                            </h5>
                                            <div className="m-0 ss:w-1/3 lg:w-1/2">
                                                <input type="search" name="search" id="search" className="form-control rounded-full px-3 py-2 border border-[#e0e3e6]"
                                                    placeholder="Search.." />
                                            </div>
                                            <button onClick={() => setOpen(true)} className="border border-slate-200 px-3 py-[5px] rounded-full inline-flex justify-center items-center">
                                                <MdUpload className='text-[#9BA3AF] xs:w-5 xs:h-5 w-6 h-6' />
                                                <span className='text-[#9BA3AF] hidden xs:block'>New upload</span>
                                            </button>
                                        </div>

                                        {data?.pages?.map((group, i) => (
                                            <Fragment key={i}>
                                                {
                                                    group?.data.response?.map((record, i) => (
                                                        <UploadCard key={i} record={record} />
                                                    ))
                                                }
                                            </Fragment>

                                        ))}
                                    </div>
                                    <div className='mt-3 text-center'>
                                        {hasNextPage &&
                                            <button className='border border-slate-300 rounded-md inline-flex justify-center items-center px-3 py-2 text-slate-600 font-medium hover:bg-slate-200' onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                                                Load more
                                            </button>
                                        }
                                        {(!hasNextPage && !isFetching && !isFetchingNextPage) && <p className='inline-flex justify-center items-center text-slate-400 font-normal w-full italic'>Nothing more to load! You have reach the end of the records.</p>}
                                        {isFetchingNextPage && <p className='inline-flex justify-center items-center text-slate-400 font-normal w-full italic'>Loading more...</p>}
                                        {isFetching && <p className='inline-flex justify-center items-center text-slate-400 font-normal w-full italic'>Fetching...</p>}
                                    </div>
                                </div>
                            )



                }
            </DashboardLayout >
        )

    }

}

