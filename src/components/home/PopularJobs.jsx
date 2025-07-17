import { Link } from 'react-router-dom';

const jobs = [
  {
    title: "단편영화 '기억의 조각들' 촬영 스태프 모집",
    tags: ["촬영감독", "조명", "음향"],
    desc: "감성적인 멜로 단편영화의 촬영 스태프를 모집합니다. 3일간의 촬영으로 서울 홍대 지역에서 진행됩니다.",
    meta: ["📍 서울 홍대", "💰 50,000원/일", "⏰ 3일 전"],
  },
  {
    title: "연극영화과 졸업작품 주연 배우 오디션",
    tags: ["주연배우", "20대 여성"],
    desc: "대학 졸업작품 드라마의 여주인공을 모집합니다. 연기 경험이 있으신 분 우대하며, 포트폴리오 필수입니다.",
    meta: ["📍 부산", "💰 협의", "⏰ 1일 전"],
  },
  {
    title: "공모전 출품용 단편 '시간여행자' 제작진 모집",
    tags: ["편집", "컬러리스트", "사운드"],
    desc: "SF 장르의 단편영화 후반 작업을 함께할 제작진을 찾습니다. 프리미어 프로, 다빈치 리졸브 사용 가능자 우대.",
    meta: ["📍 재택근무", "💰 100,000원", "⏰ 5일 전"],
  },
  {
    title: "독립영화 '청춘' 미술팀 급구",
    tags: ["미술감독", "소품"],
    desc: "1990년대 배경의 독립영화 미술팀을 모집합니다. 세트 디자인 및 소품 제작 경험자 우대합니다.",
    meta: ["📍 대전", "💰 80,000원/일", "⏰ 2일 전"],
  },
];

const PopularJobs = () => {
  return (
    <section id="jobs" className="py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-4">인기 구인정보</h2>
        <p className="text-center text-gray-300 mb-12">지금 가장 많이 찾는 포지션들을 확인해보세요</p>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {jobs.map((job, idx) => (
            <div
              key={idx}
              className="bg-white/10 border border-orange-500/20 p-6 rounded-xl text-white hover:shadow-lg hover:-translate-y-1 transition"
            >
              <h3 className="text-orange-400 text-xl font-semibold mb-2">{job.title}</h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {job.tags.map((tag, i) => (
                  <span key={i} className="px-3 py-1 text-sm bg-orange-500/20 text-orange-400 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-300 text-sm mb-3">{job.desc}</p>
              <div className="flex justify-between text-xs text-gray-400">
                {job.meta.map((m, i) => (
                  <span key={i}>{m}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            to="/opening"
            className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-400 text-white rounded-full hover:shadow-xl"
          >
            더 많은 구인정보 보기
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularJobs;
