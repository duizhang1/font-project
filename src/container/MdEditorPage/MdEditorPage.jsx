import React from 'react'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { Input,Button } from 'antd';
import './MdEditorPage.css'
import { useNavigate } from "react-router-dom";

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
  console.log('handleEditorChange', html, text);
}

export default function MdEditorPage() {
  const navigate = useNavigate();

  const returnPage = () => {
    navigate(-1)
  }

  return (
    <div style={{ height: '700px' }}>
      <div className='mdeditor-header'>
        <Input placeholder="请输入文章标题..." bordered={false}
          style={{
            height: '50px',
            fontSize: '25px',
            marginLeft: '15px',
            width: '86%'
          }} />
        <Button type="primary">发布文章</Button>
        <Button style={{marginLeft: '15px'}} onClick={returnPage}>返回</Button>
      </div>
      <MdEditor style={{ height: '100%' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
    </div>
  )
}
