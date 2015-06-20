import Ember from 'ember';

export default Ember.Controller.extend({
  isNotAuthenticated: Ember.computed.not('session.isAuthenticated'),
  zoom: 14,
  centerLat: 52.2333,
  centerLng: 21.0167
});
