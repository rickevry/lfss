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