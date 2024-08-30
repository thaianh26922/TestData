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
                    <img src="https://datainsight.vn/_next/static/media/blue-white-logo.be2ac2bf.png" alt="" />
                </div>
                <span className='icon close_icon' onClick={OpenSidebar}>X</span>
            </div>

            <ul className='sidebar-list'>
                <li className='sidebar-list-item'>
                    <NavLink to={'/manageHuman'}>
                        <BsPeopleFill className='icon' /> Quản lý nhân sự

                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to={'/manageProduct'}>
                        <BsFillArchiveFill className='icon' /> Quản lý hàng hóa
                    </NavLink>

                </li>
                <li className='sidebar-list-item'>
                    <NavLink to={'/manageMachines'}>
                        <BsFillGrid3X3GapFill className='icon' /> Quản lý máy móc
                    </NavLink>

                </li>
                <li className='sidebar-list-item'>
                    <NavLink to={'/manageContrast'}>
                        <BsPeopleFill className='icon' /> Quản lý hợp đồng
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to={'/manageSupplier'}>
                        <BsListCheck className='icon' /> Quản lý chuỗi cung ứng
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to={'/manageWebsite'}>
                        <BsMenuButtonWideFill className='icon' /> Quản lý website
                    </NavLink>
                </li>
                <li className='sidebar-list-item'>
                    <NavLink to={'/manageProfit'}>
                        <BsFillGearFill className='icon' /> Quản lý doanh thu
                    </NavLink>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar