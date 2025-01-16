import React, { useEffect } from "react";
import "./Modal.css";
import colors from "../../colors/colors";
import PressableButton from "../PressableButton";

const Modal = ({
  visible,
  onClose,
  selectItems,
  setSelectedAchievement,
  position,
}) => {
  if (!visible) return null;

  return (
    <div className={`modal-overlay ${visible ? "show" : ""}`} onClick={onClose}>
      <div
        className={`modal-content ${visible ? "show" : ""}`}
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않음
        style={{
          position: "fixed",
          color: colors.gray[900],
          top: position.bottom + 6,
          left: position.left,
        }}
      >
        {/* 내용 */}
        <div
          style={{
            ...styles.selectContainer,
            flexDirection: "column",
            backgroundColor: "#FFF",
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          {selectItems &&
            selectItems.map((item, index) => {
              return (
                <PressableButton
                  key={index}
                  onClick={() => {
                    setSelectedAchievement(item);
                    onClose();
                  }}
                  style={{
                    ...styles.selectContainer,
                    flex: 1,
                    padding: "9px 0px",
                  }}
                  pressedStyle={{ backgroundColor: colors.gray[50] }}
                >
                  <span className="body-2-r">{item}</span>
                </PressableButton>
              );
            })}
        </div>
      </div>
    </div>
  );
};

const styles = {
  selectContainer: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
};

export default Modal;
