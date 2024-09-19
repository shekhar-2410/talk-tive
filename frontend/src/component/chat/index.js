import React from 'react'
import { useChat } from '../Context/chatprovider';
const ChatPage = () => {
  const { chat } = useChat(); // Use chat instead of user
  console.log(chat); 
  
  return (
    <div>ChatPage</div>
  )
}

export default ChatPage;