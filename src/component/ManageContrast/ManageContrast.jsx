import React, { useState } from 'react';
import { Table, Button, Modal } from 'antd';
import { jsPDF } from 'jspdf';
import { contrast } from '../../data/contracts';

// Dữ liệu hợp đồng mẫu


const generatePDF = (contract) => {
  const doc = new jsPDF();

  doc.setFontSize(12);
  doc.text('CONTRACT AGREEMENT', 10, 10);
  doc.text(`Contract Number: ${contract.contract_id}`, 10, 20);
  doc.text(`Date: ${contract.contract_date}`, 10, 30);

  doc.text('Parties:', 10, 40);
  doc.text('Supplier:', 10, 50);
  doc.text(`Company Name: ${contract.supplier}`, 20, 60);

  doc.text('Buyer:', 10, 80);
  doc.text('Company Name: Candy Factory Ltd.', 20, 90);
  doc.text('Address: 456 Sugar Street, Confectionery Town, TX 67890', 20, 100);

  doc.text('1. Contract Scope', 10, 120);
  doc.text(`The Supplier agrees to provide the following equipment to the Buyer:`, 10, 130);
  doc.text(`Product: ${contract.product}`, 20, 140);
  doc.text(`Quantity: ${contract.quantity} units`, 20, 150);
  doc.text(`Total Value: $${contract.total_value}`, 20, 160);

  doc.text('2. Delivery Terms', 10, 180);
  doc.text('Delivery Date: [Expected Delivery Date]', 20, 190);
  doc.text('Delivery Address: 456 Sugar Street, Confectionery Town, TX 67890', 20, 200);
  doc.text('Shipping Method: Standard Freight', 20, 210);

  doc.text('3. Payment Terms', 10, 230);
  doc.text('Payment Method: Bank Transfer', 20, 240);
  doc.text('Payment Schedule: 50% advance upon signing the contract, 50% upon delivery', 20, 250);

  doc.text('4. Warranty', 10, 270);
  doc.text('The Supplier provides a warranty of 12 months against defects in material and workmanship.', 20, 280);

  doc.text('5. Return Policy', 10, 300);
  doc.text('In case of defective or damaged goods, the Buyer must notify the Supplier within 7 days of receipt.', 20, 310);

  doc.text('6. Confidentiality', 10, 330);
  doc.text('Both parties agree to keep the terms of this contract confidential.', 20, 340);

  doc.text('7. Termination', 10, 360);
  doc.text('Either party may terminate this contract if the other party fails to fulfill its obligations.', 20, 370);

  doc.text('8. Governing Law', 10, 390);
  doc.text('This contract shall be governed by and construed in accordance with the laws of the State of [State].', 20, 400);

  doc.text('9. Dispute Resolution', 10, 420);
  doc.text('Any disputes arising out of or in connection with this contract shall be resolved through arbitration.', 20, 430);

  doc.text('Signatures:', 10, 450);
  doc.text('Supplier:', 10, 460);
  doc.text('Signature: _______________________', 20, 470);
  doc.text('Name: [Supplier Representative]', 20, 480);

  doc.text('Buyer:', 10, 500);
  doc.text('Signature: _______________________', 20, 510);
  doc.text('Name: [Buyer Representative]', 20, 520);

  return doc.output('bloburl');
};

export default function ManageContrast() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [selectedContract, setSelectedContract] = useState(null);

  const columns = [
    {
      title: 'Contract ID',
      dataIndex: 'contract_id',
      key: 'contract_id',
    },
    {
      title: 'Contract Date',
      dataIndex: 'contract_date',
      key: 'contract_date',
    },
    {
      title: 'Supplier',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Total Value',
      dataIndex: 'total_value',
      key: 'total_value',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button onClick={() => handleViewPDF(record)}>View PDF</Button>
      ),
    },
  ];

  const handleViewPDF = (contract) => {
    const pdfUrl = generatePDF(contract);
    setPdfUrl(pdfUrl);
    setSelectedContract(contract);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setPdfUrl(null);
  };

  return (
    <div className='container-website'>
      <h2>Contract Management</h2>
      <Table columns={columns} dataSource={contrast} rowKey="id" />

      <Modal
        title={`Contract ${selectedContract?.id}`}
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {pdfUrl && (
          <iframe src={pdfUrl} width="100%" height="600px" title="PDF Viewer" />
        )}
      </Modal>
    </div>
  );
}
