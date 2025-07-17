import React from "react";

const InstagramSection = ({ accounts }) => {
  return (
    <section className="bg-white/95 rounded-2xl p-8 mb-8 shadow-lg">
      <h2 className="text-2xl font-bold text-pink-600 text-center mb-8">📸 인스타그램 </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((acc, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-md border-2 border-transparent hover:border-pink-400 hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl bg-gradient-to-r from-pink-400 to-pink-600 text-white rounded-full w-14 h-14 flex items-center justify-center">
                {acc.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800">@{acc.name}</h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{acc.desc}</p>
            <a
              href={acc.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-pink-500 hover:bg-pink-400 text-white font-semibold rounded-full shadow hover:shadow-lg transition"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5A4.25 4.25 0 0 1 16.25 20.5h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5zm8.25 2.25a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5zM12 6.25A5.75 5.75 0 1 0 12 17.75A5.75 5.75 0 0 0 12 6.25zm0 1.5a4.25 4.25 0 1 1 0 8.5a4.25 4.25 0 0 1 0-8.5z"/></svg>
              인스타그램 방문
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InstagramSection; 