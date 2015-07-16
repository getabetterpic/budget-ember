import { moduleForModel, test } from 'ember-qunit';
import Ember from 'ember';

moduleForModel('category', 'Unit | Model | category', {
  // Specify the other units that are required for this test.
  needs: ['model:budgetEntry']
});

test('parent correctly finds the category\'s parent', function(assert) {
  var parent = this.subject({
    name: 'Parent',
    ancestry: null
  });
  var child = this.subject({
    name: 'Child',
    ancestry: parent.get('id')
  });

  assert.equal(child.get('ancestry'), parent.get('id'));
  assert.equal(child.get('parent').get('name'), parent.get('name'));
});
