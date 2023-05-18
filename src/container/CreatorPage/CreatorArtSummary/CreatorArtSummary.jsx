import React, { useEffect, useState } from 'react'
import { Card, Tabs } from 'antd'
import CreatorDataItem from '@src/component/Card/CreatorDataItem/CreatorDataItem'
import './CreatorArtSummary.css'
import CreatorArticleCharts from '@src/component/Charts/CreatorArticleCharts/CreatorArticleCharts'
import CreatorArticleDataTable from '@src/component/Table/CreatorArticleDataTable/CreatorArticleDataTable'
import { axiosReq } from '@src/util/request/axios'

export default function CreatorArtSummary () {
  const [dataList, setDataList] = useState([])

  useEffect(() => {
    axiosReq.get('/creatorData/getArticleCardData').then(
      value => {
        setDataList(value.data)
      }
    )
  }, [])

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
