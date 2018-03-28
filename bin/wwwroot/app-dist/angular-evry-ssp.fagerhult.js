(function() {
    'use strict';

    angular
        .module('spApi')
        .run(AppTitle);

    // [Style Y091]
    AppTitle.$inject = [];

    function AppTitle() {
        // Set titles
        jQuery('#DeltaPlaceHolderPageTitleInTitleArea').html("Self-Service Portal");
        document.title = "Self-Service Portal";
    }
})();
(function (spApi) {
    "use strict";

    // Always use swedish format for date formatting and validation
    g_wsaLCID = 1053;

    spApi.config = {
        resourceRoot: "https://api.fagerhult.net:4430/app/resources",
        templateRoot: "https://api.fagerhult.net:4430/app/templates",
        imgRoot: "https://api.fagerhult.net:4430/img",
        serviceUrl: "https://api.fagerhult.net:4430/api",
        root: "https://api.fagerhult.net:4430/",
    };

}(window.spApi = window.spApi || {}, jQuery));


(function() {
    'use strict';
    
    angular
        .module('spApi')
        .run(FagerhultRoutingConfig);
    
    // [Style Y091]
    FagerhultRoutingConfig.$inject = ['$state'];

    function FagerhultRoutingConfig($state) {
        var state = $state.get('home');
        state.redirectTo = 'selfservice';
    };
})();