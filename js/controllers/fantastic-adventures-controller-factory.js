function fantasticAdventuresControllerFunction(options) {

	var pageManager = options.pageManager;
	var view = options.fantasticAdventuresView;

	return function handleRequest() {
		pageManager.render(view.render());
		if(history.state && history.state.scrollTop) {
			var scrollTop = window.history.state.scrollTop;
			window.scrollTo(0, scrollTop);
		}

	}
}
fantasticAdventuresControllerFunction.inject = [
	'pageManager',
	'fantasticAdventuresView'
];