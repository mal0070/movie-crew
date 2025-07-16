import React from "react";
import FilmmakersSection from "../components/opening/FilmmakersSection";

const OpeningPage = () => {
  return (
    <main className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4 pt-24">
        {/* 플랫폼 자체 공고 섹션 */}
        <section className="bg-white rounded-2xl p-8 mb-12 shadow-lg border-l-4 border-orange-400">
          <h2 className="text-2xl font-bold text-orange-500 mb-4">🎬 무비크루 플랫폼 자체 공고</h2>
          <div className="text-gray-500 text-center py-12 text-lg">아직 준비중입니다!</div>
        </section>

        {/* 필름메이커스 구인 정보 섹션 */}
        <FilmmakersSection />
      </div>
    </main>
  );
};

export default OpeningPage;
