import React from 'react'
import ReactECharts from 'echarts-for-react';
import { Segmented } from 'antd';
import { useState } from 'react';

const dateChoose = [
    {
        label: '最近7天',
        value: '7'
    },
    {
        label: '最近14天',
        value: '14'
    },
    {
        label: '最近30天',
        value: '30'
    },
]

export default function CreatorFocusCharts() {
    const [date, setDate] = useState('7');

    let option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            // data: ['Email', 'Union Ads', 'Video Ads', 'Directssss', 'Direct', 'Search Engine']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Email',
                type: 'line',
                smooth: true,
                data: [600, 132, 101, 134, 90, 230, 210]
            },
            {
                name: 'Union Ads',
                type: 'line',
                smooth: true,
                data: [0, 182, 191, 234, 290, 330, 310]
            },
            {
                name: 'Video Ads',
                type: 'line',
                smooth: true,
                data: [150, 232, 201, 154, 190, 330, 410]
            },
            {
                name: 'Direct',
                type: 'line',
                smooth: true,
                data: [320, 332, 301, 334, 390, 330, 320]
            },
            {
                name: 'Directssss',
                type: 'line',
                smooth: true,
                data: [320, 332, 301, 334, 390, 330, 320]
            },

        ]
    };

    return (
        <div>
            <Segmented
                size="middle"
                value={date}
                onChange={(e) => {
                    setDate(e.key)
                }}
                options={dateChoose}
                style={{
                    margin: '0 0 15px 0'
                }}
            />
            <ReactECharts option={option} />
        </div>
    )
}
