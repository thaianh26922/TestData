import React, { useState, useEffect } from 'react';
import { Space, Table, Input, Button, Modal, Form, Select, DatePicker } from 'antd';
import { send } from '@emailjs/browser';
import { emplooyees } from '../../data/employees';
import './index.css'

export default function ManageHuman() {
  const { Search } = Input;
  const { Option } = Select;

  const [filteredData, setFilteredData] = useState(emplooyees);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [form] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [updateForm] = Form.useForm();
  const [isMeetingModalVisible, setIsMeetingModalVisible] = useState(false);
  const [meetingForm] = Form.useForm();

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Chức vụ',
      dataIndex: 'position',
      key: 'position',
    },
    {
      title: 'Chỉ tiêu hàng ngày (%)',
      dataIndex: 'daily_target_percentage',
      key: 'daily_target_percentage',
    },
    {
      title: 'Số ngày nghỉ',
      dataIndex: 'days_off',
      key: 'days_off',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'notes',
      key: 'notes',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Hành động',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => handleUpdateClick(record)}>Cập nhật</a>
          <a onClick={() => handleSendEmailClick(record)}>Gửi Email</a>
          <a onClick={() => handleDelete(record.id)}>Xóa</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    const filtered = emplooyees.filter((employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const rowClassName = (record) => {
    if (record.daily_target_percentage < 80) {
      return 'low-target'; 
    } else if (record.daily_target_percentage > 90) {
      return 'high-target'; 
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
      to_email: values.recipient_email, 
      subject: 'Thông tin nhân viên',
      message: `Chi tiết của nhân viên: 
        Tên: ${selectedEmployee.name}
        Chức vụ: ${selectedEmployee.position}
        Chỉ tiêu hàng ngày (%): ${selectedEmployee.daily_target_percentage}
        Số ngày nghỉ: ${selectedEmployee.days_off}
        Ghi chú: ${selectedEmployee.notes}`,
    };

    send('service_lhwapml', 'template_482ek8e', templateParams, 'fdjbrQUywtiUSlZaf')
      .then((response) => {
        console.log('Email đã được gửi thành công:', response);
        alert('Email đã được gửi thành công!');
        setIsEmailModalVisible(false);
        emailForm.resetFields();
      })
      .catch((error) => {
        console.error('Lỗi khi gửi email:', error);
        alert('Gửi email không thành công.');
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

  const showMeetingModal = () => setIsMeetingModalVisible(true);
  const handleMeetingCancel = () => {
    setIsMeetingModalVisible(false);
    meetingForm.resetFields();
  };

  const handleCreateMeeting = (values) => {
    const templateParams = {
      to_email: selectedEmployees.map(emp => emp.email).join(', '),
      subject: 'Thư mời họp',
      message: `Chi tiết cuộc họp: 
        Ngày: ${values.date.format('YYYY-MM-DD')}
        Giờ: ${values.time.format('HH:mm')}
        Agenda: ${values.agenda}
        Tham dự: ${selectedEmployees.map(emp => emp.name).join(', ')}`,
    };

    send('service_lhwapml', 'template_482ek8e', templateParams, 'fdjbrQUywtiUSlZaf')
      .then((response) => {
        console.log('Thư mời họp đã được gửi thành công:', response);
        alert('Thư mời họp đã được gửi thành công!');
        setIsMeetingModalVisible(false);
        meetingForm.resetFields();
        setSelectedEmployees([]);
      })
      .catch((error) => {
        console.error('Lỗi khi gửi thư mời họp:', error);
        alert('Gửi thư mời họp không thành công.');
      });
  };

  return (
    <div className='manage container-website'>
      <div>
        <h2>Quản lý Nhân Sự</h2>
      </div>

      {/* Thanh tìm kiếm */}
      <Search
        placeholder="Tìm kiếm theo tên"
        enterButton="Tìm kiếm"
        onSearch={handleSearch}
        style={{ marginBottom: 16 }}
      />

      {/* Nút thêm nhân viên */}
      <Button type="primary" onClick={showAddModal} style={{ marginBottom: 16 }}>
        Thêm Nhân Viên
      </Button>
      <Button type="primary" onClick={showMeetingModal} style={{ marginBottom: 16 }}>
        Tạo Cuộc Họp
      </Button>

      {/* Modal để thêm nhân viên */}
      <Modal
        title="Thêm Nhân Viên Mới"
        visible={isAddModalVisible}
        onCancel={handleAddCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleAddEmployee}>
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Chức vụ"
            name="position"
            rules={[{ required: true, message: 'Vui lòng nhập chức vụ nhân viên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Vui lòng nhập email nhân viên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ghi chú"
            name="notes"
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal gửi email */}
      <Modal
        title="Gửi Email"
        visible={isEmailModalVisible}
        onCancel={handleEmailCancel}
        footer={null}
      >
        <Form form={emailForm} onFinish={handleSendEmail}>
          <Form.Item
            label="Đến Email"
            name="recipient_email"
            rules={[{ required: true, message: 'Vui lòng nhập email người nhận!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal để cập nhật nhân viên */}
      <Modal
        title="Cập Nhật Nhân Viên"
        visible={isUpdateModalVisible}
        onCancel={handleUpdateCancel}
        footer={null}
      >
        <Form form={updateForm} onFinish={handleUpdateEmployee}>
          <Form.Item
            label="Tên"
            name="name"
            rules={[{ required: true, message: 'Vui lòng nhập tên nhân viên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Chức vụ"
            name="position"
            rules={[{ required: true, message: 'Vui lòng nhập chức vụ nhân viên!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Chỉ tiêu hàng ngày (%)"
            name="daily_target_percentage"
            rules={[{ required: true, message: 'Vui lòng nhập chỉ tiêu hàng ngày!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Số ngày nghỉ"
            name="days_off"
            rules={[{ required: true, message: 'Vui lòng nhập số ngày nghỉ!' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Ghi chú"
            name="notes"
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập Nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal tạo cuộc họp */}
      <Modal
        title="Tạo Cuộc Họp"
        visible={isMeetingModalVisible}
        onCancel={handleMeetingCancel}
        footer={null}
      >
        <Form form={meetingForm} onFinish={handleCreateMeeting}>
          <Form.Item
            label="Ngày"
            name="date"
            rules={[{ required: true, message: 'Vui lòng chọn ngày!' }]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="Giờ"
            name="time"
            rules={[{ required: true, message: 'Vui lòng chọn giờ!' }]}
          >
            <DatePicker picker="time" />
          </Form.Item>

          <Form.Item
            label="Agenda"
            name="agenda"
            rules={[{ required: true, message: 'Vui lòng nhập agenda!' }]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Nhân viên"
            name="employees"
            rules={[{ required: true, message: 'Vui lòng chọn ít nhất một nhân viên!' }]}
          >
            <Select
              mode="multiple"
              onChange={(values) => setSelectedEmployees(filteredData.filter(emp => values.includes(emp.id)))}
            >
              {filteredData.map(employee => (
                <Option key={employee.id} value={employee.id}>
                  {employee.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Bảng hiển thị nhân viên */}
      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        rowClassName={rowClassName}
      />
    </div>
  );
}
