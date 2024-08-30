import React from 'react';
import { CCol, CRow, CCard, CCardBody, CCardHeader } from '@coreui/react';
import { Card, Col, Progress, Row, Table } from 'antd';
import { websiteData } from '../../data/websiteData';
import CIcon from '@coreui/icons-react';
import {
    cibGoogle,
    cibFacebook,
    cibTwitter,
    cibLinkedin,
    cilUser,
    cilUserFemale,
} from '@coreui/icons';
import './index.css'; // Ensure this is imported

// Các cột cho bảng báo cáo người dùng
const userReportColumns = [
    { title: 'Report ID', dataIndex: 'report_id', key: 'report_id' },
    { title: 'User ID', dataIndex: 'user_id', key: 'user_id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Issue Category', dataIndex: 'issue_category', key: 'issue_category' },
    { title: 'Description', dataIndex: 'description', key: 'description' },
    { title: 'Date Submitted', dataIndex: 'date_submitted', key: 'date_submitted' },
    { title: 'Status', dataIndex: 'status', key: 'status' },
    { title: 'Resolution Details', dataIndex: 'resolution_details', key: 'resolution_details' },
    { title: 'Last Login', dataIndex: 'last_login', key: 'last_login' },
    { title: 'Time Spent', dataIndex: 'time_spent', key: 'time_spent' },
];

// Các cột cho bảng phản hồi người dùng
const userFeedbackColumns = [
    { title: 'Feedback ID', dataIndex: 'feedback_id', key: 'feedback_id' },
    { title: 'User ID', dataIndex: 'user_id', key: 'user_id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Email', dataIndex: 'email', key: 'email' },
    { title: 'Rating', dataIndex: 'rating', key: 'rating' },
    { title: 'Comments', dataIndex: 'comments', key: 'comments' },
    { title: 'Last Login', dataIndex: 'last_login', key: 'last_login' },
    { title: 'Time Spent', dataIndex: 'time_spent', key: 'time_spent' },
];

// Dữ liệu mẫu cho biểu đồ tiến độ
const progressGroupExample1 = [
    { title: 'Monday', value1: 34, value2: 78 },
    { title: 'Tuesday', value1: 56, value2: 94 },
    { title: 'Wednesday', value1: 12, value2: 67 },
    { title: 'Thursday', value1: 43, value2: 91 },
    { title: 'Friday', value1: 22, value2: 73 },
    { title: 'Saturday', value1: 53, value2: 82 },
    { title: 'Sunday', value1: 9, value2: 69 },
];

const progressGroupExample2 = [
    { title: 'Male', icon: cilUser, value: 53 },
    { title: 'Female', icon: cilUserFemale, value: 43 },
];

const progressGroupExample3 = [
    { title: 'Organic Search', icon: cibGoogle, percent: 56, value: '191,235' },
    { title: 'Facebook', icon: cibFacebook, percent: 15, value: '51,223' },
    { title: 'Twitter', icon: cibTwitter, percent: 11, value: '37,564' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 8, value: '27,319' },
];

