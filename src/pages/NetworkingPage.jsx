import NoticeSection from '../components/networking/NoticeSection';
import ChatSection from '../components/networking/ChatSection';
import CafeSection from '../components/networking/CafeSection';
import InstagramSection from '../components/networking/InstagramSection';

const instagramAccounts = [
  {
    icon: '📸',
    name: 'women.dir.network',
    desc: '여성감독네트워크 WDN | 여성감독들이 모여 서로를 지지하고, 연결하고, 돕는 모임입니다. 함께 만나고 싶고, 연결되고 싶습니다. ',
    link: 'https://www.instagram.com/women.dir.network/',
  },
  {
    icon: '🎬',
    name: 'jifaindie',
    desc: "전북독립영화협회 인스타. '독립영화인의 밤'을 비롯한 네트워킹, 관련 교육 소식까지!",
    link: 'https://www.instagram.com/jifaindie/',
  },
  {
    icon: '🎬',
    name: 'gw_indiefilm',
    desc: '강원독립영화협회 인스타. 강원도 영화인들의 정보교류 및 독립영화 활성화',
    link: 'https://www.instagram.com/gw_indiefilm/',
  },
  {
    icon: '🎬',
    name: 'cine.montage',
    desc: '광주 독립예술영화 모임 <몽타주(Montage)>. 매주 수요일 저녁 광주에 모여 영화를 봅니다. 참여를 원하면 DM!',
    link: 'https://www.instagram.com/cine.montage',
  },
  {
    icon: '🎬',
    name: 'indie_crew',
    desc: '인천영상위원회. 인천 영화인들을 위한 네트워킹, 워크샵 등 제공',
    link: 'https://www.instagram.com/incheon_film/',
  },
];

const cafeAccounts = [
  {
    icon: '☕',
    name: '서울필름아카데미(SFA)',
    desc: '가장 빠르게 자체 교육과정 모집 소식을 볼 수 있는 곳. 장비 대여도 가능!',
    link: 'https://cafe.naver.com/cmnixsfa',
  },
 {
    icon: '☕',
    name: '다음 영화인 커뮤니티',
    desc: '다양한 영화인 네트워킹, 제작 정보, 자유게시판 등 영화인들의 소통 공간.',
    link: 'https://cafe.daum.net/filmpeople',
  },
];

const positionBasedRooms = [
  {
    icon: '🎭',
    name: '액터팸',
    desc: '배우 오디션 정보 드라마/영화',
    link: 'https://open.kakao.com/o/gXSGHtVe',
  },
  {
    icon: '🎬',
    name: '디렉터스',
    desc: '연출,촬영,음향,조명,TV,기타 *비번:문의',
    link: 'https://open.kakao.com/o/gmEmhMB',
  },
  {
    icon: '🔥',
    name: '탤런티드 오디션 캐스팅 공고방',
    desc: '오디션 캐스팅 공고를 공유하는 핫한 공간',
    link: 'https://open.kakao.com/o/gz31eyVe',
  },
  {
    icon: '🧑‍🎤',
    name: '조단역/보조출연 공고방',
    desc: '방송/웹드라마/영화 조단역, 보조출연 글쓰기 비번: notalk',
    link: 'https://open.kakao.com/o/gLguXUn',
  },
  {
    icon: '🎥',
    name: '필름캐스팅',
    desc: 'Film Casting — 다양한 장르의 작품 캐스팅 정보',
    link: 'https://open.kakao.com/o/gDP2dmCe',
  },
  {
    icon: '🧑‍💻',
    name: 'PD님들을 위한 소통방',
    desc: '프리랜서 PD, 유튜브 제작자, 편집자들의 네트워킹 공간',
    link: 'https://open.kakao.com/o/gv4V9vzc',
  },
  {
    icon: '📹',
    name: '촬영/편집/PD/방송 구인구직',
    desc: '촬영, 편집, PD 등 영상 관련 직무의 구인구직 정보',
    link: 'https://open.kakao.com/o/gQ8vW0Ke',
  },
  {
    icon: '🌊',
    name: '부산 영화영상 제작지원 구인방',
    desc: '부산 지역 영화인의 오프라인 모임 및 정보 공유.',
    link: 'https://open.kakao.com/o/glpYKPld',
  },
  {
    icon: '👀',
    name: '광주영화영상인 채팅방',
    desc: '광주영화영상인연대 공식 채팅방 (비밀번호: gjcinema)',
    link: 'https://open.kakao.com/o/gE3jIDVb',
  },
];

const NetworkingPage = () => {
  return (
    <main className=" bg-gray-300 min-h-screen text-gray-900 pb-16">
      <div className="container mx-auto px-4 pt-28">
        <NoticeSection />
        <InstagramSection accounts={instagramAccounts} />
        <CafeSection accounts={cafeAccounts} />
        <ChatSection title="🗣️ 오픈채팅방" rooms={positionBasedRooms} />
      </div>
    </main>
  );
};

export default NetworkingPage;
