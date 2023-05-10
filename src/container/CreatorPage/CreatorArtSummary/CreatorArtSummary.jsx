import React from 'react'
import { Card, Tabs } from 'antd'
import CreatorDataItem from '@src/component/Card/CreatorDataItem/CreatorDataItem'
import './CreatorArtSummary.css'
import CreatorArticleCharts from '@src/component/Charts/CreatorArticleCharts/CreatorArticleCharts'
import CreatorArticleDataTable from '@src/component/Table/CreatorArticleDataTable/CreatorArticleDataTable'

export default function CreatorArtSummary () {
  const dataList = [
    {
      label: '总文章数',
      count: 2,
      beforeChange: '0'
    },
    {
      label: '文章阅读数',
      count: 230,
      beforeChange: '+5'
    },
    {
      label: '文章点赞数',
      count: 3,
      beforeChange: '0'
    },
    {
      label: '文章评论数',
      count: 3,
      beforeChange: '0'
    },
    {
      label: '文章收藏数',
      count: 15,
      beforeChange: '0'
    }
  ]

  return (
        <div>
            <Card
                title={<span style={{}}>文章数据</span>}
                bordered={false}
                style={{
                  width: '100%'
                }}
            >
                <div style={{
                  display: 'flex',
                  flexFlow: 'row wrap'
                }}>
                  {dataList.map(item => {
                    return <CreatorDataItem data={item} key={item.label} />
                  })}
                </div>
                <div className='creator-article-summary-anaylize-title'>数据趋势分析</div>
                <div>
                    <Tabs
                        defaultActiveKey="all"
                        items={[
                          {
                            label: '整体分析',
                            key: 'all',
                            children: (<CreatorArticleCharts/>)
                          },
                          {
                            label: '单篇分析',
                            key: 'single',
                            children: (<CreatorArticleDataTable />)
                          }
                        ]}
                    />
                </div>
            </Card>
        </div>
  )
}
