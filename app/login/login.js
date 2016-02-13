(function () {
  'use strict';
  angular.module('myApp.login')
      .controller('LoginController',LoginController);

  //Controller
  LoginController.$inject = ['$scope','AuthService'];
  function LoginController($scope,authService){
    $scope.credential = {};
    $scope.login = function (credential) {
      authService.login(credential).then(function (user) {

      })
    }
  };



  //LoginService
  angular.module('myApp.login').factory('AuthService',AuthService);

  AuthService.$inject(['session','$http']);
  function AuthService(session, $http){
    var authService = {};

    authService.login = function (credential) {
      console.log(credential.email);
      var url = 'http://127.0.0.1:8080/rest/user';
      session.create(1, 1);
      return $http.post(url, credential).then(function (res) {
        console.log("Here");
      })
    };

    authService.isAuthenticated = function () {
      return !!session.userId;
    }

    return authService;
  }

  //SessionService
  angular.module('myApp.login').service('SessionService',SessionService);
  SessionService.$inject([]);
  function SessionService(){
    this.create = function (sessionId, userId) {
      this.id = sessionId;
      this.userId = userId;
    };
    this.destory = function () {
      this.id = null;
      this.userId = null;
    }
  }


  //Constants
  myApp.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
  })
})();