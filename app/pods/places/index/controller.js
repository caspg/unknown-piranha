import Ember from 'ember';

export default Ember.Controller.extend({
  isNotAuthenticated: Ember.computed.not('session.isAuthenticated'),
  isNewForm: false,
  hideButton: Ember.computed.or('isNewForm', 'isNotAuthenticated')
});
