/**
 * @class Oskari.mapframework.bundle.timeseries.TimeseriesToolBundle
 *
 * Definition for bundle. See source for details.
 */
Oskari.clazz.define("Oskari.mapframework.bundle.timeseries.TimeseriesToolBundle", function () {

}, {
    "create": function () {
        var me = this,
            inst = Oskari.clazz.create("Oskari.mapframework.bundle.timeseries.TimeseriesToolBundleInstance");
        return inst;

    },
    "update": function (manager, bundle, bi, info) {

    }
}, {

    "protocol": ["Oskari.bundle.Bundle"],
    "source": {

        "scripts": [
            {
                "type": "text/javascript",
                "src": "../../../../bundles/framework/timeseries/instance.js"
            }, {
                "type": "text/javascript",
                "src": "../../../../bundles/framework/timeseries/TimeseriesControl.js"
            }, {
                "type": "text/javascript",
                "src": "../../../../bundles/framework/timeseries/TimeseriesAnimationPlugin.js"
            }, {
                "type": "text/css",
                "src": "../../../../bundles/framework/timeseries/resources/css/timeseriesplayback.css"
            }, {
                "type": "text/javascript",
                "src": "../../../../bundles/framework/timeseries/request/AnimateLayerRequest.js"
            }, {
                "type": "text/javascript",
                "src": "../../../../bundles/framework/timeseries/request/AnimateLayerRequestHandler.js"
            }, {
                "type": "text/javascript",
                "src": "../../../../bundles/framework/timeseries/event/TimeseriesAnimationEvent.js"
            }, {
                "type": "text/javascript",
                "src" : "../../../../libraries/moment/2.10.6/moment-with-locales.js"
            }],
        "locales": [{
            "lang": "en",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/timeseries/resources/locale/en.js"
        }, {
            "lang": "fi",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/timeseries/resources/locale/fi.js"
        }, {
            "lang": "sv",
            "type": "text/javascript",
            "src": "../../../../bundles/framework/timeseries/resources/locale/sv.js"
        }
        ]
    },
    "bundle": {
        "manifest": {
            "Bundle-Identifier": "timeseries",
            "Bundle-Name": "timeseries",
            "Bundle-Author": [{
                "Name": "mk",
                "Organisation": "nls.fi",
                "Temporal": {
                    "Start": "2016",
                    "End": "2018"
                },
                "Copyleft": {
                    "License": {
                        "License-Name": "EUPL",
                        "License-Online-Resource": "http://www.paikkatietoikkuna.fi/license"
                    }
                }
            }],
            "Bundle-Name-Locale": {
                "fi": {
                    "Name": " style-1",
                    "Title": " style-1"
                },
                "en": {}
            },
            "Bundle-Version": "1.0.0",
            "Import-Namespace": ["Oskari"],
            "Import-Bundle": {}
        }
    },

    /**
     * @static
     * @property dependencies
     */
    "dependencies": ["jquery"]

});

Oskari.bundle_manager.installBundleClass("timeseries",
    "Oskari.mapframework.bundle.timeseries.TimeseriesToolBundle");
