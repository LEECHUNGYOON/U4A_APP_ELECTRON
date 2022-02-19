let oAPP = (function() {
    "use strict";

    const {
        shell
    } = require('electron');

    var sUrl = "/create";

    return {

        onCreateShortcut: function() {

            debugger;

            event.preventDefault();

            oAPP.setBusy('X');

            console.log("build button click!!");

            var oAppid = document.getElementById("appid"),
                oAppdesc = document.getElementById("appdesc"),
                oShortcut = document.getElementById("shortcut"),
                // oIntro = document.getElementById("intro"),
                oProto = document.getElementById("proto"),
                oHost = document.getElementById("host"),
                oPort = document.getElementById("port"),
                oPath = document.getElementById("path"),
                oParam = document.getElementById("parameters");

            var oData = {
                APPID: oAppid.value,
                APPDESC: oAppdesc.value,
                SHORTCUT: oShortcut.files[0],
                // INTRO: oIntro.files[0],
                PROTO: oProto.value,
                HOST: oHost.value,
                PORT: oPort.value,
                PATH: oPath.value,
                PARAM: oParam.value
            };

            // var oForm = new FormData();
            // oForm.append("APPID", oTargetData.APPID);
            // oForm.append("APPDESC", oTargetData.APPDESC);
            // oForm.append("PROTO", oTargetData.PROTO);
            // oForm.append("HOST", oTargetData.HOST);
            // oForm.append("PORT", oTargetData.PORT);
            // oForm.append("PATH", oTargetData.PATH);
            // oForm.append("PARAM", oTargetData.PARAM);
            // oForm.append("SHORTCUT", oTargetData.SHORTCUT || "");

            // 입력값 체크..
            var oRet = oAPP.onCheckAppInfo(oData);
            if (oRet.CODE == "E") {

                alert(oRet.MSG);

                oAPP.setBusy('');

                return;
            }

            var sShortcutName = oData.APPID + ".lnk";

            //생성 위치 패스 구성  SHHONG.lnk <-- 맨마지막 파라메터 명이 생성 숏컷 이름이 됨!!
            let shortcut = oAPP.path.join(process.env.APPDATA, 'Microsoft', 'Windows', 'Start Menu', 'Programs', sShortcutName);

            debugger;

            //인스톨 설치된(EXE) 경로 
            let TargetURL = process.execPath;

            let ImgPath = "";

            let oSendParam = {
                DATA: oData
            };

            //전송 파라메터 설정
            let T_param = JSON.stringify(oSendParam);

            //바로가기 내역
            var Ldesc = oData.APPID;

            debugger;


            //아이콘 -> pc 디렉토리에 파일을 선택
            let options = {

                // See place holder 1 in above image
                title: "Custom title bar",

                // See place holder 2 in above image
                //defaultPath : "D:\\electron-app",

                // See place holder 3 in above image
                buttonLabel: "Custom button",

                // See place holder 4 in above image
                filters: [{
                    name: 'Images',
                    extensions: ['ico', 'png']
                }],

                properties: ['openFile', '']

            };


            let filePaths = oAPP.remote.dialog.showOpenDialog(oAPP.remote.getCurrentWindow(), options);

            ImgPath = filePaths[0];

            //실행~
            let res = shell.writeShortcutLink(shortcut, {
                target: TargetURL,
                args: T_param,
                description: Ldesc,
                appUserModelId: TargetURL,
                icon: ImgPath,
                iconIndex: 0
            });

            //리턴 
            if (res) {
                alert('Shortcut created successfully', 'success');

            } else {
                alert('Failed to create the shortcut', 'danger');

            }

            oAPP.setBusy('');

            // var oForm = new FormData();

            // oForm.append("APPID", oTargetData.APPID);
            // oForm.append("APPDESC", oTargetData.APPDESC);
            // oForm.append("PROTO", oTargetData.PROTO);
            // oForm.append("HOST", oTargetData.HOST);
            // oForm.append("PORT", oTargetData.PORT);
            // oForm.append("PATH", oTargetData.PATH);
            // oForm.append("PARAM", oTargetData.PARAM);
            // oForm.append("SHORTCUT", oTargetData.SHORTCUT || "");
            // oForm.append("INTRO", oTargetData.INTRO || "");

            // oAPP.sendAjax(sCreatePath, oForm);

        },

        // 앱 정보 입력 체크
        onCheckAppInfo: function(oTargetData) {

            /***********************************************************************************
             *  APP ID 체크
             ***********************************************************************************/
            var oRetMsg = oAPP.checkValidAppId(oTargetData.APPID);
            if (oRetMsg.CODE == "E") {
                return oRetMsg;
            }

            /***********************************************************************************
             *  Protocol 체크
             ***********************************************************************************/
            var oRetMsg = oAPP.checkValidProtocol(oTargetData.PROTO);
            if (oRetMsg.CODE == "E") {
                return oRetMsg;
            }

            /***********************************************************************************
             *  Host 체크
             ***********************************************************************************/
            var oRetMsg = oAPP.checkValidHost(oTargetData.HOST);
            if (oRetMsg.CODE == "E") {
                return oRetMsg;
            }

            /***********************************************************************************
             *  Path 체크
             ***********************************************************************************/
            var oRetMsg = oAPP.checkValidPath(oTargetData.PATH);
            if (oRetMsg.CODE == "E") {
                return oRetMsg;
            }

            oRetMsg.CODE = "S";

            return oRetMsg;

        }, // end of oAPP.onCheckAppInfo      

        // APPID 입력 체크
        checkValidAppId: function(sAppId) {

            var oRetMsg = {
                CODE: "E",
                TYPE: "APPID",
                MSG: ""
            };

            // 입력 여부 확인
            if (!sAppId) {
                oRetMsg.MSG = "APPID를 입력하세요";
                return oRetMsg;
            }

            // // 입력길이 확인
            // if (sAppId.length > 20) {
            //     oRetMsg.MSG = "APPID는 20자 이하만 입력 가능합니다";
            //     return oRetMsg;
            // }

            // 특수문자 입력 체크
            var bIsValid = oAPP.checkSpecial(sAppId);
            if (bIsValid) {
                oRetMsg.MSG = "특수문자를 포함하면 안됩니다";
                return oRetMsg;
            }

            // 공백 있음
            var bIsValid = oAPP.checkSpace(sAppId);
            if (bIsValid) {
                oRetMsg.MSG = "공백을 포함하면 안됩니다";
                return oRetMsg;
            }

            // 영문+숫자
            var bIsValid = oAPP.checkEngNum(sAppId);
            if (!bIsValid) {
                oRetMsg.MSG = "영문 + 숫자만 입력가능합니다";
                return oRetMsg;
            }

            oRetMsg.CODE = "S";

            return oRetMsg;

        }, // end of oAPP.checkValidAppId

        // App Description 입력 체크
        checkValidAppDesc: function(sAppDesc) {

            var oRetMsg = {
                CODE: "E",
                TYPE: "APPDESC",
                MSG: ""
            };

            // 입력 여부 확인
            if (!sAppDesc) {
                oRetMsg.MSG = "App Description을 입력하세요";
                return oRetMsg;
            }

            oRetMsg.CODE = "S";

            return oRetMsg;

        }, // end of oAPP.checkValidAppDesc

        // Protocol 입력 체크
        checkValidProtocol: function(sProto) {

            var oRetMsg = {
                CODE: "E",
                TYPE: "PROTO",
                MSG: ""
            };

            // 입력 여부 확인
            if (!sProto) {
                oRetMsg.MSG = "Protocol을 입력하세요";
                return oRetMsg;
            }

            oRetMsg.CODE = "S";

            return oRetMsg;

        }, // end of oAPP.checkValidProtocol

        // Host 입력 체크
        checkValidHost: function(sHost) {

            var oRetMsg = {
                CODE: "E",
                TYPE: "HOST",
                MSG: ""
            };

            // 입력 여부 확인
            if (!sHost) {
                oRetMsg.MSG = "HOST를 입력하세요";
                return oRetMsg;
            }

            oRetMsg.CODE = "S";

            return oRetMsg;

        }, // end of oAPP.checkValidHost

        // Path 입력 체크
        checkValidPath: function(sPath) {

            var oRetMsg = {
                CODE: "E",
                TYPE: "HOST",
                MSG: ""
            };

            // 입력 여부 확인
            if (!sPath) {
                oRetMsg.MSG = "Path를 입력하세요";
                return oRetMsg;
            }

            oRetMsg.CODE = "S";

            return oRetMsg;

        }, // end of oAPP.checkValidPath

        // 영문 + 숫자 입력 체크
        checkEngNum: function(str) {
            var regExp = /^[A-Za-z]|^[A-Za-z]+[A-Za-z0-9]+/g;

            if (regExp.test(str)) {
                return true;
            } else {
                console.log("영문+숫자입력 걸림!!");
                return false;
            }
        },

        // 특수문자 체크
        checkSpecial: function(str) {
            var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
            if (special_pattern.test(str) == true) {
                console.log("특수문자 걸림!!");
                return true;
            } else {
                return false;
            }
        },

        // 공백(스페이스 바) 체크 
        checkSpace: function(str) {
            if (str.search(/\s/) !== -1) {
                console.log("공백 있음!!");
                return true;
            } else {
                return false;
            }
        },

        // 첨부파일 이미지 사이즈 용량 제한
        checkFilesSize: function(input) {

            if (input.files && input.files[0].size > (1 * 1024 * 1024)) {
                alert("파일 사이즈가 1mb 를 넘습니다.");
                input.value = null;
            }

        }, // end of oAPP.checkFilesSize

        setBusy: function(bIsBusy) {

            var oBusy = document.getElementById("u4aWsBusyIndicator");

            if (!oBusy) {
                return;
            }

            if (bIsBusy == 'X') {
                oBusy.style.visibility = "visible";
            } else {
                oBusy.style.visibility = "hidden";
            }

        }

    };

})();

oAPP.remote = require('electron').remote;
oAPP.app = oAPP.remote.app;
oAPP.ipcRenderer = require('electron').ipcRenderer;
oAPP.ipcMain = oAPP.remote.require('electron').ipcMain;
oAPP.fs = oAPP.remote.require('fs');
oAPP.BrowserWindow = oAPP.remote.require('electron').BrowserWindow;
oAPP.path = oAPP.remote.require('path');


window.onload = function() {

    var oAppid = document.getElementById("appid"),
        oAppdesc = document.getElementById("appdesc"),
        oShortcut = document.getElementById("shortcut"),
        // oIntro = document.getElementById("intro"),
        oProto = document.getElementById("proto"),
        oHost = document.getElementById("host"),
        oPort = document.getElementById("port"),
        oPath = document.getElementById("path"),
        oParam = document.getElementById("parameters");


    // test default
    oAppdesc.value = "윤이앱테스트";
    oProto.value = "http";
    oHost.value = "49.236.106.96";
    oPort.value = "8000";
    oPath.value = "/zu4a/ytest_api05";
    oParam.value = "sap-client=800&sap-language=EN";

};