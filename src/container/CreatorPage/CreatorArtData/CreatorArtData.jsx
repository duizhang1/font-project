import React from 'react'
import { useState } from 'react';
import { Tabs, Pagination } from 'antd';
import './CreatorArtData.css'
import CreatorArticleList from './CreatorArticleList/CreatorArticleList';

export default function CreatorArtData() {

    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(10)
    const pageSize = 10

    const onChange = (key) => {
        console.log(key);
    };

    return (
        <div className='creator-article-data-div'>
            <Tabs
                defaultActiveKey="1"
                onChange={onChange}
                items={[
                    {
                        label: (<span className='creator-article-data-tabs-span'>全部</span>),
                        key: '1',
                        children: (<CreatorArticleList />),
                    },
                    {
                        label: (<span className='creator-article-data-tabs-span'>已发布</span>),
                        key: '2',
                        children: (<CreatorArticleList />),
                    },
                    {
                        label: (<span className='creator-article-data-tabs-span'>审核中</span>),
                        key: '3',
                        children: `Content of Tab Pane 3`,
                    },
                    {
                        label: (<span className='creator-article-data-tabs-span'>未通过</span>),
                        key: '4',
                        children: `Content of Tab Pane 3`,
                    },
                ]}
            />
            <div className='creator-article-data-page'>
                <Pagination
                    current={page}
                    pageSize={pageSize}
                    onChange={(page, pageSize) => {
                        setPage(page)
                    }}
                    total={total}
                />
            </div>
        </div>
    )
}
