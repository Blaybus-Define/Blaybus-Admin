import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        관리자 페이지
      </header>
      <div className="Admin-container">
        <nav className="Sidebar">
          <a href="#dashboard">경험치 입력</a>
          <a href="#users">퀘스트 등록</a>
          <a href="#settings">퀘스트 조회</a>
        </nav>
        <main className="Content">
          <h1>경험치 입력</h1>
          <p>관리자</p>
        </main>
      </div>
    </div>
  );
}

export default App;
