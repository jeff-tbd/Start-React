# 환경설정

## brew 설치

- https://brew.sh/index_ko

## yarn 설치

```bash
brew update
brew install yarn
yarn config set prefix ~/.yarn
echo 'export PATH="$(yarn global bin):$PATH"' >> ~/.bash_profile
```

## VS Code 확장 프로그램

- ESLint
- Reactjs Code Snippets
- Prettier-Code formatter

## CRA로 프로젝트 생성

```bash
yarn create react-app hello-react
```

## ESLint 적용

- 문법 검사 도구

## Prettier 적용

- Root 디렉터리에서 .prettierrc 라는 파일을 생성하여 커스터마이징 할 수 있다

- ```javascript
  {
    "singleQuote": true,
    "semi": true,
    "useTabs": false,
    "tabWidth": 2
  }
  ```

- 

