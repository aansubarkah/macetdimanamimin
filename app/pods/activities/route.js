// to make JSHint happy
/* global moment:false */
/* global Hashids: false */
import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
moment.locale('id');

export default Ember.Route.extend(AuthenticatedRouteMixin, {
    model: function() {
        var query = {};
        return Ember.RSVP.hash({
            //activity: this.store.findAll('activity')
            activity: this.store.query('activity', query)
        });
    },
    setupController: function(controller, model) {
        controller.set('activity', model.activity);

        // data to display as chart
        var headers = [];
        for(var i=6; i>-1;i--) {
            var day = new Date();
            day.setDate(day.getDate()-i);
            headers.push(moment(day).format('dddd, Do MMMM YYYY'));
        }

        var data = [];
        var i = 0;
        model.activity.forEach(function(item) {
            var dataset = [];
            item.get('value.weekly').forEach(function(it) {
                dataset.push(it.val);
            });
            // create rgb color
            var r = Math.floor(Math.random() * 256);
            var g = Math.floor(Math.random() * 256);
            var b = Math.floor(Math.random() * 256);
            var fillColor = 'rgba(' + r + ',' + g + ',' + b +',0.2)';
            var strokeColor = 'rgba(' + r + ',' + g + ',' + b +',0.2)';

            var datum = {
                label: item.get('name'),
                fillColor: fillColor,
                strokeColor: strokeColor,
                pointColor: strokeColor,
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: strokeColor,
                data: dataset
            };
            data.push(datum);
            i++;
        });
        var dataForChart = {
            labels: headers,
            datasets: data
        };
        controller.set('dataForChart', dataForChart);
    }
});
