# 17. React-redux

## 패턴

- 프레젠테이셔널 컴포넌트, 컨테이너 컴포넌트를 분리
- 프레젠테이셔널 컴포넌트 : props를 받아 와서 UI를 보여 주기만 하는 컴포넌트
- 컨테이너 컴포넌트 : 리덕스와 연동, 리덕스로부터 상태를 받아오기도 하고 리덕스 스토어에 액션을 디스패치 하기도 함

## Ducks 패턴

- 액션 타입, 액션 생성 함수, 리듀서 함수를 기능별로 파일 하나에 몰아서 다 작성하는 방식
- 일반적인 구조(actions, constants, reducers)에 불편함을 느낀 개발자들이 자주 사용

## 리덕스 관련 코드 작성

```react
//액션 타입 정의
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

//액션 생성 함수
export const increase = createAction(INCREASE);
export const decrease = createAction(DECREASE);

//초기상태
const initialState = {
  number: 0,
};

//리듀서 함수
const counter = handleActions(
  {
    [INCREASE]: (state, action) => ({ number: state.number + 1 }),
    [DECREASE]: (state, action) => ({ number: state.number - 1 }),
  },
  initialState,
);
```

## 루트 리듀서 만들기

```react
const rootReducer = combineReducers({
  counter,
  todos,
});
```

## 리덕스 적용

```react
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { Provider } from 'react-redux';
//스토어 만들기
const store = createStore(rootReducer, composeWithDevTools());
//Provider 컴포넌트 사용
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

## 컨테이너 컴포넌트

### connect 함수

```react
connect(mapStateToProps, mapDispatchToProps)(연동할 컴포넌트)
connect(state => ({number: state.counter.number}), 
        dispatch({increase: () => dispatch(increase())}))(CounterContainer);
```

## redux-actions

```react
import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

//액션 타입
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

//액션 생성 함수
export const changeInput = createAction(CHANGE_INPUT, input => input);
let id = 3;
export const insert = createAction(INSERT, text => ({
  id: id++,
  text,
  done: false,
}));
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

//초기 상태
const initialState = {
  input: '',
  todos: [
    {
      id: 1,
      text: '리덕스 기초',
      done: true,
    },
    {
      id: 2,
      text: '리엑트와 리덕스',
      done: false,
    },
  ],
};

//리덕스 함수
const todos = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: input }) =>
      produce(state, draft => {
        draft.input = input;
      }),
    [INSERT]: (state, { payload: todo }) =>
      produce(state, draft => {
        draft.todos.push(todo);
      }),
    [TOGGLE]: (state, { payload: id }) =>
      produce(state, draft => {
        const todo = draft.todos.find(todo => todo.id === id);
        todo.done = !todo.done;
      }),
    [REMOVE]: (state, { payload: id }) =>
      produce(state, draft => {
        const index = draft.todos.findIndex(todo => todo.id === id);
        draft.todos.splice(index, 1);
      }),
  },
  initialState,
);

export default todos;
```

## Hook을 사용하여 컨테이너 컴포넌트 생성

- useSelector
- useDispatch
- useStore

```react
import React, { useCallback } from 'react';
import Counter from '../components/Counter';
import { useSelector, useDispatch } from 'react-redux';
// const 결과 = useSelector(상태 선택 함수)
import { increase, decrease } from '../modules/Counter';

const CounterContainer = () => {
  const number = useSelector(state => state.counter.number);
  const dispatch = useDispatch();
  return (
    <Counter
      number={number}
      onIncrease={useCallback(() => dispatch(increase()), [dispatch])}
      onDecrease={useCallback(() => dispatch(decrease()), [dispatch])}
    />
  );
};

export default CounterContainer;
```



