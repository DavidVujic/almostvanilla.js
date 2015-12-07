/*global QUnit, almostvanilla */

(function () {
	var div;

	QUnit.module('API tests', {
		setup: function () {
			div = window.document.createElement('div');
		},
		teardown: function () {
			div = null;
		}
	});

	QUnit.test('has attribute', function (assert) {
		div.id = 'my-id';

		var result = almostvanilla.hasAttribute(div, 'id');

		assert.equal(result, true);
	});

	QUnit.test('has not attribute', function (assert) {
		var result = almostvanilla.hasAttribute(div, 'id');

		assert.equal(result, false);
	});
}());
