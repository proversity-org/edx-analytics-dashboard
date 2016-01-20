define([
    'jquery',
    'marionette',
    'underscore',
    'models/learner-model',
    'collections/learner-collection',
    'views/data-table-view'
], function ($, Marionette, _, LearnerModel, LearnerCollection, DataTableView) {
    'use strict';

    var LearnersApp = Marionette.Application.extend({
        /**
         * Initializes the learner analytics app.
         *
         * @param options specifies the following values:
         * - course_id (string) required - the course id for this
         *   learner app
         * - containerSelector (string) required - the CSS selector
         *   for the HTML element that this app should attach to
         * - learnerListJson (Object) optional - an Object
         *   representing an initial server response from the Learner
         *   List endpoint used for pre-populating the app's
         *   LearnerCollection.  If not provided, the data is fetched
         *   asynchronously before app initialization.
         */
        initialize: function (options) {
            this.course_id = options.course_id;
            this.containerSelector = options.containerSelector;
            this.learnerListJson = options.learnerListJson || null;
            this.learnerListUrl = options.learnerListUrl;
        },

        onBeforeStart: function () {
            this.learnerCollection = new LearnerCollection(this.learnerListJson, {
                url: this.learnerListUrl,
                course_id: this.course_id,
                parse: this.learnerListJson ? true : false
            });
            if (!this.learnerListJson) {
                this.learnerCollection.setPage(1);
            }
        },

        onStart: function () {
            // TODO: remove this temporary UI with AN-6205.
            var LearnerView = Marionette.ItemView.extend({
                template: _.template(
                    '<div>' +
                        '| <%- name %> | ' +
                        '<%- username %> |' +
                        '</div>'
                )
            });

            var LearnersView = Marionette.CollectionView.extend({
                childView: LearnerView
            });

            new LearnersView({
                collection: this.learnerCollection,
                el: $(this.containerSelector)
            }).render();
            window.learnerCollection = this.learnerCollection;

            this.djStuff(this.learnerCollection);
        },

        djStuff: function(learnerCollection) {
            var page = this.page,
                courseModel = page.models.courseModel,
                learnerData,
                tableColumns;

            tableColumns = [
                {key: 'name', title: gettext('Name')},
                {key: 'username', title: gettext('Username')},
                {key: 'problems_attempted', title: gettext('Problems Attempted'), type: 'number', className: 'text-right'}
            ];

            learnerData = _(learnerCollection.models).map(function(learner) {
                var data = {};
                _(['name', 'username', 'problems_attempted']).forEach(function(field) {
                    data[field] = learner.get(field);
                    if (!data[field]) {
                        data[field] = learner.get('engagements')[field];
                    }

                });
                return data;
            });

            courseModel.set('learners', learnerData);

            new DataTableView({
                el: '[data-role=learners-table]',
                model: courseModel,
                modelAttribute: 'learners',
                columns: tableColumns
                //sorting: ['-count'],
                //replaceZero: '-'
            });
        }
    });

    return LearnersApp;
});
