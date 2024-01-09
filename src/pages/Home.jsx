import { useState, Fragment, useCallback } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { MdUpload } from "react-icons/md";
import UploadCard from '../components/UploadCard';
import UploadForm from '../components/modals/UploadForm';
import { useApprove, useGetPaymentRecords, useReject } from "../services/apis/payment";
import BallLoader from '../components/globals/BallLoader';
import { LoaderIndicator } from '../components/globals/LoaderIndicator';
import ViewDetail from '../components/modals/ViewDetail';
import useDebouncedSearch from '../hooks/useSearch';
import NoRecordFound from '../components/globals/NoRecordFound';
import ConfirmDialog from '../components/globals/ConfirmDialog';
import FormDialog from '../components/globals/FormDialog';
import { notify } from '../helpers/global';
import useGlobalStore from '../stores/global';

export default function Home() {
    const { auth_user } = useGlobalStore(state => state.data);
    const { mutateAsync: approveReceipt, isLoading: isApproving } = useApprove();
    const { mutateAsync: rejectReceipt, isLoading: isRejecting } = useReject();
    const [openForm, setOpenForm] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [openFormDialog, setOpenFormDialog] = useState(false);
    const [openCommentDialog, setOpenCommentDialog] = useState(false);
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
    } = useGetPaymentRecords({ pageSize: 50, isSearched, searchParam, isAdmin: auth_user.isAdmin, uploaderPhone: auth_user.phone });

    const searchRef = useDebouncedSearch((query) => {
        if (query) {
            setIsSearched(true);
            setSearchParam(query);
        } else {
            setIsSearched(false);
        }
    }, 800);

    const handleSetFormClose = useCallback(() => setOpenForm(false), []);
    const handleSetDetailClose = useCallback(() => setOpenView(false), []);
    const handleCurrentRequest = useCallback((record) => {
        setRequestDetail(record);
        setOpenView(true);
    }, []);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const handleCloseFormDialog = () => {
        setOpenFormDialog(false);
    };
    const handleCloseCommentDialog = () => {
        setOpenCommentDialog(false);
    };

    const handleAgreeDisagree = async (action) => {
        try {
            if (action === 'agree') {
                const { data: { status } } = await approveReceipt({ receipt_id: `${requestDetail?.id}`, status: '1' });
                if (status) {
                    // updateReceipt({ id:, status: '1' });
                    notify({ type: 'success', message: 'successfully approved' });
                    handleCloseDialog();
                    setRequestDetail({});
                } else {
                    notify({ type: 'error', message: 'unable to approve the receipt' });
                }
            } else {
                handleCloseDialog();
                setRequestDetail({});
            }
        } catch (error) {
            console.log(error);
            notify({ type: 'error', message: 'Operation failed!' });
        }
    };

    const onSubmitCancel = async ({ action, payload }) => {
        try {
            if (action === 'submit') {
                const { data: { status } } = await rejectReceipt({ receipt_id: `${requestDetail?.id}`, status: '-1', comment: payload });
                if (status) {
                    // updateReceipt({ id, status: '-1', comment: payload });
                    notify({ type: 'success', message: 'successfully rejected' });
                    handleCloseFormDialog();
                    setRequestDetail({});
                } else {
                    notify({ type: 'error', message: 'unable to reject the receipt' });
                }
            } else {
                handleCloseFormDialog();
                setRequestDetail({});
            }
        } catch (error) {
            console.log(error);
            notify({ type: 'error', message: 'Operation failed!' });
        }
    }

    if (status === 'error') return <p>{error.message}</p>
    else {
        return (
            <DashboardLayout>
                {openForm && <UploadForm open={openForm} setClose={handleSetFormClose} title='Upload file' />}
                {openView && <ViewDetail open={openView} request={requestDetail} setClose={handleSetDetailClose} title='View Detail' />}
                {openDialog && <ConfirmDialog open={openDialog} handleClose={handleCloseDialog} loading={isApproving} onAgreeDisagree={handleAgreeDisagree} />}
                {openFormDialog && <FormDialog open={openFormDialog} handleClose={handleCloseFormDialog} loading={isRejecting} onSubmitCancel={onSubmitCancel} />}
                {openCommentDialog && <CommentDialog open={openCommentDialog} handleClose={handleCloseCommentDialog} comment={requestDetail?.reject_comment} onOkay={onOkay} />}
                {
                    isFetching && !isFetchingNextPage && !isSearched ? <LoaderIndicator counts={[1, 2, 3]} />
                        : status === 'error' ? (<p>{error.message}</p>)
                            : (
                                <div className='flex flex-col'>
                                    <div className='flex flex-col space-y-4 w-full'>

                                        <div className='p-5 bg-white flex justify-between items-center card'>
                                            <h5 className="title m-0 hidden ss:block">
                                                <span>
                                                    {isSearched ? 'Customers' : 'Receipts'}
                                                </span>
                                                {!isFetching && <span className="bg-red-500 text-white text-sm rounded-full inline-flex justify-center items-center font-medium px-2 py-[1px] ml-2">{data?.pages[data.pages.length - 1]?.data?.total}</span>}
                                            </h5>
                                            <div className="m-0 ss:w-1/3 lg:w-1/2">
                                                <input ref={searchRef} type="search" name="search" id="search" className="form-control rounded-full px-3 py-2 border border-[#e0e3e6]"
                                                    placeholder="Search.." />
                                            </div>
                                            <button onClick={() => setOpenForm(true)} className="border border-slate-200 px-3 py-[5px] rounded-full inline-flex justify-center items-center">
                                                <MdUpload className='text-[#9BA3AF] xs:w-5 xs:h-5 w-6 h-6' />
                                                <span className='text-[#9BA3AF] hidden xs:block'>New upload</span>
                                            </button>
                                        </div>

                                        {isSearched && isFetching && <LoaderIndicator counts={[1, 2, 3]} />}
                                        {(isSearched && !isFetching && !data?.pages[data.pages.length - 1]?.data?.response.length) && <NoRecordFound message='No record found' />}
                                        {(!isFetching || isFetching && !isSearched) && data?.pages?.map((group, i) => (
                                            <Fragment key={i}>
                                                {
                                                    group?.data.response?.map((record, i) => (
                                                        <UploadCard key={i} record={record} setCurrentRequest={() => handleCurrentRequest(record)} isSearched={isSearched} setOpenDialog={() => { setRequestDetail(record); setOpenDialog(true) }} setOpenFormDialog={() => { setRequestDetail(record); setOpenFormDialog(true) }} />
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
                                        {(data?.pages[data.pages.length - 1]?.data?.end?.toString() === 'true' && !isFetching && !isFetchingNextPage && data?.pages[data.pages.length - 1]?.data?.response.length > 0) && <div className='inline-flex justify-center items-center text-slate-400 font-normal w-full italic'>Nothing more to load! You have reach the end of the records.</div>}
                                        {isFetchingNextPage && <div className='inline-flex justify-center items-center text-slate-400 font-normal w-full italic'>
                                            <BallLoader />
                                        </div>}
                                        {(!isSearched && !isFetching && !data?.pages[data.pages.length - 1]?.data?.response.length) && <NoRecordFound message='No record at the moment' />}
                                    </div>
                                </div>
                            )



                }
            </DashboardLayout >
        )

    }

}