const ManageWebsite = () => {
    return (
        <div className='container-website'>
            <CRow>
                {/* Phần biểu đồ tiến độ */}
                <Row gutter={16}>
                    <Col xs={24} sm={12} md={12}>
                        <Card bordered={false} style={{ borderLeft: '4px solid #17a2b8', marginBottom: '16px' }}>
                            <Card.Meta
                                title="Weekly Progress Overview"
                                description={
                                    <>
                                        <Row gutter={16}>
                                            <Col xs={24} sm={12} md={12}>
                                                <Card bordered={false} style={{ borderLeft: '4px solid #17a2b8', marginBottom: '16px' }}>
                                                    <div style={{ color: '#6c757d', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        New Clients
                                                    </div>
                                                    <div style={{ fontSize: '20px', fontWeight: '600' }}>9,123</div>
                                                </Card>
                                            </Col>
                                            <Col xs={24} sm={12} md={12}>
                                                <Card bordered={false} style={{ borderLeft: '4px solid #dc3545', marginBottom: '16px' }}>
                                                    <div style={{ color: '#6c757d', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                        Recurring Clients
                                                    </div>
                                                    <div style={{ fontSize: '20px', fontWeight: '600' }}>22,643</div>
                                                </Card>
                                            </Col>
                                        </Row>
                                        {progressGroupExample1.map((item, index) => (
                                            <div className="progress-group mb-4" key={index}>
                                                <div className="progress-group-prepend">
                                                    <span className="text-body-secondary small">{item.title}</span>
                                                </div>
                                                <div className="progress-group-bars">
                                                    <Progress
                                                        percent={item.value1}
                                                        strokeColor={{ '0%': '#1890ff', '100%': '#1890ff' }} // Blue color
                                                        showInfo={false}
                                                    />
                                                    <Progress
                                                        percent={item.value2}
                                                        strokeColor={{ '0%': '#ff4d4f', '100%': '#ff4d4f' }} // Red color
                                                        showInfo={false}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                }
                            />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} md={12}>
                        <Card bordered={false} style={{ borderLeft: '4px solid #28a745' }}>
                            <Card.Meta
                                title="Social Media Engagement"
                                description={
                                    <>
                                        <div className="progress-group mb-4">
                                            <Row gutter={16}>
                                                <Col xs={24} sm={12} md={12}>
                                                    <Card bordered={false} style={{ borderLeft: '4px solid #ffc107' }}>
                                                        <div style={{ color: '#6c757d', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                            Pageviews
                                                        </div>
                                                        <div style={{ fontSize: '20px', fontWeight: '600' }}>78,623</div>
                                                    </Card>
                                                </Col>
                                                <Col xs={24} sm={12} md={12}>
                                                    <Card bordered={false} style={{ borderLeft: '4px solid #28a745' }}>
                                                        <div style={{ color: '#6c757d', fontSize: '12px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                                            Organic
                                                        </div>
                                                        <div style={{ fontSize: '20px', fontWeight: '600' }}>49,123</div>
                                                    </Card>
                                                </Col>
                                            </Row>
                                        </div>
                                        {progressGroupExample2.map((item, index) => (
                                            <div className="progress-group mb-4" key={index}>
                                                <div className="progress-group-header">
                                                    <CIcon className="me-2 small-icon" icon={item.icon} />
                                                    <span>{item.title}</span>
                                                    <span className="ms-auto fw-semibold">{item.value}%</span>
                                                </div>
                                                <div className="progress-group-bars">
                                                    <Progress
                                                        percent={item.value}
                                                        strokeColor={{ '0%': '#faad14', '100%': '#faad14' }} // Yellow color
                                                        showInfo={false}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        {progressGroupExample3.map((item, index) => (
                                            <div className="progress-group mb-4" key={index}>
                                                <div className="progress-group-header">
                                                    <CIcon className="me-2 small-icon" icon={item.icon} />
                                                    <span>{item.title}</span>
                                                    <span className="ms-auto fw-semibold">
                                                        {item.value}{' '}
                                                        <span className="text-body-secondary small">({item.percent}%)</span>
                                                    </span>
                                                </div>
                                                <div className="progress-group-bars">
                                                    <Progress
                                                        percent={item.percent}
                                                        strokeColor={{ '0%': '#52c41a', '100%': '#52c41a' }} // Green color
                                                        showInfo={false}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </>
                                }
                            />
                        </Card>
                    </Col>
                </Row>

                {/* Bảng báo cáo người dùng */}
                <CCol xs={12} md={12} lg={4}>
                    <CCard>
                        <CCardHeader>
                            <h5>User Reports</h5>
                        </CCardHeader>
                        <CCardBody>
                            <Table
                                columns={userReportColumns}
                                dataSource={websiteData.user_reports}
                                rowKey="report_id"
                                pagination={false}
                                bordered
                            />
                        </CCardBody>
                    </CCard>
                </CCol>

                {/* Bảng phản hồi người dùng */}
                <CCol xs={12} md={12} lg={4}>
                    <CCard>
                        <CCardHeader>
                            <h5>User Feedback</h5>
                        </CCardHeader>
                        <CCardBody>
                            <Table
                                columns={userFeedbackColumns}
                                dataSource={websiteData.user_feedback}
                                rowKey="feedback_id"
                                pagination={false}
                                bordered
                            />
                        </CCardBody>
                    </CCard>
                </CCol>
            </CRow>
        </div>
    );
};

export default ManageWebsite;
