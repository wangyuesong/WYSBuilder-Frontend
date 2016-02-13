'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'myApp.login'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {redirectTo: '/login'}).
    when('/login', {templateUrl: 'login/login.html',controller:'LoginController'}).
    otherwise({redirectTo: '/login'});

}]);

myApp.controller('myAppController',['$scope','authService',function($scope,authService){
    $scope.currentUser = null;
    $scope.isAuthorized = authService.isAuthorized;
    $scope.setCurrentUser = function(user){
        $scope.currentUser = user;
    }
}])
//
//myApp.factory("userInfoFactory", ["$http", function ($http) {
//    var factory = {};
//    factory.getUserInfo = function () {
//        var url = "http://localhost:8080/rest/user?callback=JSON_CALLBACK";
//        $http.jsonp(url).success(function(data){
//            return data;
//        })
//    }
//    return factory;
//}
//]);
//
//myApp.controller("UserInfoController", ["$scope", 'userInfoFactory', function ($scope, userInfoFactory) {
//    $scope.userInfo = userInfoFactory.getUserInfo();
//    console.log($scope.userInfo);
//}]);
//
