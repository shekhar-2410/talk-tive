/* eslint-disable no-unused-vars */
import {
  Box,
  HStack,
  Image,
  Spacer,
  Text,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Drawer,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Tooltip,
  MenuDivider,
  VStack,
  DrawerBody,
  Input,
  useToast,
  Spinner
} from "@chakra-ui/react";
import { ArrowLeftIcon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { useChat } from "../Context/chatprovider";
import { useNavigate } from "react-router-dom";
import CutomeModal from "../modal/Modal";
import axios from "axios";
import ChatLoading from "../loading/Chatloading";
import UserListItem from "./UserListItem";
const Sidedrawer = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [search, setsearch] = useState("");
  const [searchresult, setsearchresult] = useState([]);
  const [loading, setloading] = useState(false);
  const [loadingChat, setloadingChat] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { user, setSelectedChat,chat,setChat } = useChat();


  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    try {
      setloading(true);
      const { data } = await axios.get(`http://localhost:5000/api/user?search=${search}`, config);
      setsearchresult(data);
      setloading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Error Occured",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  

  const userLogout = () => {
    localStorage.removeItem("userInfo");
    window.location.reload();
    navigate("/");
  };

  const accessChat = async (userId) => {
    try {
      setloadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post("http://localhost:5000/api/chat", { userId }, config);
      if(!chat?.find((c) => c._id === data._id)) setChat([data, ...chat]);
      setSelectedChat(data);
      setloadingChat(false);
      onClose();
    } catch (error) {
      console.error("Error accessing chat:", error); 
      toast({
        title: "Error Occurred",
        description: "Failed to load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      setloadingChat(false); 
    }
  };
  
  
  return (
    <Box
      width={"100%"}
      padding={"1%"}
      background={"#666E81"}
      borderRadius={"10px"}
      boxShadow={"lg"}
    >
      <Box
        display={"flex"}
        flexDir={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          width={"15%"}
          padding={"1%"}
          background={"#273149"}
          borderRadius={"30px"}
          boxShadow={"lg"}
        >
          <HStack>
            <Tooltip
              label="Click icon to chat"
              hasArrow
              arrowSize={5}
              placement="bottom-end"
            >
              <Text color="#fff">Search User</Text>
            </Tooltip>
            <Spacer />
            <Box ref={btnRef} colorScheme="teal" onClick={onOpen}>
              <ArrowLeftIcon GoSidebarExpand color={"#fff"} fontSize={"21px"} />

              <Box>
                <Drawer
                  isOpen={isOpen}
                  placement="left"
                  onClose={onClose}
                  finalFocusRef={btnRef}
                >
                  <DrawerOverlay />
                  <DrawerContent background={"gray.300"}>
                    <DrawerCloseButton />
                    <DrawerHeader>Search User</DrawerHeader>
                    <DrawerBody>
                      <Box>
                        <HStack>
                          <Input
                            value={search}
                            onChange={(e) => setsearch(e.target.value)}
                            placeholder="Search User"
                          />
                          <Button onClick={handleSearch}>Go</Button>
                          
                        </HStack>
                        {loading ? (
                            <ChatLoading />
                          ):(
                            <Box>
                              {searchresult?.map((user) => (
                              <UserListItem 
                                key={user._id} 
                                user={user}
                                handleFunction = {() => {accessChat(user._id)}}
                                />
                              ))}
                            </Box>
                          )}
                          {loadingChat && <Spinner ml="auto" display="flex" />}
                      </Box>
                    </DrawerBody>
                  </DrawerContent>
                </Drawer>
              </Box>
            </Box>
          </HStack>
        </Box>

        <Box ml={"-10%"}>
          <Image src="/talk_tive.svg" />
        </Box>
        <Box>
          <HStack gap={"10px"}>
            <Box>
              <BellIcon color={"#fff"} fontSize={"27px"} />
            </Box>
            <Box>
              <Avatar name={user?.name} src={user?.picture} />
            </Box>
            <Box>
              <Menu>
                <MenuButton>
                  <ChevronDownIcon color={"#fff"} fontSize={"21px"} />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <CutomeModal message="User Profile">
                      <VStack>
                        <Image
                          mr={"auto"}
                          boxSize="80px"
                          // objectFit="cover"
                          src="https://bit.ly/dan-abramov"
                          alt="Dan Abramov"
                        />

                        <Text
                          textTransform={"capitalize"}
                          fontSize={"larger"}
                          fontWeight={"bold"}
                          mr={"auto"}
                        >
                          {user?.name}
                        </Text>
                        <Text mr={"auto"}>{user?.email}</Text>
                      </VStack>
                    </CutomeModal>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem>
                    <Button
                      _hover={{ bg: "none" }}
                      varient="ghost"
                      background={"none"}
                      onClick={userLogout}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidedrawer;
