import React from "react";
import {useNavigate} from "react-router-dom";
import {Button} from "antd";

export default function ChatButton(props) {
  const {userId} = props
  const navigate = useNavigate()

  function clickChat() {
    navigate(`/notification/im?addChat=${userId}`)
  }

  return (
    <Button
      size='middle'
      style={{ width: '90px' }}
      onClick={clickChat}
    >
      私信
    </Button>
  )
}