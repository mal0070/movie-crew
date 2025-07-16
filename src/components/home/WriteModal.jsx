import React from "react";

const GENRES = ["드라마", "코미디", "액션", "스릴러", "다큐멘터리", "로맨스", "판타지", "공포", "기타"];
const POSITIONS = ["감독", "촬영", "조명", "음향", "미술", "연출", "배우", "편집", "기타"];

const WriteModal = ({ open, onClose }) => {
  // form이 주석처리되어 있으므로 상태 변수들 제거
  // const [title, setTitle] = useState("");
  // const [genre, setGenre] = useState("");
  // const [location, setLocation] = useState("");
  // const [shootStart, setShootStart] = useState("");
  // const [shootEnd, setShootEnd] = useState("");
  // const [director, setDirector] = useState("");
  // const [position, setPosition] = useState("");
  // const [payMin, setPayMin] = useState("");
  // const [payMax, setPayMax] = useState("");
  // const [description, setDescription] = useState("");
  // const [deadline, setDeadline] = useState("");
  // const [file, setFile] = useState(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-8 max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
        <button
          className="absolute top-4 right-4 text-gray-500 text-2xl hover:text-orange-500"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-orange-500">준비중입니다!</h2>
        {/*
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">제목</label>
            <input type="text" className="w-full p-2 border rounded" value={title} onChange={e => setTitle(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">장르</label>
            <select className="w-full p-2 border rounded" value={genre} onChange={e => setGenre(e.target.value)} required>
              <option value="">장르 선택</option>
              {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">촬영장소</label>
            <input type="text" className="w-full p-2 border rounded" value={location} onChange={e => setLocation(e.target.value)} required />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1 font-semibold">촬영 시작일</label>
              <input type="date" className="w-full p-2 border rounded" value={shootStart} onChange={e => setShootStart(e.target.value)} required />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1 font-semibold">촬영 종료일</label>
              <input type="date" className="w-full p-2 border rounded" value={shootEnd} onChange={e => setShootEnd(e.target.value)} required />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">감독 이름</label>
            <input type="text" className="w-full p-2 border rounded" value={director} onChange={e => setDirector(e.target.value)} required />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">구인포지션</label>
            <select className="w-full p-2 border rounded" value={position} onChange={e => setPosition(e.target.value)} required>
              <option value="">포지션 선택</option>
              {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <label className="block text-gray-700 mb-1 font-semibold">페이(최소)</label>
              <input type="number" className="w-full p-2 border rounded" value={payMin} onChange={e => setPayMin(e.target.value)} min="0" required />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1 font-semibold">페이(최대)</label>
              <input type="number" className="w-full p-2 border rounded" value={payMax} onChange={e => setPayMax(e.target.value)} min="0" required />
            </div>
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">프로젝트 소개</label>
            <textarea className="w-full p-2 border rounded" rows={4} value={description} onChange={e => setDescription(e.target.value)} required />
          </div>
          // 파일 첨부 input 추가
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">파일 첨부</label>
            <input
              type="file"
              className="w-full p-2 border rounded"
              onChange={e => setFile(e.target.files[0])}
            />
            // 선택된 파일명 표시
            {file && (
              <div className="mt-1 text-sm text-gray-600">선택된 파일: {file.name}</div>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold">모집마감일</label>
            <input type="date" className="w-full p-2 border rounded" value={deadline} onChange={e => setDeadline(e.target.value)} required />
          </div>
          <div className="flex justify-end gap-2 mt-6">
            <button type="button" className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-gray-800" onClick={onClose}>취소</button>
            <button type="submit" className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-white font-semibold">등록</button>
          </div>
        </form>
        */}

      </div>
    </div>
  );
};

export default WriteModal;