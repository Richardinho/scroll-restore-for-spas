define(function () {

	var factory = function(options) {

		var router = options.router;

		return function handleInternalLink (event) {

			event.preventDefault();
			event.stopPropagation();

			var url = event.target.getAttribute('href');
			router.navigate(url, { trigger : true });

		};
	};

	factory.inject = ['router'];

	return factory;

});