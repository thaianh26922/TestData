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
                    <a href="">
                        <BsPeopleFill className='icon' /> Quản lý nguyên vật liệu
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsListCheck className='icon' /> Quản lý bảo trì thiết bị
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsMenuButtonWideFill className='icon' /> Báo cáo và phân tích
                    </a>
                </li>
                <li className='sidebar-list-item'>
                    <a href="">
                        <BsFillGearFill className='icon' /> Quản lý doanh thu
                    </a>
                </li>
            </ul>
        </aside>
    )
}

export default Sidebar