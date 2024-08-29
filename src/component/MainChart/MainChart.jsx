import React, { useEffect, useRef } from 'react'

import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

import {
  CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
const MainChart = () => {
  const progressExample = [
    { title: 'Visits', value: '29.703 Users', percent: 40, color: 'success' },
    { title: 'Unique', value: '24.093 Users', percent: 20, color: 'info' },
    { title: 'Pageviews', value: '78.706 Views', percent: 60, color: 'warning' },
    { title: 'New Users', value: '22.123 Users', percent: 80, color: 'danger' },
    { title: 'Bounce Rate', value: 'Average Rate', percent: 40.15, color: 'primary' },
  ]

  const random = () => Math.round(Math.random() * 100)

  return (
    <>

      <CCard>
        <CChartLine
          style={{ height: '300px', marginTop: '40px' }}
          data={{
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'My First dataset',
                borderColor: '#0074D9',
                pointHoverBackgroundColor: '#0074D9',
                borderWidth: 2,
                data: [
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                  random(50, 200),
                ],
                fill: true,
              },
              {
                label: 'My Second dataset',
                backgroundColor: 'red',
                borderColor: '#7CFC00',
                pointHoverBackgroundColor: 'red',
                borderWidth: 2,
                data: [220, 65, 220, 220, 200, 65, 65],

              },
              {
                label: 'My Third dataset',
                backgroundColor: 'red',
                borderColor: '#FFA07A',
                pointHoverBackgroundColor: '#FFA07A',
                borderWidth: 1,
                borderDash: [8, 5],
                data: [65, 65, 100, 100, 100, 65, 65],
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              x: {
                grid: {
                  drawOnChartArea: false,
                },
                ticks: {
                },
              },
              y: {
                beginAtZero: true,
                border: {
                },
                grid: {
                },
                max: 250,
                ticks: {
                  maxTicksLimit: 5,
                  stepSize: Math.ceil(250 / 5),
                },
              },
            },
            elements: {
              line: {
                tension: 0.4,
              },
              point: {
                radius: 0,
                hitRadius: 10,
                hoverRadius: 4,
                hoverBorderWidth: 3,
              },
            },
          }}
        />

        <CRow

          className="box-progress"
        >
          {progressExample.map((item, index, items) => (
            <CCol
              className='progress'
            >
              <div className="text-body-secondary">{item.title}</div>
              <div className="fw-semibold text-truncate">
                {item.value} ({item.percent}%)
              </div>
            </CCol>
          ))}
        </CRow>
      </CCard>

    </>

  )
}

export default MainChart
