import React, { useState } from 'react';

const MainContent = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    alert(`검색: ${searchQuery}`);
  };

  return (
    <main className="MainContent">
      <div className="Search-bar">
        <span className="Search-label">사원 검색</span>
        <div className="Search-input-container">
          <input
            className="Search-input"
            type="text"
            placeholder="아이디로 사원 조회"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="Search-button" onClick={handleSearch}>
            🔍
          </button>
        </div>
        <span className="Search-label">이름</span>
        <span className="Search-label">소속</span>
        <span className="Search-label">직무그룹</span>
        <span className="Search-label">사번</span>
      </div>
      <div className="Content-header">
        <span className="Content-header-label">유형</span>
        <span className="Content-header-label">항목</span>
        <span className="Content-header-label">비고</span>
        <span className="Content-header-label">주기</span>
        <span className="Content-header-label">경험치</span>
        <span className="Content-header-label">달성 정도</span>
        <span className="Content-header-label">부여 날짜</span>
        <span className="Content-header-label">완료 여부</span>
      </div>
      <div className="Pagination">
        <button>이전</button>
        <button>1</button>
        <button>다음</button>
      </div>
    </main>
  );
};

export default MainContent;
