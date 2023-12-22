
export default function SummaryCard({ pending_value, approved_value }) {
    return (
        <div className="card p-5 bg-white">
            <ul className="flex flex-col">
                <li className="">
                    <a className="w-full flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <i className="icon fa fa-door-closed text-[rgb(246,184,75)]"></i>
                            <span className="">Pending</span>
                        </div>
                        <span className="bg-red-500 text-white text-sm rounded-full inline-flex justify-center items-center font-medium px-2 py-[1px]">{pending_value}</span>
                    </a>
                </li>
                <hr className='my-5' />
                <li>
                    <a className="w-full flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <i className="icon fa fa-door-closed text-[rgb(9,178,156)]"></i>
                            <span>Approved</span>
                        </div>
                        <span className="bg-red-500 text-white text-sm rounded-full inline-flex justify-center items-center font-medium px-2 py-[1px]">{approved_value}</span>
                    </a>
                </li>
            </ul>
        </div>
    )
}