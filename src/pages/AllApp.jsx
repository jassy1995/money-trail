import { useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import Navbar from '../components/Navbar';
import useWindowSize from '../hooks/useWindowSize';
import useToggle from '../hooks/useToggle';
// import AppTable from '../components/tables/AppTable';
import useGlobalStore from '../stores/global';
import Button from '../components/globals/Button';
import AppForm from '../components/modals/AddAppForm';
import { useGetApps } from '../services/apis/app';
import Spinner from '../components/globals/Spinner';




export default function AllApp() {
    const { data: apps, isLoading, isError } = useGetApps();
    const { width } = useWindowSize()
    const [value, toggleValue] = useToggle(width <= 768 ? false : true)
    const setOpenAddApp = useGlobalStore((state) => state.setOpenAddApp);
    const openAddApp = useGlobalStore(({ data }) => data.isAppFormOpen);
    const [content, setContent] = useState('form')
    const [detail, setDetail] = useState({})

    const handleDetail = (d) => {
        setDetail(d)
    }



    return (
        <DashboardLayout isOpen={value} toggleValue={toggleValue}>
            <AppForm
                open={openAddApp}
                setClose={() => { setOpenAddApp(false); setContent('form'); setDetail({}) }}
                content={content}
                detail={detail}
            />
            <nav className="w-full bg-[#0084C7] px-4 sm:px-12 py-4 h-[360px]">
                <Navbar isOpen={value} toggleValue={toggleValue} title='applications' />
            </nav>
            <div className='-mt-[240px]  px-4 sm:px-12 flex flex-col md:flex-row justify-between w-full space-y-6 space-x-0 md:space-x-6 md:space-y-0'>
                <div className='w-full rounded-md'>
                    <div className='bg-white p-6 shadow-md rounded-md'>
                        <div className='flex justify-between mb-1'>
                            <h1 className='font-bold text-slate-500 capitalize'>applications</h1>
                            <span className='w-sm'>
                                <Button handler={() => { setContent('form'); setOpenAddApp(true) }}>New</Button>
                            </span>
                        </div>
                        {isLoading && <div className='flex flex-col justify-center items-center h-[500px]'>
                            <Spinner />
                        </div>}
                        {!isLoading && !isError && !apps.data.data.length && <div className='flex flex-col justify-center items-center h-[500px]'>
                            <p className='text-slate-500'>No result at the moment.</p>
                        </div>}
                        {/* {
                            !isLoading && !isError && apps.data.data.length &&
                            <AppTable apps={apps.data.data} sendDetail={handleDetail} openForm={() => { setContent('detail'); setOpenAddApp(true) }} />
                        } */}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}


