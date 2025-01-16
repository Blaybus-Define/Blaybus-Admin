import React, { useState } from "react";

const PressableButton = ({
  children,
  onClick,
  style,
  pressedStyle,
  disabled = false,
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = (event) => {
    if (disabled) return;
    if (event.type === "mousedown" || event.type === "touchstart") {
      setIsPressed(true);
    } else if (
      event.type === "mouseup" ||
      event.type === "touchend" ||
      event.type === "mouseleave"
    ) {
      setIsPressed(false);
    }
  };

  return (
    <div
      onMouseDown={handlePress}
      onMouseUp={handlePress}
      onMouseLeave={handlePress}
      onTouchStart={handlePress}
      onTouchEnd={handlePress}
      onClick={onClick}
      style={{
        ...style,
        ...{
          cursor: disabled ? "not-allowed" : "pointer",
          WebkitTapHighlightColor: "transparent",
        },
        ...(isPressed ? pressedStyle : {}),
      }}
      role="button"
      aria-pressed={isPressed}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </div>
  );
};

export default PressableButton;
