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