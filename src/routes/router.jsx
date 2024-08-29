import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../Home';
import ManageProduct from '../component/ManageProduct/ManageProduct';
import ManageHuman from '../component/ManageHuman/ManageHuman';
import ManageMachines from '../component/ManageMachines/ManageMachines';

export default function ListRouter() {
  return (
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/manageProduct' element={<ManageProduct />} />
         <Route path='/manageHuman' element={<ManageHuman />} />
        <Route path='/manageMachines' element={<ManageMachines />} />

    </Routes>
  )
}
