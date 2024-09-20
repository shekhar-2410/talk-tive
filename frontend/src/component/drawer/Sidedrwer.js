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
} from "@chakra-ui/react";
import { Search2Icon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React,{useState} from "react";
import { useChat } from "../Context/chatprovider";
import { useNavigate } from "react-router-dom";
const Sidedrawer = () => {
    const navigate = useNavigate();
    const[search,setsearch] =useState("");
    const[searchresult,setsearchresult]=useState([]);
    const[loading,setloading]=useState(false);
    const[loadingchat,setloadingChat]=useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const { chat } = useChat(); 
  
  const userLogout = ()=>{
    localStorage.removeItem("userInfo");
    window.location.reload();
    navigate("/");
  }

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
            <Text color="#fff">Search User</Text>
            <Spacer />
            <Box ref={btnRef} colorScheme="teal" onClick={onOpen}>
              <Search2Icon color={"#fff"} fontSize={"21px"} />
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
                    <DrawerHeader>Create your account</DrawerHeader>
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
              <Avatar
                name={chat?.name}
                src={chat?.picture}
              />
            </Box>
            <Box>
              <Menu>
                <MenuButton>
                  <ChevronDownIcon color={"#fff"} fontSize={"21px"} />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                  <Text>User -{chat?.name}</Text>
                  </MenuItem>
                  <MenuItem>
                  <Button onClick={userLogout}>Logout</Button>
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
