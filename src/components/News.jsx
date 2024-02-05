import { Avatar, Card, Col, Image, Row, Select, Typography } from 'antd'
import React, { useState } from 'react'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import moment from 'moment';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography; //6 ,12
const { Option } = Select;

const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News'
const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory});
  const { data } = useGetCryptosQuery(100)
  const filterData = simplified ?  cryptoNews?.data?.slice(0, 6) : cryptoNews?.data;

  console.log('news',cryptoNews?.data?.slice(0,6))
  if(!cryptoNews?.data) return 'Loading...';

  return (
    <Row gutter={[24, 24]}>
      {
        !simplified && (
          <Col span={24} >
            <Select
              showSearch
              className='select-news'
              placeholder="Select a crypto"
              optionFilterProp='childern'
              onChange={(value) => setNewsCategory(value)}
              filterOption={(input,option) => option.children.toLowerCase().indexOf (input.toLowerCase()) >= 0 }
            >
              <Option value="Cryptocurrency" >Cryptocurrency</Option>
              {data?.data?.coins.map((coin) => <Option value={coin.name}>{coin.name}</Option>)}
            </Select>
          </Col>
        )
      }
      {
        filterData.map((news,i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card hoverable className='news-card'>
              <a href={news.url} target='_blank' rel='noreferer'>
                <div className='news-image-container'>
                  <Title className='news-title' level={4}>{news.title}</Title>
                  <img style={{maxWidth: '100px', maxHeight: '100px'}} src={news?.image || demoImage} alt='news'  />
                </div>
                <p>
                  {news?.excerpt > 100 ? `${news.excerpt.substring(0,100)}...` : news?.excerpt}
                </p>
                <div className='provider-container'>
                  <div >
                    <Avatar src={news?.image} alt='news' />
                    <Text className='provider-name' >{news?.syndicate}</Text>
                  </div>
                  <Text>{news?.relativeTime}</Text>
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