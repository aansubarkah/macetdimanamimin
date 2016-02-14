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
        for(var i=6; i>0;i--) {
            var day = new Date();
            day.setDate(day.getDate()-i);
            headers.push(moment(day).format('dddd, Do MMMM YYYY'));
        }
        var fillColors = [
            'rgba(127, 191, 63, 0.2)',
            'rgba(151, 187, 205, 0.2)',
            'rgba(191, 63, 127, 0.2)'
        ];
        var strokeColors = [
            'rgba(127, 191, 63, 1)',
            'rgba(151, 187, 205, 1)',
            'rgba(191, 63, 127, 1)'
        ];

        var data = [];
        var i = 0;
        model.activity.forEach(function(item) {
            var dataset = [];
            item.get('value.weekly').forEach(function(it) {
                dataset.push(it.val);
            });
            var datum = {
                label: item.get('name'),
                fillColor: fillColors[i],
                strokeColor: strokeColors[i],
                pointColor: strokeColors[i],
                pointStrokeColor: '#fff',
                pointHighlightFill: '#fff',
                pointHighlightStroke: strokeColors[i],
                data: dataset
            };
            data.push(datum);
            i++;
        });
        var dataForChart = {
            labels: headers,
            datasets: data
            /*datasets: [{
                label: "Daily Report",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: datum
            }]*/
        };
        controller.set('dataForChart', dataForChart);
    }
});
