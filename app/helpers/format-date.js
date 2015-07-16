import Ember from 'ember';

export function formatDate(params, options) {
  var date = options.date
  if (date) {
    return date.format(options.format);
  }
}

export default Ember.Helper.helper(formatDate);
