define([
	'backbone'
	,'underscore'
], function (
	Backbone
	,_
) {
	'use strict';

	var View = Backbone.View.extend({

		initialize : function (options) {
			this.dataService = options.dataService;
			this.handleInternalLink = options.handleInternalLink
		},

		events :  {
			'click [data-internal]' : 'clickOnInternalLink'
		},

		clickOnInternalLink : function (event) {
			this.handleInternalLink(event);
		},

		template : _.template(document.getElementById('foo-template').innerHTML),

		render : function () {
			this.el.innerHTML = this.template({
				title : this.dataService.getTitle()
			});
			return this;
		}

	});

	View.inject = ['dataService', 'handleInternalLink'];

	return View;
});