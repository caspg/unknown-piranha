import DS from 'ember-data';
import EmberValidations from 'ember-validations';

export default DS.Model.extend(EmberValidations.Mixin, {
  name: DS.attr('string'),
  address: DS.attr('string'),
  description: DS.attr('string'),
  lat: DS.attr('string'),
  lng: DS.attr('string'),

  validations: {
    name: { presence: true },
    address: { presence: true },
    description: { presence: true }
  }
});
