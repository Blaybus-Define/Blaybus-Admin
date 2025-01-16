import React, { useState } from "react";
import PressableButton from "./PressableButton";
import colors from "../colors/colors";
import { customAxios } from "../customAxios";

const AddContentRow = ({ loginId, type, setAddRowVisible }) => {
  const [detailType, setDetailType] = useState("");
  const [item, setItem] = useState("");
  const [notes, setNotes] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [maxMedium, setMaxMedium] = useState("");
  const [grade, setGrade] = useState("");

  const handleExperiencePost = async () => {
    if (detailType === "인사평가") {
      setDetailType("PERFORMANCE_EVALUATION");
    }
    try {
      const { data } = await customAxios.post("admin/quest/experience", {
        loginId: loginId,
        type: "PERFORMANCE_EVALUATION",
        title: "Monthly Overtime",
        description: "5 times",
        date: "2025-01-16",
        experience: 2000,
      });
    } catch (error) {
      console.err("Post experience: ", error);
    }
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {type === "quest" ? (
        // quest
        <div className="body-2-r" style={styles.contentContainer}>
          {/* 유형 */}
          <div style={{ ...styles.item, justifyContent: "center" }}>
            <input
              placeholder="리더부여/직무별"
              value={detailType}
              onChange={(e) => {
                setDetailType(e.target.value);
              }}
              style={styles.input}
            />
          </div>
          {/* 항목 */}
          <div style={styles.item}>
            <input
              placeholder="내용을 입력해주세요."
              value={item}
              onChange={(e) => {
                setItem(e.target.value);
              }}
              style={styles.input}
            />
          </div>
          {/* 비고 */}
          <div style={styles.item}>
            <input
              placeholder="내용을 입력해주세요."
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
              style={styles.input}
            />
          </div>
          {/* 주기 */}
          <div style={{ ...styles.item, padding: 0 }}>
            <input
              placeholder="YYYY"
              value={year}
              onChange={(e) => {
                setYear(e.target.value);
              }}
              style={styles.input}
            />
            년
            <input
              placeholder="MM"
              value={month}
              onChange={(e) => {
                setMonth(e.target.value);
              }}
              style={styles.input}
            />
            월
            <input
              placeholder="DD"
              value={day}
              onChange={(e) => {
                setDay(e.target.value);
              }}
              style={styles.input}
            />
            일
          </div>
          {/* 경험치, 달성정도 */}
          <div style={styles.item} />
          <div style={styles.item} />
          {/* MAX/MEDIUM */}
          <div style={styles.item}>
            <input
              placeholder="MAX/MEDIUM"
              value={maxMedium}
              onChange={(e) => {
                setMaxMedium(e.target.value);
              }}
              style={styles.input}
            />
          </div>
          {/* 부여날짜 */}
          <div style={styles.item}></div>
          {/* 완료 */}
          <div style={{ ...styles.item, justifyContent: "center" }}>
            <PressableButton
              onClick={() => {
                // 퀘스트 완료 로직
                setAddRowVisible(null);
                console.log("aa");
              }}
              style={{
                ...styles.button,
                backgroundColor:
                  detailType && item && year && month && day && maxMedium
                    ? colors.orange[500]
                    : colors.gray[400],
              }}
              pressedStyle={{ backgroundColor: colors.orange[600] }}
              disabled={
                !(detailType && item && year && month && day && maxMedium)
              }
            >
              <span className="label-1-b" style={{ color: "#FFF" }}>
                완료하기
              </span>
            </PressableButton>
          </div>
        </div>
      ) : (
        // experience
        <div className="body-2-r" style={styles.contentContainer}>
          {/* 유형 */}
          <div style={{ ...styles.item, justifyContent: "center" }}>
            <input
              placeholder="인사평가/전사 프로젝트"
              value={detailType}
              onChange={(e) => {
                setDetailType(e.target.value);
              }}
              style={styles.input}
            />
          </div>
          {/* 항목 */}
          <div style={styles.item}>
            <input
              placeholder="내용을 입력해주세요."
              value={item}
              onChange={(e) => {
                setItem(e.target.value);
              }}
              style={styles.input}
            />
          </div>
          {/* 비고 */}
          <div style={styles.item}>
            <input
              placeholder="내용을 입력해주세요."
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
              style={styles.input}
            />
          </div>
          {/* 주기 */}
          <div style={{ ...styles.item }} />
          {/* 경험치 */}
          <div style={styles.item} />
          {/* 달성 정도 */}
          <div style={styles.item}>
            <input
              placeholder="S-D 등급"
              value={grade}
              onChange={(e) => {
                setGrade(e.target.value);
              }}
              style={styles.input}
            />
          </div>
          {/* MAX/MEDIUM */}
          <div style={styles.item} />
          {/* 부여날짜 */}
          <div style={styles.item} />
          {/* 완료 */}
          <div style={{ ...styles.item, justifyContent: "center" }}>
            <PressableButton
              onClick={() => {
                // 경험치 완료 로직
                setAddRowVisible(null);
                console.log("addRowVisible 상태가 null로 변경되었습니다");
              }}
              style={{
                ...styles.button,
                backgroundColor:
                  detailType && item && grade
                    ? colors.orange[500]
                    : colors.gray[400],
              }}
              pressedStyle={{ backgroundColor: colors.orange[600] }}
              disabled={!(detailType && item && grade)}
            >
              <span className="label-1-b" style={{ color: "#FFF" }}>
                완료하기
              </span>
            </PressableButton>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  contentContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 65,
    gap: 16,
    padding: "0px 16px",
    borderBottom: "1px solid #EBEBEB",
    backgroundColor: colors.orange[50],
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
    padding: "0px 4px",
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: "8px 12px",
  },
  input: {
    display: "flex",
    width: "100%",
    borderRadius: 4,
    backgroundColor: "#FFF",
    padding: 2,
  },
};

export default AddContentRow;
