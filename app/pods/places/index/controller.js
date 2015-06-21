import Ember from 'ember';

export default Ember.Controller.extend({
  needs: "places/index/new",
  isNewForm: false,
  isNotAuthenticated: Ember.computed.not('session.isAuthenticated'),
  zoom: 14,
  centerLat: 52.2333,
  centerLng: 21.0167,
  geocoding: Ember.inject.service(),

  markers: Ember.computed("isNewForm", "controllers.places/index/new.picker", function() {
    if (this.get("isNewForm")) {
      var picker = this.controllerFor('places.index.new').get('picker');
      return Ember.A([picker])
    } else {
      return this.get("model");
    }
  }),

  _findCoordsFn: function() {
    var address = this.get("searchArea");
    this.get("geocoding").findCoords(address).then((data) => {
      this.setProperties({ "centerLat": data.lat, "centerLng": data.lng, "zoom": 13 });
      return true;
    }, function(reason) {
      console.log(reason);
      return true;
    });
  },

  addressEntered: Ember.observer("searchArea", function() {
    Ember.run.debounce(this, this._findCoordsFn, 700);
  }),
});
