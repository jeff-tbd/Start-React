# 15장 Context API

## 실습

- Context API를 사용한 전역 상태 관리 흐름 이해하기
- 기본적인 사용법
- 동적 Context 사용하기
- Consumer 대신 Hook 또는 static contextType 사용하기

## Context API

- Consumer
- Provider

```react
[color.js]
import {createContext} from 'react';
const colorContext = createContext({color: 'black'}); //Provider를 사용하지 않을 때 default값

[ColorBox.js]
// Consumer라는 컴포넌트를 통해 색상을 조회
// Render Props 를 사용
import ColorContext from '../contexts/color';
const ColorBox = () => {
  return (
    <ColorContext.Consumer>
      {value => (
        <div style={{background: value.color}}></div>
      )}
    </ColorContext.Consumer>);
}

[App.js]
//Provider를 사용하면 Context의 value를 변경할 수 있음
import ColorContext from '../contexts/color';
const App = () => {
  return (
    <ColorContext.Provider value={{color:'red'}}>
      <div>
        <ColorBox/>
      </div>
    </ColorContext.Provider>
  )
}
```

## 동적 Context

```react
//value로 함수를 전달할 수 있다
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
```

## useContext API

```react
//Consumer 대신 useContext를 사용하여 value를 쉽게 뱓을 수 있다
import React, { useContext } from "react";
import ColorContext from "../contexts/color";

const ColorBox = () => {
  const { state } = useContext(ColorContext);
  return (
    <>
      <div
        style={{
          width: "64px",
          height: "64px",
          background: state.color
        }}
      />
      <div
        style={{
          width: "32px",
          height: "32px",
          background: state.subcolor
        }}
      />
    </>
  );
};
```



