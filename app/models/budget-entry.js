import DS from 'ember-data';

var attr = DS.attr,
    belongsTo = DS.belongsTo;

export default DS.Model.extend({
  amount: attr('number'),
  date: attr('date'),
  //budget: belongsTo('budget'),
  category: belongsTo('category', { async: true })
});
