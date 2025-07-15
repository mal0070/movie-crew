import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/home/HeroSection";
import FeaturesSection from "./components/home/FeaturesSection";
import PopularJobs from "./components/home/PopularJobs";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import FloatingButton from "./components/FloatingButton";
import ChatRoomPage from "./pages/ChatRoomPage";
import NotFoundPage from './pages/NotFoundPage';
//import "./App.css";

const MainPage = () => (
  <>
    <HeroSection />
    <FeaturesSection />
    <PopularJobs />
  </>
);

const App = () => {
  useEffect(() => {
    // 기존 애니메이션 및 모달 핸들링 생략 가능
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/chatroom" element={<ChatRoomPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
      <FloatingButton />
      <LoginModal />
      <SignupModal />
      <Footer />
    </Router>
  );
};

export default App;
