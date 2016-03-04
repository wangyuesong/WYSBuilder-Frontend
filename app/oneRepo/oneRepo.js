'use strict';

var myAppOneRepo = angular.module('myApp.oneRepo',['ngResource']);


myAppOneRepo.constant('OAUTH_IO_PUBLIC_KEY','sd_5pFI5b58he3Ku1erCZh8qg3w');
myAppOneRepo.constant('REST_API_ENDPOINT','http://127.0.0.1:8080/rest');


myAppOneRepo.controller('OneRepoController', OneRepoController);

OneRepoController.$inject = ['$scope','$stateParams','OneRepoService','$localStorage','$http']
function OneRepoController($scope, $stateParams,OneRepoService) {
    alert($stateParams.userId);
    $scope.currentRepo = OneRepoService.oneRepoResource.get({userId: $stateParams.userId, repoId: $stateParams.repoId});
}

