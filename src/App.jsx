import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/home/HeroSection";
import FeaturesSection from "./components/home/FeaturesSection";
import PopularJobs from "./components/home/PopularJobs";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import FloatingButton from "./components/FloatingButton";
import NetworkingPage from "./pages/NetworkingPage";
import OpeningPage from "./pages/OpeningPage";
import NotFoundPage from './pages/NotFoundPage';
import MyPage from "./pages/MyPage";
import WorkshopPage from "./pages/WorkshopPage";
//import "./App.css";

const MainPage = () => (
  <>
    <HeroSection />
    <FeaturesSection />
    <PopularJobs />
  </>
);

const App = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  useEffect(() => {
    // 기존 애니메이션 및 모달 핸들링 생략 가능
  }, []);

  return (
    <Router>
      <Header onSignUpClick={() => setIsSignUpOpen(true)} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/opening" element={<OpeningPage />} />
        <Route path="/networking" element={<NetworkingPage />} />
        <Route path="/workshop" element={<WorkshopPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <FloatingButton />
      <LoginModal />
      <SignupModal isModalOpen={isSignUpOpen} setIsModalOpen={setIsSignUpOpen} />
      <Footer />
    </Router>
  );
};

export default App;
