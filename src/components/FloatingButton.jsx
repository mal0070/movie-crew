const FloatingButton = () => {
  return (
    <button
      title="문의 시작하기"
      className="fixed bottom-8 right-8 w-14 h-14 rounded-full text-white bg-gradient-to-r from-orange-500 to-yellow-400 shadow-lg hover:scale-110 hover:shadow-xl transition z-50"
      onClick={() => document.getElementById("signupModal").style.display = "block"}
    >
      문의
    </button>
  );
};

export default FloatingButton;
