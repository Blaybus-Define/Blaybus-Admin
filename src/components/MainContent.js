import React, { useState } from "react";
import PressableButton from "./PressableButton";
import Add from "../icon/add.svg";
import colors from "../colors/colors";
import Modal from "./Modal/Modal";
import NormalContentRow from "./NormalContentRow";
import AddContentRow from "./AddContentRow";

const MainContent = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Button
  const [addRowVisible, setAddRowVisible] = useState(null);

  // Modal
  const [achieveModalVisible, setAchieveModalVisible] = useState(false);
  const [selectedAchievement, setSelectedAchievement] = useState("");
  const [buttonPosition, setButtonPosition] = useState({
    bottom: 0,
    left: 0,
    height: 0,
  });

  const selectItems = {
    quest: {
      type: ["리더부여", "직무별"],
      achievement: ["MAX", "MED", "MIN"],
    },
    experience: {
      type: ["인사평가", "전사 프로젝트"],
      achievement: ["S등급", "A등급", "B등급", "C등급", "D등급"],
    },
  };

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
      {/* button */}
      <div style={styles.buttonContainer}>
        <PressableButton
          onClick={() => {
            setAddRowVisible("quest");
          }}
          style={{ ...styles.button, backgroundColor: colors.orange[500] }}
          pressedStyle={{ backgroundColor: colors.orange[600] }}
        >
          <img src={Add} alt="add" style={{ width: 16 }} />
          <span className="label-1-b" style={{ color: "#FFF", marginLeft: 8 }}>
            퀘스트 등록
          </span>
        </PressableButton>
        <PressableButton
          onClick={() => {
            setAddRowVisible("experience");
          }}
          style={{
            ...styles.button,
            backgroundColor: colors.gray[900],
            marginLeft: 24,
          }}
          pressedStyle={{ backgroundColor: "#000" }}
        >
          <img src={Add} alt="add" style={{ width: 16 }} />
          <span className="label-1-b" style={{ color: "#FFF", marginLeft: 8 }}>
            경험치 입력
          </span>
        </PressableButton>
      </div>
      {/* content title */}
      <div className="Content-header">
        <span className="Content-header-label">유형</span>
        <span className="Content-header-label">항목</span>
        <span className="Content-header-label">비고</span>
        <span className="Content-header-label">주기</span>
        <span className="Content-header-label">경험치</span>
        <span className="Content-header-label">달성 정도</span>
        <span className="Content-header-label">MAX/MEDIUM</span>
        <span className="Content-header-label">부여 날짜</span>
        <span className="Content-header-label">완료 여부</span>
      </div>
      {/* content */}
      <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        {/* 퀘스트/경험치 추가 */}
        {addRowVisible &&
          (addRowVisible === "quest" ? (
            <AddContentRow type="quest" setAddRowVisible={setAddRowVisible} />
          ) : addRowVisible === "experience" ? (
            <AddContentRow
              type="experience"
              setAddRowVisible={setAddRowVisible}
            />
          ) : null)}
        {/* 미완료 퀘스트 */}
        <NormalContentRow
          setAchieveModalVisible={setAchieveModalVisible}
          achieveModalVisible={achieveModalVisible}
          selectedAchievement={selectedAchievement}
          setButtonPosition={setButtonPosition}
          isComplete={false}
          type="quest"
        />
        {/* 완료 퀘스트 */}
        <NormalContentRow
          setAchieveModalVisible={setAchieveModalVisible}
          achieveModalVisible={achieveModalVisible}
          selectedAchievement={selectedAchievement}
          setButtonPosition={setButtonPosition}
          isComplete={true}
          type="quest"
        />
        {/* 경험치 */}
        <NormalContentRow
          setAchieveModalVisible={setAchieveModalVisible}
          achieveModalVisible={achieveModalVisible}
          selectedAchievement={selectedAchievement}
          setButtonPosition={setButtonPosition}
          isComplete={true}
          type="exp"
        />
      </div>
      <div className="Pagination">
        <button>이전</button>
        <button>1</button>
        <button>다음</button>
      </div>
      <Modal
        onClose={() => setAchieveModalVisible(false)}
        visible={achieveModalVisible}
        selectItems={selectItems.quest.achievement}
        setSelectedAchievement={setSelectedAchievement}
        position={buttonPosition}
      />
    </main>
  );
};

const styles = {
  buttonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: 16,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: "8px 12px",
  },
};

export default MainContent;
