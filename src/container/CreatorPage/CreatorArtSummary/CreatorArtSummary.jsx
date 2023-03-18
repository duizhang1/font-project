import React from 'react'
import { Card, Tabs } from 'antd'
import CreatorDataItem from '@src/component/Card/CreatorDataItem/CreatorDataItem'
import './CreatorArtSummary.css'
import CreatorArticleCharts from '@src/component/Charts/CreatorArticleCharts/CreatorArticleCharts'
import CreatorArticleDataTable from '@src/component/Table/CreatorArticleDataTable/CreatorArticleDataTable'

export default function CreatorArtSummary () {
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
                    <CreatorDataItem />
                    <CreatorDataItem />
                    <CreatorDataItem />
                    <CreatorDataItem />
                    <CreatorDataItem />
                    <CreatorDataItem />
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
