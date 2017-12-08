/**
 * @class Oskari.userinterface.component.Grid
 *
 * Includes selection functionalities of Oskari.userinterface.component.Grid
 */
Oskari.clazz.category(
    'Oskari.userinterface.component.Grid',
    'selection',
    {
        selectionListeners: [],
        visibleColumnSelector: null,
        showColumnSelector: false,
        /**
         * @method selectColumn
         * Sets "selected" class to the column header
         * @param {String} value id for the column to be selected
         */
        selectColumn: function (value) {
            // set selectedColumn in either case so render will use it immediately
            this.__selectedColumn = value;

            if(!this.table) {
                return;
            }
            // remove selection from headers
            this.table.find('th').removeClass('selected');
            // add selection to the one specified
            var selected = this.table.find('th.' + this.__getHeaderClass(value));
            selected.addClass('selected');

            this._selectActivePage();
        },
        /**
         * @method select
         * Tries to find an object from #getDataModel() using the the id given
         * as parameter "value".
         * Oskari.mapframework.bundle.featuredata.domain.GridModel.getIdField()
         * is used to determine the field which value is compared against.
         * If found, selects the corresponding row in the grid.
         *
         * @param {String} value id for the data to be selected
         * @param {Boolean} keepPrevious
         * True to keep previous selection, false to clear before selecting
         * @param {Object} scrollableElement If element defined then scroll grid to selected row. If scrollableELment is null then not scroll.
         */
        select: function (value, keepPrevious, scrollableElement) {
            var me = this;
            if(!me.model) {
                return;
            }
            var key = me.model.getIdField(),
                dataArray = this.model.getData(),
                index,
                rows,
                data;

            for (index = 0; index < dataArray.length; index += 1) {
                data = dataArray[index];
                if (data[key] === value) {
                    // found
                    break;
                }
            }
            rows = this.table.find('tbody tr');
            if (keepPrevious !== true) {
                rows.removeClass('selected');
            }
            jQuery(rows[index]).addClass('selected');

            // Move selected rows top if configured
            if (me.lastSort && me.sortOptions.moveSelectedRowsTop) {
                // sort with last know sort when updating data
                me.sortBy(me.lastSort.attr, me.lastSort.descending);
            }

            if(scrollableElement) {
                scrollableElement.scrollTop(0);
                var row = scrollableElement.find('tr[data-id="'+value+'"]');
                if(row.length > 0) {
                    scrollableElement.scrollTop(row.position().top);
                }
            }
        },
        /**
         * @method removeSelections
         */
        removeSelections: function () {
            var rows = this.table.find('tbody tr');

            rows.removeClass('selected');
        },

        /**
         * @method addSelectionListener
         * The callback function will receive reference to the grid in question
         * as first parameter and the id for the selected data as second
         * parameter:
         * function({Oskari.userinterface.component.Grid} grid, {String} dataId)
         *
         * @param {function} pCallback
         * Callback to call when a row has been selected
         *
         */
        addSelectionListener: function (pCallback) {
            this.selectionListeners.push(pCallback);
        },

        /**
         * @method getSelection
         * Returns current selection visible on grid.
         *
         * @return {Object[]}
         * Subset of #getDataModel() that is currently selected in grid
         */
        getSelection: function () {
            var dataArray = this.model.getData(),
                selection = [],
                rows = this.table.find('tbody tr'),
                i,
                row;

            for (i = 0; i < rows.length; i += 1) {
                row = jQuery(rows[i]);
                if (row.hasClass('selected')) {
                    selection.push(dataArray[i]);
                }
            }
            return selection;
        },

        /**
         * Move selected rows on the top
         * @method @public moveSelectedRowsTop
         * @param {Boolean} move is wanted move selected rows on the top of grid?
         */
        moveSelectedRowsTop: function(move){
            var me = this;
            me.sortOptions.moveSelectedRowsTop = !!move;

            // If there is sort then keep rows order when selected keep selected rows on the top
            if(me._getSelectedRows().values && me._getSelectedRows().values.length > 0 && me.lastSort) {
                me.sortBy(me.lastSort.attr, me.lastSort.descending);
            }
            // Otherwise do only moving selected rows to top
            else {
                me._moveSelectedRowsTop();
            }
        },

        /**
         * @private @method _dataSelected
         * Notifies all selection listeners about selected data.
         *
         * @param {String} dataId id for the selected data
         */
        _dataSelected: function (dataId) {
            var i;

            for (i = 0; i < this.selectionListeners.length; i += 1) {
                this.selectionListeners[i](this, dataId);
            }
        },

        /**
         * Gets selected rows elements and values
         * @method  @private _getSelectedRows
         * @return {Object} selected elements and values {elements:[],values:[]}
         */
        _getSelectedRows: function(){
            var me = this;
            var selected = {
                elements: [],
                values : []
            };
            if(me.table){
                me.table.find('tr.selected').each(function(){
                    var el = jQuery(this);
                    selected.elements.push(el);
                    selected.values.push(el.attr('data-id'));
                });
            }
            return selected;
        },

        /**
         * Move selected rows to top of grid
         * @method  @private _moveSelectedRowsTop
         */
        _moveSelectedRowsTop: function(){
            var me = this;
            if(me.sortOptions.moveSelectedRowsTop) {
                var selected = me._getSelectedRows();
                var moveRow = function(rowEl) {
                    me.table.prepend(rowEl);
                };
                selected.elements.reverse().forEach(function(el){
                    moveRow(el);
                });

                // Also sort model data
                var idField = me.model.getIdField();
                var data = [];
                var moveData = function(item){
                    if(selected.values.indexOf(item[idField]) > -1) {
                        data.unshift(item);
                    } else {
                        data.push(item);
                    }
                };
                me.model.getData().forEach(function(item){
                    moveData(item);
                });

                me.model.data = data;
            }
        }
    }
);