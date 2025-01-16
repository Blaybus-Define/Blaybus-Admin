import React, { useRef, useState } from "react";
import PressableButton from "./PressableButton";
import Down from "../icon/dropdown.svg";
import colors from "../colors/colors";
import { customAxios } from "../customAxios";

const NormalContentRow = ({
  setAchieveModalVisible,
  achieveModalVisible,
  selectedAchievement,
  setButtonPosition,
  isComplete,
  type,
  detailType,
  title,
  description,
  date,
  experience,
  progress,
  assignedDate,
  memberQuestId,
}) => {
  const typeMapper = {
    LEADER_ASSIGNMENT: "리더부여",
    TASK: "직무별",
    PERFORMANCE_EVALUATION: "인사평가",
    CORPORATE_PROJECT: "전사 프로젝트",
  };

  const buttonRef = useRef(null);

  const handleButtonClick = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect(); // 버튼 위치 계산
      setButtonPosition({
        bottom: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        height: rect.height,
      });
    }
    setAchieveModalVisible(!achieveModalVisible);
  };

  const handlePutQuest = async () => {
    try {
      const response = await customAxios.put("admin/quest/approve", {
        memberQuestId: memberQuestId,
        achievementLevel: selectedAchievement,
      });
      console.log("Put quest: ", response);
    } catch (error) {
      console.err("Put quest: ", error);
    }
  };

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {type === "quest" ? (
        // quest
        <div className="body-2-r" style={styles.contentContainer}>
          <div style={{ ...styles.item, justifyContent: "center" }}>
            {typeMapper[detailType]}
          </div>
          <div style={styles.item}>{title ? title : "-"}</div>
          <div style={styles.item}>{description ? description : "-"}</div>
          <div style={styles.item}>{date ? date : "-"}</div>
          <div style={styles.item}>{experience ? experience : "-"}</div>
          {/* 달성 정보 유무에 따라 다르게 */}
          <div style={styles.item}>
            {isComplete ? (
              <span>{progress}</span>
            ) : (
              <PressableButton
                ref={buttonRef}
                onClick={handleButtonClick}
                style={styles.item}
                pressedStyle={{ opacity: 0.5 }}
              >
                <span
                  style={
                    selectedAchievement
                      ? { color: colors.orange[500] }
                      : { color: colors.gray[900] }
                  }
                >
                  {selectedAchievement ? selectedAchievement : "달성 정도 선택"}
                </span>
                <img
                  src={Down}
                  alt="down"
                  style={{ width: 8, marginLeft: 7 }}
                />
              </PressableButton>
            )}
          </div>
          <div style={styles.item}>-</div>
          <div style={styles.item}>{assignedDate ? assignedDate : "-"}</div>
          <div style={{ ...styles.item, justifyContent: "center" }}>
            {isComplete ? (
              "완료"
            ) : selectedAchievement ? (
              <PressableButton
                onClick={handlePutQuest}
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
            ) : (
              "미완료"
            )}
          </div>
        </div>
      ) : (
        // experience
        <div className="body-2-r" style={styles.contentContainer}>
          <div style={{ ...styles.item, justifyContent: "center" }}>
            {typeMapper[detailType]}
          </div>
          <div style={styles.item}>{title ? title : "-"}</div>
          <div style={styles.item}>-</div>
          <div style={styles.item}>{date ? date : "-"}</div>
          <div style={styles.item}>{experience ? experience : "-"}</div>
          {/* 달성 정보 유무에 따라 다르게 */}
          <div style={styles.item}>{description ? description : "-"}</div>
          <div style={styles.item}>-</div>
          <div style={styles.item}>{assignedDate ? assignedDate : "-"}</div>
          <div style={{ ...styles.item, justifyContent: "center" }}>-</div>
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
    height: 49,
    gap: 16,
    padding: "0px 16px",
    borderBottom: "1px solid #EBEBEB",
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flex: 1,
  },
  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    padding: "8px 12px",
  },
};

export default NormalContentRow;
