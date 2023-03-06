import React from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "antd";

export default function ChatButton() {
  const navigate = useNavigate()

  function clickChat() {
    navigate(`/notification/im?addChat=${authorInfo.uuid}`)
  }

  return (
    <Button
      size='middle'
      style={{ width: '45%', marginLeft: '15px' }}
      onClick={clickChat}
    >
      私信
    </Button>
  )
}