import React from "react";

const CafeSection = ({ accounts }) => {
  return (
    <section className="bg-white/95 rounded-2xl p-8 mb-8 shadow-lg">
      <h2 className="text-2xl font-bold text-green-700 text-center mb-8">☕ 영화인 카페</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-md border-2 border-transparent hover:border-green-400 hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl bg-gradient-to-r from-green-400 to-green-700 text-white rounded-full w-14 h-14 flex items-center justify-center">
                {acc.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800">{acc.name}</h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{acc.desc}</p>
            <a
              href={acc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 text-white font-semibold rounded-full shadow hover:shadow-lg transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>
              카페 바로가기
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CafeSection; 