import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MobileFooter() {
    return (
        <footer className="bottom-nav flex">
            <NavLink to={'/'} className={({ isActive }) =>
                isActive ? ' text-white bg-[rgb(29,61,120,0.5)] capitalize leading-[22.5px] font-medium bottom-nav-item' : 'capitalize leading-[22.5px] font-medium bottom-nav-item text-slate-200'}>
                <span className='icon'><i className="fa fa-clipboard-list"></i></span>
                <span>home</span>
            </NavLink>
            <NavLink to={'/pending'} className={({ isActive }) =>
                isActive ? ' text-white bg-[rgb(29,61,120,0.5)] capitalize leading-[22.5px] font-medium bottom-nav-item' : 'capitalize leading-[22.5px] font-medium bottom-nav-item text-slate-200'}>
                <span className='icon'><i className="fa fa-clipboard-list"></i></span>
                <span>pending</span>
            </NavLink>
            <NavLink to={'/approved'} className={({ isActive }) =>
                isActive ? ' text-white bg-[rgb(29,61,120,0.5)] capitalize leading-[22.5px] font-medium bottom-nav-item' : 'capitalize leading-[22.5px] font-medium bottom-nav-item text-slate-200'}>
                <span className='icon'><i className="fa fa-clipboard-list"></i></span>
                <span> approved</span>
            </NavLink>
        </footer>
    )
}
