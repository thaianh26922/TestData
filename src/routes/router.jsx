import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from '../Home';
import ManageProduct from '../component/ManageProduct/ManageProduct';
import ManageHuman from '../component/ManageHuman/ManageHuman';
import ManageMachines from '../component/ManageMachines/ManageMachines';
import ManageContrast from '../component/ManageContrast/ManageContrast';
import ManageProfit from '../component/ManageProfit/ManageProfit';
import ManageSupplier from '../component/ManageSupplier/ManageSupplier';
import ManageWebsite from '../component/ManageWebsite/ManageWebsite';
import ProductList from '../component/ProductList/ProductList';
import ProductUpdate from '../component/ProductUpdate/ProductUpdate';
import ManageOrder from '../component/ManageOrder/ManageOrder';

export default function ListRouter() {
    return (
        <Routes>
            <Route>
                <Route path='/' element={<Home />} />
                <Route path='/manageProduct' element={<ManageProduct />} />
                <Route path='/manageProductDetail/:pid' element={<ProductList />} />
                <Route path='/manageProductUpdate/:pid' element={<ProductUpdate />} />
                <Route path='/manageOrder' element={<ManageOrder />} />
                <Route path='/manageHuman' element={<ManageHuman />} />
                <Route path='/manageMachines' element={<ManageMachines />} />
                <Route path='/manageContrast' element={<ManageContrast />} />
                <Route path='/manageProfit' element={<ManageProfit />} />
                <Route path='/manageSupplier' element={<ManageSupplier />} />
                <Route path='/manageWebsite' element={<ManageWebsite />} />
            </Route>

        </Routes>
    )
}
