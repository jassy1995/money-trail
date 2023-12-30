import { useMemo } from 'react';

export default function UploadCard({ record, setCurrentRequest }) {
    const getImage = useMemo(() => {
        return (imageUrl) => {
            if (imageUrl && imageUrl.startsWith("https")) {
                return imageUrl;
            } else {
                return "../../avarter3.jpeg";
            }
        };
    }, [record.borrower_photo]);

    const processedImageUrl = getImage(record.borrower_photo);

    return (
        <div onClick={setCurrentRequest} className='flex flex-col justify-center items-center sm:flex-row space-y-3 space-x-0 sm:space-y-0 sm:space-x-5 bg-white w-full p-4 card hover:cursor-pointer'>
            <img src={processedImageUrl} className='w-full h-[150px] sm:w-[80px] sm:h-[80px] object-cover rounded-md sm:rounded-full' alt="" />
            <div className='flex flex-col justify-star w-full'>
                <div className="flex justify-between items-center">
                    <div className='capitalize text-black font-medium'>{record?.borrower_name?.toLowerCase()} <span className=" text-black font-normal">({record?.request_id})</span></div>
                    <div className="text-slate-500 hidden xs:block">{record?.createdAt?.split('T')[0]}</div>
                </div>
                <div className='text-slate-600'>{record?.request?.Email}</div>
                <div className='text-slate-600'>{record?.borrower_phone}</div>
                <div className="text-slate-500 block xs:hidden">{record?.createdAt?.split('T')[0]}</div>
            </div>
        </div>
    )
}