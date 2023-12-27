export default function UploadCard({ record }) {
    return (
        <div className='flex flex-col justify-center items-center sm:flex-row space-y-3 space-x-0 sm:space-y-0 sm:space-x-5 bg-white w-full p-4 card'>
            <img src={record?.borrower_photo || '../../avarter3.jpeg'} className='w-full h-[150px] sm:w-[80px] sm:h-[80px] object-cover rounded-md sm:rounded-full' alt="" />
            <div className='flex flex-col justify-star w-full'>
                <div className="flex justify-between items-center">
                    <div className='capitalize text-black font-medium'>{record?.borrower_name?.toLowerCase()} <span className=" text-black font-normal">({record?.request_id})</span></div>
                    <div className="text-slate-500">{record?.createdAt?.split('T')[0]}</div>
                </div>
                <div className='text-slate-600'>{record?.request?.Email}</div>
                <div className='text-slate-600'>{record?.borrower_phone}</div>
            </div>
        </div>
    )
}