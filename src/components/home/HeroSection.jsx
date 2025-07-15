const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center h-screen text-center bg-[url('https://via.placeholder.com/1200x600')] bg-cover bg-center bg-no-repeat bg-blend-overlay bg-black/40"
    >
      <div className="max-w-2xl px-4 animate-fadeInUp">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400 mb-6">
          독립영화의 새로운 시작
        </h1>
        <p className="text-lg text-gray-300 mb-8">
          학생 작품부터 독립영화까지, 당신의 꿈을 함께 만들어갈 크루를 찾아보세요.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <button
            onClick={() => document.getElementById("signupModal").style.display = "block"}
            className="px-6 py-3 text-white rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 hover:shadow-xl text-lg"
          >
            크루 찾기 시작하기
          </button>
          <a
            href="#jobs"
            className="px-6 py-3 border-2 border-orange-500 text-orange-500 rounded-full hover:bg-orange-500 hover:text-white text-lg"
          >
            구인정보 둘러보기
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
