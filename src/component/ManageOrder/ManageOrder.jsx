import React, { useState } from 'react';
import { Form, Input, Button, DatePicker, Select, Table, Modal } from 'antd';
import { BsEye } from 'react-icons/bs';
import './index.css'

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
const { RangePicker } = DatePicker;
const { Option } = Select;

const ManageOrder = () => {
    const [orders, setOrders] = useState([
        {
            key: '1',
            orderId: 'ORD001',
            customerName: 'Nguyễn Văn A',
            phoneNumber: '0123456789',
            email: 'nguyenvana@example.com',
            deliveryAddress: 'Hà Nội',
            orderDate: '2024-10-01',
            deliveryDate: '2024-10-05',
            orderValue: 100000,
            status: 'Chờ xử lý',
            products: [
                {
                    key: '1',
                    productId: 'PRO001',
                    image: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
                    name: 'Sản phẩm 1',
                    quantity: 2,
                    unitPrice: 50000,
                    discount: 0,
                    totalPrice: 100000,
                },
            ],
        },
        {
            key: '2',
            orderId: 'ORD001',
            customerName: 'Nguyễn Văn A',
            phoneNumber: '0123456789',
            email: 'nguyenvana@example.com',
            deliveryAddress: 'Hà Nội',
            orderDate: '2024-10-01',
            deliveryDate: '2024-10-05',
            orderValue: 100000,
            status: 'Đã giao hàng',
            products: [
                {
                    key: '1',
                    productId: 'PRO001',
                    image: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
                    name: 'Sản phẩm 1',
                    quantity: 2,
                    unitPrice: 50000,
                    discount: 0,
                    totalPrice: 100000,
                },
            ],
        },
        {
            key: '3',
            orderId: 'ORD001',
            customerName: 'Nguyễn Văn A',
            phoneNumber: '0123456789',
            email: 'nguyenvana@example.com',
            deliveryAddress: 'Hà Nội',
            orderDate: '2024-10-01',
            deliveryDate: '2024-10-05',
            orderValue: 100000,
            status: 'Đã hủy hàng',
            products: [
                {
                    key: '1',
                    productId: 'PRO001',
                    image: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
                    name: 'Sản phẩm 1',
                    quantity: 2,
                    unitPrice: 50000,
                    discount: 0,
                    totalPrice: 100000,
                },
            ],
        },
        {
            key: '4',
            orderId: 'ORD001',
            customerName: 'Nguyễn Văn A',
            phoneNumber: '0123456789',
            email: 'nguyenvana@example.com',
            deliveryAddress: 'Hà Nội',
            orderDate: '2024-10-01',
            deliveryDate: '2024-10-05',
            orderValue: 100000,
            status: 'Đang giao hàng',
            products: [
                {
                    key: '1',
                    productId: 'PRO001',
                    image: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
                    name: 'Sản phẩm 1',
                    quantity: 2,
                    unitPrice: 50000,
                    discount: 0,
                    totalPrice: 100000,
                },
            ],
        },
        {
            key: '4',
            orderId: 'ORD001',
            customerName: 'Nguyễn Văn A',
            phoneNumber: '0123456789',
            email: 'nguyenvana@example.com',
            deliveryAddress: 'Hà Nội',
            orderDate: '2024-10-01',
            deliveryDate: '2024-10-05',
            orderValue: 100000,
            status: 'Đang giao hàng',
            products: [
                {
                    key: '1',
                    productId: 'PRO001',
                    image: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
                    name: 'Sản phẩm 1',
                    quantity: 2,
                    unitPrice: 50000,
                    discount: 0,
                    totalPrice: 100000,
                },
            ],
        },
        {
            key: '4',
            orderId: 'ORD001',
            customerName: 'Nguyễn Văn A',
            phoneNumber: '0123456789',
            email: 'nguyenvana@example.com',
            deliveryAddress: 'Hà Nội',
            orderDate: '2024-10-01',
            deliveryDate: '2024-10-05',
            orderValue: 100000,
            status: 'Đang giao hàng',
            products: [
                {
                    key: '1',
                    productId: 'PRO001',
                    image: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
                    name: 'Sản phẩm 1',
                    quantity: 2,
                    unitPrice: 50000,
                    discount: 0,
                    totalPrice: 100000,
                },
            ],
        },
        {
            key: '4',
            orderId: 'ORD001',
            customerName: 'Nguyễn Văn A',
            phoneNumber: '0123456789',
            email: 'nguyenvana@example.com',
            deliveryAddress: 'Hà Nội',
            orderDate: '2024-10-01',
            deliveryDate: '2024-10-05',
            orderValue: 100000,
            status: 'Đang giao hàng',
            products: [
                {
                    key: '1',
                    productId: 'PRO001',
                    image: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
                    name: 'Sản phẩm 1',
                    quantity: 2,
                    unitPrice: 50000,
                    discount: 0,
                    totalPrice: 100000,
                },
            ],
        },
        {
            key: '4',
            orderId: 'ORD001',
            customerName: 'Nguyễn Văn A',
            phoneNumber: '0123456789',
            email: 'nguyenvana@example.com',
            deliveryAddress: 'Hà Nội',
            orderDate: '2024-10-01',
            deliveryDate: '2024-10-05',
            orderValue: 100000,
            status: 'Đã hủy hàng',
            products: [
                {
                    key: '1',
                    productId: 'PRO001',
                    image: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
                    name: 'Sản phẩm 1',
                    quantity: 2,
                    unitPrice: 50000,
                    discount: 0,
                    totalPrice: 100000,
                },
            ],
        },
        {
            key: '4',
            orderId: 'ORD001',
            customerName: 'Nguyễn Văn A',
            phoneNumber: '0123456789',
            email: 'nguyenvana@example.com',
            deliveryAddress: 'Hà Nội',
            orderDate: '2024-10-01',
            deliveryDate: '2024-10-05',
            orderValue: 100000,
            status: 'Đã giao hàng',
            products: [
                {
                    key: '1',
                    productId: 'PRO001',
                    image: 'https://cdn.shopvnb.com/img/300x300/uploads/san_pham/vot-cau-long-vnb-v200-xanh-2.webp',
                    name: 'Sản phẩm 1',
                    quantity: 2,
                    unitPrice: 50000,
                    discount: 0,
                    totalPrice: 100000,
                },
            ],
        },
        // Các đơn hàng khác...
    ]);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleViewOrder = (order) => {
        setSelectedOrder(order);
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Tên khách hàng',
            dataIndex: 'customerName',
            key: 'customerName',
        },
        {
            title: 'Ngày đặt hàng',
            dataIndex: 'orderDate',
            key: 'orderDate',
        },
        {
            title: 'Ngày giao hàng',
            dataIndex: 'deliveryDate',
            key: 'deliveryDate',
        },
        {
            title: 'Giá trị đơn hàng',
            dataIndex: 'orderValue',
            key: 'orderValue',
            render: (text) => <span>{text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => {
                let color;
                switch (text) {
                    case 'Chờ xử lý':
                        color = 'gray';
                        break;
                    case 'Đang giao hàng':
                        color = 'orange';
                        break;
                    case 'Đã giao hàng':
                        color = 'green';
                        break;
                    case 'Đã hủy hàng':
                        color = 'red';
                        break;
                    default:
                        color = 'black';
                }
                return <span style={{ color }}>{text}</span>;
            },
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <BsEye style={{ cursor: 'pointer', color: '#1890ff' }} title="Xem" onClick={() => handleViewOrder(record)} />
            ),
        },
    ];

    const productColumns = [
        {
            title: 'Mã hàng',
            dataIndex: 'productId',
            key: 'productId',
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'image',
            key: 'image',
            render: (text) => <img src={text} alt="product" style={{ width: 50, height: 50 }} />,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Đơn giá',
            dataIndex: 'unitPrice',
            key: 'unitPrice',
            render: (text) => <span>{text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>,
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            key: 'discount',
        },
        {
            title: 'Giá bán',
            dataIndex: 'totalPrice',
            key: 'totalPrice',
            render: (text) => <span>{text.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>,
        },
    ];

    const handleCloseModal = () => {
        setSelectedOrder(null);
    };

    const handleUpdateOrder = () => {
        // Logic for updating the order
        console.log('Cập nhật đơn hàng:', selectedOrder);
    };

    const handlePrintOrder = () => {
        // Logic for printing the order
        console.log('In đơn hàng:', selectedOrder);
    };

    const handleExportToPDF = () => {
        const doc = new jsPDF();
        doc.setFont("Roboto")
        doc.text('Thông tin đơn hàng', 14, 16);
        doc.text(`Mã đơn hàng: ${selectedOrder.orderId}`, 14, 30);
        doc.text(`Tên khách hàng: ${selectedOrder.customerName}`, 14, 40);
        doc.text(`Số điện thoại: ${selectedOrder.phoneNumber}`, 14, 50);
        doc.text(`Email: ${selectedOrder.email}`, 14, 60);
        doc.text(`Địa chỉ giao hàng: ${selectedOrder.deliveryAddress}`, 14, 70);
        doc.text(`Ngày đặt hàng: ${selectedOrder.orderDate}`, 14, 80);
        doc.text(`Ngày giao hàng: ${selectedOrder.deliveryDate}`, 14, 90);
        doc.text(`Giá trị đơn hàng: ${selectedOrder.orderValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}`, 14, 100);
        doc.text(`Trạng thái: ${selectedOrder.status}`, 14, 110);

        // Thêm bảng thông tin sản phẩm
        const products = selectedOrder.products.map((product) => [
            product.productId,
            product.name,
            product.quantity,
            product.unitPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            product.totalPrice.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
        ]);

        autoTable(doc, {
            head: [['Mã hàng', 'Tên sản phẩm', 'Số lượng', 'Đơn giá', 'Giá bán']],
            body: products,
            startY: 120,
        });

        doc.save(`order_${selectedOrder.orderId}.pdf`);
    };

    const handleSortFieldChange = (value) => {
        setSortField(value);
    };

    const handleSortOrderChange = (value) => {
        setSortOrder(value);
    };

    const handleSubmit = () => {
        console.log('Search data:', formData);
        console.log('Sort field:', sortField);
        console.log('Sort order:', sortOrder);
        // Thực hiện tìm kiếm hoặc các hành động khác
    };
    return (
        <div style={{ padding: '5%' }}>
            <Form layout="inline" onFinish={() => {}} style={{ padding: '10px 10px', background: '#D9D9D9' }}>
                <Form.Item label="Mã đơn hàng">
                    <Input name="orderId" />
                </Form.Item>
                <Form.Item label="Tên khách hàng">
                    <Input name="customerName" />
                </Form.Item>
                <Form.Item label="Ngày">
                    <RangePicker />
                </Form.Item>
                <Form.Item label="Trạng thái" style={{ marginTop: '20px' }}>
                    <Select style={{ width: 120 }}>
                        <Option value="">Tất cả</Option>
                        <Option value="pending">Chờ xử lý</Option>
                        <Option value="completed">Đã hoàn thành</Option>
                        <Option value="canceled">Đã hủy</Option>
                    </Select>
                </Form.Item>
                <Form.Item style={{ marginTop: '20px' }}>
                    <Button type="primary" htmlType="submit">
                        Tìm kiếm
                    </Button>
                </Form.Item>
            </Form>
            <Form layout="inline" onFinish={handleSubmit} style={{ padding: '10px 10px', background: '#D9D9D9', marginTop: '10px' }}>
                <Form.Item label="Sắp xếp" style={{ marginTop: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Select
                            value={sortField}
                            onChange={handleSortFieldChange}
                            style={{ width: 120, marginRight: '10px' }}
                            placeholder="Chọn trường"
                        >
                            <Option value="orderId">Mã đơn hàng</Option>
                            <Option value="customerName">Tên khách hàng</Option>
                            <Option value="status">Trạng thái</Option>
                            <Option value="dateRange">Ngày</Option>
                        </Select>
                        <Select
                            value={sortOrder}
                            onChange={handleSortOrderChange}
                            style={{ width: 120 }}
                        >
                            <Option value="asc">Tăng dần</Option>
                            <Option value="desc">Giảm dần</Option>
                        </Select>
                    </div>
                </Form.Item>
            </Form>
            <div>
                <Table columns={columns} dataSource={orders} />
            </div>
            <Modal
                title="Thông tin đơn hàng"
                visible={!!selectedOrder}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="update" type="primary" onClick={handleUpdateOrder}>
                        Cập nhật
                    </Button>,
                    <Button key="print" onClick={handlePrintOrder}>
                        In
                    </Button>,
                    <Button key="export" onClick={handleExportToPDF}>
                        Xuất file PDF
                    </Button>,
                ]}
            >
                {selectedOrder && (
                    <>
                        <h4>Thông tin khách hàng:</h4>
                        <p>Họ và tên: {selectedOrder.customerName}</p>
                        <p>Số điện thoại: {selectedOrder.phoneNumber}</p>
                        <p>Email: {selectedOrder.email}</p>
                        <p>Địa chỉ giao hàng: {selectedOrder.deliveryAddress}</p>
                        <h4>Thông tin đơn hàng:</h4>
                        <p>Mã đơn hàng: {selectedOrder.orderId}</p>
                        <p>Ngày đặt hàng: {selectedOrder.orderDate}</p>
                        <p>Ngày giao hàng: {selectedOrder.deliveryDate}</p>
                        <p>Giá trị đơn hàng: {selectedOrder.orderValue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
                        <p>Trạng thái: {selectedOrder.status}</p>
                        <h4>Danh sách sản phẩm:</h4>
                        <Table columns={productColumns} dataSource={selectedOrder.products} pagination={false} />
                    </>
                )}
            </Modal>
        </div>
    );
};

export default ManageOrder;
