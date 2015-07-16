import Ember from 'ember';

export default Ember.Component.extend({
  categories: undefined,
  currentDate: moment(),
  selectedDate: undefined,
  rootCategories: Ember.computed('model.@each.category', function() {
    return this.get('store').filter('category', function(category) {
      return category.get('ancestry') === null;
    });
  }),
  budgetEntries: Ember.computed('model.@each.category', 'selectedDate', function() {
    var selectedDate = this.get('selectedDate');
    console.log(selectedDate);
    var entries = this.get('store').filter('budgetEntry', function(entry) {
      return moment(entry.get('date')).isSame(selectedDate, 'month');
    });
    return entries;
  }),
  entryForCategory: Ember.computed('budgetEntries.@each.category', 'selectedDate', function(category) {
    var self = this;
    var currentEntry = null;
    this.get('budgetEntries').forEach(function(entry) {
      if (
        moment(entry.get('date')).isSame(self.get('selectedDate'), 'month') &&
        entry.get('category') === category.get('name')
      ) {
        currentEntry = entry;
      }
    });
    return currentEntry;
  }),
  didInsertElement() {
    this.set('categories', this.get('store').find('category'));
    this.set('selectedDate', moment());
  },
  actions: {
    nextMonth() {
      var currentSelected = this.get('selectedDate');
      var newSelected = currentSelected.add('1', 'months');
      this.set('selectedDate', newSelected);
      console.log(this.get('selectedDate').format('MMMM'));
    },
    previousMonth() {
      var currentSelected = this.get('selectedDate');
      var newSelected = currentSelected.subtract('1', 'months');
      this.set('selectedDate', newSelected);
    }
  }
});
