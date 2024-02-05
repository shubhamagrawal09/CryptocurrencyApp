import { Col, Row, Typography } from 'antd'
import React from 'react'

const { Title } = Typography;
const LineChart = ({ coinName, coinHistory, currentPrice }) => {
  console.log('00',coinHistory)
  return (
    <>  
        <Row className='chart-header'>
            <Title level={2} className="chart-title" >{coinName} Price Chart</Title>
            <Col className="price-container">
                <Title level={5} className="price-change">{coinHistory?.price}%</Title>
                <Title level={5} className="current-price">Current {coinName} Price: ${currentPrice}</Title>
            </Col>
        </Row>
    </>
  )
}

export default LineChart