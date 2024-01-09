# 기능 설명

1. **Header 컴포넌트**:

   - **TimerProgressBar 컴포넌트**: 프로그레스 바와 타이머 진행 정도를 표시.
     - 상태: 타이머 진행 시간, 최대 시간
     - 기능: EditMode에서 최대 시간을 조정할 수 있는 기능

2. **MainArea 컴포넌트**:

   - **Slide 컴포넌트**: 현재 PPT 화면을 표시.
     - 상태: 현재 슬라이드의 제목, 소제목, 컨텐츠
     - 기능: EditMode에서 내용을 수정할 수 있는 기능
   - **PresenterNotes 컴포넌트**: 발표자 노트를 세로형 Carousel로 표시.
     - 상태: 노트 목록, 현재 선택된 노트
     - 기능: EditMode에서 노트를 수정하거나 삭제할 수 있는 기능

3. **Sidebar 컴포넌트**:

   - **EditModeToggle 컴포넌트**: 수정 모드와 발표 모드를 토글.
   - **StartPresentation 버튼**: 발표자 모드를 시작.

4. **Footer 컴포넌트**:
   - **FooterCarousel 컴포넌트**: PPT 슬라이드를 가로형 Carousel로 표시.
     - 상태: 슬라이드 목록, 현재 선택된 슬라이드
     - 기능: EditMode에서만 표시
   - **FeedbackCharacter 컴포넌트**: 피드백을 제공하는 캐릭터를 표시.
     - 상태: 현재 피드백 메시지
     - 기능: EditMode가 아닐 때만 말풍선 표시

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
