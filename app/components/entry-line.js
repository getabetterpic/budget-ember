import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'tr',
  amount: null,
  lineAmount: Ember.computed('category', function() {
    var entry = this.get('entry');
    if (Ember.isPresent(entry)) {
      return entry.get('amount');
    } else {
      return null;
    }
  }),
  entry: Ember.computed('category', function() {
    var self = this;
    var category = this.get('category');
    var entries = category.get('budgetEntries');
    var entry = null;
    entries.forEach(function(item) {
      if (item && moment(item.get('date')).isSame(self.get('selectedDate'), 'month')) {
        entry = item;
      }
    });
    return entry;
  }),
  actions: {
    saveEntry: function(amount) {
      var self = this;
      var entry = this.get('entry');
      if (amount && entry) {
        entry.set('amount', amount);
        entry.save();
      } else {
        entry = self.get('store').createRecord('budgetEntry', {
          amount: parseFloat(amount),
          date: self.get('selectedDate').toDate(),
          category: self.get('category')
        });

        entry.save().then(function(item) {
          console.log(item);
        });
      }
    }
  }
});
