import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { axiosReq } from '@src/util/request/axios';
import { List, Space,Divider,Skeleton } from 'antd';
import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useParams } from 'react-router-dom';
import './ArticleList.css'


const data = Array.from({
  length: 4,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: 'https://joeschmoe.io/api/v1/random',
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}));
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);
export default function ArticleList(props) {
  const { sortId } = useParams();
  const { articleHeader } = props;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const loadMoreData = () => {
    if (loading) {
      return;
    }
    setLoading(true);
    let params = { sortId, ...articleHeader, current:currentPage, size: 10 }
    console.log(params)
    axiosReq.get('/article/getArticleList', params).then(
      (value) => {
        setLoading(false)
      },
      (reason) => {
        setLoading(false)
      }
    )
  };
  useEffect(() => {
    setData([])
    loadMoreData();
  }, [sortId]);

  return (
    <InfiniteScroll
      dataLength={data.length}
      next={loadMoreData}
      hasMore={true}
      loader={
        <Skeleton
          avatar
          paragraph={{
            rows: 3,
          }}
          active
        />
      }
      endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
    >
      <List
        itemLayout="vertical"
        size="large"
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
              <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
              <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
            ]}
            extra={
              item.icon != null ? <img
              width={220}
              alt="logo"
              src={item.icon}
            /> : ''
            }
            className='list-set'
          >
            <List.Item.Meta
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            <div className='textover-hidden'>{item.content}</div>
          </List.Item>
        )
        }
      />
    </InfiniteScroll>
  )
}
