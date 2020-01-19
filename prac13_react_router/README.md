# 13. 리엑트 라우터로 SPA 개발

## 실습 흐름

- 프로젝트 생성, 리엑트 라우터 적용
- 페이지 만들기
- Route 컴포넌트로 특정 주소에 컴포넌트 연결
- 라우트 이동하기
- URL 파라미터와 쿼리 이해하기
- 서브 라우트
- 부가 기능

### Route 컴포넌트

```react
<Route path="/about" component={About}/>
<Route path="/" component={Home} exact/>
<Route path={['/about', '/info']} component={About} />
<Route path="/profile/:username" component={Profile} /> //URL 파라미터
```

- 사용자의 현재 경로에 따라 다른 컴포넌트를 보여주는 컴포넌트
- exact라는 props를 true로 설정해야 /about경로에 / 에 해당하는 컴포넌트가 안뜬다
- path props를 배열로 설정해 두면 여러 경로에서 같은 컴포넌트를 보여 줄 수 있음
- URL 파라미터를 props로 받아올 수 있다

### Link 컴포넌트

```react
<Link to="/about">소개</Link>
```

- 클릭하면 다른 주소로 이동시켜 주는 컴포넌트
- a 태그는 페이지를 전환하는 과정에서 페이지를 새로 불러오기 때문에 페이지 상태들을 모두 날린다
- Link 컴포넌트는  페이지를 불러오지 않고 HTML5 History API를 사용하여 페이지의 주소만 변경해줌

### match 객체

```react
const Profile = ({match}) => {
  const {username} = match.params;
}
```

- URL 파라미터를 사용할 때는 라우트로 사용되는 컴포넌트에서 받아오는 match 객체 안의 params 값을 참조한다

### location 객체

```react
import qs from 'qs';

const About = ({location}) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true
  });
}
```

- URL 쿼리는 location 객체에 들어 있는 search 값에서 조회할 수 있다
- Location 객체는 라우트로 사용된 컴포넌트의 props로 전달된다,
- 쿼리 문자열을 객체로 변환할 때는 qs 라이브러리 사용
- _쿼리 문자열을 객체로 파싱한 결과 값은 언제나 문자열 -> 꼭 주의해야 함_

### history 객체

```react
const About = ({history}) => {
  const handleGoBack = _ => history.goBack();
  const handleGoHome = _ => history.push('/');
  useEffect(_ => {
    const unblock = history.block('떠나실 껀가유?')
    return _ => {
      if(unblock) unblock()
    }
  }, [])
}
```

- 라우트로 사용된 컴포넌트의 props로 전달되는 객체
- 컴포넌트 내에 구현되는 메소드에서 라우터 api를 호출할 수 있음
- goBack : 뒤로 가기
- push : 특정 화면으로 이동
- block : 이탈 방지

### withRouter

```react
import {WithRouter} from 'react-router-dom';

const WithRouterSample = ({match, location, history}) => {
  return (
    <div>location</div>
  )
}

export default WithRouter(WithRouterSample);
```

- 라우트로 사용된 컴포넌트가 아니여도 match, location, history 객체를 접근할 수 있게 함
- HoC임

### Switch

```react
<Switch>
  <Route paht=... component =...></Route>
  <Route paht=... component =...></Route>
  <Route render=({location}) => (<div>노 존재함</div>) ></Route>
</Switch>
```

- 여러 Route를 감싸서 그중 일치하는 단 하나의 라우트만을 렌더링시켜줌
- 모든 규칙과 일치하지 않을 때 보여 줄 Not Found 페이지도 구현할 수 있다

### NavLink

```react
import {NavLink, Route} from 'react-router-dom';

const App = () => {
  const activeStyle = {
    background: 'black',
    color: 'white'
  };
  return (
    <NavLink activeStyle={activeStyle} to="/profiles/velopert" active></NavLink>
  )
}
```

- Link와 비슷, 현재 경로와 Link에서 사용하는 경로가 일치하는 경우 특정 스타일 혹은 CSS 클래스를 적용할 수 있는 컴포넌트