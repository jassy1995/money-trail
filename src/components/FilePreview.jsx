import React, { useState, useMemo } from 'react';
import { FaFilePdf, FaUser, FaFileImage, FaFileWord, FaFileExcel, FaCalendarAlt, FaArrowAltCircleDown, FaQuestion } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { BsBank2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import ConfirmDialog from './globals/ConfirmDialog';
import { useApprove, useReject } from "../services/apis/payment";
import { notify } from '../helpers/global';
import FormDialog from './globals/FormDialog';
import CommentDialog from './globals/CommentDialog';
import { formatCurrency, getStatus, isoTimeFormater, removeKobo, shorttenUrl } from '../lib/util';
import useGlobalStore from "../stores/global";

export const ButtonNM = ({ handler, children, className }) => {
    return <button onClick={handler} className={`text-white border-none outline-none rounded-full xs:rounded-md px-3 py-1 w-9 h-9 xs:w-auto xs:h-auto hover:cursor-pointer inline-flex justify-center items-center ${className}`}>
        {children}
    </button>
}
export const ButtonRD = ({ handler, children, className }) => {
    return <button onClick={handler} className={`ring-1 outline-none rounded-full xs:rounded-md px-3 py-1  hover:text-white hover:ring-0 hover:cursor-pointer w-9 h-9 xs:w-auto xs:h-auto inline-flex justify-center items-center ${className}`}>
        {children}
    </button>
}

export default function FilePreview({ receipt, updateReceipt }) {
    const { auth_user } = useGlobalStore(state => state.data);
    const { file_url: fileUrl, description, createdAt, status, id, bank, receipt_amount, uploader_name, uploader_phone, reject_comment } = receipt;
    const { mutateAsync: approveReceipt, isLoading: isApproving } = useApprove();
    const { mutateAsync: rejectReceipt, isLoading: isRejecting } = useReject();
    const [documentType] = useState(['doc', 'docx', 'pdf', 'odt', 'csv', 'xlsx']);
    const [imageType] = useState(['png', 'jpeg', 'jpg']);
    const [content] = useState(description || 'No description provided');
    const [open, setOpen] = useState(false);
    const [openForm, setOpenForm] = useState(false);
    const [openComment, setOpenComment] = useState(false);

    const checkFileType = (fileUrl) => {
        if (documentType.includes(extracFileExtension(fileUrl))) return 'word';
        else if (imageType.includes(extracFileExtension(fileUrl))) return 'image';
        else return 'unknown';
    }
    const extracFileExtension = (fileUrl) => {
        const extention = fileUrl?.split('.')
        return extention[extention?.length - 1]?.toLowerCase()
    }

    const handleClose = () => {
        setOpen(false);
    };
    const handleCloseForm = () => {
        setOpenForm(false);
    };
    const handleCloseComment = () => {
        setOpenComment(false);
    };

    const handleAgreeDisagree = async (action) => {
        try {
            if (action === 'agree') {
                const { data: { status } } = await approveReceipt({ receipt_id: `${id}`, status: '1' });
                if (status) {
                    updateReceipt({ id, status: '1' });
                    notify({ type: 'success', message: 'successfully approved' });
                    handleClose();
                } else {
                    notify({ type: 'error', message: 'unable to approve the receipt' });
                }
            } else {
                handleClose();
            }
        } catch (error) {
            console.log(error);
            notify({ type: 'error', message: 'Operation failed!' });
        }
    };

    const onSubmitCancel = async ({ action, payload }) => {
        try {
            if (action === 'submit') {
                const { data: { status } } = await rejectReceipt({ receipt_id: `${id}`, status: '-1', comment: payload });
                if (status) {
                    updateReceipt({ id, status: '-1', comment: payload });
                    notify({ type: 'success', message: 'successfully rejected' });
                    handleCloseForm();
                } else {
                    notify({ type: 'error', message: 'unable to reject the receipt' });
                }
            } else {
                handleCloseForm()
            }
        } catch (error) {
            console.log(error);
            notify({ type: 'error', message: 'Operation failed!' });
        }
    }

    const onOkay = () => {
        handleCloseComment()
    }

    const formatAmount = (value) => {
        const amount = formatCurrency(value);
        return removeKobo(amount);
    }

    const requestStatus = useMemo(() => getStatus(status), [status]);

    return (
        <div>
            {open && <ConfirmDialog open={open} handleClose={handleClose} loading={isApproving} onAgreeDisagree={handleAgreeDisagree} />}
            {openForm && <FormDialog open={openForm} handleClose={handleCloseForm} loading={isRejecting} onSubmitCancel={onSubmitCancel} />}
            {openComment && <CommentDialog open={openComment} handleClose={handleCloseComment} comment={reject_comment} onOkay={onOkay} />}
            {checkFileType(fileUrl) === 'word' &&
                <div className="flex flex-col space-y-2 border border-slate-200 px-3 rounded-md shadow-sm">
                    <div className="flex justify-between items-center border-b border-slate-300 space-x-3 py-3">
                        <div className="flex items-center space-x-3">
                            {['doc', 'docx', 'odt'].includes(extracFileExtension(fileUrl)) && <FaFileWord className="text-blue-500 text-xl font-bold" />}
                            {(extracFileExtension(fileUrl) === 'csv' || extracFileExtension(fileUrl) === 'xlsx') && <FaFileExcel className="text-green-500 text-xl font-bold" />}
                            {extracFileExtension(fileUrl) === 'pdf' && <FaFilePdf className="text-red-500 text-xl font-bold" />}
                            <p className="text-slate-500 font-normal text-md">{shorttenUrl(fileUrl)}</p>
                        </div>
                        <a className="text-blue-900 text-2xl font-bold" target="_blank" href={fileUrl} download>
                            <FaArrowAltCircleDown />
                        </a>
                    </div>
                    <div className="flex items-center space-x-3 border-b border-slate-300 py-2">
                        <FaCalendarAlt className="text-blue-900 text-xl" />
                        <p className='text-slate-500 text-md'>
                            <span>{createdAt?.split('T')[0]}</span>
                            <small className='font-medium ml-2'>{isoTimeFormater(createdAt)}</small>
                        </p>
                    </div>
                    <div className='text-slate-500 capitalize border-b pb-3 pt-1 text-md flex justify-between items-center'>
                        <div className='flex items-center space-x-3'>
                            <BsBank2 className="text-blue-900 text-xl" />
                            <span className='uppercase'>{bank?.replace('-', ' ')}</span>
                        </div>
                        <div>
                            {formatAmount(receipt_amount)}
                        </div>
                    </div>
                    <div className='text-slate-500 capitalize border-b pb-3 pt-1 text-md flex justify-between items-center'>
                        <div className='flex items-center space-x-3'>
                            <FaUser className="text-blue-900 text-xl" />
                            <span>{uploader_name}</span>
                        </div>
                        <div>{uploader_phone}</div>
                    </div>
                    <div className="flex items-center border-b border-slate-300 pb-3 pt-1">
                        <textarea readOnly cols="90" rows="1" className="text-slate-500 text-md outline-none" value={content} />
                    </div>
                    <div className="flex justify-between items-center space-x-3 border-slate-300 pb-2 pt-[2px]">
                        <p className='font-medium text-slate-500'>Status:
                            <span className={`ml-2 capitalize ${status === '0' && 'text-yellow-500'} ${status === '1' && 'text-green-500'} ${status === '-1' && 'text-red-500'}`}>{requestStatus}</span>
                        </p>
                        {(status === '0' && auth_user.isAdmin) &&
                            <p className='flex items-center space-x-3'>
                                <ButtonRD handler={() => setOpenForm(true)} className='ring-red-500 hover:bg-red-500'>
                                    <span className='hidden xs:block'>Reject</span>
                                    <RxCross2 className='block xs:hidden' />
                                </ButtonRD>
                                <ButtonNM handler={() => setOpen(true)} className='bg-green-500 hover:bg-green-600'>
                                    <span className='hidden xs:block'>Approve</span>
                                    <GiCheckMark className='block xs:hidden' />
                                </ButtonNM>
                            </p>
                        }
                        {status === '-1' &&
                            <button onClick={() => setOpenComment(true)} className='inline-flex justify-center items-center border border-blue-900 hover:bg-slate-200 rounded-full w-7 h-7 hover:border-0'>
                                <FaQuestion />
                            </button>
                        }
                    </div>

                </div>
            }
            {checkFileType(fileUrl) === 'image' &&
                <div className="flex flex-col space-y-2 border border-slate-200 px-3 rounded-md shadow-sm">
                    <div className="flex justify-between items-center border-b border-slate-300 space-x-3 py-3">
                        <div className="flex items-center space-x-3">
                            {imageType.includes(extracFileExtension(fileUrl)) && <FaFileImage className="text-blue-900 text-xl" />}
                            <p className="text-slate-500  font-normal text-md">{shorttenUrl(fileUrl)}</p>
                        </div>
                        <a className="text-blue-900 text-2xl" target="_blank" href={fileUrl} download>
                            <FaArrowAltCircleDown />
                        </a>

                    </div>
                    <div className="flex items-center space-x-3 border-b border-slate-300 py-2">
                        <FaCalendarAlt className="text-blue-900 text-xl" />
                        <p className='text-slate-500 text-md'>
                            <span>{createdAt?.split('T')[0]}</span>
                            <small className='font-medium ml-2'>{isoTimeFormater(createdAt)}</small>
                        </p>
                    </div>
                    <div className='text-slate-500 capitalize border-b pb-3 pt-1 text-md flex justify-between items-center'>
                        <div className='flex items-center space-x-3'>
                            <BsBank2 className="text-blue-900 text-xl" />
                            <span className='uppercase'>{bank?.replace('-', ' ')}</span>
                        </div>
                        <div>
                            {formatAmount(receipt_amount)}
                        </div>
                    </div>
                    <div className='text-slate-500 capitalize border-b pb-3 pt-1 text-md flex justify-between items-center'>
                        <div className='flex items-center space-x-3'>
                            <FaUser className="text-blue-900 text-xl" />
                            <span>{uploader_name}</span>
                        </div>
                        <div>{uploader_phone}</div>
                    </div>
                    <div className="flex items-center border-b border-slate-300 pb-3 pt-1">
                        <textarea readOnly cols="90" rows="1" className="text-slate-500 text-md outline-none" value={content} />
                    </div>
                    <div className="flex justify-between items-center space-x-3 border-slate-300 pb-2 pt-[2px]">
                        <p className='font-medium text-slate-500'>Status:
                            <span className={`ml-2 capitalize ${status === '0' && 'text-yellow-500'} ${status === '1' && 'text-green-500'} ${status === '-1' && 'text-red-500'}`}>{requestStatus}</span>
                        </p>
                        {(status === '0' && auth_user.isAdmin) &&
                            <p className='flex items-center space-x-3'>
                                <ButtonRD handler={() => setOpenForm(true)} className='ring-red-500 hover:bg-red-500'>
                                    <span className='hidden xs:block'>Reject</span>
                                    <RxCross2 className='block xs:hidden' />
                                </ButtonRD>
                                <ButtonNM handler={() => setOpen(true)} className='bg-green-500 hover:bg-green-600'>
                                    <span className='hidden xs:block'>Approve</span>
                                    <GiCheckMark className='block xs:hidden' />
                                </ButtonNM>
                            </p>
                        }
                        {status === '-1' &&
                            <button onClick={() => setOpenComment(true)} className='inline-flex justify-center items-center border border-blue-900 hover:bg-slate-200 rounded-full w-7 h-7 hover:border-0'>
                                <FaQuestion />
                            </button>
                        }
                    </div>

                </div>
            }
            {checkFileType(fileUrl) === 'unknown' &&
                <div className="w-full h-full">unsupported file format</div>
            }
        </div >
    )
}
