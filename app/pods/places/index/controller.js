import Ember from 'ember';

export default Ember.Controller.extend({
  isNewForm: false,
  isNotAuthenticated: Ember.computed.not('session.isAuthenticated'),
  zoom: 14,
  centerLat: 52.2333,
  centerLng: 21.0167,


  markers: Ember.computed("isNewForm", function() {
    if (this.get("isNewForm")) {
      return this.controllerFor('places.index.new').get('picker');
    }
  })
});
