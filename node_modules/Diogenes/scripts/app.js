define(['backbone'], function (Backbone) {

	'use strict';

	var App = function(options) {


		this.router = options.router;
		this.plpController = options.plpController;
		this.pdpController = options.pdpController;


		this.router.route('',        'product-list-page',   this.plpController.handleRequest.bind(this.plpController));
		this.router.route('product', 'product-detail-page', this.pdpController.handleRequest.bind(this.pdpController));




	}

	App.prototype = {

		start : function () {

			console.log('starting app');
			Backbone.history.start();
		}

	};

	App.inject = ['router', 'plpController', 'pdpController'];

	return App;

});