/* global Ember */
import DS from 'ember-data';

var attr = DS.attr,
    hasMany = DS.hasMany;

export default DS.Model.extend({
  name: attr('string'),
  budgetEntries: hasMany('budgetEntries', { async: true }),
  ancestry: attr('string'),
  parent_id: attr('number'),
  parent: Ember.computed('ancestry', function() {
    get: {
      if (Ember.isPresent(this.get('ancestry'))) {
        return this.store.find('category', this.get('ancestry'));
      } else {
        return null;
      }
    }
  }),
  children: Ember.computed('@each.ancestry', function() {
    var self = this;
    return this.store.filter('category', function(category) {
      return category.get('ancestry') === self.get('id');
    });
  })
});
