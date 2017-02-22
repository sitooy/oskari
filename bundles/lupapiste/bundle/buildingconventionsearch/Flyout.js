/**
 * @class Oskari.lupapiste.bundle.buildingconventionsearch.Flyout
 */
Oskari.clazz.define('Oskari.lupapiste.bundle.buildingconventionsearch.Flyout',

/**
 * @method create called automatically on construction
 * @static
 * @param {Oskari.lupapiste.bundle.buildingconventionsearch.FlyoutHelloWorldBundleInstance}
 *          instance reference to component that created the flyout
 */
function(instance) {
  this.instance = instance;
  this.container = null;
  this.state = null;
  this.template = null;
  me = this;
}, {
  /**
   * @method getName
   * @return {String} the name for the component
   */
  getName : function() {
    return 'Oskari.lupapiste.bundle.buildingconventionsearch.Flyout';
  },
  /**
   * @method setEl
   * @param {Object}
   *          el reference to the container in browser
   * @param {Number}
   *          width container size(?) - not used
   * @param {Number}
   *          height container size(?) - not used
   * 
   * Interface method implementation
   */
  setEl : function(el, width, height) {
    this.container = el[0];
    if (!jQuery(this.container).hasClass('buildingconventionsearch')) {
      jQuery(this.container).addClass('buildingconventionsearch');
    }
  },
  /**
   * @method startPlugin
   * 
   * Interface method implementation, assigns the HTML templates that will be
   * used to create the UI
   */
  startPlugin : function() {
    this.template = jQuery('<div></div>');
  },
  /**
   * @method stopPlugin
   * 
   * Interface method implementation, does nothing atm
   */
  stopPlugin : function() {

  },
  /**
   * @method getTitle
   * @return {String} localized text for the title of the flyout
   */
  getTitle : function() {
    return this.instance.getLocalization('flyouttitle');
  },
  /**
   * @method getDescription
   * @return {String} localized text for the description of the flyout
   */
  getDescription : function() {
    return this.instance.getLocalization('desc');
  },
  /**
   * @method getOptions Interface method implementation, does nothing atm
   */
  getOptions : function() {

  },
  /**
   * @method setState
   * @param {Object}
   *          state state that this component should use Interface method
   *          implementation, does nothing atm
   */
  setState : function(state) {
    this.state = state;
  },

  /**
   * @method createUI Creates the UI for a fresh start
   */
  createUI : function() {
    var sandbox = me.instance.getSandbox();

    // clear container
    var cel = jQuery(this.container);
    cel.empty();
    var content = this.template.clone();
    content.append(this.instance.getLocalization('flyout').instructions);
    cel.append(content);
  },
  
  search : function(x, y) {
    var container = jQuery(this.container);
    container.empty();
    
    this.searchBuildingConvention(x,y);
  },
  
  searchBuildingConvention : function(x, y) {
		var me = this;
	    var container = jQuery(this.container);
	    var searchContainer = jQuery('<div id="buildingConvention"><h4>' + this.instance.getLocalization('flyout').title + '</h4></div>');
	    container.append(searchContainer);
	    var cel = jQuery('<div id="buildingConventionResults"></div>');
	    searchContainer.append(cel);
	    cel.append(this.instance.getLocalization('flyout').searching + "</br>");
	    cel.append('<img src="' + Oskari.app.appConfig.lupakartta.conf.ajaxloader + '" />');
	    jQuery.ajax({
	      url : Oskari.app.appConfig.lupakartta.conf.ajaxurl + "/plan-urls-by-point",
	      data : {
	        "x" : x,
	        "y" : y,
	        "municipality" : Oskari.app.appConfig.lupakartta.conf.municipality,
	        "type" : "rakennustapaohje"
	      },
	      dataType : "json",
	      success : function(data) {
	        cel.empty();
	        var content = "";
	        if (data.length > 0) {
	          content = content + "<table>";
	          content = content + "<tr><td>" + me.instance.getLocalization('flyout').id + "</td><td>" + me.instance.getLocalization('flyout').link + "</td></tr>";
	          for ( var item in data) {
	            content = content + "<tr>";
	            content = content + "<td>" + data[item].kaavanro + "</td>";
	            content = content + "<td><a target='_blank' href='" + data[item].linkki + "'>Pdf</a></td>";
	            content = content + "</tr>";
	          }
	          content = content + "</table>";
	          cel.append(content);
	        } else {
	          cel.empty();
	          cel.append(me.instance.getLocalization('flyout').notfound);
	          cel.append("</br>");
	          var button = jQuery("<button/>");
	          button.text(me.instance.getLocalization('flyout').newsearch).click(function() {
	            me.createUI();
	            me.instance.isActive = true;
	          });
	          cel.append(button);
	        }
	      },
	      error : function(err) {
	        cel.empty();
	        cel.append(me.instance.getLocalization('flyout').error);
	        cel.append("</br>");
	        var button = jQuery("<button/>");
	        button.text(me.instance.getLocalization('flyout').newsearch).click(function() {
	          me.createUI();
	          me.instance.isActive = true;
	        });
	        cel.append(button);
	      }
	    });
	  }
}, {
  /**
   * @property {String[]} protocol
   * @static
   */
  'protocol' : [ 'Oskari.userinterface.Flyout' ]
});
