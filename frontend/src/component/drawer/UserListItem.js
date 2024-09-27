import { VStack, Avatar, HStack, Text } from "@chakra-ui/react";
import React from "react";

const UserListItem = ({ handleFunction, user }) => {
  return (
    <VStack
      width={"100%"}
      boxShadow={"md"}
      p={"2%"}
      borderRadius={"10px"}
      cursor={"pointer"}
      _hover={{ bg: "teal.500", color: "white" }}
      bg={"white"}
      onClick={handleFunction}
      mt={"2%"}

    >
      <HStack width={"100%"}>
        <Avatar size={"sm"} name={user?.name} src={user?.pic} />
        <Text> {user?.name}</Text>
      </HStack>
      <Text pl={"2%"} mt={"-10px"} mr={"auto"}> {user?.email}</Text>
    </VStack>
  );
};

export default UserListItem;
