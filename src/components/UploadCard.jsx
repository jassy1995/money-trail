import { memo, useMemo } from 'react';
import { formatCurrency, getStatus, isoTimeFormater, removeKobo, shorttenUrl } from '../lib/util';
import { ButtonNM } from './FilePreview';
import { RxCross2 } from 'react-icons/rx';
import { GiCheckMark } from 'react-icons/gi';
import useGlobalStore from '../stores/global';
import { FaArrowAltCircleDown } from 'react-icons/fa';

function UploadCard({ record, setCurrentRequest, isSearched, setOpenDialog, setOpenFormDialog, }) {
    const { auth_user } = useGlobalStore(state => state.data);
    const { status, borrower_name, request_id, borrower_phone, createdAt, borrower_photo, request, ...res } = record;
    const getImage = useMemo(() => {
        return (imageUrl) => {
            if (imageUrl && imageUrl.startsWith("https")) {
                return imageUrl;
            } else {
                return "../../avarter3.jpeg";
            }
        };
    }, [borrower_photo]);

    const formatAmount = (value) => {
        const amount = formatCurrency(value);
        return removeKobo(amount);
    }

    const processedImageUrl = getImage(borrower_photo || request?.borrower_photo);
    const requestStatus = useMemo(() => getStatus(status), [status]);


    return (
        <>
            {isSearched && <div onClick={setCurrentRequest} className='flex flex-col justify-center items-center sm:flex-row space-y-3 space-x-0 sm:space-y-0 sm:space-x-5 bg-white w-full p-4 card hover:cursor-pointer'>
                <img src={processedImageUrl} className='w-full h-[150px] sm:w-[80px] sm:h-[80px] object-cover rounded-md sm:rounded-full' alt="" />
                <div className='flex flex-col justify-star w-full'>
                    <div className="flex justify-between items-center">
                        <div className='capitalize text-black font-medium'>{borrower_name?.toLowerCase()} <span className=" text-black font-normal">({request_id})</span></div>
                        <div className="text-slate-500 hidden xs:block">{createdAt?.split('T')[0]}</div>
                    </div>
                    <div className='text-slate-600'>{request?.Email}</div>
                    <div className='text-slate-600'>{borrower_phone}</div>
                    <div className="text-slate-500 block xs:hidden">{createdAt?.split('T')[0]}</div>
                </div>
            </div>}
            {!isSearched &&
                <div className='flex flex-col justify-cente items-center sm:flex-row space-y-3 space-x-0 sm:space-y-0 sm:space-x-5 bg-white w-full p-4 card'>
                    <img src={processedImageUrl} className='w-full h-[300px] sm:w-[170px] sm:h-[170px] object-cover rounded-md' alt="" />
                    <div className='flex flex-col w-full'>
                        <div className="flex justify-between items-center">
                            <div className='capitalize text-black font-medium'>{request?.borrower_name?.toLowerCase()} • <span>{request?.borrower_phone}</span> </div>
                            <div className="text-slate-600 font-normal hidden xs:flex space-x-4">
                                <span>{formatAmount(res?.receipt_amount)}</span>
                                <span className={`px-2 rounded-md text-white capitalize font-normal ${status === '0' && 'bg-yellow-500'} ${status === '1' && 'bg-green-500'} ${status === '-1' && 'bg-red-500'}`}>{requestStatus}</span>

                            </div>
                        </div>
                        <div className='xs:hidden inline-flex items-center'>Amount • {formatAmount(res?.receipt_amount)}</div>
                        <div className='inline-flex items-center text-slate-700'>Bank • <span className='uppercase ml-1'>{res.bank?.replace('-', ' ')}</span></div>
                        <div className='text-slate-600 capitalize'>{res.uploader_name} • {res.uploader_phone} </div>
                        <div className="text-slate-500 font-normal underline-offset-2 flex space-x-3 items-center">
                            <span>{shorttenUrl(res?.file_url)}</span>
                            <a className="text-slate-400 text-2xl font-bold" target="_blank" href={res?.file_url} download>
                                <FaArrowAltCircleDown className='text-[24px] cursor-pointer' />
                            </a>
                        </div>
                        <div className='text-slate-500 text-md'>
                            <small>{createdAt?.split('T')[0]}</small>
                            <small className='font-medium ml-2'>{isoTimeFormater(createdAt)}</small>
                        </div>
                        <hr className='mt-2 mb-3' />
                        <div className={`flex  justify-between ${auth_user?.isAdmin ? 'flex-row-reverse xs:flex-row' : ''}`}>
                            {auth_user?.isAdmin &&
                                <div className='flex items-center space-x-3'>
                                    <ButtonNM handler={setOpenFormDialog} className='bg-red-500 hover:bg-red-500'>
                                        <span className='hidden xs:block'>Reject</span>
                                        <RxCross2 className='block xs:hidden' />
                                    </ButtonNM>
                                    <ButtonNM handler={setOpenDialog} className='bg-green-500 hover:bg-green-600'>
                                        <span className='hidden xs:block'>Approve</span>
                                        <GiCheckMark className='block xs:hidden' />
                                    </ButtonNM>
                                </div>
                            }
                            <div className="text-slate-600 flex items-center font-normal space-x-4">
                                <span>{request_id}</span>
                                <span className={`xs:hidden px-2 pb-[1px] sm:pb-0 rounded-md text-white capitalize font-normal ${status === '0' && 'bg-yellow-500'} ${status === '1' && 'bg-green-500'} ${status === '-1' && 'bg-red-500'}`}>{requestStatus}</span>

                            </div>
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export default memo(UploadCard)
