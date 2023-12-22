import React from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { useForm } from 'react-hook-form';
import Loader from '../components/globals/Loader';
import { useSignUpAsMerchant } from '../services/apis/user';
import Navbar from '../components/Navbar';
import useToggle from '../hooks/useToggle';
import useWindowSize from '../hooks/useWindowSize';
import { notify } from "../helpers/global"

export default function MerchantSignUp() {
    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm();
    const { mutateAsync: createNewUser, isLoading } = useSignUpAsMerchant();
    const { width } = useWindowSize();
    const [value, toggleValue] = useToggle(width <= 768 ? false : true);





    const onSubmit = async (form) => {
        try {
            const payload = { ...form, password: "password", business_type: "1" };
            await createNewUser(payload)
            notify({ type: 'success', message: 'successfully created' })
            reset()
        } catch (error) {
            console.log(error)
            notify({ type: 'error', message: error.response.data.message || 'operation failed' })
        }
    }

    return (
        <DashboardLayout isOpen={value} toggleValue={toggleValue}>
            <nav className="w-full bg-[#0084C7] px-4 sm:px-12 py-4 h-[360px]">
                <Navbar isOpen={value} toggleValue={toggleValue} title='merchant sign up' />
            </nav>
            <div className='-mt-[240px]  px-4 sm:px-12 flex flex-col md:flex-row justify-between w-full space-y-6 space-x-0 md:space-x-6 md:space-y-0 bg-white'>
                <div className='flex flex-col space-y-10 px-4 sm:px-32 mt-10 bg-white h-screen w-full'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-5 border border-slate-100 p-4 w-full shadow-sm rounded-md'>
                        <div className='flex flex-col'>
                            <label htmlFor="name" className='capitalize text-slate-600'>name</label>
                            <input {...register('name', { required: true })} className='form-control placeholder:text-slate-300 placeholder:text-sm' placeholder='enter your name' />
                            {errors.name && <span className='text-sm text-red-500'>name is required.</span>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="email" className='capitalize text-slate-600'>email</label>
                            <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className='form-control placeholder:text-slate-300 placeholder:text-sm' placeholder='enter email address' />
                            {errors.email && <span className='text-sm text-red-500'>please enter a valid email address.</span>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="phone" className='capitalize text-slate-600'>whatsapp phone</label>
                            <input {...register('phone', { required: false })} className='form-control placeholder:text-slate-300 placeholder:text-sm' placeholder='enter your whatsapp phone' />
                            {errors.phone && <span className='text-sm text-red-500'>your whatsapp phone is required.</span>}
                        </div>
                        <button disabled={!isValid || isLoading} type="submit" className='bg-[#0084C7] px-2 py-2 w-full rounded-md text-white disabled:cursor-not-allowed disabled:opacity-75'>
                            {isLoading ? <Loader /> : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    )
}
