import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Header = () => {
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  // 구글 로그인 함수
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      // 로그인 성공 시 추가 동작(예: 알림) 필요하면 여기에
    } catch (error) {
      alert(error.message);
    }
  };

  // 현재 페이지 확인 함수
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md py-4">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-orange-500">🎬 Moive Crew </a>
        <ul className="hidden md:flex gap-8 text-white">
          <li>
            <Link 
              to='/opening' 
              className={`hover:text-orange-500 transition-colors ${
                isActive('/opening') 
                  ? 'text-orange-500 font-semibold border-b-2 border-orange-500 pb-1' 
                  : ''
              }`}
            >
              구인 공고
            </Link>
          </li>
          <li>
            <Link 
              to="/network" 
              className={`hover:text-orange-500 transition-colors ${
                isActive('/network') 
                  ? 'text-orange-500 font-semibold border-b-2 border-orange-500 pb-1' 
                  : ''
              }`}
            >
              영화인 네트워크
            </Link>
          </li>
          <li>
            <Link 
              to='/workshop' 
              className={`hover:text-orange-500 transition-colors ${
                isActive('/workshop') 
                  ? 'text-orange-500 font-semibold border-b-2 border-orange-500 pb-1' 
                  : ''
              }`}
            >
              워크숍
            </Link>
          </li>
          <li>
            <Link 
              to='/filmfestival' 
              className={`hover:text-orange-500 transition-colors ${
                isActive('/filmfestival') 
                  ? 'text-orange-500 font-semibold border-b-2 border-orange-500 pb-1' 
                  : ''
              }`}
            >
              영화제
            </Link>
          </li>
        </ul>
        <div className="flex gap-4">
          {user ? (
            <>
              <Link
                to="/mypage"
                className={`px-4 py-2 border-2 border-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition ${
                  isActive('/mypage') 
                    ? 'bg-orange-500 text-white' 
                    : 'text-orange-500'
                }`}
              >
                마이페이지
              </Link>
              <button
                onClick={async () => { await signOut(auth); }}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full hover:shadow-lg transition"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleGoogleLogin}
                className="px-4 py-2 bg-white text-gray-800 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
              >
                <svg width="20" height="20" viewBox="0 0 24 24"><g><path fill="#4285F4" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.383 0-6.148-2.797-6.148-6.25s2.765-6.25 6.148-6.25c1.93 0 3.227.82 3.969 1.523l2.715-2.641c-1.711-1.57-3.922-2.523-6.684-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.023 9.547-9.703 0-.652-.07-1.148-.156-1.477z"/><path fill="#34A853" d="M3.527 7.545l3.281 2.406c.891-1.32 2.344-2.25 4.192-2.25 1.18 0 2.242.406 3.078 1.203l2.312-2.25c-1.406-1.312-3.203-2.104-5.39-2.104-3.672 0-6.75 2.977-6.75 6.75 0 1.07.258 2.078.703 2.953z"/><path fill="#FBBC05" d="M12 22c2.438 0 4.484-.805 5.977-2.188l-2.766-2.266c-.766.539-1.75.859-3.211.859-2.484 0-4.594-1.68-5.352-3.953l-3.242 2.5c1.484 2.953 4.617 5.048 8.594 5.048z"/><path fill="#EA4335" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.383 0-6.148-2.797-6.148-6.25s2.765-6.25 6.148-6.25c1.93 0 3.227.82 3.969 1.523l2.715-2.641c-1.711-1.57-3.922-2.523-6.684-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.023 9.547-9.703 0-.652-.07-1.148-.156-1.477z" opacity=".1"/></g></svg>
                구글로그인
              </button>
              {/* <button
                onClick={() => document.getElementById("loginModal").style.display = "block"}
                className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition"
              >
                로그인
              </button> */}
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
