import Ember from 'ember';

export default Ember.Controller.extend({
  needs: "places/index",
  picker: Ember.computed("controllers.places/index.isNewForm", function() {
    var centerLat = this.get("controllers.places/index.centerLat");
    var centerLng = this.get("controllers.places/index.centerLng");
    return { lat: centerLat, lng: centerLng, isDraggable: true };
  }),

  geocoding: Ember.inject.service(),

  actions: {
    findCoords: function(address) {
      this.get("geocoding").findCoords(address).then((data) => {
        this.setProperties({ "picker.lat": data.lat, "picker.lng": data.lng });
        this.controllerFor("places.index").setProperties({
          "centerLat": data.lat, "centerLng": data.lng, "zoom": 17
        });
        return true;
      }, function(reason) {
        console.log(reason);
        return true;
      });
    }
  },

  _findCoordsFn: function() {
    this.send("findCoords", this.get("model.address"));
  },

  addressEntered: Ember.observer("model.address", function() {
    Ember.run.debounce(this, this._findCoordsFn, 700)
  }),
});
