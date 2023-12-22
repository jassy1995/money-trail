import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCreateApp, useGenearetPasswordResetLink } from "../../services/apis/app";
import { useCreateRole } from "../../services/apis/role";
import { notify } from "../../helpers/global"
import Loader from '../globals/Loader';
import { FaRegCopy } from "react-icons/fa";
import { handleCopy } from '../../helpers/global';
import { sortAlphabetically } from "../../lib/util"
import Modal from '../globals/Modal';



export default function AppForm({ open, setClose, detail, content }) {
    const { register, handleSubmit, reset, formState: { errors, isValid: isValid1 } } = useForm();
    const { register: register2, handleSubmit: handleSubmit2, reset: reset2, watch: watch2,
        formState: { errors: errors2, isValid: isValid2 } } = useForm();
    const { mutateAsync: createNewApp, isLoading } = useCreateApp();
    const { mutateAsync: createNewRole, isLoading: isLoadingRole } = useCreateRole();
    const { mutateAsync: genearetPasswordResetLink, isLoading: isGenerating } = useGenearetPasswordResetLink();
    const [activeTab, setActiveTab] = useState('home');
    const [activeIndex, setActiveIndex] = useState(null)
    const [passwordResetLink, setPasswordResetLink] = useState('')

    const onSubmit = async (form) => {
        try {
            await createNewApp(form)
            notify({ type: 'success', message: 'successfully created' })
            reset()
        } catch (error) {
            console.log(error)
            notify({ type: 'error', message: 'unable to create the app' })
        }
    }

    const handleCreateRole = async (form) => {
        const payload = { app_id: detail.id, name: form.role, description: form.description }
        try {
            await createNewRole(payload)
            notify({ type: 'success', message: 'successfully created' })
            reset2()
        } catch (error) {
            console.log(error)
            notify({ type: 'error', message: error.message })
        }
    }

    const handleResetLink = async (email, i) => {
        try {
            setActiveIndex(i)
            const payload = { app_id: detail.id, email }
            const { data } = await genearetPasswordResetLink(payload)
            setPasswordResetLink(data.link)
            notify({ type: 'success', message: 'password reset link has been sent to your email' })
        } catch (error) {
            notify({ type: 'error', message: 'unable to generate password reset link' })
        }
    }

    const handleCopyLink = async (textToCopy) => {
        try {
            const { status } = await handleCopy({ text: textToCopy, message: 'link copied' })
            consol.log(status)
        } catch (error) {
            consol.log(error)
        }
    }

    const handleSorting = (items) => {
        return sortAlphabetically(items)
    }

    return (
        <div>
            {content === 'form' &&
                <Modal open={open} setClose={setClose} title='Add New App' width='max-w-2xl'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-4 shadow-sm border border-slate-200 p-5 mt-4 rounded-md'>
                        <div className='flex flex-col'>
                            <label htmlFor="name" className='capitalize text-slate-600 text-[14px'>app name</label>
                            <input {...register('name', { required: true })} placeholder='enter the application name' className='form-control placeholder:text-slate-300 placeholder:text-sm' />
                            {errors.name && <small className='text-red-400'>This field is required.</small>}
                        </div>
                        <div className=''>
                            <label htmlFor="description" className='capitalize text-slate-600 text-[14px'>description</label>
                            <textarea {...register('description', { required: false })} placeholder='kindly describe the app in brief' className='form-control placeholder:text-slate-300 placeholder:text-sm' />
                            {errors.description && <small className='text-red-400'>This field is required.</small>}
                        </div>
                        <button disabled={!isValid1 || isLoading} type="submit" className='bg-[#0084C7] px-2 py-2 w-full rounded-md text-white disabled:opacity-75 disabled:cursor-not-allowed'>
                            {isLoading ? <Loader /> : 'Submit'}
                        </button>
                    </form>

                </Modal>
            }

            {content === 'detail' &&
                <Modal open={open} setClose={setClose} title='App Detail' width='max-w-3xl'>
                    <div className='flex flex-col space-y-4'>
                        <div className='flex justify-between items-center space-x-5 mb-4 border border-slate-200 py-3 px-3 rounded-md'>
                            <button onClick={() => setActiveTab('home')} className={`border border-slate-200 px-4 py-1 rounded-full grow hover:bg-green-500 hover:text-white ${activeTab === 'home' ? 'bg-green-500 text-white font-bold' : ''}`}>Home</button>
                            <button onClick={() => setActiveTab('users')} className={`border border-slate-200 px-4 py-1 rounded-full grow hover:bg-green-500 hover:text-white ${activeTab === 'users' ? 'bg-green-500 text-white font-bold' : ''}`}>Users</button>
                            <button onClick={() => setActiveTab('roles')} className={`border border-slate-200 px-4 py-1 rounded-full grow hover:bg-green-500 hover:text-white ${activeTab === 'roles' ? 'bg-green-500 text-white font-bold' : ''}`}>Roles</button>
                        </div>

                        {activeTab === 'home' &&
                            <>
                                <div className='flex flex-col shadow-sm border border-slate-200 p-4 rounded-md'>
                                    <h1 className='capitalize text-slate-700 text-2xl'>{detail.name}</h1>
                                    <small className='text-slate-500'>
                                        {detail.createdAt?.split('T')[0]}
                                        <span className='ml-1'>{detail.createdAt?.split('T')[1]?.split('.')[0]}</span>
                                    </small>
                                </div>
                                <form onSubmit={handleSubmit2(handleCreateRole)} className='flex flex-col space-y-4 justify-between  border  border-slate-200 rounded-md shadow-sm pb-2 px-3 pt-5 mt-2'>
                                    <h1>Add new role to this application</h1>
                                    <div className='w-full'>
                                        <input {...register2('role', { required: true })} className='form-control placeholder:text-slate-300 placeholder:text-sm h-11' placeholder='enter role name' />
                                        {errors2.role && <small className='text-red-400'>This field is required.</small>}
                                    </div>

                                    <div className='flex flex-col space-y-2 space-x-3 items-end'>
                                        <div className='w-full'>
                                            <textarea {...register2('description', { required: false })} placeholder='kindly describe the app in brief' className='form-control placeholder:text-slate-300 placeholder:text-sm w-48' />
                                            {errors2.description && <small className='text-red-400'>This field is required.</small>}
                                        </div>
                                        <button disabled={!isValid2 || isLoadingRole} type="submit" className='bg-[#0084C7] px-3 py-[9px] rounded-md text-white max-w-sm outline-none disabled:opacity-75 disabled:cursor-not-allowed'>
                                            {isLoadingRole ? <Loader /> : 'add'}
                                        </button>
                                    </div>
                                </form>
                            </>
                        }

                        {activeTab === 'roles' &&
                            <div className='shadow-sm border border-slate-200 p-3 rounded-md'>
                                {!detail?.roles?.length && <div className='flex justify-center items-center my-48 text-slate-400'>No role at the moment</div>}
                                {detail?.roles?.length &&
                                    <>
                                        <h1 className='mb-2 capitalize font-mono text-md'>roles</h1>
                                        <table className='w-full'>
                                            <thead className='bg-slate-50'>
                                                <tr className='border text-left'>
                                                    <th className='border px-3 text-slate-700 py-1 capitalize font-normal'>Name</th>
                                                    <th className='border px-3 text-slate-700 py-1 capitalize font-normal'>Date</th>
                                                    <th className='border px-3 text-slate-700 py-1 capitalize font-normal'>Desc</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    detail.roles.map((role, i) => (
                                                        <tr className='border' key={i}>
                                                            <td className='text-slate-700 text-sm border px-3 py-3'>{role.name}</td>
                                                            <td className='text-slate-700 text-sm border px-3 py-3'>
                                                                {role.createdAt?.split('T')[0]}
                                                            </td>
                                                            <td className='text-sm  border px-3 py-3'>
                                                                {role.description}
                                                            </td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>

                                    </>
                                }
                            </div>
                        }

                        {activeTab === 'users' &&
                            <div className='shadow-sm border border-slate-200 p-3 rounded-md'>
                                {!detail?.users?.length && <div className='flex justify-center items-center my-4 text-slate-400'>No user at the moment</div>}
                                {detail?.users?.length &&
                                    <>
                                        <div className='flex justify-between items-center'>
                                            <h1 className='mb-2 capitalize font-mono text-md'>users</h1>
                                            {
                                                passwordResetLink &&
                                                <span onClick={() => handleCopyLink(passwordResetLink)} className='bg-blue-900 p-2 rounded-full mb-2 mr-4 cursor-pointer' title='copy password reset link'>
                                                    <FaRegCopy className="text-white" />
                                                </span>
                                            }
                                        </div>
                                        <table className='w-full'>
                                            <thead className='bg-slate-50'>
                                                <tr className='border text-left'>
                                                    <th className='border px-3 text-slate-700 py-1 capitalize font-normal'>full name</th>
                                                    <th className='border px-3 text-slate-700 py-1 capitalize font-normal'>phone</th>
                                                    {/* <th className='border px-3 text-slate-700 py-1 capitalize font-normal'>Date</th> */}
                                                    <th className='border px-3 text-slate-700 py-1 capitalize font-normal text-center'>password reset link</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    handleSorting(detail?.users).map((user, i) => (
                                                        <tr className='border' key={i}>
                                                            <td className='text-slate-700 text-sm border px-3 py-3'>
                                                                <span className='capitalize'>{user.firstname}</span>
                                                                <span className='ml-3 capitalize'>{user.lastname}</span><br />
                                                            </td>
                                                            <td className='text-slate-700 text-sm border px-3 py-3'>
                                                                {user.phone}
                                                            </td>
                                                            {/* <td className='text-slate-700 text-sm border px-3 py-3'>
                                                                {user.createdAt?.split('T')[0]}
                                                            </td> */}
                                                            <td className='text-sm  border px-2  text-center'>
                                                                <button onClick={() => handleResetLink(user.email, i)} className='inline-flex px-3 py-1 rounded-full bg-lightBlue text-slate-50 text-sm'>
                                                                    {isGenerating && activeIndex === i ? <Loader /> : 'generate'}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>

                                    </>
                                }

                            </div>
                        }

                    </div>
                </Modal>
            }
        </div >
    )
}