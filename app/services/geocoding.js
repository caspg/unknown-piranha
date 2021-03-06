import Ember from 'ember';

export default Ember.Service.extend({

  findCoords: function(address) {
    var geocoder = new google.maps.Geocoder();
    return new Promise(function(resolve, reject) {
      geocoder.geocode({ 'address': address }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var coordsObj = results[0].geometry.location;
          var coords = {"lat": coordsObj.lat(), "lng": coordsObj.lng()};
          resolve(coords);
        } else {
          var error = ("Geocode was not successful for the following reason: " + status);
          reject(error);
        }
      });
    });
  },

  findAddress: function(lat, lng) {
    var latLng = new google.maps.LatLng(lat, lng);
    var geocoder = new google.maps.Geocoder();
    return new Promise(function(resolve, reject) {
      geocoder.geocode({ 'latLng': latLng }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          var address = results[0].formatted_address;
          resolve(address);
        } else {
          var error = ("Geocode was not successful for the following reason: " + status);
          reject(error);
        }
      });
    });
  }
});
