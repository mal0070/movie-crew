import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import { useLocation } from "react-router-dom";
import Header from "./components/Header";
import HeroSection from "./components/home/HeroSection";
import FeaturesSection from "./components/home/FeaturesSection";
import PopularJobs from "./components/home/PopularJobs";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import SignUpModal from "./components/SignUpModal";
import FloatingButton from "./components/FloatingButton";
import NetworkPage from "./pages/NetworkPage";
import OpeningPage from "./pages/OpeningPage";
import NotFoundPage from './pages/NotFoundPage';
import MyPage from "./pages/MyPage";
import WorkshopPage from "./pages/WorkshopPage";
import ContactModal from "./pages/ContactPage";
//import "./App.css";

const MainPage = () => (
  <>
    <HeroSection />
    <FeaturesSection />
    <PopularJobs />
  </>
);

// 페이지 이동 시마다 pageview 전송
function PageViewTracker() {
  const location = useLocation();
  React.useEffect(() => {
    ReactGA.send({ hitType: "pageview", page: location.pathname });
  }, [location]);
  return null;
}

const App = () => {
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    // 기존 애니메이션 및 모달 핸들링 생략 가능
  }, []);

  return (
    <Router>
      <PageViewTracker />
      <Header onSignUpClick={() => setIsSignUpOpen(true)} />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/opening" element={<OpeningPage />} />
        <Route path="/network" element={<NetworkPage />} />
        <Route path="/workshop" element={<WorkshopPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <FloatingButton onContactClick={() => setIsContactOpen(true)} />
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <LoginModal />
      <SignUpModal isModalOpen={isSignUpOpen} setIsModalOpen={setIsSignUpOpen} />
      <Footer />
    </Router>
  );
};

export default App;
