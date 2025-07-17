import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserScraps, addScrap, removeScrap } from "../firebase/firebase.js";

const SHEET_URL = "https://opensheet.elk.sh/1eJxXs00MiIEGZ8204wOUzdnCqURFT3oiMaFaUKfkksE/Sheet1";

const MyPage = () => {
  const [jobs, setJobs] = useState([]);
  const [scraps, setScraps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (u) => {
      setUser(u);
      if (u) {
        const userScraps = await getUserScraps();
        setScraps(userScraps);
      } else {
        setScraps([]);
      }
    });
    return unsubscribe;
  }, []);

  const toggleScrap = async (url) => {
    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    if (scraps.includes(url)) {
      await removeScrap(url);
      setScraps(scraps.filter((u) => u !== url));
    } else {
      await addScrap(url);
      setScraps([...scraps, url]);
    }
  };

  const toggleWorkshopScrap = async (workshop) => {
    if (!user) {
      alert("로그인 후 이용 가능합니다.");
      return;
    }
    
    try {
      const isScrapped = scraps.some(scrap => 
        scrap.type === 'workshop' && scrap.id === workshop.id
      );

      if (isScrapped) {
        await removeScrap('workshop', workshop.id);
        setScraps(prev => prev.filter(scrap => 
          !(scrap.type === 'workshop' && scrap.id === workshop.id)
        ));
      } else {
        await addScrap(workshop);
        setScraps(prev => [...prev, workshop]);
      }
    } catch (error) {
      console.error('워크숍 스크랩 토글 실패:', error);
    }
  };

  useEffect(() => {
    fetch(SHEET_URL)
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setLoading(false);
      });
  }, []);

  const scrappedJobs = jobs.filter(job => scraps.includes(job.url));
  const scrappedWorkshops = scraps.filter(scrap => scrap.type === 'workshop');

  return (
    <main className="bg-gray-100 min-h-screen py-16">
      <div className="container mx-auto px-4 pt-24">
        {/* 스크랩한 공고 섹션 */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-yellow-400 mb-8">
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">⭐️ 스크랩한 공고</h2>
          {!user ? (
            <div className="text-center text-gray-400">로그인 후 스크랩한 공고를 볼 수 있습니다.</div>
          ) : loading ? (
            <div className="text-center text-gray-400">로딩 중...</div>
          ) : scrappedJobs.length === 0 ? (
            <div className="text-center text-gray-400">스크랩한 공고가 없습니다.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scrappedJobs.map((job, idx) => {
                const isScrapped = scraps.includes(job.url);
                return (
                  <div key={idx} className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 shadow hover:shadow-lg transition flex flex-col relative">
                    {/* 스크랩 버튼 */}
                    <button
                      onClick={() => toggleScrap(job.url)}
                      className="absolute top-3 right-3 text-xl"
                      title={isScrapped ? "스크랩 해제" : "스크랩"}
                    >
                      {isScrapped ? (
                        <span className="text-yellow-400">★</span>
                      ) : (
                        <span className="text-gray-300">☆</span>
                      )}
                    </button>
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="block font-semibold text-yellow-700 text-lg hover:underline mb-2">
                      {job.post_title}
                    </a>
                    <div className="text-xs text-gray-400 mb-1">{job.position} | {job.pay} | 마감: {job.end_date}</div>
                    <a href={job.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 text-xs">공고 바로가기</a>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* 스크랩한 워크숍 섹션 */}
        <section className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-green-400 mb-8">
          <h2 className="text-2xl font-bold text-green-600 mb-4">🎬 스크랩한 워크숍</h2>
          {!user ? (
            <div className="text-center text-gray-400">로그인 후 스크랩한 워크숍을 볼 수 있습니다.</div>
          ) : scrappedWorkshops.length === 0 ? (
            <div className="text-center text-gray-400">스크랩한 워크숍이 없습니다.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scrappedWorkshops.map((workshop, idx) => {
                const isScrapped = scraps.some(scrap => 
                  scrap.type === 'workshop' && scrap.id === workshop.id
                );
                return (
                  <div key={idx} className="bg-green-50 border border-green-200 rounded-xl p-5 shadow hover:shadow-lg transition flex flex-col relative">
                    {/* 스크랩 버튼 */}
                    <button
                      onClick={() => toggleWorkshopScrap(workshop)}
                      className="absolute top-3 right-3 text-xl"
                      title={isScrapped ? "스크랩 해제" : "스크랩"}
                    >
                      {isScrapped ? (
                        <span className="text-yellow-400">★</span>
                      ) : (
                        <span className="text-gray-300">☆</span>
                      )}
                    </button>
                    <div className="font-semibold text-green-700 text-lg mb-2">
                      {workshop.title}
                    </div>
                    <div className="text-sm text-gray-600 space-y-1 mb-3">
                      <div><span className="font-medium">기관:</span> {workshop.institution}</div>
                      <div><span className="font-medium">기간:</span> {workshop.duration}</div>
                      <div><span className="font-medium">비용:</span> {workshop.payment}</div>
                      <div><span className="font-medium">지역:</span> {workshop.region}</div>
                      <div><span className="font-medium">일정:</span> {workshop.schedule}</div>
                      <div><span className="font-medium">선발방식:</span> {workshop.selection}</div>
                    </div>
                    {workshop.url && (
                      <a 
                        href={workshop.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                      >
                        자세히 보기
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default MyPage; 