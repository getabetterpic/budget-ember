import DS from 'ember-data';

var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  amount: attr('number'),
  date: attr('date'),
  budget: belongsTo('budget'),
  category: belongsTo('category')
});
