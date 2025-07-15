import React from "react";

const stats = [
  { number: "1,247", label: "성공한 매칭" },
  { number: "523", label: "완성된 작품" },
  { number: "3,891", label: "등록된 크루" },
  { number: "156", label: "협력 대학" },
];

const StatsSection = () => {
  return (
    <section className="stats py-20 bg-orange-500/10">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-12">함께 만들어가는 성과</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx}>
              <span className="stat-number block text-4xl font-bold text-orange-500">
                {stat.number}
              </span>
              <span className="stat-label text-gray-300 mt-2 block">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
