module.exports = (function () {
    "use strict";

    var REMOTE = require('electron').remote;

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

        getMenuBarList : function(){

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
                        click: this.onMENU02_02
                    }, {
                        key: "MENU02_03",
                        label: "Toggle Full Screen",
                        accelerator: "F11",
                        click: this.onMENU02_03
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

    };

})();