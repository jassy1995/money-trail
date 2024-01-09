import { MdHourglassEmpty } from "react-icons/md";

export default function NoRecordFound({ message = "No data yet" }) {
    return (
        <div className='flex flex-col space-y-2 py-[180px] justify-center items-center'>
            <MdHourglassEmpty className='text-5xl text-slate-500' />
            <p className='text-slate-500 text-lg'>{message}</p>
        </div>
    )
}
