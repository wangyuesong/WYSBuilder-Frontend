'use strict';

var myAppRepo = angular.module('myApp.repo',['ngResource']);


myAppRepo.constant('OAUTH_IO_PUBLIC_KEY','sd_5pFI5b58he3Ku1erCZh8qg3w');
myAppRepo.constant('REST_API_ENDPOINT','http://127.0.0.1:8080/rest');


myAppRepo.controller('RepoController', RepoController);

RepoController.$inject = ['$scope','$stateParams','RepoService','$localStorage','$http']
function RepoController($scope, $stateParams,RepoService,$localStorage,$http) {
    $http.defaults.headers.common['Authentication'] = $localStorage.userToken;
    $scope.userRepos = RepoService.repoResource.query({userLogin: $stateParams.userLogin});

    $scope.updateUserRepos = function(){
        RepoService.repoResource.sync({userLogin: $stateParams.userLogin},{}); //Don't forget payload for put
        $scope.userRepos = RepoService.repoResource.query({userLogin: $stateParams.userLogin});
    }
    //$scope.getUserRepos = function() {
    //    RepositoryService.doGetUserRepos($routeParams.userId).success(function(data){
    //        return data;
    //    })
    //}
    //$scope.updateUserRepos = function() {
    //    RepositoryService.doUpdateUserRepos($routeParams.userId);
    //}
}


