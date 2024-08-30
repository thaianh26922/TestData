import React, { useState } from 'react';
import { Table, Space, Button, Modal, Input } from 'antd';
import { jsPDF } from 'jspdf';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { machines } from '../../data/machines';

export default function ManageMachines() {
  const [data, setData] = useState(machines);
  const [filteredData, setFilteredData] = useState(machines);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Tên thiết bị',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Loại thiết bị',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Công suất',
      dataIndex: ['technical_specs', 'power'],
      key: 'power',
    },
    {
      title: 'Năng suất',
      dataIndex: ['technical_specs', 'capacity'],
      key: 'capacity',
    },
    {
      title: 'Tốc độ',
      dataIndex: ['technical_specs', 'speed'],
      key: 'speed',
    },
    {
      title: 'Vị trí',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Nhà sản xuất',
      dataIndex: 'manufacturer',
      key: 'manufacturer',
    },
    {
      title: 'Thông tin',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleViewPDF(record)}>Hướng dẫn sử dụng</Button>
        </Space>
      ),
    },
  ];

  // Tạo file PDF cho thiết bị
  const generatePDF = (machine) => {
    const doc = new jsPDF();
    doc.text(`${machine.user_manual}`, 10, 10);
    const pdfBlob = doc.output('blob');
    return URL.createObjectURL(pdfBlob);
  };

  // Hiển thị PDF khi bấm nút "Xem"
  const handleViewPDF = (record) => {
    const pdfUrl = generatePDF(record);
    setPdfUrl(pdfUrl);
    setIsModalVisible(true);
  };

  // Đóng modal hiển thị PDF
  const handleCancel = () => {
    setIsModalVisible(false);
    setPdfUrl(null);
  };

  // Tìm kiếm theo tên
  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = data.filter((machine) =>
      machine.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
  };

  // Lọc 5 thiết bị gần đến ngày bảo trì nhất
  const handleFilterByMaintenanceDate = () => {
    const sortedMachines = [...data]
      .sort((a, b) => new Date(a.maintenance_date) - new Date(b.maintenance_date))
      .slice(0, 5);
    setFilteredData(sortedMachines);
  };

  return (
    <div className='container-website'>
      <h2>Quản lý thiết bị sản xuất bánh kẹo</h2>

      {/* Flex container for search input and filter button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <Input
          placeholder="Search by name"
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 300 }}
        />
        <Button type="primary" onClick={handleFilterByMaintenanceDate}>
          Filter by Maintenance Date
        </Button>
      </div>

      <Table columns={columns} dataSource={filteredData} rowKey="id" />

      <Modal
        title="Thông tin thiết bị"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {pdfUrl && (
          <div style={{ height: '500px' }}>
            <iframe src={pdfUrl} width="100%" height="100%" title="PDF Viewer" />
          </div>
        )}
      </Modal>
    </div>
  );
}
