import React from 'react'
import { Skeleton, Divider,Empty } from 'antd'

export default function ArticleListLoading(props) {

    const { hasMore } = props

    return (
        <>
            <div style={{ display: hasMore ? 'block' : 'none' }}>
                <Skeleton
                    style={{ padding: '0 11px' }}
                    paragraph={{
                        rows: 3,
                    }}
                    active
                    round
                    title
                />
                <Divider style={{ marginTop: '0px' }} />
                <Skeleton
                    style={{ padding: '0 11px' }}
                    paragraph={{
                        rows: 3,
                    }}
                    active
                    round
                    title
                />
                <Divider style={{ marginTop: '0px' }} />
                <Skeleton
                    style={{ padding: '0 11px' }}
                    paragraph={{
                        rows: 3,
                    }}
                    active
                    round
                    title
                />
                <Divider style={{ marginTop: '0px' }} />
                <Skeleton
                    style={{ padding: '0 11px' }}
                    paragraph={{
                        rows: 3,
                    }}
                    active
                    round
                    title
                />
                <Divider style={{ marginTop: '0px' }} />
                <Skeleton
                    style={{ padding: '0 11px' }}
                    paragraph={{
                        rows: 3,
                    }}
                    active
                    round
                    title
                />

            </div>
            <div>
                <Empty description='暂无文章' />
            </div>
        </>
    )
}
