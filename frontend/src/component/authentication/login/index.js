
import {
  Button,
  Checkbox,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  Box,
} from "@chakra-ui/react";
import { useState } from "react";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";


export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/login", {
        email,
        password,
      });

      if (response.data) {    
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        navigate("/chat"); 
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
      <Box width={{ md: "100%", lg: "50%" }}>
        <Image
          alt={"Login Image"}
          src={"3d.jpg"}
          objectFit="cover"
          width="100%"
          height="100vh"
          maxHeight="100vh"
        />
      </Box>

      <Box pt={"5%"} width={{ md: "100%", lg: "50%" }}>
        <Stack spacing={4} mx={"auto"} maxW={"lg"} px={6}>
          <Box mx={"auto"} mb={"5%"}>
            <Image alt={"logo"} src={"logo.svg"} />
          </Box>
          <Heading fontSize={"2xl"} color={"#F17A0A"} mb={"25px"}>
            Login to your account
          </Heading>

          {error && (
            <Text color="red" mb={4}>
              {error}
            </Text>
          )}

          <FormControl id="email">
            <FormLabel>Email address</FormLabel>
            <Input
              boxShadow={"md"}
              placeholder="Enter your email"
              background={"#7DD2E7"}
              color={"#fff"}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password">
            <FormLabel>Password</FormLabel>
            <Input
              boxShadow={"md"}
              placeholder="Enter your password"
              background={"#7DD2E7"}
              color={"#fff"}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Stack spacing={6}>
            <Stack
              direction={{ base: "column", sm: "row" }}
              align={"start"}
              justify={"space-between"}
            >
              <Checkbox>Remember me</Checkbox>
              <Text color={"#F17A0A"}>Forgot password?</Text>
            </Stack>

            <Stack>
              <Text>Don't have an account?</Text>
              <Link to="/signup">
                <Text fontWeight={"bold"} color={"#5C3EC7"}>
                  Sign up
                </Text>
              </Link>
            </Stack>

            <Button
              boxShadow={"md"}
              color={"#3D1B75"}
              background={"#7DD2E7"}
              variant={"solid"}
              onClick={handleLogin}
            >
              Sign in
            </Button>

            <Button
              boxShadow={"md"}
              color={"#3D1B75"}
              background={"#7DD2E7"}
              variant={"solid"}
            >
              Guest Credentials
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Stack>
  );
}
