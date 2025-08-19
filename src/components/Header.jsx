import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged, signOut, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Menu, X } from "lucide-react"; // 햄버거/닫기 아이콘

const Header = () => {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      alert(error.message);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md py-4">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-orange-500">🎬 Moive Crew</a>

        {/* 데스크탑 메뉴 */}
        <ul className="hidden md:flex gap-8 text-white">
          <li>
            <Link 
              to='/opening' 
              className={`hover:text-orange-500 transition-colors ${
                isActive('/opening') ? 'text-orange-500 font-semibold border-b-2 border-orange-500 pb-1' : ''
              }`}
            >
              구인 공고
            </Link>
          </li>
          <li>
            <Link 
              to="/network" 
              className={`hover:text-orange-500 transition-colors ${
                isActive('/network') ? 'text-orange-500 font-semibold border-b-2 border-orange-500 pb-1' : ''
              }`}
            >
              영화인 네트워크
            </Link>
          </li>
          <li>
            <Link 
              to='/workshop' 
              className={`hover:text-orange-500 transition-colors ${
                isActive('/workshop') ? 'text-orange-500 font-semibold border-b-2 border-orange-500 pb-1' : ''
              }`}
            >
              워크숍
            </Link>
          </li>
          <li>
            <Link 
              to='/filmfestival' 
              className={`hover:text-orange-500 transition-colors ${
                isActive('/filmfestival') ? 'text-orange-500 font-semibold border-b-2 border-orange-500 pb-1' : ''
              }`}
            >
              영화제
            </Link>
          </li>
        </ul>

        {/* 모바일 햄버거 버튼 */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* 공통 로그인/로그아웃 영역 */}
        <div className="hidden md:flex gap-4">
          {user ? (
            <>
              <Link
                to="/mypage"
                className={`px-4 py-2 border-2 border-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition ${
                  isActive('/mypage') ? 'bg-orange-500 text-white' : 'text-orange-500'
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
            <button
              onClick={handleGoogleLogin}
              className="px-4 py-2 bg-white text-gray-800 rounded-full border border-gray-300 hover:bg-gray-100 flex items-center gap-2"
            >
               <svg width="20" height="20" viewBox="0 0 24 24"><g><path fill="#4285F4" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.383 0-6.148-2.797-6.148-6.25s2.765-6.25 6.148-6.25c1.93 0 3.227.82 3.969 1.523l2.715-2.641c-1.711-1.57-3.922-2.523-6.684-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.023 9.547-9.703 0-.652-.07-1.148-.156-1.477z"/><path fill="#34A853" d="M3.527 7.545l3.281 2.406c.891-1.32 2.344-2.25 4.192-2.25 1.18 0 2.242.406 3.078 1.203l2.312-2.25c-1.406-1.312-3.203-2.104-5.39-2.104-3.672 0-6.75 2.977-6.75 6.75 0 1.07.258 2.078.703 2.953z"/><path fill="#FBBC05" d="M12 22c2.438 0 4.484-.805 5.977-2.188l-2.766-2.266c-.766.539-1.75.859-3.211.859-2.484 0-4.594-1.68-5.352-3.953l-3.242 2.5c1.484 2.953 4.617 5.048 8.594 5.048z"/><path fill="#EA4335" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.383 0-6.148-2.797-6.148-6.25s2.765-6.25 6.148-6.25c1.93 0 3.227.82 3.969 1.523l2.715-2.641c-1.711-1.57-3.922-2.523-6.684-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.023 9.547-9.703 0-.652-.07-1.148-.156-1.477z" opacity=".1"/></g></svg>
              구글로그인
            </button>
          )}
        </div>
      </nav>

      {/* 모바일 메뉴 드롭다운 */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/80 text-white px-4 py-6 space-y-4">
          <Link to="/opening" onClick={() => setIsMenuOpen(false)} className="block text-xl font-semibold hover:text-orange-500">구인 공고</Link>
          <Link to="/network" onClick={() => setIsMenuOpen(false)} className="block text-xl font-semibold hover:text-orange-500">영화인 네트워크</Link>
          <Link to="/workshop" onClick={() => setIsMenuOpen(false)} className="block text-xl font-semibold hover:text-orange-500">워크숍</Link>
          <Link to="/filmfestival" onClick={() => setIsMenuOpen(false)} className="block text-xl font-semibold hover:text-orange-500">영화제</Link>
          <div className="pt-4 border-t border-gray-600">
            {user ? (
              <>
                <Link to="/mypage" onClick={() => setIsMenuOpen(false)} className="block py-2 hover:text-orange-500">마이페이지</Link>
                <button 
                  onClick={async () => { await signOut(auth); setIsMenuOpen(false); }} 
                  className="w-full text-left py-2 hover:text-orange-500"
                >
                  로그아웃
                </button>
              </>
            ) : (
              <button 
                onClick={() => { handleGoogleLogin(); setIsMenuOpen(false); }} 
                className="w-full text-left py-2 hover:text-orange-500 font-semibold"
              >
                구글로그인
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
