function Router() {

	this.delegate = new Backbone.Router();
}

Router.prototype = {
	route : function (route, handler) {
		this.delegate.route(route, '', handler);
	},

	navigate : function (url) {
		var scroll = window.pageYOffset;
		this.delegate.navigate(url, { trigger : true });
	}
};
Router.inject = [];

