'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'myApp.view1',
    'myApp.view2',
    'myApp.version',
    'myApp.login'
]).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/', {redirectTo: '/login'}).
    when('/login', {templateUrl: 'login/login.html',controller:'LoginController'}).
    otherwise({redirectTo: '/login'});
}]).run(run);

myApp.controller('myAppController',['$scope','AuthService',function($scope,AuthService){
    $scope.currentUser = null;
    $scope.isAuthorized = AuthService.isAuthorized;
    $scope.setCurrentUser = function(user){
        $scope.currentUser = user;
    }
}])

run.$inject = ['$rootScope','$cookieStore','$http','$location'];
function run($rootScope, $cookieStore, $http, $location){
    $rootScope.globals = $cookieStore.get('globals') || {};
    if($rootScope.globals.currentUser){
        console.log("User has logged in");
        $http.defaults.headers.common.Authorization = 'Basic ' + $rootScope.globals.currentUser.authData;
    }

    $rootScope.$on("$locationChangeStart",function(event,next,current){
        var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (restrictedPage && !loggedIn) {
            $location.path('/login');
        }
    })
}

var g_server_ip = "http://localhost:8080";

