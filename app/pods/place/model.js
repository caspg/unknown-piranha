import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend({
  name: DS.attr('string'),
  address: DS.attr('string'),
  description: DS.attr('string'),

  validations: {
    name: { presence: true },
    address: { presence: true },
    description: { presence: true }
  }
});
