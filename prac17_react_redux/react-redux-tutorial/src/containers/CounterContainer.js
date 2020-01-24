import React from 'react';
import Counter from '../components/Counter';
import { connect } from 'react-redux';
// connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)
// 컴포넌트를 리덕스와 연동하려면 connect 함수 사용
// mapStateToProps : 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수
// mapDispatchToProps : 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수
import { increase, decrease } from '../modules/Counter';

const CounterContainer = ({ number, increase, decrease }) => {
  return (
    <Counter number={number} onIncrease={increase} onDecrease={decrease} />
  );
};

export default connect(
  state => ({
    number: state.counter.number,
  }),
  {
    increase,
    decrease,
  },
)(CounterContainer);
