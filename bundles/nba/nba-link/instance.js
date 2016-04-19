﻿/**
 * @class Oskari.nba.bundle.nba-link.NbaLinkBundleInstance
 */
Oskari.clazz.define('Oskari.nba.bundle.nba-link.NbaLinkBundleInstance',
/**
 * @method create called automatically on construction
 * @static
 */
function () {
    // Best practice is to initialize instance variables here.
    //this.myVar = undefined;
}, {
    /**
     * @static
     * @property __name
     */
    __name: 'nba-link',
    /**
     * Module protocol method
     *
     * @method getName
     */
    getName: function () {
        return this.__name;
    },
    eventHandlers: {
    },
    /**
     * DefaultExtension method for doing stuff after the bundle has started.
     * 
     * @method afterStart
     */
    afterStart: function (sandbox) {
        //debugger;
        //var conf = this.conf;
        //TODO create request and request handler for other bundles to getting external service url and make link to external service configurable
        var me = this,
            registerService = Oskari.clazz.create('Oskari.nba.bundle.nba-link.service.RegisterService', this), //Create the register search service
            action = me._getParameterValueFromUrl("action"),
            registryName = null,
            registryItemId = null;

        if (action == "showRegistryItem") {
            var params = {
                'registryItemId': me._getParameterValueFromUrl("id"),
                'registerName': me._getParameterValueFromUrl("registry")
            };

            if (params.registryItemId != null && params.registerName != null) {
                registerService.getRegistryItem(params,
                    function (result) {
                        me._showRegistryItemOnMap(result);
                    },
                    function (error) {
                        //TODO handle error
                    });
            } else {
                //TODO show error message
            }
        }
    },

    _getParameterValueFromUrl: function (paramName) {
        var regexS,
            regex,
            results;

        paramName = paramName.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        regexS = "[\\?&]" + paramName + "=([^&#]*)";
        regex = new RegExp(regexS);
        results = regex.exec(window.location.href);

        if (results != null) {
            return results[1];
        }

        return null;
    },

    _showRegistryItemOnMap: function (data) {
        //debugger;
        //TODO probably need to be converted to current coordinate system
        var me = this,
            x = data.coordinateX,
            y = data.coordinateY,
            zoomLevel = 7;

        //showing layer for the register
        var layer = me.sandbox.findMapLayerFromAllAvailable(data.mapLayerID);
        if (layer != null) {
            me.sandbox.postRequestByName('AddMapLayerRequest', [data.mapLayerID, true]);
        } else {
            //TODO show error
        }

        //TODO change way of loading multiple layers for one register
        if (data.mapLayerID2 != null && data.mapLayerID2 != '') {
            var layer2 = me.sandbox.findMapLayerFromAllAvailable(data.mapLayerID2);
            if (layer2 != null) {
                me.sandbox.postRequestByName('AddMapLayerRequest', [data.mapLayerID2, true]);
            } else {
                //TODO show error
            }
        }

        //FIXME
        me.getSandbox().postRequestByName('MapMoveRequest', [x, y, zoomLevel]);

        //create infobox
        //TODO probably need to be converted to current coordinate system
        var lonlat = new OpenLayers.LonLat(x, y),
        //var lonlat = new OpenLayers.LonLat(24.6603626, 60.2241869),
            infoBoxContent = {
                html: me._getInfoBoxHtml(data),
                actions: {}
            },
            popupId = "nba-register-search-result";

        //TODO make localization 'Kohdetiedot'
        me.getSandbox().postRequestByName('InfoBox.ShowInfoBoxRequest', [popupId, "Register item details", [infoBoxContent], lonlat, true]);
    },

    _getInfoBoxHtml: function (result) {
        //TODO make localization
        //TODO fix styling and layout
        var template = '<h3>fid: ' + result.id + '</h3>' +
                        //'<h3>Shape: ' + result.id + '</h3>' +
                        '<h3>Mjtunnus: ' + result.id + '</h3>' +
                        '<h3>Kohdenimi: ' + result.desc + '</h3>' +
                        '<h3>Rekisteritiedot: <a href="' + result.nbaUrl + '" target="_blank">Linkki rekisteritietoihin</a></h3>';
        return template;
    },

}, {
    "extend": ["Oskari.userinterface.extension.DefaultExtension"]
});