import { useState } from "react";
import colors from "../colors/colors";
import { customAxios } from "../customAxios";
import PressableButton from "./PressableButton";

const NewMain = () => {
  const typeMapper = {
    리더부여: "LEADER_ASSIGNMENT",
    직무별: "TASK",
    인사평가: "PERFORMANCE_EVALUATION",
    "전사 프로젝트": "CORPORATE_PROJECT",
  };

  // user Info
  const [loginId, setLoginId] = useState("");
  const [name, setName] = useState("");
  const [employeeNumber, setEmployNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [jobGroup, setJobGroup] = useState("");
  // quest
  const [quests, setQuests] = useState([]);
  // make quest
  const [questType, setQuestType] = useState("");
  const [questTitle, setQuestTitle] = useState("");
  const [questDescription, setQuestDescription] = useState("");
  const [questDate, setQuestDate] = useState("");
  const [questMax, setQuestMax] = useState("");
  const [questMedium, setQuestMedium] = useState("");

  // make experience
  const [expType, setExpType] = useState("");
  const [expTitle, setExpTitle] = useState("");
  const [expDescription, setExpDescription] = useState("");
  const [expDate, setExpDate] = useState("");
  const [exp, setExp] = useState("");

  // put quest
  const [achievementLevel, setAchievementLevel] = useState("");
  const [memberQuestId, setMemberQuestId] = useState("");

  const getQuest = async () => {
    try {
      console.log("loginId", loginId);
      const { data } = await customAxios.get("/admin/quest/member", {
        params: { loginId: loginId },
      });
      setQuests(data.memberExperienceQuest);
      console.log("Get quest: ", data);
    } catch (error) {
      console.log("GET quest: ", error);
    }
  };

  const handleGetUser = async () => {
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

  const handleQuestPost = async () => {
    try {
      console.log(typeMapper[questType]);
      const response = await customAxios.post("admin/quest", {
        loginId: loginId,
        type: typeMapper[questType],
        title: questTitle,
        description: questDescription,
        date: questDate,
        maxCriterionExperience: questMax,
        mediumCriterionExperience: questMedium,
      });
      setQuestType("");
      setQuestTitle("");
      setQuestDescription("");
      setQuestDate("");
      setQuestMax("");
      setQuestMedium("");
      console.log("Post experience: ", response);
    } catch (error) {
      console.err("Post experience: ", error);
    }
  };

  const handleExperiencePost = async () => {
    try {
      const response = await customAxios.post("admin/quest/experience", {
        loginId: loginId,
        type: typeMapper[expType],
        title: expTitle,
        description: expDescription,
        date: expDate,
        experience: exp,
      });
      console.log("Post experience: ", response);
    } catch (error) {
      console.err("Post experience: ", error);
    }
  };

  const handlePutQuest = async ({ memberQuestId }) => {
    try {
      const response = await customAxios.put("admin/quest/approve", {
        memberQuestId: memberQuestId,
        achievementLevel: achievementLevel,
      });
      console.log("Put quest: ", response);
    } catch (error) {
      console.err("Put quest: ", error);
    }
  };

  return (
    <div
      className="body-2-r"
      style={{
        display: "flex",
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        heigth: "100vh",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        {/* header */}
        <div className="Search-input-container" style={{ marginLeft: 50 }}>
          <input
            className="Search-input"
            type="text"
            placeholder="아이디로 사원 조회"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
          />
          <button
            className="Search-button"
            onClick={() => {
              handleGetUser();
              getQuest();
            }}
          >
            🔍
          </button>
        </div>
        <div style={{ padding: "0px 20px" }}>
          <span
            className="Search-label"
            style={{ marginRight: 8, color: colors.gray[900] }}
          >
            이름
          </span>
          <span className="Search-label">{name}</span>
        </div>
        <div style={{ padding: "0px 20px" }}>
          <span
            className="Search-label"
            style={{ marginRight: 8, color: colors.gray[900] }}
          >
            소속
          </span>
          <span className="Search-label">{department}</span>
        </div>
        <div style={{ padding: "0px 20px" }}>
          <span
            className="Search-label"
            style={{ marginRight: 8, color: colors.gray[900] }}
          >
            직무그룹
          </span>
          <span className="Search-label">{jobGroup}</span>
        </div>
        <div style={{ padding: "0px 20px" }}>
          <span
            className="Search-label"
            style={{ marginRight: 8, color: colors.gray[900] }}
          >
            사번
          </span>
          <span className="Search-label">{employeeNumber}</span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* 퀘스트 생성 */}
          <div style={styles.subContainer}>
            <span style={{ marginBottom: 20 }}>퀘스트 추가</span>
            <div style={styles.rowContainer}>
              <span>유형</span>
              <input
                placeholder="리더부여/직무별"
                value={questType}
                onChange={(e) => {
                  setQuestType(e.target.value);
                }}
                style={styles.input}
              />
            </div>
            <div style={styles.rowContainer}>
              <span>제목</span>
              <input
                placeholder="제목"
                value={questTitle}
                onChange={(e) => {
                  setQuestTitle(e.target.value);
                }}
                style={styles.input}
              />
            </div>
            <div style={styles.rowContainer}>
              <span>비고</span>
              <input
                placeholder="비고"
                value={questDescription}
                onChange={(e) => {
                  setQuestDescription(e.target.value);
                }}
                style={styles.input}
              />
            </div>
            <div style={styles.rowContainer}>
              <span>날짜</span>
              <input
                placeholder="YYYY-MM-DD"
                value={questDate}
                onChange={(e) => {
                  setQuestDate(e.target.value);
                }}
                style={styles.input}
              />
            </div>
            <div style={styles.rowContainer}>
              <span>MAX</span>
              <input
                placeholder="ex.800"
                value={questMax}
                onChange={(e) => {
                  setQuestMax(e.target.value);
                }}
                style={styles.input}
              />
            </div>
            <div style={styles.rowContainer}>
              <span>MEDIUM</span>
              <input
                placeholder="ex.100"
                value={questMedium}
                onChange={(e) => {
                  setQuestMedium(e.target.value);
                }}
                style={styles.input}
              />
            </div>
            <PressableButton
              onClick={handleQuestPost}
              style={{
                ...styles.button,
                backgroundColor: colors.orange[500],
              }}
              pressedStyle={{ backgroundColor: colors.orange[600] }}
            >
              <span className="label-1-b" style={{ color: "#FFF" }}>
                완료하기
              </span>
            </PressableButton>
          </div>
          {/* 경험치 추가 */}
          <div style={styles.subContainer}>
            <span style={{ marginBottom: 20 }}>경험치 추가</span>
            <div style={styles.rowContainer}>
              <span>유형</span>
              <input
                placeholder="인사평가/전사 프로젝트"
                value={expType}
                onChange={(e) => {
                  setExpType(e.target.value);
                }}
                style={styles.input}
              />
            </div>
            <div style={styles.rowContainer}>
              <span>제목</span>
              <input
                placeholder="제목"
                value={expTitle}
                onChange={(e) => {
                  setExpTitle(e.target.value);
                }}
                style={styles.input}
              />
            </div>
            <div style={styles.rowContainer}>
              <span>비고</span>
              <input
                placeholder="비고"
                value={expDescription}
                onChange={(e) => {
                  setExpDescription(e.target.value);
                }}
                style={styles.input}
              />
            </div>
            <div style={styles.rowContainer}>
              <span>획득 날짜</span>
              <input
                placeholder="YYYY-MM-DD"
                value={expDate}
                onChange={(e) => {
                  setExpDate(e.target.value);
                }}
                style={styles.input}
              />
            </div>
            <div style={styles.rowContainer}>
              <span>획득 경험치</span>
              <input
                placeholder="ex.800"
                value={exp}
                onChange={(e) => {
                  setExp(e.target.value);
                }}
                style={styles.input}
              />
            </div>
            <PressableButton
              onClick={handleExperiencePost}
              style={{
                ...styles.button,
                backgroundColor: colors.orange[500],
              }}
              pressedStyle={{ backgroundColor: colors.orange[600] }}
            >
              <span className="label-1-b" style={{ color: "#FFF" }}>
                완료하기
              </span>
            </PressableButton>
          </div>
          {/* 퀘스트 완료 */}
        </div>
        <div style={{ ...styles.subContainer, height: 500 }}>
          <span style={{ marginBottom: 20 }}>미완료 퀘스트</span>

          {quests.map((quest, index) => {
            return (
              <PressableButton
                key={index}
                onPress={() => setMemberQuestId(quest.memberQuestId)}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
                pressedStyle={{ opacity: 0.5 }}
              >
                <span style={{ marginBottom: 4 }}>{quest.type}</span>
                <span style={{ marginBottom: 4 }}>{quest.title}</span>
                <span style={{ marginBottom: 4 }}>{quest.date}</span>
              </PressableButton>
            );
          })}

          <div style={styles.rowContainer}>
            <input
              placeholder="ex.MAX"
              value={exp}
              onChange={(e) => {
                setExp(e.target.value);
              }}
              style={styles.input}
            />
            <PressableButton
              onClick={() => {
                //handlePutQuest
              }}
              style={{
                ...styles.button,
                backgroundColor: colors.orange[500],
              }}
              pressedStyle={{ backgroundColor: colors.orange[600] }}
            >
              <span className="label-1-b" style={{ color: "#FFF" }}>
                완료하기
              </span>
            </PressableButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  subContainer: {
    display: "flex",
    width: 400,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 10,
    border: `1px solid ${colors.gray[300]}`,
    flexDirection: "column",
    padding: 20,
  },
  rowContainer: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    marginBottom: 10,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: "8px 12px",
  },
  input: {
    border: `1px solid ${colors.gray[200]}`,
  },
};

export default NewMain;
