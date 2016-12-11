function holoceneControllerFunction(options) {

	var view = options.holoceneView;
	var pageManager = options.pageManager;

	return function handleRequest() {
		pageManager.render(view.render());
		if(history.state && history.state.scrollTop) {
			var scrollTop = window.history.state.scrollTop;
			console.log('scroll top is:', scrollTop);
			window.scrollTo(0, scrollTop);
		}
	}
}
holoceneControllerFunction.inject = [
	'holoceneView',
	'pageManager'
];