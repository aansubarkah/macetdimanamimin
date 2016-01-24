/**
 * Created by aan on 14/08/15.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
    session: Ember.inject.service(),
    state: 'all',
    queryParams: [
        'state'
    ],
    isManager: true,
    username: "John Doe",
    page: 1,
    limit: 1,
    init: function() {
        //console.log(this.get('session.session'));
        if(typeof this.get('session.session.content.authenticated.email') !== 'undefined') {
            this.set('username', this.get('session.session.content.authenticated.email'));
        } else {
            //console.log('login');
            this.transitionToRoute('login');
        }
    },
    actions: {
        doRefresh: function () {
            this.get('target.router').refresh();
        },
        invalidateSession: function () {
            this.get('session').invalidate();
            this.transitionToRoute('login');
            this.set('username', 'John Doe');
        }
    }
});
