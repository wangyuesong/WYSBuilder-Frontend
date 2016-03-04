'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
    'ngRoute',
    'ngCookies',
    'myApp.version',
    'myApp.repo',
    'myApp.oneRepo',
    'ngStorage',
    'ui.router'
]);

/**
 * Constant
 */
myApp.constant('OAUTH_IO_PUBLIC_KEY','sd_5pFI5b58he3Ku1erCZh8qg3w');
myApp.constant('REST_API_ENDPOINT','http://127.0.0.1:8080/rest');

/**
 * Config
 */
myApp.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $.noty.defaults.timeout = 2000;
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/index");
    $stateProvider
        .state('index', {url: '/index', templateUrl: 'partials/index.partial.html'})
        .state('repos', {url: '/users/:userId/repos', templateUrl: 'partials/repos.partial.html',controller:'RepoController'})
        .state('oneRepo',{url: '/users/:userId/repos/:repoId',templateUrl:'partials/oneRepo.partial.html',controller: 'OneRepoController'});
}]).run(run);

/**
 * Controller
 */
myApp.controller('MyAppController', ['$scope', 'AuthService', '$localStorage','OAUTH_IO_PUBLIC_KEY','$http',function($scope, AuthService, $localStorage,OAUTH_IO_PUBLIC_KEY,$http) {

    $http.defaults.headers.common['Authentication'] = $localStorage.userToken;

    $scope.isLoggedIn = $localStorage.userInfo;
    $scope.currentUser = $localStorage.userInfo;

    $scope.githubOAuth = function () {
        OAuth.initialize(OAUTH_IO_PUBLIC_KEY);
        OAuth.popup('github').done(function (result) {
            AuthService.doOAuthRegister(result).success(function (data) {
                $localStorage.userInfo = data.userInfo;
                $localStorage.userToken = data.userToken;
                $scope.isLoggedIn = $localStorage.userInfo;
                $scope.currentUser = $localStorage.userInfo;
                $http.defaults.headers.common['Authentication'] = data.userToken;
                noty({text: 'You successfully logined with Github'}).setType('success');
            }).error(function(data){
                noty({text: 'Login Failed'}).setType('error');
            })

        }).fail(function(err){
            alert(err);
        })
    };

}]);

//MyAppController.$inject = ['$scope', 'AuthService','$localStorage','OAUTH_IO_PUBLIC_KEY'];
//function MyAppController($scope, AuthService, $localStorage,OAUTH_IO_PUBLIC_KEY) {
//    $scope.isLoggedIn = $localStorage.userInfo;
//    $scope.currentUser = $localStorage.userInfo;
//
//
//    $scope.githubOAuth = function () {
//        OAuth.initialize(OAUTH_IO_PUBLIC_KEY);
//        OAuth.popup('github').done(function (result) {
//            AuthService.doOAuthRegister(result).success(function (data) {
//                $localStorage.userInfo = data.userInfo;
//                $localStorage.userToken = data.userToken;
//                noty({text: 'You successfully logined with Github'}).setType('success');
//            }).error(function(data){
//                noty({text: 'Login Failed'}).setType('error');
//            })
//
//        }).fail(function(err){
//            alert(err);
//        })
//    };
//
//};


/**
 * Service
 * @type {string[]}
 */
myApp.factory("AuthService",AuthService);
AuthService.$inject = ['$http','REST_API_ENDPOINT'];
function AuthService($http, REST_API_ENDPOINT){
    var authService = {};
    //doOAuthRegister
    authService.doOAuthRegister = function(oauthCallbackResult){
        return $http.post(REST_API_ENDPOINT + '/auth/github',oauthCallbackResult);
    }
    return authService;
};

/**
 * Run
 * @type {string[]}
 */
run.$inject = ['$rootScope', '$cookieStore', '$http', '$location'];
function run($rootScope, $cookieStore, $http, $location) {
    $rootScope.location = $location;
    $rootScope.appRoot = '/app';
}
