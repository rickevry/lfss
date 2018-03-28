require.config({
    paths: {
        'spApi':                'app-dist/angular-evry-ssp.min',
        'spApi-selfservice':    'app-dist/angular-evry-ssp.selfservice.min',
        'spApi-fagerhult':      'app-dist/angular-evry-ssp.fagerhult.min',
        'angular-route':        'libs/angular-route/angular-route.min',
        'angular-resource':     'libs/angular-resource/angular-resource.min',
        'angular-storage':      'libs/a0-angular-storage/dist/angular-storage.min',
        'angular-modal-service':'libs/angular-modal-service/dst/angular-modal-service.min',
        'angular-ui-router':    'libs/angular-ui-router/release/angular-ui-router.min',
        'jquery':               'libs/jquery/dist/jquery.min',
        'jquery-ui':            'libs/jquery-ui/jquery-ui.min',
        'jquery-tooltipster':   'libs/tooltipster/js/jquery.tooltipster.min',
        'kendo':                'js/kendoui-2015.2.805/kendo.all.min',
        'taxonomypickercontrol': ['js/office-dev.pnp.core.taxonomypicker-2.0/taxonomypickercontrol', 'js/office-dev.pnp.core.taxonomypicker-2.0/taxonomypickercontrol_resources'],
    },
    shim: {
        'spApi-selfservice': {
            'deps': ['spApi'],
        },
        'spApi-fagerhult': {
            'deps': ['spApi-selfservice'],
        }
    },
    css: {
        'spApi': ['app-dist/angular-evry-ssp.min.css'],
        'taxonomypickercontrol': ['js/office-dev.pnp.core.taxonomypicker-2.0/taxonomypickercontrol.css'],
        'jquery-tooltipster': ['libs/tooltipster/css/tooltipster.css'],
        'kendo': [
            'js/kendoui-2015.2.805/kendo.default.min.css',
            'js/kendoui-2015.2.805/kendo.rtl.min.css',
            'js/kendoui-2015.2.805/kendo.common.min.css'
        ]
    }
});

if (jQuery) {
    // Register the current jQuery if it exists
    define('jquery', [], function () { return jQuery; });

} else {
    // Load if it's not available
    require.config({
        paths: {
            'jquery': 'libs/jquery/dist/jquery.min',
        },
        shim: {
            'jquery': {
                exports: 'jQuery'
            }
        }
    });
}