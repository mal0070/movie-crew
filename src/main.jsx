import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactGA from "react-ga4";

ReactGA.initialize("G-YNBQXF9B0P"); // 측정 ID로 교체

// 페이지 이동 추적 예시
ReactGA.send({ hitType: "pageview", page: window.location.pathname });

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
