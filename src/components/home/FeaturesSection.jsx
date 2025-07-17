import React from "react";

const features = [
  { 
    icon: "🎬", 
    title: "실시간 구인공고", 
    desc: "필름메이커스 등 다양한 구인정보를 한눈에! 포지션별 필터링으로 원하는 공고를 빠르게 찾아보세요." 
  },
  { 
    icon: "🤝", 
    title: "영화인 네트워킹", 
    desc: "인스타그램, 카페, 오픈채팅방까지! 영화인들이 모이는 모든 공간을 정리했습니다." 
  },
  { 
    icon: "📚", 
    title: "영화 워크숍", 
    desc: "전국 워크숍 정보를 지역별, 비용별로 찾아보세요! 실력을 키울 기회를 놓치지 마세요." 
  },
  { 
    icon: "⭐", 
    title: "스크랩 기능", 
    desc: "관심 있는 공고나 워크숍을 저장하고 관리하세요. 마이페이지에서 언제든 확인 가능!" 
  },
  { 
    icon: "🎯", 
    title: "초보자 친화적", 
    desc: "영화계에 처음 발을 들이는 분들을 위해 필요한 모든 정보를 한 곳에 모았습니다. 비전공자여도, 인맥/경험이 없어도, 걱정 마세요!" 
  },
  { 
    icon: "💬", 
    title: "실시간 문의", 
    desc: "궁금한 점이나 제안사항이 있으시면 언제든 문의해주세요. 영화계 선배들이 여러분의 성장을 응원합니다." 
  },
];

const FeaturesSection = () => {
  return (
    <section id="about" className="py-24 bg-white/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">영화계 초보자를 위한 특별한 플랫폼</h2>
        <p className="text-lg text-gray-400 mb-12">막 영화계에 발을 들이는 여러분을 위한 모든 정보를 한 곳에 모았습니다</p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white/10 border border-orange-500/20 p-8 rounded-xl hover:shadow-xl hover:-translate-y-2 transition text-white"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-400">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
