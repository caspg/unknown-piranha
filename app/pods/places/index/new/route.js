import Ember from 'ember';
import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function() {
    return this.store.createRecord('place');
  },

  actions: {
    savePlace: function() {
      var model = this.modelFor(this.routeName);
      model.save().then(() => {
        this.notify.success('Place was successfully saved :)');
        this.transitionTo('places.index');
      });
    }
  },

  activate: function() {
    this.controllerFor('places.index').set('isNewForm', true);
  },
  deactivate: function() {
    this.controllerFor('places.index').set('isNewForm', false);

    var model = this.modelFor('places.index.new');
    if (model.get('isNew')) {
      model.destroyRecord();
    }
  }
});
