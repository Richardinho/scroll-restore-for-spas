function holoceneControllerFunction(options) {

  var pageManager = options.pageManager;
  var view = options.holoceneView;

  return function handleRequest() {
    pageManager.render(view.render());
    
    //if (history.state) {
      //var scrollTop = window.history.state.scrollTop;
      // window.scrollTo(0, scrollTop);
    // }
  }
}
holoceneControllerFunction.inject = [
  'holoceneView',
  'pageManager'
];
