import React, { useState, useEffect } from "react";

const HistorySample = props => {
  const handleGoBack = () => {
    props.history.goBack();
  };
  const handleGoHome = () => {
    props.history.push("/");
  };
  useEffect(() => {
    const unblock = props.history.block("정말 떠나실 건가요?");
    return () => {
      if (unblock) unblock();
    };
  }, []);
  return (
    <div>
      <button onClick={handleGoBack}>뒤로</button>
      <button onClick={handleGoHome}>홈으로</button>
    </div>
  );
};

export default HistorySample;
