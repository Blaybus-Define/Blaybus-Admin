import React from 'react';
import '../App.css';
import DoHandsLogo from '../images/DoHands.png'; // 로컬 이미지 사용

const Header = () => {
  return (
    <header className="Header">
      <img
        src={DoHandsLogo}
        alt="DOHANDS"
        className="Header-logo"
      />
      <span className="Header-title">경험치/퀘스트 관리자 페이지</span>
    </header>
  );
};

export default Header;
