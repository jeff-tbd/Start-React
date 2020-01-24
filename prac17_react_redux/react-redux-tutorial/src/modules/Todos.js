//액션 타입
const CHANGE_INPUT = 'todos/CHANGE_INPUT';
const INSERT = 'todos/INSERT';
const TOGGLE = 'todos/TOGGLE';
const REMOVE = 'todos/REMOVE';

//액션 생성 함수
export const changeInput = input => ({ type: CHANGE_INPUT, input });
let id = 1;
export const insert = text => ({
  type: INSERT,
  todo: {
    id: id++,
    text,
    done: false,
  },
});
export const toggle = id => ({ type: TOGGLE, id });
export const remove = id => ({ type: REMOVE, id });

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
function todos(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return {
        ...state,
        input: action.input,
      };
    case INSERT:
      return {
        ...state,
        todos: [...todos, action.todo],
      };
    case TOGGLE:
      return {
        ...state,
        todos: todos.map(todo =>
          todo.id === action.id ? { ...todo, done: !todo.done } : todo,
        ),
      };
    case REMOVE:
      return {
        ...state,
        todos: todos.filter(todo => todo.id !== action.id),
      };

    default:
      return state;
  }
}

export default todos;