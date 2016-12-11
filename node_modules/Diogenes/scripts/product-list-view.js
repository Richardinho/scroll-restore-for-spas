define([
	'backbone'
	,'underscore'
], function (
	Backbone
	,_
) {

	'use strict';

	var ProductListView = Backbone.View.extend({

		initialize : function (options) {

			this.dataService = options.dataService;
			this.fooView = options.fooView;
			this.handleInternalLink = options.handleInternalLink;

		},

		events :  {
			'click [data-internal]' : 'clickOnInternalLink'
		},

		clickOnInternalLink : function (event) {
			this.handleInternalLink(event);
		},

		Template : _.template(document.getElementById('plp-template').innerHTML),

		render : function () {

			this.el.innerHTML = this.Template({});
			this.el.querySelector('#foo-placeholder').appendChild(this.fooView.render().el);
			return this;

		}
	});

	ProductListView.inject = ['dataService', 'fooView', 'handleInternalLink'];

	return ProductListView;

});