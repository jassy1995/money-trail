import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { handleCopy, notify } from "../../helpers/global"
import { useAddUser, useCreateUser, useDeactiveUser } from "../../services/apis/user";
import Loader from '../globals/Loader';
import { useGetApps, useGenearetPasswordResetLink } from "../../services/apis/app"
import http from "../../lib/http";
import { FaRegCopy } from "react-icons/fa";
import Modal from '../globals/Modal';






export default function UserForm({ open, setClose, content, detail }) {
    const { register, handleSubmit, reset, formState: { errors, isValid: isValid1 } } = useForm();
    const { register: register2, handleSubmit: handleSubmit2, reset: reset2, formState: { errors: errors2, isValid: isValid2 } } = useForm();
    const { mutateAsync: createNewUser, isLoading: isLoading1 } = useCreateUser();
    const { mutateAsync: addUser, isLoading: isLoading2 } = useAddUser();
    const { data: apps, isLoading: loading_app, isError: app_error } = useGetApps();
    const { mutateAsync: handleUserActiveness, isLoading: isLoadingAction } = useDeactiveUser();
    const [avater] = useState('/avatar2.svg')
    const [roles, setRole] = useState([]);
    const [isLoadingUser, setIsLoadingUser] = useState(true);
    const [error, setError] = useState(null)
    const [user, setUser] = useState();
    const [deactivatingIndex, setDeactivatingIndex] = useState(null)
    const [actionStart, setActionDone] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null)
    const [passwordResetLink, setPasswordResetLink] = useState('')
    const { mutateAsync: genearetPasswordResetLink, isLoading: isGenerating } = useGenearetPasswordResetLink();

    useEffect(() => {
        if (detail.id) {
            http.get(`/users?user_id=${detail.id}`)
                .then(response => {
                    setUser(response.data.data);
                    setIsLoadingUser(false);
                })
                .catch(error => {
                    console.log(error)
                    setError(error);
                    setIsLoadingUser(false);
                    console.error('Error:', error.message);
                });
        }
    }, [detail.id, actionStart]);

    const onSubmit = async (form) => {
        try {
            await createNewUser(form)
            notify({ type: 'success', message: 'successfully created' })
            reset()
        } catch (error) {
            console.log(error)
            notify({ type: 'error', message: error.response.data.message || 'operation failed' })
        }
    }

    const handleAppIdChange = (event) => {
        if (apps.data.data.length) {
            const id = event.target.value;
            const app = apps.data.data.find(app => +app.id === +id)
            setRole(app.roles);
        }
    };

    const handleAddApp = async (form) => {
        const payload = { app_id: +form.app_id, role_id: +form.role, user_id: +detail.id }
        try {
            await addUser(payload)
            notify({ type: 'success', message: 'successfully created' })
            reset2()
        } catch (error) {
            console.log(error)
            notify({ type: 'error', message: error.response.data.message || 'operation failed' })
        }
    }

    const handleDeactivate = async ({ status, app_id, index }) => {
        setDeactivatingIndex(index)
        const payload = { status, user_id: +detail.id, app_id }
        try {
            await handleUserActiveness(payload)
            setActionDone(actionStart ? false : true)
        } catch (error) {
            console.log(error)
        }
    }

    const handleResetLink = async (app_id, i) => {
        try {
            setActiveIndex(i)
            const payload = { app_id, email: detail.email }
            const { data } = await genearetPasswordResetLink(payload)
            setPasswordResetLink(data.link)
            notify({ type: 'success', message: 'password reset link has been sent to your email' })
        } catch (error) {
            notify({ type: 'error', message: error.response.data.message || 'unable to generate password reset link' })
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


    return (
        <>
            {content === 'form' &&
                <Modal open={open} setClose={setClose} title='Add New User' width='max-w-2xl'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col space-y-5 borde border-slate-300 p-4 max-w-sm shadow-md'>
                        <div className='flex flex-col'>
                            <label htmlFor="firstname" className='capitalize text-slate-600 text-[14px'>firstname</label>
                            <input {...register('firstname', { required: true })} className='form-control placeholder:text-slate-300 placeholder:text-sm' placeholder='enter first name' />
                            {errors.firstname && <span className='text-sm text-red-500'>firstname is required.</span>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="lastname" className='capitalize text-slate-600 text-[14px'>lastname</label>
                            <input {...register('lastname', { required: true })} className='form-control placeholder:text-slate-300 placeholder:text-sm' placeholder='enter last name' />
                            {errors.lastname && <span className='text-sm text-red-500'>lastname is required.</span>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="othername" className='capitalize text-slate-600 text-[14px'>othername</label>
                            <input {...register('othername', { required: false })} className='form-control placeholder:text-slate-300 placeholder:text-sm' placeholder='enter other name' />
                            {errors.othername && <span className='text-sm text-red-500'>othername is required.</span>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="email" className='capitalize text-slate-600 text-[14px'>email</label>
                            <input {...register('email', { required: true, pattern: /^\S+@\S+$/i })} className='form-control placeholder:text-slate-300 placeholder:text-sm' placeholder='enter email address' />
                            {errors.email && <span className='text-sm text-red-500'>please enter a valid email address.</span>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="othername" className='capitalize text-slate-600 text-[14px'>phone</label>
                            <input {...register('phone', { required: false })} className='form-control placeholder:text-slate-300 placeholder:text-sm' placeholder='enter phone' />
                            {errors.phone && <span className='text-sm text-red-500'>phone is required.</span>}
                        </div>
                        <button disabled={!isValid1 || isLoading1} type="submit" className='bg-[#0084C7] px-2 py-2 w-full rounded-md text-white disabled:cursor-not-allowed disabled:opacity-75'>
                            {isLoading1 ? <Loader /> : 'Submit'}
                        </button>
                    </form>
                </Modal>
            }

            {content === 'detail' &&
                <Modal open={open} setClose={setClose} title='User Detail' width='max-w-3xl'>

                    <div className='flex flex-col space-y-6' key='detail'>
                        <div className='flex flex-col  items-cente border border-slate-200 shadow-sm p-3 rounded-md'>
                            <div className='flex items-center space-x-3 pb-3'>
                                <img src={detail.img || avater} alt="not exist" className='rounded-full w-20 h-20 object-cover' />
                                <div className='flex flex-col'>
                                    <h1 className='capitalize text-slate-700'>{detail.firstname} {detail.lastname}</h1>
                                    <span className='text-slate-600 text-[16px]'>{detail.phone}</span>
                                </div>
                            </div>
                            <div className='flex flex-col space-y-2 border-t border-slate-200 pt-2 px-4'>
                                <p className='flex space-x-2 items-center'>
                                    <span className='capitalize text-slate-700'>Email: </span>
                                    <span className='text-slate-600 text-[16px]'>
                                        {detail?.email || 'example@gmail.com'}
                                    </span>
                                </p>

                                <p className='flex space-x-2 items-center'>
                                    <span className='capitalize text-slate-700'>Created: </span>
                                    <span className='text-slate-600 text-[16px]'>
                                        {detail.createdAt?.split('T')[0]} {detail.createdAt?.split('T')[1]?.split('.')[0]}
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div className='flex flex-col space-y-6'>
                            <form onSubmit={handleSubmit2(handleAddApp)} className='flex justify-between p-3 border border-slate-200 shadow-sm rounded-md'>
                                <div className='w-[40%]'>
                                    <select  {...register2('app_id', { required: true })} onChange={handleAppIdChange} className='form-control placeholder:text-slate-300 placeholder:text-sm grow'>
                                        <option value="">choose app...</option>
                                        {!loading_app && apps.data.data?.map((option) => (
                                            <option key={option.id} value={option.id}>{option.name}</option>
                                        ))}
                                    </select>
                                    {errors2.app_id && <small className='text-sm text-red-500'>please select an application.</small>}
                                </div>
                                <div className='w-[40%]'>
                                    <select  {...register2('role', { required: true })} className='form-control placeholder:text-slate-300 placeholder:text-sm grow'>
                                        <option value="">choose role...</option>
                                        {roles.map((option) => (
                                            <option key={option.id} value={option.id}>{option.name}</option>
                                        ))}
                                    </select>
                                    {errors2.role && <small className='text-sm text-red-500'>please select a role.</small>}
                                </div>
                                <button disabled={!isValid2 || isLoading2} type="submit" className='bg-[#0084C7] px-2 py-1 rounded-md text-white disabled:cursor-not-allowed disabled:opacity-75'>
                                    {isLoading2 ? <Loader /> : 'add user'}
                                </button>
                            </form>
                            <div className='shadow-sm border border-slate-200 p-3 rounded-md'>
                                {!isLoadingUser && error && <div className='flex justify-center items-center my-48 text-slate-400'>unable to fetch the user apps</div>}
                                {!isLoadingUser && !user?.apps?.length && <div className='flex justify-center items-center my-48 text-slate-400'>No role at the moment</div>}
                                {!isLoadingUser && !error && user?.apps?.length &&
                                    <>

                                        <div className='flex justify-between items-center'>
                                            <h1 className='mb-2 capitalize font-mono text-md'>user's applications</h1>
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
                                                    <th className='border px-3 text-slate-700 py-1 capitalize font-normal'>App</th>
                                                    <th className='border px-3 text-slate-700 py-1 capitalize font-normal'>Date</th>
                                                    <th className='border px-3 text-slate-700 py-1 capitalize font-normal text-center'>Status</th>
                                                    <th className='border text-center px-3 text-slate-700 py-1 capitalize font-normal'>Access</th>
                                                    <th className='border text-center px-1 text-slate-700 py-1 capitalize font-normal'>Password Reset Link</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    !isLoadingUser && user?.apps.map((app, i) => (
                                                        <tr className='border' key={i}>
                                                            <td className='capitalize text-slate-700 text-sm border px-3 py-3'>{app.name}</td>
                                                            <td className='capitalize text-slate-700 text-sm border px-3 py-3'>
                                                                {app.user_join_apps.createdAt?.split('T')[0]}
                                                            </td>
                                                            <td className='text-slate-700 text-sm border px-3 py-3 text-center'>
                                                                {app.user_join_apps.is_active ? <span className='inline-flex px-3 py-1 rounded-sm bg-green-100 text-green-600'>active</span> : <span className='inline-flex px-3 py-1 rounded-sm bg-red-100 text-red-600'>deactivated</span>}
                                                            </td>
                                                            <td className=' text-sm text-center border px-3'>
                                                                {app.user_join_apps.is_active &&
                                                                    <button onClick={() => handleDeactivate({ status: false, app_id: app.id, index: i })} className='inline-flex px-3 py-1 rounded-md bg-lightBlue font-bold  text-white'>
                                                                        {isLoadingAction && deactivatingIndex === i ? <Loader /> : 'deactivate'}
                                                                    </button>
                                                                }
                                                                {!app.user_join_apps.is_active &&
                                                                    <button onClick={() => handleDeactivate({ status: true, app_id: app.id, index: i })} className='inline-flex px-3 py-1 rounded-full bg-lightBlue font-bold text-white'>
                                                                        {isLoadingAction && deactivatingIndex === i ? <Loader /> : 'activate'}
                                                                    </button>
                                                                }
                                                            </td>
                                                            <td className='text-sm  border px-3 text-center'>
                                                                <button onClick={() => handleResetLink(app.id, i)} className='inline-flex px-3 py-1 rounded-md bg-lightBlue text-white font-bold'>
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

                        </div>
                    </div>
                </Modal>
            }
        </>
    )
}