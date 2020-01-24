import React, { createContext, useState } from "react";

//default 값은 Provider를 사용하지 않을 때 적용될 값
const ColorContext = createContext({
  state: { color: "black", subcolor: "red" },
  action: {
    setColor: () => {},
    setSubcolor: () => {}
  }
});

const ColorProvider = ({ children }) => {
  const [color, setColor] = useState("black");
  const [subcolor, setSubcolor] = useState("red");

  const value = {
    state: { color, subcolor },
    actions: { setColor, setSubcolor }
  };
  //Context의 value에 함수를 전달해 줄 수도 있음
  return (
    <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
  );
};

const { Consumer: ColorConsumer } = ColorContext;
export { ColorProvider, ColorConsumer };

export default ColorContext;
