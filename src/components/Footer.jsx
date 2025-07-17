import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black/50 text-white border-t border-orange-500/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3 mb-8">
          <div>
            <h3 className="text-orange-500 mb-4 font-semibold">서비스</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/opening" className="hover:text-orange-500">구인 공고</a></li>
              <li><a href="/network" className="hover:text-orange-500">영화인 네트워크</a></li>
              <li><a href="/workshop" className="hover:text-orange-500">워크숍</a></li>
              <li><a href="/filmfestival" className="hover:text-orange-500">영화제</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-orange-500 mb-4 font-semibold">지원</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">고객센터</a></li>
              <li><a href="#" className="hover:text-orange-500">이용가이드</a></li>
              <li><a href="#" className="hover:text-orange-500">FAQ</a></li>
              <li><a href="#" className="hover:text-orange-500">신고하기</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-orange-500 mb-4 font-semibold">회사</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">회사소개</a></li>
              <li><a href="#" className="hover:text-orange-500">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-orange-500">이용약관</a></li>
              <li><a href="#" className="hover:text-orange-500">채용정보</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-4 text-sm text-center text-gray-400">
          &copy; 2025 Movie Crew. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
