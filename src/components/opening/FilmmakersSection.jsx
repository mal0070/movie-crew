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
  const [positionFilter, setPositionFilter] = useState("전체선택");
  const [sortBy, setSortBy] = useState("최신순");

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

  // 고유한 포지션 목록 추출
  const uniquePositions = ["전체선택", ...Array.from(new Set(jobs.map(job => job.position).filter(Boolean)))];

  // 필터링 및 정렬 로직
  const filteredAndSortedJobs = jobs
    .filter(job => {
      if (positionFilter === "전체선택") return true;
      return job.position === positionFilter;
    })
    .sort((a, b) => {
      if (sortBy === "마감일순") {
        // 마감일을 Date 객체로 변환하여 비교
        const dateA = new Date(a.end_date);
        const dateB = new Date(b.end_date);
        return dateA - dateB; // 오름차순 (빠른 마감일부터)
      } else if (sortBy === "마감일역순") {
        const dateA = new Date(a.end_date);
        const dateB = new Date(b.end_date);
        return dateB - dateA; // 내림차순 (늦은 마감일부터)
      }
      // 기본값은 최신순 (원본 순서 유지)
      return 0;
    });

  if (loading) return <section className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-400 mb-8"><div className="text-center text-gray-400">로딩 중...</div></section>;
  if (error) return <section className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-400 mb-8"><div className="text-center text-red-500">{error}</div></section>;

  const totalPages = Math.ceil(filteredAndSortedJobs.length / ITEMS_PER_PAGE);
  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const jobsToShow = filteredAndSortedJobs.slice(startIdx, endIdx);

  return (
    <section className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-400 mb-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">🎥 필름메이커스 구인 정보</h2>
      <p className="text-gray-600 mb-6 t">필름메이커스에 올라온 공고 중, 영화 관련 공고만 모아두었습니다.</p>
      
      {/* 필터 섹션 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">포지션:</label>
            <select
              value={positionFilter}
              onChange={(e) => {
                setPositionFilter(e.target.value);
                setPage(1); // 필터 변경 시 첫 페이지로 이동
              }}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {uniquePositions.map(position => (
                <option key={position} value={position}>{position}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">정렬:</label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setPage(1); // 정렬 변경 시 첫 페이지로 이동
              }}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="최신순">최신순</option>
              <option value="마감일순">마감일순 (빠른순)</option>
              <option value="마감일역순">마감일순 (늦은순)</option>
            </select>
          </div>
          
          <div className="text-sm text-gray-500">
            총 {filteredAndSortedJobs.length}개 공고
          </div>
        </div>
      </div>

      {filteredAndSortedJobs.length === 0 ? (
        <div className="text-center text-gray-400">조건에 맞는 공고가 없습니다.</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobsToShow.map((job, idx) => {
              const isScrapped = scraps.includes(job.url);
              return (
                <div key={startIdx + idx} className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col relative group">
                  {/* 스크랩 버튼 */}
                  <button
                    onClick={() => toggleScrap(job.url)}
                    className="absolute top-4 right-4 text-xl opacity-70 hover:opacity-100 transition-opacity"
                    title={isScrapped ? "스크랩 해제" : "스크랩"}
                  >
                    {isScrapped ? (
                      <span className="text-yellow-500 drop-shadow-sm">★</span>
                    ) : (
                      <span className="text-gray-400 hover:text-yellow-400">☆</span>
                    )}
                  </button>
                  
                  {/* 제목 */}
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="block font-bold text-gray-800 text-lg hover:text-blue-600 transition-colors mb-4 pr-8">
                    {job.post_title}
                  </a>
                  
                  {/* 포지션 배지 */}
                  <div className="mb-4">
                    <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-sm">
                      {job.position}
                    </span>
                  </div>
                  
                  {/* 기타 정보 */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-green-600 text-xs font-medium">급여</span>
                        <span className="text-gray-700 text-sm font-semibold">{job.pay}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-red-500 text-xs font-medium">마감</span>
                        <span className="text-gray-700 text-sm font-semibold">{job.end_date}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* 바로가기 버튼 */}
                  <a 
                    href={job.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="mt-auto inline-flex items-center justify-center px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors group-hover:shadow-sm"
                  >
                    공고 보기 →
                  </a>
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