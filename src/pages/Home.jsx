import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { MdUpload } from "react-icons/md";
import UploadCard from '../components/UploadCard';
import UploadForm from '../components/modals/UploadForm';

export default function Home() {
    const [open, setOpen] = useState(false);
    return (
        <DashboardLayout>
            <UploadForm open={open} setClose={() => setOpen(false)} title='Upload file' />
            <div className='flex'>
                <div className='flex flex-col space-y-4 w-full'>
                    <div className='p-5 bg-white flex justify-between items-center card'>
                        <h5 className="title m-0 hidden ss:block">
                            <span>Customers</span>
                            <span className="bg-red-500 text-white text-sm rounded-full inline-flex justify-center items-center font-medium px-2 py-[1px] ml-2">6</span>
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
                    <UploadCard />
                    <UploadCard />
                    <UploadCard />
                    <UploadCard />
                    <UploadCard />
                    <UploadCard />
                </div>
            </div>
        </DashboardLayout >
    )
}

