// Save the current reference to jQuery. This prevents our extend methods from being overwritten
// in the case of duplicate jQuery.js scripts references (loaded multiple times).
var jQueryClosure = jQuery.noConflict();

// Variables
var spApiInitFile = "ssp.fagerhult.init.js";
var spApiRootElement = "#selfServiceDiv_success";

(jQueryClosure).extend({
    getMatchingScriptTag: function (fileName) {
        // Fetches the script tag that matches this filename
        var scriptUrl = "";
        (jQueryClosure)('script').each(function (i, el) {
            if (el.src.toLowerCase().indexOf(fileName) > -1) {
                var src = el.src;
                scriptUrl = src.substring(0, src.indexOf('.js') + 3);
            }
        });

        return scriptUrl;
    },
    getMultiScripts: function (arr, path) {
        var _arr = jQueryClosure.map(arr, function (scr) {
            return jQueryClosure.getCachedScript((path || "") + scr);
        });

        _arr.push(jQueryClosure.Deferred(function (deferred) {
            jQueryClosure(deferred.resolve);
        }));

        return jQueryClosure.when.apply(jQueryClosure, _arr);
    },
    getQueryParameters: function () {
        var qObj = {};
        var urlSearch = window.location.search;
        if (urlSearch.length > 0) {
            var qPart = urlSearch.substring(1).split('&');
            (jQueryClosure).each(qPart, function (i, item) {
                var splitAgain = item.split('=');
                qObj[splitAgain[0].toLowerCase()] = splitAgain[1];
            });
        }
        return qObj;
    },
    getCachedScript: function (url, options) {

        // Allow user to set any option except for dataType, cache, and url
        options = jQueryClosure.extend(options || {}, {
            dataType: "script",
            cache: true,
            url: url
        });

        // Use $.ajax() since it is more flexible than $.getScript
        // Return the jqXHR object so we can chain callbacks
        return jQueryClosure.ajax(options);
    }
});


(function (ssp) {
    "use strict";

    // Variables
    ssp.scriptFileName = "ssp.fagerhult.init.js";

    ssp.bootstrapper = {
        init: function (elementId, params) {

            var _self = this;

            _self.showLoader();
            _self.loadAllDependencies()
            .then(function () {
                ssp.bootstrapApp(elementId, params, function () {
                    _self.closeLoader();
                });
            });
        },
        loadAllDependencies: function () {

            var deferred = (jQueryClosure).Deferred();
            var _path = ssp.rootPath;

            if (ssp.hasLoadedDependencies) {
                setTimeout(function () {
                    deferred.resolve();
                }, 10);
                return deferred.promise();
            }

            (jQueryClosure).getMultiScripts([
                _path + '/libs/angular/angular.js',
                _path + '/libs/requirejs/require.js'
            ]).done(function () {
                jQueryClosure.getCachedScript(_path + "/app-dist/angular-evry-ssp.bootstrap.js")
                .done(function () {
                    ssp.hasLoadedDependencies = true;
                    deferred.resolve();
                });
            });
            return deferred.promise();
        },
        showLoader: function () {
            SP.SOD.loadMultiple(['strings.js', 'sp.ui.dialog.js'], function() {
                window.waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose(SP.Res.dialogLoading15);
            });
        },
        closeLoader: function () {
            setTimeout(function () {
                if (window.waitDialog != null) {
                    window.waitDialog.close();
                }
            }, 500);
        },
        checkEmail: function () {
            // TODO: Handle emails in SelfService the same way as we do in TeamRooms
            //var qStrings = (jQueryClosure).getQueryParameters();

            //var params = {
            //    email: qStrings["useremail"],
            //    teamRoomGroupId: qStrings["teamroomgroupid"],
            //    teamRoomGroupTitle: qStrings["teamroomgrouptitle"],
            //};

            //if (params.email) {
            //    // Dynamically bootstrap confirm email if the querystrings are present in the URL (clicked on email)
            //    spApi.bootstrapper.init('spApi', '/app-init/popup.html', 'selfservice.confirm-email', '250px', '500px', params);
            //}
        },
        inject: function () {
            // Dynamically inject the HTML for the team rooms dasbhoard
            var selfServiceDiv = (jQueryClosure)('#selfServiceDiv_success');
            if (selfServiceDiv) {
                (jQueryClosure)('#selfServiceDiv_success').load(ssp.rootPath + '/app-init/selfservice_dashboard.html', function (response, status, xhr) {
                    ssp.bootstrapper.init('#selfservice');
                    if (status == "error") {
                        (jQueryClosure)("#selfServiceDiv_error").html("You cannot access Self-Service Portal. If the problem persists, contact your system administrator.");
                    }
                });
            }
        },
    };

    ssp.hasLoadedDependencies = false;
    ssp.rootPath = (jQueryClosure).getMatchingScriptTag(ssp.scriptFileName).replace('/app-init/' + ssp.scriptFileName, ''); // bootstrap using the same path that this file was loaded from 

    (jQueryClosure)(document).ready(function () {
        ssp.bootstrapper.inject();
        //ssp.bootstrapper.checkEmail();
    });
}(window.ssp = window.ssp || {}, jQuery));