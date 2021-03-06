import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('users', function() {
    this.route('sign-up');
    this.route('sign-in');
  });
  this.route('places', { path: '/' }, function() {
    this.route('index', { path: '/' }, function() {
      this.route('new');
    });
  });
});

export default Router;
