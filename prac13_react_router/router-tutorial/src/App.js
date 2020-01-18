import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";

// Route 컴포넌트는 특정 주소에 컴포넌트를 연결시켜 준다
// Link 컴포넌트는 클릭하면 다른 주소로 이동시켜 주는 컴포넌트
function App() {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
      </ul>
      <hr />
      <Route path="/" component={Home} exact={true} />
      <Route path={["/about", "/info"]} component={About} />
    </div>
  );
}

export default App;
