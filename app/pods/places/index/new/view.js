import Ember from 'ember';

export default Ember.View.extend({
  keyPress: function() {
    if (this.$("#address input").val() !== "") {
      Ember.run.debounce(this, this._findCoordsFn, 700)
    }
  },

  _findCoordsFn: function() {
    this.get("controller").send("findCoords", this.get("controller.model.address"));
  }
});
