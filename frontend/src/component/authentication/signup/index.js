import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
  InputRightElement,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import React, { useRef, useState } from "react";

export default function SignupScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const toast = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value, files } = e.target;
    if (id === "file") {
      setFormData({ ...formData, picture: files[0] });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fileInput = fileInputRef.current;

    if (!fileInput) {
      console.error("File input element not found");
      return;
    }

    const pic = fileInput.files[0];

    if (!pic) {
      console.error("No file selected");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("pic", pic);

    try {
      const response = await fetch("http://localhost:5000/api/user", {
        method: "POST",
        body: formDataToSend,
      });

      const result = await response.json();
      console.log("User registered successfully", result);
      toast({
        title: "Account created.",
        description: "We've created your account for you.",
        status: "success",
        duration: 5000,
        isClosable: true,
      })

      navigate("/");
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="name" isRequired>
              <FormLabel>User Name</FormLabel>
              <Input
                boxShadow={"md"}
                placeholder="User Name"
                background={"#7DD2E7"}
                color={"#fff"}
                type="text"
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                boxShadow={"md"}
                placeholder="Email"
                background={"#7DD2E7"}
                color={"#fff"}
                type="email"
                onChange={handleInputChange}
              />
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  boxShadow={"md"}
                  placeholder="Password"
                  background={"#7DD2E7"}
                  color={"#fff"}
                  type={showPassword ? "text" : "password"}
                  onChange={handleInputChange}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl id="confirmPassword" isRequired>
              <FormLabel>Confirm Password</FormLabel>
              <InputGroup>
                <Input
                  boxShadow={"md"}
                  placeholder="Confirm Password"
                  background={"#7DD2E7"}
                  color={"#fff"}
                  type={showPassword ? "text" : "password"}
                  onChange={handleInputChange}
                />
              </InputGroup>
            </FormControl>

            <FormControl id="file" isRequired>
              <FormLabel>Upload file</FormLabel>
              <Input
                id="file"
                type="file"
                ref={fileInputRef}
                onChange={handleInputChange}
              />
            </FormControl>

            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                color={"white"}
                background={"#7DD2E7"}
                boxShadow={"md"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
              >
                Sign up
              </Button>
            </Stack>

            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to="/">
                  <Text fontWeight={"bold"} color={"#5C3EC7"}>
                    Login
                  </Text>
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
