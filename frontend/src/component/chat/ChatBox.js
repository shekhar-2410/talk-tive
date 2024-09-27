import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  HStack,
  Spacer,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useChat } from "../Context/chatprovider";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import ChatLoading from "../loading/Chatloading";
import { getSender } from "../../config/ChatLogic";
const ChatBox = () => {
  const toast = useToast();
  const [logger, setLogger] = useState("");
  const { selectedChat, setSelectedChat, user, chat, setChat } = useChat();

  const fetchChat = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:5000/api/chat",
        config
      );
      console.log(data);
      setChat(data);
    } catch (error) {
      console.error("Error fetching chats:", error);
      toast({
        title: "Error Occurred",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLogger(JSON.parse(localStorage.getItem("userInfo")));
    fetchChat();
  }, []);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      width={"100%"}
      height={"80vh"}
      padding={"2%"}
      background={"#666E81"}
      borderRadius={"10px"}
      boxShadow={"lg"}
    >
      <HStack pb={"2%"} px={"2%"} width={"100%"}>
        <Text fontWeight={"bold"} color={"white"} fontSize={"20px"}>
          My Chats
        </Text>
        <Spacer />
        <Button rightIcon={<AddIcon />}>New Group Chat</Button>
      </HStack>
      <Box display={"flex"} width={"100%"} dir="column" flexWrap={"wrap"} padding={"2%"}>
        {chat ?
        chat.map((chat)=>(
          <Stack 
          onClick={()=>setSelectedChat(chat)} 
          cursor={"pointer"}
          background={selectedChat===chat?"white":"#485568"}
          color={selectedChat===chat?"black":"white"}
          borderRadius={"10px"}
          boxShadow={"lg"}
          padding={"2%"}
          mr={"2%"}
          mb={"2%"}
          width={"100%"}
          >
            <Text>
              {chat.isGroupChat ? getSender(user, chat.users): chat.chatName }
            </Text>
          </Stack>
        ))
         
         : <ChatLoading />}
      </Box>
    </Box>
  );
};

export default ChatBox;
