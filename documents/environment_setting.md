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

