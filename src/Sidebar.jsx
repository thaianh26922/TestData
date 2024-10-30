import React from 'react'
import {
    BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill,
    BsListCheck, BsMenuButtonWideFill, BsFillGearFill
}
    from 'react-icons/bs'
import { NavLink } from 'react-router-dom'

function Sidebar({ openSidebarToggle, OpenSidebar }) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive" : ""}>
            <div className='sidebar-title'>
                <div className='sidebar-brand'>
                    Manager #1
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <NavLink to={'/manageHuman'}>
                        <BsPeopleFill className='icon' /> Quản lý Nhân sự

                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to={'/'}>
                        <BsFillArchiveFill className='icon' />  Quản lý sản phẩm 
                    </NavLink>

                </li>
                <li className='sidebar-list-item'>
                    <NavLink to={'/manageOrder'}>
                        <BsFillGrid3X3GapFill className='icon' />  Quản lý Đơn hàng
                    </NavLink>

                </li>
                <li className='sidebar-list-item'>
                    <NavLink to={'/manageProfit'}>
                        <BsPeopleFill className='icon' />  Quản lý doanh thu
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to={'/manageSupplier'}>
                        <BsListCheck className='icon' />  Quản lý phản hồi 
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to={'/manageWebsite'}>
                        <BsMenuButtonWideFill className='icon' />  Quản lý Website
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to={'/manageProfit'}>
                        <BsFillGearFill className='icon' /> Logout
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar