import React, { useEffect, useState } from "react";
import { getUserScraps, addScrap, removeScrap } from "../../firebase/firebase.js";

const SHEET_URL = "https://opensheet.elk.sh/1eJxXs00MiIEGZ8204wOUzdnCqURFT3oiMaFaUKfkksE/Sheet2";

const WorkshopListSection = () => {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userScraps, setUserScraps] = useState([]);
  const [paymentFilter, setPaymentFilter] = useState("전체선택");
  const [regionFilter, setRegionFilter] = useState("전체선택");

  const paymentOptions = ["전체선택", "무료", "유료"];
  const regionOptions = [
    "전체선택", "서울", "부산", "대구", "인천", "광주", "대전", "울산", "세종", 
    "경기", "강원", "충북", "충남", "전북", "전남", "경북", "경남", "제주", "해외", "온라인"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [workshopRes, scrapsRes] = await Promise.all([
          fetch(SHEET_URL),
          getUserScraps()
        ]);
        
        if (!workshopRes.ok) throw new Error("데이터를 불러올 수 없습니다.");
        
        const workshopData = await workshopRes.json();
        setWorkshops(workshopData);
        setUserScraps(scrapsRes);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleScrapToggle = async (workshop) => {
    try {
      const scrapData = {
        type: 'workshop',
        id: workshop.workshop_title, // 워크숍명을 고유 ID로 사용
        title: workshop.workshop_title,
        institution: workshop.institution,
        duration: workshop.duration,
        payment: workshop.payment,
        region: workshop.region,
        schedule: workshop.schedule,
        selection: workshop.selection,
        url: workshop.url,
        scrapedAt: new Date().toISOString()
      };

      const isScrapped = userScraps.some(scrap => 
        scrap.type === 'workshop' && scrap.id === workshop.workshop_title
      );

      if (isScrapped) {
        await removeScrap('workshop', workshop.workshop_title);
        setUserScraps(prev => prev.filter(scrap => 
          !(scrap.type === 'workshop' && scrap.id === workshop.workshop_title)
        ));
      } else {
        await addScrap(scrapData);
        setUserScraps(prev => [...prev, scrapData]);
      }
    } catch (error) {
      console.error('스크랩 토글 실패:', error);
    }
  };

  const isScrapped = (workshop) => {
    return userScraps.some(scrap => 
      scrap.type === 'workshop' && scrap.id === workshop.workshop_title
    );
  };

  // 필터링 로직
  const filteredWorkshops = workshops.filter(workshop => {
    // 비용 필터
    if (paymentFilter !== "전체선택") {
      const isFree = workshop.payment && (
        workshop.payment.includes("무료") || 
        workshop.payment.includes("0원") || 
        workshop.payment.includes("free") ||
        workshop.payment.includes("Free")
      );
      
      if (paymentFilter === "무료" && !isFree) return false;
      if (paymentFilter === "유료" && isFree) return false;
    }

    // 지역 필터
    if (regionFilter !== "전체선택") {
      if (!workshop.region || !workshop.region.includes(regionFilter)) {
        return false;
      }
    }

    return true;
  });

  if (loading) return <section className="bg-white rounded-2xl shadow-lg p-8 mb-8"><div className="text-center text-gray-400">로딩 중...</div></section>;
  if (error) return <section className="bg-white rounded-2xl shadow-lg p-8 mb-8"><div className="text-center text-red-500">{error}</div></section>;

  return (
    <section className="bg-white rounded-2xl shadow-lg p-8 mb-8 overflow-x-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-4">🎬 영화 워크숍</h2>
      
      {/* 필터 섹션 */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">비용:</label>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {paymentOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium text-gray-700">지역:</label>
            <select
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              className="px-3 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {regionOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
          
          <div className="text-sm text-gray-500">
            총 {filteredWorkshops.length}개 워크숍
          </div>
        </div>
      </div>

      {filteredWorkshops.length === 0 ? (
        <div className="text-center text-gray-400">조건에 맞는 워크숍이 없습니다.</div>
      ) : (
        <table className="min-w-full border border-gray-200 text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-3 py-2 border-b font-semibold">스크랩</th>
              <th className="px-3 py-2 border-b font-semibold">기관</th>
              <th className="px-3 py-2 border-b font-semibold">워크숍명</th>
              <th className="px-3 py-2 border-b font-semibold">기간</th>
              <th className="px-3 py-2 border-b font-semibold">비용</th>
              <th className="px-3 py-2 border-b font-semibold">지역</th>
              <th className="px-3 py-2 border-b font-semibold">일정</th>
              <th className="px-3 py-2 border-b font-semibold">선발방식</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkshops.map((workshop, idx) => (
              <tr
                key={idx}
                className={`hover:bg-green-50 transition ${workshop.url ? 'cursor-pointer' : 'cursor-not-allowed'}`}
                onClick={() => {
                  if (workshop.url) {
                    window.open(workshop.url, '_blank', 'noopener');
                  }
                }}
                title={workshop.url ? '자세히 보기' : '링크 없음'}
              >
                <td className="px-3 py-2 border-b">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleScrapToggle(workshop);
                    }}
                    className={`p-1 rounded transition ${
                      isScrapped(workshop)
                        ? 'text-yellow-500 hover:text-yellow-600'
                        : 'text-gray-400 hover:text-yellow-500'
                    }`}
                    title={isScrapped(workshop) ? '스크랩 해제' : '스크랩 추가'}
                  >
                    {isScrapped(workshop) ? '★' : '☆'}
                  </button>
                </td>
                <td className="px-3 py-2 border-b">{workshop.institution}</td>
                <td className="px-3 py-2 border-b font-medium text-gray-900">{workshop.workshop_title}</td>
                <td className="px-3 py-2 border-b">{workshop.duration}</td>
                <td className="px-3 py-2 border-b">{workshop.payment}</td>
                <td className="px-3 py-2 border-b">{workshop.region}</td>
                <td className="px-3 py-2 border-b">{workshop.schedule}</td>
                <td className="px-3 py-2 border-b">{workshop.selection}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default WorkshopListSection; 