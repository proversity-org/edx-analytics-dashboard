/**
 * Called for displaying aggregate views.  Each bar is a collection of views.
 */
require(['vendor/domReady!', 'load/init-page'], function (doc, page) {
    'use strict';

    require(['d3', 'underscore', 'views/data-table-view', 'views/stacked-bar-view'],
        function (d3, _, DataTableView, StackedBarView) {
            var model = page.models.courseModel,
                graphViewColumns = [
                    {
                        key: 'num_unique_views',
                        percent_key: 'unique_percent',
                        title: gettext('Unique'),
                        className: 'text-right',
                        type: 'number',
                        fractionDigits: 1,
                        color: '#58BC4B'
                    },
                    {
                        key: 'repeat_views',
                        percent_key: 'repeat_percent',
                        title: gettext('Repeat'),
                        className: 'text-right',
                        type: 'number',
                        fractionDigits: 1,
                        color: '#9B9B9B'
                    }
                ],
                tableColumns = [
                    {key: 'index', title: gettext('Order'), type: 'number', className: 'text-right'},
                    {key: 'name', title: model.get('contentTableHeading'), type: 'hasNull'},
                    {key: 'num_views', title: gettext('Total Views'), type: 'number', className: 'text-right'}
                ];

            tableColumns = tableColumns.concat(graphViewColumns);
            tableColumns.push({
                key: 'unique_percent',
                title: gettext('Unique %'),
                className: 'text-right',
                type: 'percent'
            });

            tableColumns.push({
                key: 'repeat_percent',
                title: gettext('Repeat %'),
                className: 'text-right',
                type: 'percent'
            });

            if (model.get('hasData')) {
                new StackedBarView({
                    el: '#chart-view',
                    model: model,
                    modelAttribute: 'primaryContent',
                    dataType: 'decimal',
                    trends: graphViewColumns
                });
            }

            new DataTableView({
                el: '[data-role=data-table]',
                model: model,
                modelAttribute: 'primaryContent',
                columns: tableColumns,
                sorting: ['index'],
                replaceZero: '-'
            });
        });
});
