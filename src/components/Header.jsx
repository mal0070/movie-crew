import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md py-4">
      <nav className="container mx-auto px-4 flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-orange-500">🎬 Moive Crew </a>
        <ul className="hidden md:flex gap-8 text-white">
          <li><Link to='/studentfilm' className="hover:text-orange-500">학생영화</Link></li>
          <li><Link to='/filmmakers' className="hover:text-orange-500">필름메이커스 공고</Link></li>
          <li><Link to="/chatroom" className="hover:text-orange-500">영화인 오픈채팅방</Link></li>
          <li><Link to='/workshop' className="hover:text-orange-500">워크숍</Link></li>
        </ul>
        <div className="flex gap-4">
          {user ? (
            <>
              <Link
                to="/mypage"
                className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition"
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
                onClick={() => document.getElementById("loginModal").style.display = "block"}
                className="px-4 py-2 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white transition"
              >
                로그인
              </button>
              <button
                onClick={() => document.getElementById("signupModal").style.display = "block"}
                className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full hover:shadow-lg transition"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
