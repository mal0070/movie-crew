const ChatSection = ({ title, rooms }) => {
  return (
    <section className="bg-white/95 rounded-2xl p-8 mb-8 shadow-lg">
      <h2 className="text-2xl font-bold text-blue-900 text-center mb-8">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room, idx) => (
          <div key={idx} className="bg-white rounded-xl p-6 shadow-md border-2 border-transparent hover:border-blue-500 hover:shadow-xl transition">
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl bg-gradient-to-r from-blue-400 to-blue-700 text-white rounded-full w-14 h-14 flex items-center justify-center">
                {room.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800">{room.name}</h3>
            </div>
            <p className="text-gray-600 mb-4 text-sm leading-relaxed">{room.desc}</p>
            <a
              href={room.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-full shadow hover:shadow-lg transition"
              onClick={(e) => {
                if (!room.link) {
                  e.preventDefault();
                  alert("준비중입니다.");
                }
              }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 3C6.5 3 2 6.58 2 11.08c0 2.88 1.86 5.41 4.64 6.86-.3-1.04-.57-2.64.11-3.78.57-.95 3.67-15.5 3.67-15.5s14.37 14.57 3.67 15.5c.68 1.14.41 2.74.11 3.78C20.14 16.49 22 13.96 22 11.08 22 6.58 17.5 3 12 3z"/>
              </svg>
              카카오톡 참여하기
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ChatSection;
