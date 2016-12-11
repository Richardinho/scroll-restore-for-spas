define(function () {

	'use strict';

	var PageManager = function () {

		this.rootEl = document.getElementById('app');
	};

	PageManager.prototype = {

		renderView : function (view) {

			this.rootEl.innerHTML = '';
			this.rootEl.appendChild(view.el);

		}

	};

	return PageManager;

});