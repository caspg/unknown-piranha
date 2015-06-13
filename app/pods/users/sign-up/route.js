import Firebase from 'firebase';
import config from '../../../config/environment';
import Ember from 'ember';

export default Ember.Route.extend({
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
      }, function(error, userData) {
        if (error) {
          console.log('Error createing user:', error);
        } else {
          console.log('Successfully created user account with uid:', userData.uid);
        }
      });
    }
  }
});
