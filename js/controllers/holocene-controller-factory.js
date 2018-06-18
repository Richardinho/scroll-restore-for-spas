function holoceneControllerFunction(options) {

  var pageManager = options.pageManager;
  var view = options.holoceneView;
  var service = options.service;

  return function handleRequest() {
    service.getData().then(() => {
      pageManager.render(view.render());
    });
    
    //if (history.state) {
      //var scrollTop = window.history.state.scrollTop;
      // window.scrollTo(0, scrollTop);
    // }
  }
}
holoceneControllerFunction.inject = [
  'holoceneView',
  'pageManager',
  'service',
];
