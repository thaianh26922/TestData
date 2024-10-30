import React, { useEffect, useState } from 'react'
import WidgetsDropdown from './component/WidgetsDropdown/WidgetsDropdown'
import MainChart from './component/MainChart/MainChart'
import { CButton } from '@coreui/react'
import { Space, Table, Input, Button, Modal, Form, Select, DatePicker } from 'antd';
import { BsPlus, BsPencilSquare, BsTrash, BsEye } from 'react-icons/bs';
import { NavLink, useNavigate } from 'react-router-dom'

function Home() {
  const { Search } = Input;

  // Dữ liệu JSON mẫu
  const products = [
    {
      MaSanPham: "SP001",
      Anh: "https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp",
      Ten: "Vợt cầu lông Yonex",
      GiaBanTrungBinh: 1500000,
      PhanLoai: "Vợt",
      MonTheThao: "Cầu lông",
      SoLuong: 10,
      TrangThai: "Còn hàng"
    },
    {
      MaSanPham: "SP002",
      Anh: "https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp",
      Ten: "Quả cầu lông Lining",
      GiaBanTrungBinh: 50000,
      PhanLoai: "Quả cầu",
      MonTheThao: "Cầu lông",
      SoLuong: 50,
      TrangThai: "Còn hàng"
    },
    {
      MaSanPham: "SP003",
      Anh: "https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp",
      Ten: "Balo cầu lông Victor",
      GiaBanTrungBinh: 750000,
      PhanLoai: "Phụ kiện",
      MonTheThao: "Cầu lông",
      SoLuong: 5,
      TrangThai: "Hết hàng"
    }
  ];

  const [filteredData, setFilteredData] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [ 
    {
      title: 'Mã sản phẩm',
      dataIndex: 'MaSanPham',
      key: 'MaSanPham',
    },
    {
      title: 'Ảnh',
      dataIndex: 'Anh',
      key: 'Anh',
      render: (text) => <img src={text} alt="Product" style={{ width: 50, height: 50 }} />,
    },
    {
      title: 'Tên',
      dataIndex: 'Ten',
      key: 'Ten',
    },
    {
      title: 'Giá bán trung bình',
      dataIndex: 'GiaBanTrungBinh',
      key: 'GiaBanTrungBinh',
      render: (text) => `${text.toLocaleString()} VND`,
    },
    {
      title: 'Phân loại',
      dataIndex: 'PhanLoai',
      key: 'PhanLoai',
    },
    {
      title: 'Môn thể thao',
      dataIndex: 'MonTheThao',
      key: 'MonTheThao',
    },
    {
      title: 'Số lượng',
      dataIndex: 'SoLuong',
      key: 'SoLuong',
    },
    {
      title: 'Trạng thái',
      dataIndex: 'TrangThai',
      key: 'TrangThai',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <BsEye style={{ cursor: 'pointer', color: '#1890ff' }} title="Xem" onClick={() => handleView(record.MaSanPham)} />
          <BsPencilSquare style={{ cursor: 'pointer', color: '#faad14' }} title="Cập nhật" onClick={() => handleUpdate(record.MaSanPham)} />
          <BsTrash style={{ cursor: 'pointer', color: '#ff4d4f' }} title="Xóa" onClick={() => handleDelete(record.id)} />
        </Space>
      ),
    },
  ];
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/manageProductDetail/${id}`);

  }
  const handleUpdate = (id) =>{
    navigate(`/manageProductUpdate/${id}`);

  }
  useEffect(() => {
    const filtered = products.filter((product) =>
      product.Ten.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  return (
    <div>
      <div className='control-chart'>
        <div style={{ display : 'flex', justifyContent: 'space-between' , padding: '10px 0' }} >
          <div>
            <Search
              placeholder="Tìm kiếm theo tên"
              enterButton="Tìm kiếm"
              onSearch={(value) => setSearchTerm(value)}
              style={{ marginBottom: 16 }}
            />
          </div>
          <div style={{ display : 'flex' , alignItems : 'center', justifyContent: 'space-between' , width: '40%'}}>
            <span>Nhập file dữ liệu (CSV)</span>
            <div>
              <BsPlus className="icon" /> Thêm sản phẩm 
            </div>
          </div>
        </div>
        <div>
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="MaSanPham"
          />
        </div>
        <div className='filter'>
          <h3>Biểu đồ thống kê</h3>
          <div id='group-button'>
            <CButton className='button-filter' color="light">Day</CButton>
            <CButton className='button-filter' color="dark">Month</CButton>
            <CButton className='button-filter' color="light">Year</CButton>
          </div>
        </div>
        <div>
          <WidgetsDropdown></WidgetsDropdown>
        </div>
        <div className='main-chart'>
          <MainChart></MainChart>
        </div>
      </div>
    </div>
  );
}

export default Home;
