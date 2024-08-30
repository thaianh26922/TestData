import React from 'react'
import WidgetsDropdown from './component/WidgetsDropdown/WidgetsDropdown'
import MainChart from './component/MainChart/MainChart'
import { CButton } from '@coreui/react'

function Home() {



  return (
    <>

      <div className='control-chart'>
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
    </>
  )
}

export default Home