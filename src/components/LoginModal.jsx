import React, { useState } from "react";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase/firebase";

const LoginModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      document.getElementById("loginModal").style.display = "none";
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
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
        <button
          onClick={handleGoogleLogin}
          className="w-full mb-4 py-3 bg-white text-gray-800 rounded-full flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-100"
        >
          <svg width="24" height="24" viewBox="0 0 24 24"><g><path fill="#4285F4" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.383 0-6.148-2.797-6.148-6.25s2.765-6.25 6.148-6.25c1.93 0 3.227.82 3.969 1.523l2.715-2.641c-1.711-1.57-3.922-2.523-6.684-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.023 9.547-9.703 0-.652-.07-1.148-.156-1.477z"/><path fill="#34A853" d="M3.527 7.545l3.281 2.406c.891-1.32 2.344-2.25 4.192-2.25 1.18 0 2.242.406 3.078 1.203l2.312-2.25c-1.406-1.312-3.203-2.104-5.39-2.104-3.672 0-6.75 2.977-6.75 6.75 0 1.07.258 2.078.703 2.953z"/><path fill="#FBBC05" d="M12 22c2.438 0 4.484-.805 5.977-2.188l-2.766-2.266c-.766.539-1.75.859-3.211.859-2.484 0-4.594-1.68-5.352-3.953l-3.242 2.5c1.484 2.953 4.617 5.048 8.594 5.048z"/><path fill="#EA4335" d="M21.805 10.023h-9.765v3.977h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.383 0-6.148-2.797-6.148-6.25s2.765-6.25 6.148-6.25c1.93 0 3.227.82 3.969 1.523l2.715-2.641c-1.711-1.57-3.922-2.523-6.684-2.523-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.023 9.547-9.703 0-.652-.07-1.148-.156-1.477z" opacity=".1"/></g></svg>
          Google로 로그인
        </button>
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
