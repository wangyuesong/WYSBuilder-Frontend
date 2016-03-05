'use strict';

var myAppOneRepo = angular.module('myApp.oneRepo',['ngResource']);


myAppOneRepo.constant('OAUTH_IO_PUBLIC_KEY','sd_5pFI5b58he3Ku1erCZh8qg3w');
myAppOneRepo.constant('REST_API_ENDPOINT','http://127.0.0.1:8080/rest');


myAppOneRepo.controller('OneRepoController', OneRepoController);

OneRepoController.$inject = ['$scope','$stateParams','OneRepoService','$localStorage','$http']
function OneRepoController($scope, $stateParams,OneRepoService) {
    alert($stateParams.userLogin);
    alert($stateParams.repoName);
    $scope.currentRepo = OneRepoService.oneRepoResource.get({userLogin: $stateParams.userLogin, repoName: $stateParams.repoName});
}

