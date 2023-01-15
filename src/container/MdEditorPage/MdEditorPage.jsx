import React, { useEffect, useRef, useState } from 'react'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { Input, Button, message, Popover } from 'antd';
import './MdEditorPage.css'
import { useNavigate, useParams } from "react-router-dom";
import { connect } from 'react-redux'
import qiniuUpload from '@src/util/qiniu/qiniuUpload';
import ArticleSubmitForm from '@src/component/Form/ArtilcleSubmitForm/ArticleSubmitForm'
import { axiosReq } from '@src/util/request/axios';

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

function MdEditorPage(props) {
  const { userRedux } = props
  const navigate = useNavigate();
  const { id } = useParams();
  const title = id === 'new' ? '发布文章' : '更新文章';
  const [inpValue, setInpValue] = useState();
  const [mdValue, setMdValue] = useState('');
  const [articleInfo, setArticleInfo] = useState(null);
  const editor = useRef(null)

  useEffect(() => {
    // 如果是更新判断该文章用户是否具备更新的条件
    if (id !== 'new') {
      axiosReq.get('/article/isCanUpdateArticle', {id}).then(
        (value) => {
          const { data } = value
          editor.current.setText(data.content)
          setInpValue(data.title)
          setArticleInfo(data)
        },
        (reason) => {
          message.error(reason.message)
        }
      )
    }
  }, [])

  const returnPage = () => {
    navigate(-1)
  }

  function imageUpload(file) {
    return qiniuUpload(file)
  }

  function inPutChange(e) {
    setInpValue(e.target.value)
  }

  function handleEditorChange({ html, text }) {
    setMdValue(text)
  }

  return (
    <div style={{ height: '100vh' }}>
      <div className='mdeditor-header'>
        <Input
          placeholder="请输入文章标题..."
          bordered={false}
          style={{
            height: '50px',
            fontSize: '25px',
            marginLeft: '15px',
            width: '86%'
          }}
          value={inpValue}
          onChange={inPutChange}
        />
        <Popover
          placement="bottomRight"
          title={<span className='popover-form-title'>{title}</span>}
          content=
          {<ArticleSubmitForm
            id={id}
            title={inpValue}
            mdValue={mdValue}
            articleInfo={articleInfo}
          />}
          trigger="click"
        >
          <Button type="primary" style={{borderRadius: '15px'}}>{title}</Button>
        </Popover>

        <Button style={{ marginLeft: '15px',borderRadius: '15px' }} onClick={returnPage}>返回</Button>
      </div>
      <MdEditor
        style={{ height: '92vh', minHeight: '300px' }}
        renderHTML={text => mdParser.render(text)}
        onChange={handleEditorChange}
        onImageUpload={imageUpload}
        ref={editor}
      />
    </div>
  )
}

export default connect(
  state => ({
    userRedux: state.user
  }),
  {}
)(MdEditorPage)