import React from 'react';
import DoHandsLogo from '../images/DoHands.png'; 

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
