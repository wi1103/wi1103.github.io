"use strict";

function homeController() {

}
function photoController() {

}
function diaryController() {

}
function createController($scope) {
	$scope.user = {
		"account": "",
		"password": ""
	};
	$scope.message = "= =";
	$scope.create = function(){

	};
}

function listController($scope, $mdDialog, $timeout) {
	$scope.accounts = [
		{
			"name": "Data Converter",
			"role": "https://shancarter.github.io/mr-data-converter/",
			"time": new Date().toDateString()
    },
		{
			"name": "Github",
			"role": "https://github.com/",
			"time": new Date().toDateString()
    },
		{
			"name": "OpenCV",
			"role": "http://opencv.org/",
			"time": new Date().toDateString()
    },
		{
			"name": "Qt",
			"role": "http://www.qt.io/developers/",
			"time": new Date().toDateString()
    },
		{
			"name": "AngularJS - Semantic UI",
			"role": "http://semantic-ui.com/introduction/integrations.html",
			"time": new Date().toDateString()
    },
		{
			"name": "Bitbucket",
			"role": "https://bitbucket.org/",
			"time": new Date().toDateString()
    },
		{
			"name": "NTUT - Portal",
			"role": "https://nportal.ntut.edu.tw/index.do?thetime=1441697866823",
			"time": new Date().toDateString()
    },
		{
			"name": "Trello",
			"role": "https://trello.com/",
			"time": new Date().toDateString()
    },
		{
			"name": "ejs - template",
			"role": "https://scotch.io/tutorials/use-ejs-to-template-your-node-application",
			"time": new Date().toDateString()
    },
		{
			"name": "MongoDB",
			"role": "https://www.mongodb.org/",
			"time": new Date().toDateString()
    }
  ];
	$scope.addUser = function (ev) {
		console.log('create');
		$mdDialog.show({
				controller: createController,
				templateUrl: 'app/view/add_user.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true
			})
			.then(function (answer) {
				$scope.status = 'You said the information was "' + answer + '".';
			}, function () {
				$scope.status = 'You cancelled the dialog.';
			});
	};


}

function headerController($state, $scope, $rootScope, $mdSidenav, $mdBottomSheet, $mdDialog, $timeout) {
	var self = this;
	$scope.logout = function () {
		$rootScope.isLogin = false;
		if (!$rootScope.isLogin)
			$state.go('wspms.home');
		console.log('logout');
		$rootScope.account = {
			"admin":false,
			"name":""
		};
	};
	$scope.login = function (ev) {
		$.fn.accordion.settings.exclusive = false;
		$('.ui.accordion').accordion('close others', 'refresh');
		$mdDialog.show({
				controller: loginController,
				templateUrl: 'app/view/login.html',
				parent: angular.element(document.body),
				targetEvent: ev,
				clickOutsideToClose: true
			})
			.then(function (answer) {
				console.log('login');
				$scope.status = 'information was "' + answer + '".';
			}, function () {
				$scope.status = 'You cancelled the dialog.';
			});
	};
}

function loginController($scope, $rootScope, $mdDialog) {
	$scope.user = {
		"account": "",
		"password": ""
	}
	$scope.hide = function () {
		$mdDialog.hide();
	};
	$scope.cancel = function () {
		$mdDialog.cancel();
	};
	$scope.answer = function (answer) {
		console.log($scope.user);
		$rootScope.isLogin = true;
		if ($scope.user.account == 'admin')
			$rootScope.account.admin = true;
		$rootScope.account.name= $scope.user.account;
		$mdDialog.hide(answer);
	};
}
