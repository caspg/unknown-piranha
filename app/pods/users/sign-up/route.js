import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';
import Firebase from 'firebase';
import config from '../../../config/environment';
import Ember from 'ember';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  model: function() {
    return this.store.createRecord('user');
  },

  actions: {
    saveUser: function() {
      var model = this.modelFor(this.routeName);
      var ref = new Firebase(config.firebase);
      ref.createUser({
        email: model.get('email'),
        password: model.get('password')
      }, (error, userData) => {
        if (error) {
          this.controller.set('model.email', '').set('model.password', '');
          this.notify.alert(error.message);
        } else {
          this._loginAndRedirect(model);
        }
      });
    }
  },

  _loginAndRedirect(model) {
    this.get('session').authenticate('authenticator:firebase', {
      'email': model.get('email'),
      'password': model.get('password')
    });
  }
});
