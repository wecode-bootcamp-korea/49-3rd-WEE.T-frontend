import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import Info from './pages/MyPage/Info/Info';
import Edit from './pages/MyPage/Edit/Edit';
import Nav from './components/Nav/Nav';
import Community from './pages/Community/Community';
import Login from './pages/Login/Login';
import LoginKakao from './pages/Login/LoginKakao';
import LoginNaver from './pages/Login/LoginNaver';
import SignUp from './pages/SignUp/SignUp';
import Footer from './components/Footer/Footer';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/info" element={<Info />} />
        <Route path="/community" element={<Community />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/kakao" element={<LoginKakao />} />
        <Route path="/login/naver" element={<LoginNaver />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
