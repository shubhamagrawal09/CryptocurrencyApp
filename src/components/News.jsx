import { Avatar, Card, Col, Image, Row, Select, Typography } from 'antd'
import React from 'react'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import moment from 'moment';

const { Text, Title } = Typography; //6 ,12
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'
const News = ({ simplified }) => {
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory: 'CryptoCurrency'});
  const filterData = simplified ?  cryptoNews?.data?.slice(0, 10) : cryptoNews?.data;

  console.log('news',cryptoNews?.data?.slice(0,10))
  if(!cryptoNews?.data) return 'Loading...';

  return (
    <Row gutter={[24, 24]}>
      {
        filterData.map((news,i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank' rel='noreferer'>
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>{news.title}</Title>
                  <img style={{width: '100px', height: '100px'}} src={news?.image || demoImage} alt='news'  />
                </div>
                <p>
                  {news?.excerpt > 100 ? `${news.excerpt.substring(0,100)}...` : news?.excerpt}
                </p>
                <div className='provider-container'>
                  <div >
                    <Avatar src={news?.image} alt='news' />
                    <Text>{news?.relativeTime}</Text>
                  </div>
                </div>
              </a>
            </Card>
          </Col>
        ))
      }
    </Row>
  )
}

export default News