module.exports = (function () {
    "use strict";

    var REMOTE = require('electron').remote,
        APP = REMOTE.app,
        APPPATH = APP.getAppPath(),
        PATH = REMOTE.require('path'),
        SETTINGS = require(PATH.join(APPPATH, "\\settings\\u4a-electron-settings.json"));

    return {

        setLoadingPageBusy: function (bIsShow) {

            var oLoadPg = document.getElementById("u4a_main_load");

            if (typeof oLoadPg === "undefined") {
                return;
            }

            if (bIsShow == 'X') {
                oLoadPg.classList.remove("u4a_loadersInactive");
            } else {
                oLoadPg.classList.add("u4a_loadersInactive");
            }

        },

        getMenuBarList: function () {

            // MenuBar List
            var aMenus = [{
                key: "MENU01",
                label: "File",
                submenu: [{
                    key: "MENU01_01",
                    label: "Exit",
                    click: this.onMENU01_01
                }]
            }, {
                key: "MENU02",
                label: "View",
                submenu: [{
                        key: "MENU02_01",
                        label: "Reload",
                        accelerator: "Ctrl+R",
                        click: this.onMENU02_01
                    },
                    {
                        key: "MENU02_02",
                        label: "Toggle Developer Tool",
                        accelerator: "Ctrl+Shift+I",
                        click: this.onMENU02_02,
                        visible: SETTINGS._isDev
                    }, {
                        key: "MENU02_03",
                        label: "Toggle Full Screen",
                        accelerator: "F11",
                        click: this.onMENU02_03
                    },
                    {
                        key: "MENU02_04",
                        label: "New Window",
                        accelerator: "Ctrl+N",
                        click: this.onMENU02_04
                    }
                ]
            }];

            return aMenus;

        },

        /************************************************************************
         * [Menu Bar Event] Exit
         * **********************************************************************/
        onMENU01_01: function (e) {

            var oCurrWin = REMOTE.getCurrentWindow();
            oCurrWin.close();

        }, // end of onMENU01_01

        /************************************************************************
         * [Menu Bar Event] Reload
         * **********************************************************************/
        onMENU02_01: function () {

            var oCurrWin = REMOTE.getCurrentWindow();
            oCurrWin.webContents.reload();

        }, // end of onMENU02_01

        /************************************************************************
         * [Menu Bar Event] Toggle Developer Tool
         * **********************************************************************/
        onMENU02_02: function () {

            var oCurrWin = REMOTE.getCurrentWindow();
            oCurrWin.webContents.openDevTools();

        }, // end of onMENU02_02

        /************************************************************************
         * [Menu Bar Event] Toggle Full Screen
         * **********************************************************************/
        onMENU02_03: function () {

            var oCurrWin = REMOTE.getCurrentWindow(),
                bIsFull = oCurrWin.isFullScreen();

            oCurrWin.setFullScreen(!bIsFull);

        }, // end of onMENU02_03

        /************************************************************************
         * [Menu Bar Event] New Window
         * **********************************************************************/
        onMENU02_04: function () {

            var sUrl = PATH.join(APPPATH, "index.html"),
                oCurrWin = oAPP.remote.getCurrentWindow(),
                oBrowserOptions = oCurrWin.webContents.browserWindowOptions;

            var oNewWin = new oAPP.remote.BrowserWindow(oBrowserOptions);

            oNewWin.loadURL(sUrl);

            // oNewWin.webContents.openDevTools();

            // 브라우저가 오픈이 다 되면 타는 이벤트
            oNewWin.webContents.on('did-finish-load', function () {

            });

            // 브라우저를 닫을때 타는 이벤트
            oNewWin.on('closed', () => {
                oWin = null;
            });

        },

    };

})();