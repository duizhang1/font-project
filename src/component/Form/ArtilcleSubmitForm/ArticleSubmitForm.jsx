import { Form, Input, message, Select, Upload, Button } from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { axiosReq } from '@src/util/request/axios'
import { connect } from 'react-redux'
import { setSortAction } from '@src/redux/action/Sort'
import { setLabelAction } from '@src/redux/action/Label'
import qiniuUpload from '@src/util/qiniu/qiniuUpload'
import { useNavigate } from "react-router-dom";

const { TextArea } = Input

function ArticleSubmitForm(props) {
    const { sortRedux, setSortAction, labelRedux, setLabelAction, id, title, mdValue,articleInfo } = props
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();

    // 完成文章创建
    const onFinish = (value) => {
        let { uploadImg, ...subValue } = value;
        subValue = {
            title,
            content: mdValue,
            img: imageUrl,
            ...subValue
        };
        let url = '/article/insertArticle'
        if (id !== 'new') {
            url = '/article/updateArticle'
        }
        axiosReq.post(url, subValue).then(
            (value) => {
                message.info(value.message)
                navigate(-1);
            },
            (reason) => {
                message.error(reason.message)
            }
        )
    }
    // 完成分类的获取
    let sortOptions = []
    if (sortRedux.length > 0) {
        sortOptions = sortRedux.map((item, key) => {
            return { value: item.uuid, label: item.sortName }
        })
    }
    // 完成标签的获取
    let labelOptions = []
    if (labelRedux.length > 0) {
        labelOptions = labelRedux.map((item, key) => {
            return { value: item.uuid, label: item.labelName }
        })
    }

    function customRequest({ action, data, file, filename, headers, onError, onProgress, onSuccess, withCredentials, }) {
        setLoading(true);
        qiniuUpload(file).then(
            (value) => {
                setImageUrl(value)
                setLoading(false);
            },
            (reason) => {
                message.error(reason)
                setLoading(false);
            }
        )
    }

    function fileHref() {
        return imageUrl
    }

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    useEffect(() => {
        // 请求分区的数据
        if (sortRedux.length === 0) {
            axiosReq.get('/sort/getSortList').then(
                (value) => {
                    setSortAction(value.data)
                },
                (reason) => {
                    message.error(reason.message)
                }
            )
        }
        // 请求标签的数据
        if (labelRedux.length === 0) {
            axiosReq.get('/label/getLabelList').then(
                (value) => {
                    setLabelAction(value.data)
                },
                (reason) => {
                    message.error(reason.message)
                }
            )
        }
        if (articleInfo.img) {
            setImageUrl(articleInfo.img)
        }
    }, [])

    return (
        <div style={{ width: '500px' }}>
            <Form
                onFinish={onFinish}
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 18,
                }}
                width={'500'}
            >
                <Form.Item
                    label="文章摘要"
                    name="summary"
                    rules={[
                        {
                            required: true,
                            message: '请输入文章摘要'
                        }
                    ]}
                >
                    <TextArea defaultValue={articleInfo ? articleInfo.summary : ''} rows={4} />
                </Form.Item>
                <Form.Item
                    label="选择分区"
                    name="sortId"
                    rules={[
                        {
                            required: true,
                            message: '请选择文章分区'
                        }
                    ]}
                >
                    <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={sortOptions}
                        defaultValue={articleInfo ? articleInfo.sortId : ''}
                    >

                    </Select>
                </Form.Item>
                <Form.Item
                    label="选择标签"
                    name="labelId"
                    rules={[
                        {
                            required: true,
                            message: '请选择文章标签'
                        }
                    ]}
                >
                    <Select
                        showSearch
                        optionFilterProp="children"
                        filterOption={(input, option) => (option?.label ?? '').includes(input)}
                        filterSort={(optionA, optionB) =>
                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                        }
                        options={labelOptions}
                        defaultValue={articleInfo ? articleInfo.labelId : ''}
                    >

                    </Select>
                </Form.Item>
                <Form.Item
                    label="封面"
                    name="uploadImg"
                    getValueProps={fileHref}
                    valuePropName="fileList"
                >
                    <Upload
                        name="img"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        customRequest={customRequest}
                    >
                        {imageUrl ? (
                            <img
                                src={imageUrl}
                                alt="img"
                                style={{
                                    width: '100%',
                                }}
                            />
                        ) : (
                            uploadButton
                        )}
                    </Upload>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{ margin: '0 0 12px' }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ float: 'right',borderRadius: '15px' }}
                    >
                        确认{id === 'new' ? '并发布' : '并更新'}
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default connect(
    state => ({
        sortRedux: state.sort,
        labelRedux: state.label
    }),
    { setSortAction, setLabelAction }
)(ArticleSubmitForm)