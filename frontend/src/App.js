import { Route, Routes } from "react-router-dom";
import React from "react";
import ChatPage from "./component/chat";
import LoginScreen from "./component/authentication/login";
import SignupScreen from "./component/authentication/signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/signup" element={<SignupScreen />} />
  
    </Routes>
  );
}

export default App;
