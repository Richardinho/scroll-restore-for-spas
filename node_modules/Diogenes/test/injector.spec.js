define(['lib/injector'], function(Injector) {

	describe('injector', function() {

		var injector;

		beforeEach(function () {
			injector = new Injector();
		});

		/******************************************************************
		***********  register()  ******************************************
		*******************************************************************/

		describe('register()', function () {

			var key, injectable, mode;

			beforeEach(function () {
				key = 'foo';
				injectable = function Foo() {};
				injector.register(key, injectable, Injector.INSTANCE);
			});

			it('should should store injectables in container', function() {
				expect(injector.container[key]).toEqual({
					injectable : injectable,
					mode : Injector.INSTANCE,
					locals : []
				});
			});
		});


		/******************************************************************
		***********  createInstance()  ************************************
		*******************************************************************/

		describe('createInstance()', function () {

			var config,
			    instance,
			    keychain = [];

			describe('when Injectable is a constructor', function () {

				beforeEach(function () {

					//  Given

					function Injectable () { this.bar = 'bar' };

					config = {
						injectable : Injectable,
						mode : Injector.INSTANCE
					};

					//  when
					instance = injector.createInstance(config, keychain);
				});

				it('should return an instance of the Injectable', function () {
					expect(instance.bar).toBe('bar');
				});
			});

			describe('when Injectable is a factory function', function () {

				beforeEach(function () {

					//  Given
					function Injectable () { return 'bar' };

					config = {
						injectable : Injectable,
						mode : Injector.FACTORY_FUNCTION
					};

					//  when
					instance = injector.createInstance(config, keychain);
				});

				it('should return result of calling factory function', function () {
					expect(instance).toBe('bar');
				});
			});

			describe('when Injectable is a value', function () {

				beforeEach(function () {

					//  Given
					Injectable = 'this is my value';

					config = {
						injectable : Injectable,
						mode : Injector.VALUE
					};

					//  when
					instance = injector.createInstance(config, keychain);
				});

				it('should return value', function () {
					expect(instance).toBe('this is my value');
				});
			});

			describe('when Injectable has dependencies', function () {

				var apple, banana;

				beforeEach(function () {

					apple = function () { this.name = 'apple'; };
					banana = function () { this.name = 'banana'; };

					injector.register('apple', apple);
					injector.register('banana', banana);

				});

				describe('when Injectable is a constructor', function () {

					beforeEach(function () {

						//  Given

						apple = function () { this.name = 'apple'; };
						banana = function () { this.name = 'banana'; };

						injector.register('apple', apple);
						injector.register('banana', banana);

						function Injectable (options) { this.options = options; };

						Injectable.inject = ['apple', 'banana'];

						config = {
								injectable : Injectable,
								mode : Injector.INSTANCE
						};

						//  when
						instance = injector.createInstance(config, keychain);
					});

					it('should return instance with injected dependencies', function () {
						expect(instance.options.apple.name).toBe('apple');
						expect(instance.options.banana.name).toBe('banana');
					});
				});

				describe('when Injectable is a factory function', function () {

					beforeEach(function () {

						//  Given

						function Injectable (options) { return options; };

						Injectable.inject = ['apple', 'banana'];

						config = {
							injectable : Injectable,
							mode : Injector.FACTORY_FUNCTION
						};

						//  when
						instance = injector.createInstance(config, keychain);
					});

					it('should return result of calling factory function and passing dependencies', function () {
							expect(instance.apple.name).toBe('apple');
							expect(instance.banana.name).toBe('banana');
						});
				});
			});

		});

		/******************************************************************
		***********  get()  ***********************************************
		*******************************************************************/


		describe('get()', function () {
			var key,
			    keychain,
			    Injectable,
			    instance,
			    spyOnCreateInstance,
			    InjectableConfig;

			describe('non cached', function () {

				beforeEach(function () {

					key = 'foo';
					keychain = [];

					Injectable = function () {};

					InjectableConfig = {
						injectable : Injectable,
						mode : Injector.INSTANCE
					};

					injector.container[key] = InjectableConfig;

					spyOnCreateInstance = spyOn(injector, 'createInstance');

					injector.get(key, keychain);

				});

				it('should call createInstance()', function () {
					expect(spyOnCreateInstance).toHaveBeenCalledWith(InjectableConfig, ['foo']);
				});
			});

			/******************************************************************
			***********  cached()  ********************************************
			*******************************************************************/
			describe('cached', function () {

				beforeEach(function () {

					key = 'foo';
					keychain = [];

					spyOnCreateInstance = spyOn(injector, 'createInstance');

					Injectable = function () {};

					InjectableConfig = {
						injectable : Injectable,
						mode : Injector.CACHE_INSTANCE
					};
					injector.container[key] = InjectableConfig;
				});

				describe('when instance is in cache', function () {

					var cachedInstance;

					beforeEach(function () {
						cachedInstance = { name : 'cachedInstance'};
						injector.container[key].cachedInstance = cachedInstance;
						instance = injector.get(key, keychain);
					});
					it('should NOT call createInstance()', function () {
						expect(spyOnCreateInstance).not.toHaveBeenCalled();
					});
					it('should get instance from cache', function () {
						expect(instance).toBe(cachedInstance);
					});
				});

				describe('when instance is NOT in cache', function () {
					beforeEach(function () {
						injector.container[key].cachedInstance = undefined;
						instance = injector.get(key, keychain);
					});
					it('should call createInstance()', function () {
						expect(spyOnCreateInstance).toHaveBeenCalledWith(InjectableConfig, ['foo']);
					});
					it('should cache instance', function () {
						expect(injector.container[key].cachedInstance).toBe(instance);
					});
				});
			});

			describe('when called with circular dependency', function () {
				beforeEach(function () {

					key = 'foo';
					keychain = ['bar', 'moo', key];

					Injectable = function () {};

					InjectableConfig = {
						injectable : Injectable,
						mode : Injector.INSTANCE
					};

					injector.container[key] = InjectableConfig;

				});
				it('should throw error', function () {
					expect(injector.get.bind(injector, key, keychain))
						.toThrowError('cyclical dependency detected for key: foo in keychain bar,moo,foo');
				});
			});

			describe('when an Injectable does not exist in the container', function () {
				beforeEach(function () {
					key = 'foo';
					keychain = [];
				});
				it('should throw error', function () {
					expect(injector.get.bind(injector, key, keychain))
						.toThrowError('non existent injectable: foo');
				});
			});
		});
	});
});