import React, { useState } from 'react';
import { FaFilePdf, FaFileImage, FaFileWord, FaFileExcel, FaCalendarAlt, FaArrowAltCircleDown } from "react-icons/fa";
import { GiCheckMark } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

export default function FilePreview({ receipt }) {
    const { file_url: fileUrl, description, createdAt, status } = receipt;
    const [documentType] = useState(['doc', 'docx', 'pdf', 'odt', 'csv']);
    const [imageType] = useState(['png', 'jpeg', 'jpg']);
    const [content] = useState(description || 'No description provided');

    const checkFileType = (fileUrl) => {
        if (documentType.includes(extracFileExtension(fileUrl))) return 'word';
        else if (imageType.includes(extracFileExtension(fileUrl))) return 'image';
        else return 'unknown';
    }
    const extracFileExtension = (fileUrl) => {
        const extention = fileUrl?.split('.')
        return extention[extention?.length - 1]?.toLowerCase()
    }
    const shorttenUrl = (fileUrl) => {
        const removed = fileUrl.slice(0, 25);
        return `${removed}...`
    }

    return (
        <div>
            {checkFileType(fileUrl) === 'word' &&
                <div className="flex flex-col space-y-2 border border-slate-200 px-3 rounded-md shadow-sm">
                    <div className="flex justify-between items-center border-b border-slate-300 space-x-3 py-3">
                        <div className="flex items-center space-x-3">
                            {['doc', 'docx'].includes(extracFileExtension(fileUrl)) && <FaFileWord className="text-blue-900 text-xl font-bold" />}
                            {extracFileExtension(fileUrl) === 'csv' && <FaFileExcel className="text-blue-900 text-xl font-bold" />}
                            {extracFileExtension(fileUrl) === 'pdf' && <FaFilePdf className="text-blue-900 text-xl font-bold" />}
                            <p className="text-slate-500 font-normal text-md">{shorttenUrl(fileUrl)}</p>
                        </div>
                        <a className="text-blue-900 text-2xl font-bold" href={fileUrl} download>
                            <FaArrowAltCircleDown />
                        </a>
                    </div>
                    <div className="flex items-center space-x-3 border-b border-slate-300 py-2">
                        <FaCalendarAlt className="text-blue-900 text-xl" />
                        <p className='text-slate-500 text-md'>
                            <span>{createdAt?.split('T')[0]}</span>
                            <small className='font-medium ml-2'>{createdAt?.split('T')[1]?.split('.')[0]}</small>
                        </p>
                    </div>
                    <div className="flex items-center border-b border-slate-300 pb-3 pt-1">
                        <textarea readOnly cols="90" rows="1" className="text-slate-500 text-md outline-none" value={content} />
                    </div>
                    <div className="flex justify-between items-center space-x-3 border-slate-300 pb-2 pt-[2px]">
                        <p className='font-medium text-slate-500'>Status:
                            {status === '0' && <span className='text-yellow-500 ml-2'>Pending</span>}
                            {status === '1' && <span className='text-green-500 ml-2'>Approved</span>}
                            {status === '-1' && <span className='text-red-500 ml-2'>Rejected</span>}
                        </p>
                        <p className='flex items-center space-x-3'>
                            <button className='ring-1 ring-red-500 outline-none rounded-full
                            xs:rounded-md px-3 py-1 hover:bg-red-500 hover:text-white hover:ring-0 hover:cursor-pointer
                            w-9 h-9 xs:w-auto xs:h-auto inline-flex justify-center items-center'>
                                <span className='hidden xs:block'>Reject</span>
                                <RxCross2 className='block xs:hidden' />
                            </button>
                            <button className='bg-green-500 hover:bg-green-600 text-white border-none
                            outline-none rounded-full
                            xs:rounded-md px-3 py-1 w-9 h-9 xs:w-auto xs:h-auto hover:cursor-pointer inline-flex justify-center items-center'>
                                <span className='hidden xs:block'>Approve</span>
                                <GiCheckMark className='block xs:hidden' />
                            </button>
                        </p>
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
                            <small className='font-medium ml-2'>{createdAt?.split('T')[1]?.split('.')[0]}</small>
                        </p>
                    </div>
                    <div className="flex items-center border-b border-slate-300 pb-3 pt-1">
                        <textarea readOnly cols="90" rows="1" className="text-slate-500 text-md outline-none" value={content} />
                    </div>
                    <div className="flex justify-between items-center space-x-3 border-slate-300 pb-2 pt-[2px]">
                        <p className='font-medium text-slate-500'>Status:
                            {status === '0' && <span className='text-yellow-500 ml-2'>Pending</span>}
                            {status === '1' && <span className='text-green-500 ml-2'>Approved</span>}
                            {status === '-1' && <span className='text-red-500 ml-2'>Rejected</span>}
                        </p>
                        <p className='flex items-center space-x-3'>
                            <button className='ring-1 ring-red-500 outline-none rounded-full
                            xs:rounded-md px-3 py-1 hover:bg-red-500 hover:text-white hover:ring-0 hover:cursor-pointer
                            w-9 h-9 xs:w-auto xs:h-auto inline-flex justify-center items-center'>
                                <span className='hidden xs:block'>Reject</span>
                                <RxCross2 className='block xs:hidden' />
                            </button>
                            <button className='bg-green-500 hover:bg-green-600 text-white border-none
                            outline-none rounded-full
                            xs:rounded-md px-3 py-1 w-9 h-9 xs:w-auto xs:h-auto hover:cursor-pointer inline-flex justify-center items-center'>
                                <span className='hidden xs:block'>Approve</span>
                                <GiCheckMark className='block xs:hidden' />
                            </button>
                        </p>
                    </div>

                </div>
            }
            {checkFileType(fileUrl) === 'unknown' &&
                <div className="w-full h-full">unsupported file format</div>
            }
        </div >
    )
}
