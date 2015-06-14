import UnauthenticatedRouteMixin from 'simple-auth/mixins/unauthenticated-route-mixin';
import Ember from 'ember';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  model: function() {
    return this.store.createRecord('user');
  },

  actions: {
    signIn: function() {
      var model = this.modelFor(this.routeName);
      this.get('session').authenticate('authenticator:firebase', {
        'email': model.get('email'),
        'password': model.get('password')
      });
    }
  }
});
