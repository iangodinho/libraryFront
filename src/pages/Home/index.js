// src/pages/Home/index.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import MenuLateral from "../../components/MenuLateral";
import Header from "../../components/Header";
import Dashboard from "./Dashboard";
import styled from "styled-components";
import CreatePostPage from "./CreatePost";
import Signup from "./Signup";

const AppWrapper = styled.div`
  display: flex;
`;

const ConteudoWrapper = styled.div`
  flex-grow: 1;
  padding: 20px;
  padding-top: 70px;
  height: 100vh;
  overflow-y: auto;
`;

const Home = () => {
  return (
    <AppWrapper>
      <MenuLateral />
      <ConteudoWrapper>
        <Header />
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="posts" element={<CreatePostPage />} />
          <Route path="signup" element={<Signup />} />
          {/* Outras rotas dentro de Home */}
        </Routes>
      </ConteudoWrapper>
    </AppWrapper>
  );
};

export default Home;
