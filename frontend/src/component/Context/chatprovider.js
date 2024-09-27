import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [chat, setChat] = useState([]);
  const [selectedChat, setSelectedChat] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);

    if (!userInfo) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <ChatContext.Provider value={{user, setUser, chat, setChat, selectedChat, setSelectedChat}}>
      {children}
    </ChatContext.Provider>
  );
};

const useChat = () => {
  return useContext(ChatContext);
};

export { ChatProvider, useChat };
