define(function () {

	'use strict';

	var PdpController = function (options) {

		this.pdpView = options.productDetailView;
		this.pageManager = options.pageManager;
	}

	PdpController.prototype = {

		handleRequest : function () {
			this.pageManager.renderView(this.pdpView.render());
		}

	};

	PdpController.inject = ['productDetailView', 'pageManager'];

	return PdpController;

});