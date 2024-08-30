import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, Select } from 'antd';
import { supplyChainData } from '../../data/supplyChainData';

const { Option } = Select;

export default function ManageSupplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [deliverySchedule, setDeliverySchedule] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [currentEdit, setCurrentEdit] = useState(null);
  const [mode, setMode] = useState('add'); // Add or Edit mode

  useEffect(() => {
    setSuppliers(supplyChainData.suppliers);
    setOrders(supplyChainData.orders);
    setDeliverySchedule(supplyChainData.delivery_schedule);
  }, []);

  const handleOpenModal = (record = null, mode = 'add') => {
    setMode(mode);
    setCurrentEdit(record);
    setIsModalVisible(true);
    if (record) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleAddOrEditSupplier = (values) => {
    if (mode === 'add') {
      setSuppliers([...suppliers, { supplier_id: `SUP${suppliers.length + 1}`, ...values }]);
    } else {
      setSuppliers(suppliers.map((supplier) => (supplier.supplier_id === currentEdit.supplier_id ? values : supplier)));
    }
    handleCloseModal();
  };

  const handleDeleteSupplier = (supplier_id) => {
    setSuppliers(suppliers.filter((supplier) => supplier.supplier_id !== supplier_id));
  };

  const supplierColumns = [
    {
      title: 'ID',
      dataIndex: 'supplier_id',
      key: 'supplier_id'
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Phone',
      dataIndex: ['contact_info', 'phone'],
      key: 'phone'
    },
    {
      title: 'Email',
      dataIndex: ['contact_info', 'email'],
      key: 'email'
    },
    {
      title: 'Address',
      dataIndex: ['contact_info', 'address'],
      key: 'address'
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <span>
          <Button onClick={() => handleOpenModal(record, 'edit')} type="primary">
            Edit
          </Button>
          <Button onClick={() => handleDeleteSupplier(record.supplier_id)} type="danger" style={{ marginLeft: 8 }}>
            Delete
          </Button>
        </span>
      )
    }
  ];

  const orderColumns = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id'
    },
    {
      title: 'Supplier ID',
      dataIndex: 'supplier_id',
      key: 'supplier_id'
    },
    {
      title: 'Product ID',
      dataIndex: 'product_id',
      key: 'product_id'
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      key: 'order_date'
    },
    {
      title: 'Delivery Date',
      dataIndex: 'delivery_date',
      key: 'delivery_date'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    }
  ];

  const deliveryColumns = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id'
    },
    {
      title: 'Delivery Date',
      dataIndex: 'delivery_date',
      key: 'delivery_date'
    },
    {
      title: 'Delivery Status',
      dataIndex: 'delivery_status',
      key: 'delivery_status'
    }
  ];

  return (
    <div className='container-website'>
      <h2>Quản lý nhà cung cấp</h2>
      <Button type="primary" onClick={() => handleOpenModal()}>
        Thêm Nhà Cung Cấp
      </Button>
      <Table columns={supplierColumns} dataSource={suppliers} rowKey="supplier_id" style={{ marginTop: 20 }} />

      <h2>Quản lý đơn mua hàng</h2>
      <Table columns={orderColumns} dataSource={orders} rowKey="order_id" style={{ marginTop: 20 }} />

      <h2>Quản lý lịch giao nhận</h2>
      <Table columns={deliveryColumns} dataSource={deliverySchedule} rowKey="order_id" style={{ marginTop: 20 }} />

      <Modal
        title={mode === 'add' ? 'Thêm nhà cung cấp' : 'Chỉnh sửa nhà cung cấp'}
        visible={isModalVisible}
        onCancel={handleCloseModal}
        footer={null}
      >
        <Form form={form} onFinish={handleAddOrEditSupplier} initialValues={currentEdit}>
          <Form.Item
            label="Tên nhà cung cấp"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhà cung cấp!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name={['contact_info', 'phone']}
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name={['contact_info', 'email']}
            rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Địa chỉ"
            name={['contact_info', 'address']}
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {mode === 'add' ? 'Thêm' : 'Cập nhật'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
