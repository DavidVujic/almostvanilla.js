/*global window:true */
/* exported almostvanilla */

var almostvanilla = (function () {
	'use strict';

	var getBy = function (selector) {
		return window.document.querySelectorAll(selector);
	};

	var triggerEvent = function (eventName, elm) {
		var ev;

		if (document.createEvent) {
			ev = document.createEvent('HTMLEvents');
			ev.initEvent(eventName, true, true);
		} else {
			ev = document.createEventObject();
			ev.eventType = eventName;
		}

		ev.eventName = eventName;

		if (document.createEvent) {
			elm.dispatchEvent(ev);
		} else {
			elm.fireEvent('on' + ev.eventType, ev);
		}
	};

	var getEvent = function (e) {
		if (!e) {
			return window.event;
		}

		return e;
	};

	var getEventTarget = function (e) {
		var evt = getEvent(e);

		if (!e) {
			return evt.srcElement;
		}

		return evt.target;
	};

	var addListenerFor = function (el, eventName, handler) {
		var elmType = el.getAttribute('type');

		if (elmType && elmType === 'hidden') {
			return;
		}

		if (el.addEventListener) {
			el.addEventListener(eventName, handler);
		} else {
			el.attachEvent('on' + eventName, function () {
				handler.call(el);
			});
		}
	};

	var addListenersFor = function (elements, eventName, handler) {
		var i;

		if (!elements) {
			return;
		}

		for (i = 0; i < elements.length; i += 1) {
			addListenerFor(elements[i], eventName, handler);
		}
	};

	var hasAttribute = function (elm, attrName) {
		if (elm.nodeType !== 1) {
			return false;
		}

		if (!elm.getAttribute(attrName)) {
			return false;
		}

		return true;
	};

	var getClosestElement = function (elm, attributeName) {
		var closest = null;
		var parent = elm;

		while (parent !== window.document) {
			if (hasAttribute(parent, attributeName)) {
				closest = parent;
				break;
			}

			parent = parent.parentNode;
		}

		return closest;
	};

	var isArray = function (obj) {
		var func = Object.prototype.toString;
		var expected = func.call([]);

		return func.call(obj) === expected;
	};

	return {
		get: getBy,
		ev: getEvent,
		evTarget: getEventTarget,
		trigger: triggerEvent,
		addListeners: addListenersFor,
		getClosest: getClosestElement,
		isArray: isArray,
		hasAttribute: hasAttribute
	};
}());
