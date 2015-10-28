var app = angular.module('wspms', ['ui.router', 'ngRoute', 'ngMaterial']);
app.config(function ($locationProvider, $mdThemingProvider, $mdIconProvider, $routeProvider, $stateProvider, $urlRouterProvider) {
	$mdIconProvider
		.defaultIconSet("./assets/svg/avatars.svg", 128)
		.icon("menu", "./assets/svg/menu.svg", 24)
		.icon("share", "./assets/svg/share.svg", 24)
		.icon("google_plus", "./assets/svg/google_plus.svg", 512)
		.icon("hangouts", "./assets/svg/hangouts.svg", 512)
		.icon("twitter", "./assets/svg/twitter.svg", 512)
		.icon("phone", "./assets/svg/phone.svg", 512);
	$mdThemingProvider.theme('default')
		.primaryPalette('pink', {
			'default': '400', // by default use shade 400 from the pink palette for primary intentions
			'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
			'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
			'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
		}).accentPalette('red');
	$urlRouterProvider.otherwise("/app/wspms/home");
	$locationProvider.html5Mode(true);
	// Now set up the states
	$stateProvider
		.state('wspms', {
			url: "/app/wspms",
			abstract: true,
			templateUrl: "./app/view/content.html"
		})
		.state('wspms.home', {
			url: "/home",
			controller: homeController

		})
		.state('wspms.list', {
			url: "/list",
			views: {
				'content': {
					templateUrl: "./app/view/list.html",
					controller: listController
				}
			},
		})
		.state('wspms.photo', {
			url: "/photo",
			views: {
				'content': {
					templateUrl: "./app/view/photo.html",
					controller: photoController
				}
			},
		});
});
app.run(function ($rootScope, $state) {
	// $rootScope.isLogin = false;
	$rootScope.isLogin = false;
	$rootScope.account = {
		"name": "",
		"admin": false
	};
	$rootScope.$on('$stateChangeSuccess',
		function (event, toState, toParams, fromState, fromParams) {
			if (!$rootScope.isLogin)
				$state.go('wspms.home');
		});
});
app.controller('HeaderController', headerController);
