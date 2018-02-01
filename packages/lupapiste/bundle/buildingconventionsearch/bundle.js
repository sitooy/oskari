/**
 * @class Oskari.lupapiste.bundle.buildingconventionsearch.FlyoutHelloWorldBundle
 *
 * Definition for bundle. See source for details.
 */
Oskari.clazz.define("Oskari.lupapiste.bundle.buildingconventionsearch.BuildingConventionInstance",
/**
 * @method create called automatically on construction
 * @static
 */ 
function() {

}, {
    "create" : function() {
        var me = this;
        var inst = Oskari.clazz.create("Oskari.lupapiste.bundle.buildingconventionsearch.BuildingConventionInstance");
        return inst;

    },
    "update" : function(manager, bundle, bi, info) {

    }
}, {

    "protocol" : ["Oskari.bundle.Bundle", "Oskari.mapframework.bundle.extension.ExtensionBundle"],
    "source" : {

        "scripts" : [{
            "type" : "text/javascript",
            "src" : "../../../../bundles/lupapiste/buildingconventionsearch/instance.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/lupapiste/buildingconventionsearch/Flyout.js"
        }, {
            "type" : "text/javascript",
            "src" : "../../../../bundles/lupapiste/buildingconventionsearch/Tile.js"
        }],

        "locales" : [{
            "lang" : "fi",
            "type" : "text/javascript",
            "src" : "../../../../bundles/lupapiste/buildingconventionsearch/resources/locale/fi.js"
        }, {
            "lang" : "sv",
            "type" : "text/javascript",
            "src" : "../../../../bundles/lupapiste/buildingconventionsearch/resources/locale/sv.js"
        }, {
            "lang" : "en",
            "type" : "text/javascript",
            "src" : "../../../../bundles/lupapiste/buildingconventionsearch/resources/locale/en.js"
        }]
    },
    "bundle" : {
        "manifest" : {
            "Bundle-Identifier" : "buildingconventionsearch",
            "Bundle-Name" : "buildingconventionsearch",
            "Bundle-Author" : [{
                "Name" : "ev",
                "Organisation" : "",
                "Temporal" : {
                    "Start" : "2009",
                    "End" : "2011"
                },
                "Copyleft" : {
                    "License" : {
                        "License-Name" : "EUPL",
                        "License-Online-Resource" : "http://www.paikkatietoikkuna.fi/license"
                    }
                }
            }],
            "Bundle-Name-Locale" : {
                "fi" : {
                    "Name" : " style-1",
                    "Title" : " style-1"
                },
                "en" : {}
            },
            "Bundle-Version" : "1.0.0",
            "Import-Namespace" : ["Oskari"],
            "Import-Bundle" : {}

        }
    },

    /**
     * @static
     * @property dependencies
     */
    "dependencies" : ["jquery"]

});

Oskari.bundle_manager.installBundleClass("buildingconventionsearch", "Oskari.lupapiste.bundle.buildingconventionsearch.BuildingConventionInstance");
