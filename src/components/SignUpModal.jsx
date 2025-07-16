import React, { useState, useEffect } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber, updateProfile, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase.js";

const SignupModal = ({ isModalOpen, setIsModalOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationId, setVerificationId] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [isSmsSent, setIsSmsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  console.log("auth 객체:", auth);
  // reCAPTCHA 생성 (isModalOpen 상태 변화에 따라)
  useEffect(() => {
    if (isModalOpen) {
      setTimeout(() => {
        if (!window.recaptchaVerifier && document.getElementById("recaptcha-container")) {
          window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
            'callback': () => {},
            'sitekey': '6LdFNYMrAAAAAI0SmvapVC4WGGsI54L1ZMwBKmkc'
          }, auth);
          window.recaptchaVerifier.render();
          console.log("reCAPTCHA rendered!");
        }
      }, 0);
    }
    return () => {
      if (window.recaptchaVerifier) {
        window.recaptchaVerifier.clear();
        window.recaptchaVerifier = null;
        const recaptchaContainer = document.getElementById("recaptcha-container");
        if (recaptchaContainer) {
          recaptchaContainer.innerHTML = '';
        }
      }
    };
  }, [isModalOpen]);

  function isValidPhone(phone) {
    return /^010-\d{4}-\d{4}$/.test(phone) || /^\+8210\d{8}$/.test(phone.replace(/-/g, ""));
  }

  const handleSendSms = async (e) => {
    e.preventDefault();
    if (!isValidPhone(phone)) {
      alert("전화번호는 010-0000-0000 또는 +8210-0000-0000 형태로 입력해주세요.");
      return;
    }
    setIsLoading(true);
    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) {
        alert("reCAPTCHA가 준비되지 않았습니다. 잠시 후 다시 시도해주세요.");
        setIsLoading(false);
        return;
      }
      const phoneNumber = phone.startsWith("+82") ? phone : "+82" + phone.replace(/-/g, "").slice(1);
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      setVerificationId(confirmationResult.verificationId);
      setIsSmsSent(true);
      alert("인증코드가 발송되었습니다.");
    } catch (error) {
      console.error("SMS 발송 실패:", error);
      alert("SMS 발송 실패: " + error.message);
    }
    setIsLoading(false);
  };

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
      alert("전화번호는 010-0000-0000 또는 +8210-0000-0000 형태로 입력해주세요.");
      return;
    }
    if (!verificationId || !smsCode) {
      alert("SMS 인증을 완료해주세요.");
      return;
    }
    setIsLoading(true);
    try {
      window.firebase.auth.PhoneAuthProvider.credential(verificationId, smsCode);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name, phoneNumber: phone });
      alert("회원가입 및 휴대폰 인증이 완료되었습니다!");
      setIsModalOpen(false);
    } catch (error) {
      alert("회원가입 실패: " + error.message);
    }
    setIsLoading(false);
  };

  return (
    <div
      id="signupModal"
      className={`modal fixed inset-0 bg-black/80 z-50 ${isModalOpen ? "" : "hidden"}`}
    >
      <div className="modal-content bg-gradient-to-br from-[#1a1a2e] to-[#16213e] max-w-md mx-auto mt-12 p-10 rounded-xl relative animate-fadeInUp">
        <span
          className="absolute top-4 right-4 text-gray-400 text-2xl cursor-pointer hover:text-orange-500"
          onClick={() => setIsModalOpen(false)}
        >
          &times;
        </span>
        <h2 className="text-orange-500 text-2xl font-bold mb-6">회원가입</h2>
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
            <label className="block text-gray-300 mb-1">연락처(휴대폰)</label>
            <input
              type="tel"
              required
              className="w-full p-3 rounded bg-white/10 border border-orange-500/30 text-white"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="010-0000-0000 또는 +8210-0000-0000"
            />
            <button
              type="button"
              className="mt-2 px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
              onClick={handleSendSms}
              disabled={isLoading || isSmsSent}
            >
              인증코드 발송
            </button>
          </div>
          <div id="recaptcha-container" className="mb-4"></div>
          {isSmsSent && (
            <div className="mb-6">
              <label className="block text-gray-300 mb-1">SMS 인증코드</label>
              <input
                type="text"
                required
                className="w-full p-3 rounded bg-white/10 border border-orange-500/30 text-white"
                value={smsCode}
                onChange={e => setSmsCode(e.target.value)}
                placeholder="인증코드 입력"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading || !isSmsSent || !smsCode}
          >
            회원가입
          </button>
        </form>
        <p className="text-center text-sm text-gray-300 mt-4">
          이미 계정이 있으신가요?{' '}
          <span
            onClick={() => setIsModalOpen(false)}
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
