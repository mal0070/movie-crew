import NoticeSection from '../components/chatroom/NoticeSection';
import ChatSection from '../components/chatroom/ChatSection';

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
];

const regionalRooms = [
  {
    icon: '🌊',
    name: '부산 영화영상 제작지원 구인방',
    desc: '부산 지역 영화인의 오프라인 모임 및 정보 공유.',
    link: 'https://open.kakao.com/o/glpYKPld',
  },
  {
    icon: '👀',
    name: '영상이야기',
    desc: '영상에 대한 기본 지식을 알 수 있는 방',
    link: 'https://open.kakao.com/o/gl7anf5'
  },
];

const ChatRoomPage = () => {
  return (
    <main className=" bg-gray-300 min-h-screen text-gray-900 pb-16">
      <div className="container mx-auto px-4 pt-28">
        <NoticeSection />
        <ChatSection title="🗣️ 포지션별 단톡방" rooms={positionBasedRooms} />
        <ChatSection title="🗺️ 지역별/목적별 단톡방" rooms={regionalRooms} />
      </div>
    </main>
  );
};

export default ChatRoomPage;
