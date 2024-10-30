import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Select, Table, Checkbox, Button } from 'antd'; // Import Button from antd
import { BsPencilSquare, BsTrash } from 'react-icons/bs';
import './produclist.css';
import LineChartPoint from '../Chart/LineChartPoint';

function ProductUpdate() {
    const { pid } = useParams();
    const { Option } = Select;

    // Sample product data
    const products = [
        {
            "stt": 1,
            "ảnh": "https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp",
            "màu": "Đỏ",
            "size": "M",
            "số lượng": 20,
            "giá nhập": 50000,
            "giá bán": 75000,
            "trạng thái": "Còn hàng",
            "action": {
                "chỉnh sửa": "https://example.com/edit/1",
                "xóa": "https://example.com/delete/1"
            }
        },
        {
            "stt": 2,
            "ảnh": "https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp",
            "màu": "Xanh",
            "size": "L",
            "số lượng": 15,
            "giá nhập": 60000,
            "giá bán": 90000,
            "trạng thái": "Hết hàng",
            "action": {
                "chỉnh sửa": "https://example.com/edit/2",
                "xóa": "https://example.com/delete/2"
            }
        },
        {
            "stt": 3,
            "ảnh": "https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp",
            "màu": "Đen",
            "size": "XL",
            "số lượng": 30,
            "giá nhập": 70000,
            "giá bán": 100000,
            "trạng thái": "Còn hàng",
            "action": {
                "chỉnh sửa": "https://example.com/edit/3",
                "xóa": "https://example.com/delete/3"
            }
        }
    ];

    const totalInfor = [
        {
            "stt": 1,
            "tham số": "Màu sắc",
            "giá trị": "Đỏ",
            "hiển thị": true
        },
        {
            "stt": 2,
            "tham số": "Kích cỡ",
            "giá trị": "L",
            "hiển thị": true
        },
        {
            "stt": 3,
            "tham số": "Chất liệu",
            "giá trị": "Cotton",
            "hiển thị": false
        },
        {
            "stt": 4,
            "tham số": "Số lượng",
            "giá trị": "500g",
            "hiển thị": true
        },
        {
            "stt": 5,
            "tham số": "Ảnh",
            "giá trị": "https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp",
            "hiển thị": false
        }
    ];

    // Table columns for total information
    const totalColumns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Tham số',
            dataIndex: 'tham số',
            key: 'tham số',
        },
        {
            title: 'Giá trị',
            dataIndex: 'giá trị',
            key: 'giá trị',
            render: (text) => {
                const isImage = text.startsWith('http') && (text.endsWith('.jpg') || text.endsWith('.png') || text.endsWith('.jpeg') || text.endsWith('.gif'));
                return isImage ? <img src={text} alt="Giá trị" style={{ width: 50, height: 50 }} /> : text;
            },
        },
        {
            title: 'Hiển thị',
            dataIndex: 'hiển thị',
            key: 'hiển thị',
            render: (text, record) => (
                <Checkbox
                    checked={text}
                    onChange={(e) => {
                        console.log(`Checkbox for ${record['tham số']} changed to ${e.target.checked}`);
                    }}
                />
            ),
        },
    ];

    // Table columns for product data
    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            key: 'stt',
        },
        {
            title: 'Ảnh',
            dataIndex: 'ảnh',
            key: 'ảnh',
            render: (text) => <img src={text} alt="Product" style={{ width: 50, height: 50 }} />,
        },
        {
            title: 'Màu',
            dataIndex: 'màu',
            key: 'màu',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Số lượng',
            dataIndex: 'số lượng',
            key: 'số lượng',
        },
        {
            title: 'Giá nhập',
            dataIndex: 'giá nhập',
            key: 'giá nhập',
            render: (text) => `${text.toLocaleString()} VND`,
        },
        {
            title: 'Giá bán',
            dataIndex: 'giá bán',
            key: 'giá bán',
            render: (text) => `${text.toLocaleString()} VND`,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'trạng thái',
            key: 'trạng thái',
        },
        {
            title: 'action',
            key: 'action',
            render: (_, record) => (
                <div>
                    <a href={record.action['chỉnh sửa']} title="Chỉnh sửa">
                        <BsPencilSquare style={{ color: '#faad14', cursor: 'pointer', marginRight: 10 }} />
                    </a>
                    <a href={record.action['xóa']} title="Xóa">
                        <BsTrash style={{ color: '#ff4d4f', cursor: 'pointer' }} />
                    </a>
                </div>
            ),
        },
    ];

    return (
        <div className='detail_products'>
            <div className='total_product'>
                <Table columns={totalColumns} dataSource={totalInfor} pagination={false} />
            </div>

            {/* New div for action buttons */}
            <div className='action-buttons' style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
                <Button type="default">Quay lại</Button>
                <Button type="primary">Cập nhật</Button>
                <Button type="danger" style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', color: 'white' }}>Xóa</Button>

            </div>
            <LineChartPoint></LineChartPoint>
        </div>
    );
}

export default ProductUpdate;
