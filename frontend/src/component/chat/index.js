import React from "react";
import { useChat } from "../Context/chatprovider";
import { Box } from "@chakra-ui/react";
import Sidedrawer from "../drawer/Sidedrwer";
import ChatBox from "./ChatBox";
import Mychat from "./Mychat";
const ChatPage = () => {
  const { chat } = useChat(); // Use chat instead of user
  return (
    <Box padding={"1%"} background={"#485568"} width={"100%"} height={"100vh"}>
    <Sidedrawer/>
    <Box display={"flex"} justifyContent={"space-between"} mt={'2%'}>
      <Box width={'38%'}>
      <ChatBox/>
      </Box>
      <Box width={'60%'}>
      <Mychat/>
      </Box>
    </Box>
    
  </Box>
  );
};

export default ChatPage;
