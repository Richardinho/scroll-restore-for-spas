define(function () {

	'use strict';

	var PlpController = function (options) {

		this.plpView = options.productListView;
		this.pageManager = options.pageManager;
	}

	PlpController.prototype = {

		handleRequest : function () {

			this.pageManager.renderView(this.plpView.render());
		}

	};

	PlpController.inject = ['productListView', 'pageManager'];

	return PlpController;

});