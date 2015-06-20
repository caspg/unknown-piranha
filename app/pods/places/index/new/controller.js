import Ember from 'ember';

export default Ember.Controller.extend({
  picker: Ember.computed(function() {
    return Ember.A([{ lat: 52.2333, lng: 21.0167, isDraggable: true, isInfoWindowVisible: true }]);
  })
});
