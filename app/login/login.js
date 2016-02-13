'use strict';

var myAppLogin = angular.module('myApp.login', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginController'
  });
}]);



myAppLogin.controller('LoginController', ['$scope','authService',function($scope,authService) {
  $scope.credential = {};
  $scope.login= function(credential){
    authService.login(credential).then(function(user){

    })
  }

}]);


myAppLogin.factory('authService',['session','$http',function(session,$http){
  var authService = {};

   authService.login = function(credential) {
     console.log(credential.email);
     var url = 'http://127.0.0.1:8080/rest/user';
     session.create(1,1);
     return $http.post(url,credential).then(function(res){
       console.log("Here");
     })
   };

  authService.isAuthenticated = function(){
    return !!session.userId;
  }

  return authService;
}]);

myAppLogin.service("session", function(){
  this.create = function(sessionId, userId){
    this.id = sessionId;
    this.userId = userId;
  };
  this.destory = function(){
    this.id = null;
    this.userId = null;
  }
}
);

myApp.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})