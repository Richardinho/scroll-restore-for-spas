var injector = new Diogenes();

injector.register('router',          Router,         Diogenes.CACHE_INSTANCE);
injector.register('app',             App,            Diogenes.INSTANCE);
injector.register('holoceneView',    HoloceneView,   Diogenes.INSTANCE);
injector.register('linkHandler',     linkHandler,    Diogenes.FACTORY);
injector.register('scrollHandler',   scrollHandler,  Diogenes.FACTORY);

injector.register('fantasticAdventuresControllerFactory',
  fantasticAdventuresControllerFunction,
  Diogenes.FACTORY);

injector.register('holoceneControllerFactory',
  holoceneControllerFunction,
  Diogenes.FACTORY);

injector.register('fantasticAdventuresView',
  FantasticAdventuresView,
  Diogenes.INSTANCE);

injector.register('pageManager',
  PageManager,
  Diogenes.CACHE_INSTANCE,
  document.getElementById('app'));


injector.start('app', function (app) {
  app.start();
});
