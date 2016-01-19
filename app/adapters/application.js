/**
 * Created by aan on 14/08/15.
 */
import Ember from 'ember';
import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import config from '../config/environment';

export default DS.RESTAdapter.extend(DataAdapterMixin, {
	session: Ember.inject.service('session'),
	authorizer: 'authorizer:token',
	//headers: Ember.computed('session', function () {
	//	return {
	//	};
	//}),
	shouldReloadAll: function () {
		return false;
	},
	shouldBackgroundReloadRecord: function () {
		return false;
	},
    host: config.apiURL,
	/*ajax: function (url, method, hash) {
		hash = hash || {};
		hash.crossDomain = true;
		hash.xhrFields = {withCredentials: false};
		return this._super(url, method, hash);
	}*/
});
