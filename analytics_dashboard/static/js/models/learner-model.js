define(['backbone', 'underscore'], function (Backbone, _) {
    'use strict';

    var LearnerModel = Backbone.Model.extend({
        defaults: {
            name: '',
            username: '',
            email: '',
            account_url: '',
            enrollment_mode: '',
            enrollment_date: null,
            cohort: null,
            segments: [],
            engagements: {},
            last_updated: null
        },

        idAttribute: 'username',

        initialize: function (attributes, options) {
            options = _.isUndefined(options) ? {} : options;
            this.course_id = _.isUndefined(options.course_id) ? null : options.course_id;
        },

        url: function () {
            return Backbone.Model.prototype.url.call(this) + '?course_id=' + this.course_id;
        },

        /**
         * Converts the ISO 8601 date strings to JavaScript Date
         * objects.
         */
        parse: function (response) {
            var parsedResponse = response;
            parsedResponse.enrollment_date = response.enrollment_date ? new Date(response.enrollment_date) : null;
            parsedResponse.last_updated = response.last_updated ? new Date(response.last_updated) : null;
            return parsedResponse;
        }
    });

    return LearnerModel;
});
