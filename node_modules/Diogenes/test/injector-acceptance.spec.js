define(['lib/injector'], function(Injector) {

	describe('injector acceptance test', function() {

		var injector,
		    spyOnStart,
		    Aval,
		    spyOnBixCallFunction;

		beforeEach(function () {

			injector = new Injector();

			spyOnStart = jasmine.createSpy('spy-on-start');
			spyOnBixCallFunction = jasmine.createSpy('spy-on-bix-call-function');

			aVal = 'my value';

			function Bix() {
				this.callFunction = spyOnBixCallFunction;
			}

			function Bar(options) {
				this.bix = options.bix;

				this.callFunction = function () {
					this.bix.callFunction(options.aval);
				};
			}
			Bar.inject = ['bix', 'aval'];

			function App(options) {
				options.aFunc('banana');
				this.bar = options.bar;
				this.bar.callFunction();
				this.start = spyOnStart;

			}

			function aFunc (options) {
				return function (arg) {
					options.bix.callFunction(arg);
				};
			}
			aFunc.inject = ['bix'];


			App.inject = ['bar', 'aFunc'];

			injector.register('app',   App,   Injector.INSTANCE);
			injector.register('bar',   Bar,   Injector.CACHE_INSTANCE);
			injector.register('bix',   Bix,   Injector.INSTANCE);
			injector.register('aval',  aVal,  Injector.VALUE);
			injector.register('aFunc', aFunc, Injector.FACTORY_FUNCTION);
			injector.start('app', function (app) {
				app.start();
			});
		});

		it('should create dependencies and start application', function () {
			expect(spyOnStart).toHaveBeenCalled();
			expect(spyOnBixCallFunction.calls.count()).toBe(2);
			expect(spyOnBixCallFunction.calls.argsFor(0)).toEqual(['banana']);
			expect(spyOnBixCallFunction.calls.argsFor(1)).toEqual(['my value']);
		});
	});
});
