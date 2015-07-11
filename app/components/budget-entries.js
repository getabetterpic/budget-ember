import Ember from 'ember';

export default Ember.Component.extend({
  categories: undefined,
  rootCategories: Ember.computed('model.@each.ancestry', function() {
    return this.get('store').filter('category', function(category) {
      return category.get('ancestry') === null;
    });
  }),
  didInsertElement() {
    this.set('categories', this.get('store').find('category'));
  }
});
