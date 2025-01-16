import React, { useRef } from "react";
import PressableButton from "./PressableButton";
import Down from "../icon/dropdown.svg";
import colors from "../colors/colors";

const NormalContentRow = ({
  setAchieveModalVisible,
  achieveModalVisible,
  selectedAchievement,
  setButtonPosition,
  isComplete,
  type,
}) => {
  // 나중에 위에 매개변수로 받아올 애들
  const getQuestAchieve = null;
  // const type = "quest";
  const detailType = "";
  const 항목 = "";
  const 비고 = "";
  const 주기 = "";
  const 경험치 = "";
  const 달성정도 = "MAX";
  const minMax = "";
  const 부여날짜 = "";
  // const isComplete = false; // 완료 여부

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

  return (
    <div style={{ display: "flex", width: "100%" }}>
      {type === "quest" ? (
        // quest
        <div className="body-2-r" style={styles.contentContainer}>
          <div style={{ ...styles.item, justifyContent: "center" }}>
            리더부여
          </div>
          <div style={styles.item}>월특근</div>
          <div style={styles.item}>5회</div>
          <div style={styles.item}>2025년 1월 1주차</div>
          <div style={styles.item}>2000</div>
          {/* 달성 정보 유무에 따라 다르게 */}
          <div style={styles.item}>
            {isComplete ? (
              <span>{달성정도}</span>
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
          <div style={styles.item}>80/40</div>
          <div style={styles.item}>2025-01-15</div>
          <div style={{ ...styles.item, justifyContent: "center" }}>
            {isComplete ? (
              "완료"
            ) : selectedAchievement ? (
              <PressableButton
                onClick={() => {
                  // 퀘스트 완료 로직
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
            ) : (
              "미완료"
            )}
          </div>
        </div>
      ) : (
        // experience
        <div className="body-2-r" style={styles.contentContainer}>
          <div style={{ ...styles.item, justifyContent: "center" }}>
            리더부여
          </div>
          <div style={styles.item}>월특근</div>
          <div style={styles.item}>5회</div>
          <div style={styles.item}>2025년 1월 1주차</div>
          <div style={styles.item}>2000</div>
          {/* 달성 정보 유무에 따라 다르게 */}
          <div style={styles.item}>MAX</div>
          <div style={styles.item}>80/40</div>
          <div style={styles.item}>2025-01-15</div>
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
