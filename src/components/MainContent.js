import React, { useEffect, useState } from "react";
import PressableButton from "./PressableButton";
import Add from "../icon/add.svg";
import colors from "../colors/colors";
import Modal from "./Modal/Modal";
import NormalContentRow from "./NormalContentRow";
import AddContentRow from "./AddContentRow";
import { customAxios } from "../customAxios";

const MainContent = () => {
  const [loginId, setLoginId] = useState("");
  // user Info
  const [name, setName] = useState("");
  const [employeeNumber, setEmployNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [jobGroup, setJobGroup] = useState("");
  // content
  const [quests, setQuests] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [allData, setAllData] = useState([]);

  // "type": "TASK",
  // "title": "월별 퀘스트",
  // "description": "Achieve the monthly sales target set by the department.",
  // "date": "2025-03-01",
  // "experience": 0,
  // "progress": "NOT_ACHIEVED",
  // "assignedDate": null,
  // "completed": false

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
    setAllData([]);
    getQuest();
    getExperience();
    getUserInfo();
  };

  const getQuest = async () => {
    try {
      const { data } = await customAxios.get("/admin/quest/member", {
        params: { loginId: loginId },
      });
      setAllData((prev) => {
        const updatedData = [
          ...new Set([...prev, ...data.memberExperienceQuest]),
        ];
        return updatedData;
      });
    } catch (error) {
      console.log("GET quest: ", error);
    }
  };
  const getExperience = async () => {
    try {
      const { data } = await customAxios.get("/admin/quest/experience", {
        params: { loginId: loginId },
      });
      setAllData((prev) => {
        const updatedData = [
          ...new Set([...prev, ...data.memberExperienceQuest]),
        ];
        return updatedData;
      });
    } catch (error) {
      console.log("GET experience: ", error);
    }
  };
  const getUserInfo = async () => {
    try {
      const { data } = await customAxios.get("/admin/member", {
        params: { loginId: loginId },
      });
      setName(data.name);
      setEmployNumber(data.employeeNumber);
      setDepartment(data.department);
      setJobGroup(data.jobGroup);
    } catch (error) {
      console.log("Post user: ", error);
    }
  };

  useEffect(() => {
    allData.sort((a, b) => {
      // 날짜가 null인 경우를 처리
      const dateA = a.assignedDate
        ? new Date(a.assignedDate)
        : new Date("2024-01-01");
      const dateB = b.assignedDate
        ? new Date(b.assignedDate)
        : new Date("2024-01-01");

      return dateA - dateB;
    });
    console.log(allData);
  }, [allData]);

  return (
    <main className="MainContent">
      <div className="Search-bar">
        <span className="Search-label">사원 검색</span>
        <div className="Search-input-container">
          <input
            className="Search-input"
            type="text"
            placeholder="아이디로 사원 조회"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <button className="Search-button" onClick={handleSearch}>
            🔍
          </button>
        </div>
        <span className="Search-label">이름</span>
        <span className="Search-label">{name}</span>
        <span className="Search-label">소속</span>
        <span className="Search-label">{department}</span>
        <span className="Search-label">직무그룹</span>
        <span className="Search-label">{jobGroup}</span>
        <span className="Search-label">사번</span>
        <span className="Search-label">{employeeNumber}</span>
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
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          height: 400,
          overflow: "hidden",
        }}
      >
        {/* 퀘스트/경험치 추가 */}
        {addRowVisible &&
          (addRowVisible === "quest" ? (
            <AddContentRow
              loginId={loginId}
              type="quest"
              setAddRowVisible={setAddRowVisible}
            />
          ) : addRowVisible === "experience" ? (
            <AddContentRow
              loginId={loginId}
              type="experience"
              setAddRowVisible={setAddRowVisible}
            />
          ) : null)}
        {allData.map((data, index) => {
          return (
            <NormalContentRow
              key={index}
              setAchieveModalVisible={setAchieveModalVisible}
              achieveModalVisible={achieveModalVisible}
              selectedAchievement={selectedAchievement}
              setButtonPosition={setButtonPosition}
              type={
                data.type === "PERFORMANCE_EVALUATION" ||
                data.type === "CORPORATE_PROJECT"
                  ? "exp"
                  : "quest"
              }
              detailType={data.type}
              title={data.title}
              description={data.description}
              isComplete={data.completed}
              date={data.date}
              experience={data.experience}
              progress={data.progress}
              assignedDate={data.assignedDate}
              memberQuestId={data.memberQuestId ? data.memberQuestId : ""}
            />
          );
        })}
      </div>
      <div className="Pagination">
        <button>이전</button>
        <span> 1 </span>
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
