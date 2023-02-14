import CreatorFocusCharts from '@src/component/Charts/CreatorFocusCharts/CreatorFocusCharts'
import React from 'react'
import { Card, Tabs } from 'antd';
import CreatorDataItem from '@src/component/Card/CreatorDataItem/CreatorDataItem';

export default function CreatorFocusSummary() {
    return (
        <div>
            <Card
                title={<span style={{}}>关注数据</span>}
                bordered={false}
                style={{
                    width: '100%',
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
                <div style={{
                    fontSize: '17px',
                    margin: '10px 0 15px 0'
                }}
                >
                    数据趋势分析
                </div>
                <div>
                    <CreatorFocusCharts />
                </div>
            </Card>
        </div>
    )
}
