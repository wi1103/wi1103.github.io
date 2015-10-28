"use strict";

function homeController() {

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
	var roles = ["admin", "JT RD"];
	$scope.accounts = [
		{
			"name": "admin",
			"role": roles[0],
			"time": new Date().toDateString()
    },
		{
			"name": "eric@gmail.com",
			"role": roles[1],
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
