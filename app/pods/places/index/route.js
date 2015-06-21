import Ember from 'ember';

export default Ember.Route.extend({
  model: function() {
    return this.store.findAll('place');
  },

  setupController: function(controller, model) {
    this._super(controller, model);
    this.controllerFor('places.index').set("model", model);
  }
});
