import React, { useEffect, useState } from "react";

const FilmmakersSection = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/filmmakers_jobs.json")
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

  return (
    <section className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-blue-400 mb-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-4">🎥 필름메이커스 구인 정보</h2>
      {jobs.length === 0 ? (
        <div className="text-center text-gray-400">공고가 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, idx) => (
            <div key={idx} className="bg-blue-50 border border-blue-200 rounded-xl p-5 shadow hover:shadow-lg transition">
              <a href={job.link} target="_blank" rel="noopener noreferrer" className="block font-semibold text-blue-700 text-lg hover:underline mb-2">
                {job.title}
              </a>
              <div className="text-xs text-gray-400 mb-1">{job.date}</div>
              {job.summary && <div className="text-gray-600 text-sm mb-2">{job.summary}</div>}
              <a href={job.link} target="_blank" rel="noopener noreferrer" className="inline-block mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs">공고 바로가기</a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default FilmmakersSection; 