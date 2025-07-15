import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const SignupModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleUserTypeClick = (e) => {
    document.querySelectorAll(".user-type-option").forEach((el) => {
      el.classList.remove("active", "bg-orange-500/10", "border-orange-500");
    });
    e.currentTarget.classList.add("active", "bg-orange-500/10", "border-orange-500");
  };

  function isValidPhone(phone) {
    // 010-0000-0000 형식 검사
    return /^010-\d{4}-\d{4}$/.test(phone);
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    if (!isValidPhone(phone)) {
      alert("전화번호는 010-0000-0000 형태로 입력해주세요.");
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("회원가입에 성공했습니다!");
      document.getElementById("signupModal").style.display = "none";
    } catch (error) {
      // Firebase 에러 코드별 메시지
      let msg = "회원가입에 실패했습니다.";
      if (error.code === "auth/email-already-in-use") {
        msg = "이미 사용 중인 이메일입니다.";
      } else if (error.code === "auth/invalid-email") {
        msg = "이메일 형식이 올바르지 않습니다.";
      } else if (error.code === "auth/weak-password") {
        msg = "비밀번호는 6자 이상이어야 합니다.";
      }
      alert(msg);
    }
  };

  return (
    <div id="signupModal" className="modal fixed inset-0 bg-black/80 z-50 hidden">
      <div className="modal-content bg-gradient-to-br from-[#1a1a2e] to-[#16213e] max-w-md mx-auto mt-12 p-10 rounded-xl relative animate-fadeInUp">
        <span
          className="absolute top-4 right-4 text-gray-400 text-2xl cursor-pointer hover:text-orange-500"
          onClick={() => (document.getElementById("signupModal").style.display = "none")}
        >
          &times;
        </span>
        <h2 className="text-orange-500 text-2xl font-bold mb-6">회원가입</h2>

        <div className="flex gap-4 mb-6">
          <div
            className="user-type-option flex-1 border-2 border-orange-500/30 rounded-xl p-4 text-center cursor-pointer"
            onClick={handleUserTypeClick}
          >
            <h3 className="text-xl mb-1">🎬 구인자</h3>
            <p className="text-sm text-gray-300">크루를 찾고 있어요</p>
          </div>
          <div
            className="user-type-option flex-1 border-2 border-orange-500/30 rounded-xl p-4 text-center cursor-pointer"
            onClick={handleUserTypeClick}
          >
            <h3 className="text-xl mb-1">🎭 구직자</h3>
            <p className="text-sm text-gray-300">프로젝트를 찾고 있어요</p>
          </div>
        </div>

        <form onSubmit={handleSignUp}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">이메일</label>
            <input
              type="email"
              required
              className="w-full p-3 rounded bg-white/10 border border-orange-500/30 text-white"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">비밀번호</label>
            <input
              type="password"
              required
              className="w-full p-3 rounded bg-white/10 border border-orange-500/30 text-white"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">비밀번호 확인</label>
            <input
              type="password"
              required
              className="w-full p-3 rounded bg-white/10 border border-orange-500/30 text-white"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">이름</label>
            <input
              type="text"
              required
              className="w-full p-3 rounded bg-white/10 border border-orange-500/30 text-white"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-1">연락처</label>
            <input
              type="tel"
              required
              className="w-full p-3 rounded bg-white/10 border border-orange-500/30 text-white"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full hover:shadow-lg"
          >
            회원가입
          </button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-4">
          이미 계정이 있으신가요?{' '}
          <span
            onClick={() => {
              document.getElementById("signupModal").style.display = "none";
              document.getElementById("loginModal").style.display = "block";
            }}
            className="text-orange-500 cursor-pointer hover:underline"
          >
            로그인
          </span>
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
