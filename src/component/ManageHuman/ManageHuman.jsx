import React, { useState, useEffect } from 'react';
import { Space, Table, Input, Button, Modal, Form } from 'antd';
import { send } from '@emailjs/browser';
import { emplooyees } from '../../data/employees';

export default function ManageHuman() {
  const { Search } = Input;
  const [filteredData, setFilteredData] = useState(emplooyees);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [form] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Daily Target (%)',
      dataIndex: 'daily_target_percentage',
      key: 'daily_target_percentage',
    },
    {
      title: 'Days Off',
      dataIndex: 'days_off',
      key: 'days_off',
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleUpdateClick(record)}>Update</a>
          <a onClick={() => handleSendEmailClick(record)}>Send Email</a>
          <a onClick={() => handleDelete(record.id)}>Delete</a>
        </Space>
      ),
    },
  ];

  // Lọc dữ liệu theo từ khóa tìm kiếm
  useEffect(() => {
    const filtered = emplooyees.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  // Đặt màu hàng dựa trên daily_target_percentage
  const rowClassName = (record) => {
    if (record.daily_target_percentage < 80) {
      return 'low-target'; // Màu đỏ cho chỉ tiêu thấp
    } else if (record.daily_target_percentage > 90) {
      return 'high-target'; // Màu xanh cho chỉ tiêu cao
    }
    return '';
  };

  // Hiển thị modal thêm nhân viên
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  // Đóng modal thêm nhân viên
  const handleAddCancel = () => {
    setIsAddModalVisible(false);
    form.resetFields();
  };

  // Thêm nhân viên mới vào danh sách
  const handleAddEmployee = (values) => {
    const newId = filteredData.length + 1; // Sinh ID mới
    const newEmployeeData = {
      id: newId,
      ...values,
    };
    setFilteredData([...filteredData, newEmployeeData]);
    setIsAddModalVisible(false);
    form.resetFields();
  };

  // Hiển thị modal gửi email
  const handleSendEmailClick = (employee) => {
    setSelectedEmployee(employee);
    setIsEmailModalVisible(true);
  };

  // Đóng modal gửi email
  const handleEmailCancel = () => {
    setIsEmailModalVisible(false);
    emailForm.resetFields();
  };

  // Gửi email
  const handleSendEmail = (values) => {
    const templateParams = {
      to_email: values.recipient_email, // Email người nhận
      subject: 'Employee Information',
      message: `Details of Employee: 
        Name: ${selectedEmployee.name}
        Position: ${selectedEmployee.position}
        Daily Target (%): ${selectedEmployee.daily_target_percentage}
        Days Off: ${selectedEmployee.days_off}
        Notes: ${selectedEmployee.notes}`,
    };

    send('service_lhwapml', 'template_482ek8e', templateParams, 'fdjbrQUywtiUSlZaf')
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert('Email sent successfully!');
        setIsEmailModalVisible(false);
        emailForm.resetFields();
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        alert('Failed to send email.');
      });
  };

  // Hiển thị modal cập nhật
  const handleUpdateClick = (employee) => {
    setSelectedEmployee(employee);
    updateForm.setFieldsValue(employee);
    setIsUpdateModalVisible(true);
  };

  // Đóng modal cập nhật
  const handleUpdateCancel = () => {
    setIsUpdateModalVisible(false);
    updateForm.resetFields();
  };

  // Cập nhật thông tin nhân viên
  const handleUpdateEmployee = (values) => {
    const updatedData = filteredData.map((employee) =>
      employee.id === selectedEmployee.id ? { ...selectedEmployee, ...values } : employee
    );
    setFilteredData(updatedData);
    setIsUpdateModalVisible(false);
    updateForm.resetFields();
  };

  // Xóa nhân viên
  const handleDelete = (id) => {
    const updatedData = filteredData.filter((employee) => employee.id !== id);
    setFilteredData(updatedData);
  };

  return (
    <div className='manage'>
      <div>
        <h2>Quản lý Nhân Sự</h2>
      </div>

      {/* Search bar */}
      <Search
        placeholder="Search by name"
        enterButton="Search"
        onSearch={handleSearch}
        style={{ marginBottom: 16 }}
      />

      {/* Nút thêm nhân viên */}
      <Button type="primary" onClick={showAddModal} style={{ marginBottom: 16 }}>
        Add Employee
      </Button>

      {/* Modal box để thêm nhân viên */}
      <Modal
        title="Add New Employee"
        visible={isAddModalVisible}
        onCancel={handleAddCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddEmployee}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input employee name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: 'Please input employee position!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input employee email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Notes"
            name="notes"
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal box để gửi email */}
      <Modal
        title="Send Email"
        visible={isEmailModalVisible}
        onCancel={handleEmailCancel}
        footer={null}
      >
        <Form form={emailForm} onFinish={handleSendEmail}>
          <Form.Item
            label="Recipient Email"
            name="recipient_email"
            rules={[{ required: true, message: 'Please input recipient email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Send Email
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal box để cập nhật nhân viên */}
      <Modal
        title="Update Employee"
        visible={isUpdateModalVisible}
        onCancel={handleUpdateCancel}
        footer={null}
      >
        <Form form={updateForm} onFinish={handleUpdateEmployee}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input employee name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Position"
            name="position"
            rules={[{ required: true, message: 'Please input employee position!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input employee email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Notes"
            name="notes"
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Bảng hiển thị danh sách nhân viên */}
      <Table
        columns={columns}
        dataSource={filteredData}
        rowClassName={rowClassName} // Áp dụng màu sắc cho hàng dựa trên chỉ tiêu
      />
    </div>
  );
}
