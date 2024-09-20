import React from 'react'
import { Box, HStack, Text } from "@chakra-ui/react";
const Mychat = () => {
  return (
    <Box
      width={"100%"}
      height={'80vh'}
      padding={"1%"}
      background={"#666E81"}
      borderRadius={"10px"}
      boxShadow={"lg"}
    >
        <HStack>
        <Text color={"#fff"}>My Chats</Text>
        </HStack>
        
      My Chat
    </Box>
  )
}

export default Mychat