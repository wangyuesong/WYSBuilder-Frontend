'use strict';
var myAppLogin = angular.module('myApp.login', ['base64','satellizer']);
myAppLogin.config(function($authProvider){
    $authProvider.github({
        clientId : '2dec25a28baf921db035',
        scope: ['user:email'],
        authorizationEndpoint: 'https://github.com/login/oauth/authorize',
        type: '2.0',
        optionalUrlParams: ['scope'],
        popupOptions: { width: 1020, height: 618 }
    });

});

myAppLogin.controller('LoginController', LoginController);

//Login Controller
LoginController.$inject = ['$scope', 'AuthService', '$window','$auth'];
function LoginController($scope, AuthService,$window,$auth) {
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

    $scope.githubOAuth = function(){

        $window.location.href = 'https://github.com/login/oauth/authorize?client_id=2dec25a28baf921db035&scope=user,repo&state=' + generateRandomString();
    };

    //$scope.authenticate = function(provider){
    //        $auth.authenticate(provider);
    //}
};



////OAuth Controller
//OAuthCallbackController.$inject = ['$location', '$rootScope','$auth'];
//function OAuthCallbackController($location,$rootScope,$auth){
//    console.log($location.path());
//
//    console.log("Herererere");
//};


function generateRandomString(){
   return Math.random().toString(36).substring(7);
}

//Constants
myApp.constant('AUTH_EVENTS', {
    loginSuccess: 'auth-login-success',
    loginFailed: 'auth-login-failed',
    logoutSuccess: 'auth-logout-success',
    sessionTimeout: 'auth-session-timeout',
    notAuthenticated: 'auth-not-authenticated',
    notAuthorized: 'auth-not-authorized'
});

//b683eb43d7417c06bb24