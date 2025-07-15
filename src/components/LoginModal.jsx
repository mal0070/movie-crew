import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // 로그인 성공 처리 (예: 모달 닫기)
      document.getElementById("loginModal").style.display = "none";
    } catch (error) {
      alert(error.message);
    }
  };
  
  return (
    <div id="loginModal" className="modal fixed inset-0 bg-black/80 z-50 hidden">
      <div className="modal-content bg-gradient-to-br from-[#1a1a2e] to-[#16213e] max-w-md mx-auto mt-20 p-10 rounded-xl relative animate-fadeInUp">
        <span
          className="absolute top-4 right-4 text-gray-400 text-2xl cursor-pointer hover:text-orange-500"
          onClick={() => (document.getElementById("loginModal").style.display = "none")}
        >
          &times;
        </span>
        <h2 className="text-orange-500 text-2xl font-bold mb-6">로그인</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">이메일</label>
            <input
              type="email"
              required
              className="w-full p-3 rounded bg-white/10 border border-orange-500/30 text-white"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-1">비밀번호</label>
            <input
              type="password"
              required
              className="w-full p-3 rounded bg-white/10 border border-orange-500/30 text-white"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호를 입력하세요"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full hover:shadow-lg"
          >
            로그인
          </button>
        </form>
        <p className="text-center text-sm text-gray-300 mt-4">
          계정이 없으신가요?{' '}
          <span
            onClick={() => {
              document.getElementById("loginModal").style.display = "none";
              document.getElementById("signupModal").style.display = "block";
            }}
            className="text-orange-500 cursor-pointer hover:underline"
          >
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
