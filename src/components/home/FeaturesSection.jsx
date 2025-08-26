import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import ContactModal from "../ContactModal"; 

const features = [
  { 
    icon: "🎬", 
    title: "실시간 구인공고", 
    desc: "필름메이커스 등 다양한 구인정보를 한눈에! 포지션별 필터링으로 원하는 공고를 빠르게 찾아보세요.",
    link: "/opening"
  },
  { 
    icon: "🤝", 
    title: "영화인 네트워킹", 
    desc: "인스타그램, 카페, 오픈채팅방까지! 영화인들이 모이는 모든 공간을 정리했습니다.",
    link: "/networking"
  },
  { 
    icon: "📚", 
    title: "영화 워크숍", 
    desc: "전국 워크숍 정보를 지역별, 비용별로 찾아보세요! 실력을 키울 기회를 놓치지 마세요.",
    link: "/workshop"
  },
  { 
    icon: "⭐", 
    title: "스크랩 기능", 
    desc: "관심 있는 공고나 워크숍을 저장하고 관리하세요. 마이페이지에서 언제든 확인 가능!",
    link: "/mypage"
  },
  { 
    icon: "💬", 
    title: "실시간 문의", 
    desc: "무비크루의 발전을 위한 모든 의견을 환영합니다. 칭찬, 비판, 아낌없는 피드백 모두 부탁드려요.",
    link: null 
  },
];

const FeaturesSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 카드 하나 렌더링 함수
  const renderCard = (f, idx) => {
    const cardClasses =
      "bg-white/10 border border-orange-500/20 p-8 rounded-xl hover:shadow-xl hover:-translate-y-2 transition text-white cursor-pointer";

    if (f.link && f.link.startsWith("/")) {
      return (
        <Link key={idx} to={f.link} className={cardClasses}>
          <div className="text-4xl mb-4">{f.icon}</div>
          <h3 className="text-xl font-semibold mb-2 text-orange-400">{f.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
        </Link>
      );
    } else if (f.link) {
      return (
        <a key={idx} href={f.link} className={cardClasses}>
          <div className="text-4xl mb-4">{f.icon}</div>
          <h3 className="text-xl font-semibold mb-2 text-orange-400">{f.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
        </a>
      );
    } else {
      return (
        <button
          key={idx}
          onClick={() => setIsModalOpen(true)}
          className={cardClasses + " text-center w-full"}
        >
          <div className="text-4xl mb-4">{f.icon}</div>
          <h3 className="text-xl font-semibold mb-2 text-orange-400">{f.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
        </button>
      );
    }
  };

  return (
    <section id="about" className="py-24 bg-white/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">
          영화계 초보자를 위한 특별한 플랫폼
        </h2>
        <p className="text-lg text-gray-400 mb-12">
          막 영화계에 발을 들이는 여러분을 위한 모든 정보를 한 곳에 모았습니다
        </p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(renderCard)}
        </div>
      </div>

      {/* 문의하기 모달 */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
};
export default FeaturesSection;