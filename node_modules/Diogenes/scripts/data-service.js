define(function () {

	'use strict';


	var DataService = function () {}

	DataService.prototype = {
		getData : function () {

			return 'here is your hello world data';
		},

		getTitle : function () {
			return 'Dependency Injection Experiment';
		}

	};

	return DataService;


});