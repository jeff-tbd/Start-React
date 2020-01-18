import React from "react";
import qs from "qs";

// url 쿼리 받아올 때는 location
// url 파라미터 받아올 때는 match
const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
  const showDetail = query.detail === "true";
  return (
    <div>
      <h1>소개</h1>
      <p>예제임</p>
      {showDetail && <p>detail 값을 true로 설정했누</p>}
    </div>
  );
};

export default About;
