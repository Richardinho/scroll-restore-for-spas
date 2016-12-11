define([
	'backbone'
	,'injector'
	,'product-list-view'
	,'product-detail-view'
	,'plp-controller'
	,'pdp-controller'
	,'data-service'
	,'app'
	,'router'
	,'page-manager'
	,'foo-view'
	,'handle-internal-link'
], function (
	Backbone
	,Injector
	,ProductListView
	,ProductDetailView
	,PlpController
	,PdpController
	,DataService
	,App
	,Router
	,PageManager
	,FooView
	,handleInternalLink
) {

	'use strict';

	return function bootstrap() {


		var injector = new Injector();

		injector.register('productListView',    ProductListView ,     Injector.INSTANCE           );
		injector.register('productDetailView',  ProductDetailView,    Injector.INSTANCE           );
		injector.register('plpController',      PlpController  ,      Injector.INSTANCE           );
		injector.register('pdpController',      PdpController ,       Injector.INSTANCE           );
		injector.register('dataService',        DataService,          Injector.CACHE_INSTANCE     );
		injector.register('router',             Router,               Injector.CACHE_INSTANCE     );
		injector.register('pageManager',        PageManager,          Injector.CACHE_INSTANCE     );
		injector.register('app',                App    ,              Injector.INSTANCE           );
		injector.register('fooView',            FooView ,             Injector.INSTANCE           );
		injector.register('handleInternalLink', handleInternalLink ,  Injector.FACTORY_FUNCTION   );

		injector.start('app', function (app) {

			app.start();

		});

	}

});