import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return this.store.find('budgetEntry');
  },
  setupController(controller, model) {
    controller.set('model', model);
  }
});
