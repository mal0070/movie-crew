import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getUserScraps, addScrap, removeScrap } from "../../firebase/firebase.js";

const SHEET_URL = "https://opensheet.elk.sh/1eJxXs00MiIEGZ8204wOUzdnCqURFT3oiMaFaUKfkksE/Sheet1";
const ITEMS_PER_PAGE = 12;

const FilmmakersSection = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [scraps, setScraps] = useState([]);
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

  useEffect(() => {
    fetch(SHEET_URL)
      .then(res => {
        if (!res.ok) throw new Error("데이터를 불러올 수 없습니다.");
        return res.json();
      })
      .then(data => {
        setJobs(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <section className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-400 mb-8"><div className="text-center text-gray-400">로딩 중...</div></section>;
  if (error) return <section className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-400 mb-8"><div className="text-center text-red-500">{error}</div></section>;

  const totalPages = Math.ceil(jobs.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const jobsToShow = jobs.slice(startIdx, endIdx);

  return (
    <section className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-400 mb-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">🎥 필름메이커스 구인 정보</h2>
      <p className="text-gray-600 mb-6 t">필름메이커스에 올라온 공고 중, 영화 관련 공고만 모아두었습니다.</p>
      {jobs.length === 0 ? (
        <div className="text-center text-gray-400">공고가 없습니다.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsToShow.map((job, idx) => {
              const isScrapped = scraps.includes(job.url);
              return (
                <div key={startIdx + idx} className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow hover:shadow-lg transition flex flex-col relative">
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
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="block font-semibold text-blue-700 text-lg hover:underline mb-2">
                    {job.post_title}
                  </a>
                  <div className="text-xs text-gray-400 mb-1">{job.position} | {job.pay} | 마감: {job.end_date}</div>
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">공고 바로가기</a>
                </div>
              );
            })}
          </div>
          {/* 페이지네이션 버튼 */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded border ${page === i + 1 ? 'bg-blue-500 text-white border-blue-500' : 'bg-white text-blue-500 border-blue-300 hover:bg-blue-100'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default FilmmakersSection; 