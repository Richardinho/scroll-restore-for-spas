function App(options) {
  this.router = options.router;
  this.fantasticAdventuresControllerFactory = options.fantasticAdventuresControllerFactory;
  this.holoceneControllerFactory = options.holoceneControllerFactory;
  this.linkHandler = options.linkHandler;
  this.scrollHandler = options.scrollHandler;
}
App.prototype = {
  start : function () {
    this.router.route('', this.fantasticAdventuresControllerFactory);
    this.router.route('fantastic-adventures', this.fantasticAdventuresControllerFactory);
    this.router.route('holocene', this.holoceneControllerFactory);

    this.linkHandler();
    this.scrollHandler();

    if ('scrollRestoration' in history) {
      // history.scrollRestoration = 'manual';
    }

    Backbone.history.start({pushState: true})
  }
};
App.inject = [
  'router',
  'fantasticAdventuresControllerFactory',
  'holoceneControllerFactory',
  'pageManager',
  'linkHandler',
  'scrollHandler'
];
