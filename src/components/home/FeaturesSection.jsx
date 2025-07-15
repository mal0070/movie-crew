import React from "react";

const features = [
  { icon: "👥", title: "포트폴리오 기반 매칭", desc: "작품 이력, 영상 포트폴리오, 참여 경험을 한눈에 확인하고 완벽한 크루를 찾으세요." },
  { icon: "🎯", title: "스마트 필터링", desc: "성별, 연령, 경력, 희망 페이, 지역별로 정확히 원하는 조건의 인재를 찾을 수 있습니다." },
  { icon: "📋", title: "통합 지원자 관리", desc: "모든 지원자의 정보를 한 곳에서 관리하고, 메일 확인 없이 바로 연락할 수 있습니다." },
  { icon: "💰", title: "투명한 페이 정보", desc: "명확한 페이 정보와 근무 조건으로 서로의 기대치를 맞춰 효율적인 협업이 가능합니다." },
  { icon: "🎓", title: "학생 작품 특화", desc: "졸업 작품, 공모전, 단편 영화 등 학생 및 신진 작가들의 프로젝트에 최적화되어 있습니다." },
  { icon: "⚡", title: "간편한 지원 프로세스", desc: "원클릭 지원부터 결과 확인까지, 복잡한 절차 없이 빠르고 간단하게 진행됩니다." },
];

const FeaturesSection = () => {
  return (
    <section id="about" className="py-24 bg-white/5">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-orange-500 mb-4">왜 Movie Crew인가?</h2>
        <p className="text-lg text-gray-300 mb-12">독립영화 제작자들의 실제 고민을 해결하는 특별한 플랫폼</p>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white/10 border border-orange-500/20 p-8 rounded-xl hover:shadow-xl hover:-translate-y-2 transition text-white"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-orange-400">{f.title}</h3>
              <p className="text-gray-300 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
