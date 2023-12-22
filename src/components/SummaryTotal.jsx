export default function SummaryTotal({ count }) {
    return (
        <div className='card bg-white p-5 flex flex-col justify-center items-center w-64 h-32'>
            <h5 className='title m-0'>{count}</h5>
            <p className="text-[#9BA3AF]">Total</p>
        </div>
    )
}