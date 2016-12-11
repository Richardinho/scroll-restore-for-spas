define([
	'backbone'
	,'underscore'
], function (
	Backbone
	,_
) {


	var ProductDetailView = Backbone.View.extend({

		initialize : function (options) {

			this.dataService = options.dataService;
			this.router = options.router;
		},

		events : {
			'click [data-internal]' : 'handleInternalLink'
		},

		handleInternalLink : function (event) {

			event.preventDefault();
			var url = event.target.getAttribute('href');
			this.router.navigate(url, { trigger : true });

		},

		Template : _.template(document.getElementById('pdp-template').innerHTML),

		render : function () {

			this.el.innerHTML = this.Template();
			return this;
		}
	});

	ProductDetailView.inject = ['dataService', 'router'];

	return ProductDetailView;

});