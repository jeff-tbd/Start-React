import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ColorBox from "./contexts/ColorBox";
import { ColorProvider } from "./contexts/color";
import SelectColor from "./components/SelectColor";

function App() {
  return (
    <ColorProvider>
      <div>
        <SelectColor />
        <ColorBox />
      </div>
    </ColorProvider>
  );
}

export default App;
