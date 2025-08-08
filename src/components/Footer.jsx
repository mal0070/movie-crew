import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black/50 text-white border-t border-orange-500/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-3 mb-8">
          <div>
            <h3 className="text-orange-500 mb-4 font-semibold">Movie Crew</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/opening" className="hover:text-orange-500">구인 공고</Link></li>
              <li><Link to="/network" className="hover:text-orange-500">영화인 네트워크</Link></li>
              <li><Link to="/workshop" className="hover:text-orange-500">워크숍</Link></li>
              <li><Link to="/filmfestival" className="hover:text-orange-500">영화제</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-orange-500 mb-4 font-semibold">팀</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-orange-500">서비스 소개</a></li>
              <li><a href="#" className="hover:text-orange-500">개인정보처리방침</a></li>
              <li><a href="#" className="hover:text-orange-500">이용약관</a></li>
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
