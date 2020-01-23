# 14장 axios

## 뉴스 뷰어 만들기

- 비동기 작업 이해
- axios로 API 호출해서 데이터 받아오기
- newsapi API 키 발급받기
- 뉴스 뷰어 UI 만들기
- 데이터 연동하기
- 카테고리 기능 구현하기
- 리엑트 라우터 적용하기

## 비동기 작업 이해

### callback 함수 with setTimeout

### Promise

```javascript
const promise = new Promise((resolve, reject) => setTimeout(_ => resolve(10)));
/* promise 객체는 상태를 가진다 */
// new Promise() 메소드 호출 -> 대기상태
// resolve 실행 -> 이행상태, then() 으로 처리 결과 받을 수 있음
// reject 실행 -> 거부상태, catch() 로 에러 결과 받을 수 있음
```

### PromiseAll

### async/await

```javascript
await Promise.all([getFoo(), getRoo[]])
```

## axios

- JS HTTP 클라이언트 라이브러리
- HTTP 요청을 promise 기반으로 처리

```javascript
[1]
axios.get(url).then(response => setData(response));
[2]
const response = await axios.get(url);
setData(response)
```

## 뉴스 뷰어 UI

- https://www.w3schools.com/css/css3_object-fit.asp
- https://www.w3schools.com/cssref/pr_text_white-space.asp
- https://developer.mozilla.org/ko/docs/Web/CSS/@media

```css
object-fit: cover; 
// specify how an <img> or <video> should be resized to fit its container.
white-space: normal;
// specifies how white-space inside an element is handled.
@media screen and (max-width: 768px) {
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
}
//미디어 타입이 스크린, 화면의 최대 너비가 768px로 지정
// 두 번째는 스타일 시트내에서 @media 를 사용합니다. 결과는 위와 동일한 조건이고, 그 조건이 맞으면 {...}  안의 스타일이 적용
// 보통 브라우저 메인 서비스인 경우 max-width를 준다
```

## useEffect에서 axios 활용

- useEffect는 페이지 mount/ unmount 시 호출할 로직을 정의한다
- 따라서 axios를 useEffect 내에서 사용하려면 내부에 async 함수를 정의한 후 호출하여야 한다

```react
useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url);
      setData(response.data.article);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }
  fetchData();
}, []);
```

## styled-components 조건부 스타일링

- props 값으로 전달해 주는 값을 쉽게 스타일에 적용할 수 있다는 장점
- props로 넣어 준 값을 직접 전달해 줄 수 있다

```react
const Box = styled.div`background: ${props => props.color || 'blue'}`;
```

- 조건에 따라 특정 스타일을 부여해 준다

```react
`${props => props.inverted && css`backgound:none;` }`
```

### tagged 탬플릿 리터럴

```javascript
function tagged(...args) {
  console.log(args);
}
tagged`hello ${{foo: 'bar'}} ${()=>'world'}`;
```

- 탬플릿 사이사이에 들어가는 자바스크립트 객체나 함수의 원본 값을 그대로 추출할 수 있다
- 일반 템플릿 리터럴은 함수 내용이 문자열 화 되어 나타남

## React-Router 적용

- BrouserRouter컴포넌트를 index.js에서 사용
- Route컴포넌트를 App.js에서 사용
  - path, component를 props로 전달
  - component로 NewsPage컴포넌트 사용

```react
const App = () => {
  return <Route path="/:category?" component={NewsPage} />;
};

const NewsPage = ({ match }) => {
  const category = match.params.category || 'all';
  return (
    <>
      <Categories />
      <NewsList category={category} />
    </>
  );
};


```







