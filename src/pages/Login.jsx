import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/home.css";


export default function Login() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = () => {
        console.log(emial, password)
    }

    return (
        <div className="flex flex-col sm:flex-row h-[100vh] relative bg-white">
            <div className="w-full z-0 hidden sm:block bg-[url('../../lady-and-guy.jpg')] bg-cover" ></div>
            <div className="relative block sm:hidden">
                <svg className="curve bottom" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 191.1 53.34">
                    <defs>
                        <style>{`.cls-1 { fill: #fff; }`}</style>
                    </defs>
                    <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                            <path className="cls-1" d="M.28,0S55,75.22,86.16,28.34s69.07-16.72,69.07-16.72L191.1,43.77l-.1,9.57L0,53Z" />
                        </g>
                    </g>
                </svg>
                <div className="bg-curve"></div>
            </div>
            <div className="w-full z-20 bg-white relative sm:overflow-hidden pb-5">
                <div className="circles hidden sm:block">
                    <img src="../../big-circles.svg" alt="" />
                </div>
                <div className="millipede hidden sm:block">
                    <img src="../../millipede.svg" alt="" />
                </div>
                <div className="pattern hidden sm:block">
                    <img src="../../pattern.svg" alt="" />
                </div>
                <div className="content-md content flex flex-col relative px-6 lg:px-20 pt-[30px] md:pt-[120px]">
                    <div>
                        <h3 style={{ fontSize: '2.7rem', lineHeight: 1, fontWeight: 700 }} className="title mb-2">Welcome.</h3>
                        <p className="mb-4 font-normal text-[18px] leading-[23.4px] text-[rgb(33,41,60)]">
                            Sign in to continue
                        </p>
                        <form className="mt-10">
                            <div className="flex flex-col space-y-2 relative">
                                <span className="flex space-x-2">
                                    <label htmlFor="login-email" className="text-[rgb(110,112,117)] text-[15.6px]">Email or phone</label>
                                    <span className="text-red-500">*</span>
                                </span>
                                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border-b outline-none py-2 border-[#AAAAAA] focus:border-blue-400 focus:border-b-2" name="acc-email" id="login-email"
                                />
                            </div>
                            <div className="flex flex-col space-y-2 mt-4">
                                <span className="flex space-x-2">
                                    <label htmlFor="login-password" className="text-[rgb(110,112,117)] text-[15.6px]">Password</label>
                                    <span className="text-red-500">*</span>
                                </span>
                                <input type="password" id="login-password" className="border-b outline-none py-2 border-[#AAAAAA] focus:border-blue-400 focus:border-b-2"
                                    value={password} onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <NavLink to={`/auth`}>
                                <p className="text-[18px] text-[rgb(108,117,125)] p-0 mt-4">
                                    Forgot password? <span className="text-blue-500 leading-[27px]">Click here.</span>
                                </p>
                            </NavLink>
                            <div className="flex justify-between items-center mt-4">
                                <button disabled={loading || !email || !password} type="submit" className="bg-blue-600 py-[10px] rounded-md w-full font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handleSubmit}>
                                    {loading && <i className="fa fa-circle-notch fa-spin me-2"></i>}
                                    Login
                                </button>
                            </div>
                            <p className="text-[18px] mt-4">Dont have an account?
                                <NavLink to={`/auth`} className='text-[rgb(128,128,128)] ml-1 font-medium leading-[23.4px]'>Register here</NavLink></p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
