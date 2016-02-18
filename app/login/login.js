'use strict';
var myAppLogin = angular.module('myApp.login', ['base64']);

myAppLogin.controller('LoginController', LoginController);

//Controller
LoginController.$inject = ['$scope', 'AuthService'];
function LoginController($scope, AuthService) {
    $scope.credential = {};
    $scope.login = function (credential) {
        AuthService.doLogin(credential).then(function (res) {
            if (res.data.type === 'SUCCESS') {
                AuthService.doSetCredential(credential.email, credential.password);
                console.log("User has set credential");
            } else {

            }
        })
    };

    $scope.test = function () {
        AuthService.doTest({'key':'shit'});
    }
};


//Constants
myApp.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});