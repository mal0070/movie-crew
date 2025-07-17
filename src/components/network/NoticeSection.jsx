const notices = [
  "각 커뮤니티의 규칙을 준수해 주세요.",
  "현재 영화 제작에 종사하고 있는 사람들이 활발히 활동 중인 곳들을 모았습니다.",
  "건전하고 긍정적인 영화인 커뮤니티를 함께 만들어 갑시다!",
  "문의 사항 또는 추가를 원하는 커뮤니티가 있다면, 플랫폼 관리자에게 문의하기를 통해 알려주세요."
];

const NoticeSection = () => {
  return (
    <section className="bg-white/95 rounded-2xl p-8 mb-8 shadow-lg border-l-4 border-red-400">
      <h2 className="text-lg font-bold text-red-500 mb-4 flex items-center gap-2">
        ⚠️ [필수 확인] 원활한 커뮤니티를 위해 참여 전 아래 내용을 꼭 읽어주세요!
      </h2>
      <ul className="list-none space-y-3 text-gray-600">
        {notices.map((item, idx) => (
          <li key={idx} className="flex gap-2 items-start border-b pb-2 last:border-b-0">
            <span className="text-green-500 font-bold">✓</span>
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default NoticeSection;
