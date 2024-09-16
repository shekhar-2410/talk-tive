import { Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./component/home/index";
import ChatPage from "./component/chat";
import LoginScreen from "./component/authentication/login";
import SignupScreen from "./component/authentication/signup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/signup" element={<SignupScreen />} />
      <Route path="/dashboard" element={<HomePage />} />
    </Routes>
  );
}

export default App;
