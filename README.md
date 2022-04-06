# U4A_APP_ELECTRON
ELECTRON 기반의 APP

## 배포시 주의사항!!
1. 반드시 cordova platform electron을 삭제 후 2.0.0으로 빌드 할것!!

2. settings js에 개발툴 오픈 로직 주석으로 막을것!!

3. 필요시 plugin, nodejs 등의 필요한 라이브러리를 설치해야함.

4. REGEDIT
    - Internet Browser 설치 유무 확인 시 사용하는 REGEDIT 모듈
    - nobuild 모드로 테스트 시, 레지스트리 정보를 읽어서 현재 pc에 설치되어 있는 브라우저 정보를 구할 수 있으나,
      build 후 실행하면 오류 발생하여 추후 Electron 자동 설치 프로그램에 Template 이관 시, package.json 파일도 이관하여야 한다.
    - package.json 안에 추가할 내용
    /*********************************************/
    "build": {
    "extraResources": [{
      "from": "node_modules/regedit/vbs",
      "to": "regedit/vbs",
      "filter": [
        "**/*"
      ]
    }]
  }
  /*********************************************/

5. 빌드시, cordova 2.0.0 버전으로 설치 후 배포해야함.

6. icon 이미지(.png)의 사이즈가 가로 세로 각각 512px 이상이여야 함.

7. 운영 (고객) 배포용 일 경우

/www/settings/u4a-electron-settings.json 안에

_isDev : false;

나머지는
_isDev : true로 반드시 변경 할 것!!;