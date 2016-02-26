'use strict';

var myAppOauth = angular.module('myApp.oauth',[]);

myAppOauth.controller('OAuthController', OAuthController);


OAuthController.$inject = ['$scope','$routeParams']
function OAuthController($scope, $routeParams) {
    alert("FUCK");
}
