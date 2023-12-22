import { useState, useEffect } from 'react'
import Loader from '../components/globals/Loader'
import { useForm } from 'react-hook-form';
import { notify } from '../helpers/global';
import { useParams } from 'react-router-dom';
import { useResetPassword } from '../services/apis/user';
import Spinner from '../components/globals/Spinner';
import http from '../lib/http';


export default function PasswordReset() {
  const { token } = useParams();
  const { register, handleSubmit, reset, watch, formState: { errors, isValid } } = useForm();
  const { mutateAsync: resetPassword, isLoading: isResetting } = useResetPassword();
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [app, setApp] = useState(null);
  const [status, setResponseStatus] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      http.post(`/verify-password-reset-token`, { token })
        .then(({ data }) => {
          if (data.status) {
            setApp(data.app);
            setUser(data.user);
            setResponseStatus(data.status)
          }
          setLoading(false);
        })
        .catch(error => {
          console.log(error)
          setResponseStatus(false)
          setError(error.response.data.message || 'operation failed');
          setLoading(false);
        });
    }
  }, []);

  const password = watch('password');

  const onSubmit = async (form) => {
    if (!isValid) return;
    try {
      const payload = { password: form.password, confirm_password: form.confirm_password, user_id: user.id, token, app_id: app.id }
      await resetPassword(payload)
      notify({ type: 'success', message: 'password successfully reset' })
      reset()
    } catch (error) {
      console.log(error)
      notify({ type: 'error', message: error.response.data.message || 'unable to reset your password' })
    }
  }

  const messageType = (errorMessage, keyword) => {
    const regex = new RegExp(keyword, "i");
    return regex.test(errorMessage)

  }

  return (
    <>

      {isLoading &&
        <div className="w-full h-screen flex justify-center items-center">
          <div className='flex flex-col space-y-10 justify-center items-center h-[500px]'>
            <Spinner />
            <p className='ml-6 font-mono italic text-slate-600 text-xl'>Loading! Pleas wait</p>
          </div>
        </div>

      }

      {!isLoading && error &&
        <div className="w-full h-screen flex justify-center items-center bg-white">
          <div className='flex flex-col space-y-8 justify-center items-center h-[500px]'>
            <img src="/invalid-img.webp" className='w-20 h-20' alt="" />
            <div className='flex flex-col justify-center items-center'>
              <h1 className="my-2 text-slate-700 font-mono font-bold text-xl italic">
                {error}!
              </h1>
              <p className='ml-6 font-mono italic text-slate-600 text-md'>
                Sorry about that!
                {messageType(error, "Invalid") ? 'Kindly use a valid one.' : 'Kindly request for a new token.'}
              </p>
            </div>
          </div>
        </div>
      }

      {!isLoading && !error && status &&
        <div className="w-full flex justify-center items-center">
          <img src="/password-reset-img-2.jpeg" alt="not exist" className='w-1/2 h-[100vh] hidden sm:block' />
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-6 lg:px-20  pt-[100px]  w-full h-[100vh] flex flex-col space-y-8">
            <div className='flex flex-col mb-[30px] mt-1'>
              <h1 className='text-3xl font-semibold'>Reset your password</h1>
              <p className='text-slate-500 text-sm mt-3 leading-6'>
                Dear<strong className='font-semibold text-black ml-1'>{user?.firstname} {user?.lastname}</strong>, you are about to reset your password for the
                <strong className='font-semibold text-black ml-1 mr-1'>{app.name}</strong>
                application
              </p>
            </div>
            <div className='flex flex-col'>
              <label htmlFor="password" className='capitalize text-slate-600 text-[14px'>password</label>
              <input type='password' {...register('password', { required: true })} placeholder='enter new password' className='form-control placeholder:text-slate-300 placeholder:text-sm' />
              {errors.password && <small className='text-red-400'>The password field is required.</small>}
            </div>
            <div className='flex flex-col'>
              <label htmlFor="confirm_password" className='capitalize text-slate-600 text-[14px'>confirm password</label>
              <input type='password' {...register('confirm_password', {
                required: true,
                validate: (value) => value === password || 'password does not match',
              })} placeholder='confirm your password' className='form-control placeholder:text-slate-300 placeholder:text-sm' />
              {errors.confirm_password && <small className='text-red-400'>The confirm password field is required.</small>}
            </div>
            <div className="flex items-center justify-end sm:justify-start">
              <button disabled={isResetting} type="submit" className='bg-[#0084C7] hover:bg-[#0085c7f5] hover:cursor-pointer px-2 py-2 rounded-md text-white w-32 disabled:opacity-75 disabled:cursor-not-allowed'>
                {isResetting ? <Loader /> : 'Reset'}
              </button>
            </div>
          </form>
        </div>
      }
    </>
  )
}
