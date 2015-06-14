import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.createRecord('user');
  },

  actions: {
    signIn: function() {
      var model = this.modelFor(this.routeName);
      this.get('session').authenticate('authenticator:firebase', {
        'email': model.get('email'),
        'password': model.get('password')
      }).then(() => {
        this.transitionTo('places.index');
      });
    }
  }
});