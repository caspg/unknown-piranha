import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    // action which responds on google marker dragend event
    dragend: function() {
      var lat = this.get("controllers.places/index/new.picker.lat");
      var lng = this.get("controllers.places/index/new.picker.lng");
      this.get("geocoding").findAddress(lat, lng).then((data) => {
        this.controllerFor("places.index.new").set("model.address", data);
      });
      return false;
    },
    focusOnPlace: function(place) {
      this.setProperties({
        "centerLat": place.get("lat"),
        "centerLng": place.get("lng"),
        "zoom": 16
      });
      var markers = this.get("markers");
      markers.setEach("isInfoWindowVisible", false);
      markers.findBy("id", place.id).set("isInfoWindowVisible", true);
    }
  },

  needs: "places/index/new",
  isNewForm: false,
  isNotAuthenticated: Ember.computed.not('session.isAuthenticated'),
  zoom: 12,
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
      return false;
    }, function(reason) {
      console.log(reason);
      return false;
    });
  },

  addressEntered: Ember.observer("searchArea", function() {
    Ember.run.debounce(this, this._findCoordsFn, 700);
  }),
});
