'use strict';

var myAppRepo = angular.module('myApp.repo',['ngResource']);


myAppRepo.controller('RepoController', RepoController);

RepoController.$inject = ['$scope','$stateParams','RepoService','$localStorage','$http']
function RepoController($scope, $stateParams,RepoService,$localStorage,$http) {
    $http.defaults.headers.common['Authentication'] = $localStorage.userToken;

    $scope.userRepos = RepoService.doGetRepos($stateParams.userLogin);

    $scope.updateUserRepos = function(){
        RepoService.doSyncRepos($stateParams.userLogin);
        $scope.userRepos = RepoService.doGetRepos($stateParams.userLogin);
    }

    $scope.changeHook = function(repoName){
        var isAdd;
        for(var i = 0; i < $scope.userRepos.length; i ++){
            if($scope.userRepos[i].name == repoName) {
                isAdd = $scope.userRepos[i].is_hooked;
            }
        }
        if(isAdd){
            RepoService.doAddWebhook($stateParams.userLogin, repoName);
            noty({text: 'Project: ' + repoName + " will be built when there is a change"}).setType('success');
        }else{
            RepoService.doDeleteWebhook($stateParams.userLogin, repoName);
            noty({text: 'Stop auto building for Project: ' + repoName}).setType('warning');
        }
        //if($scope.userRepos)
        //RepoService.doAddWebhook($stateParams.userLogin, repoName);
        //$scope.userRepos = RepoService.doGetRepos($stateParams.userLogin);
    }

    $scope.deleteWebhook = function(repoName){
        RepoService.doDeleteWebhook($stateParams.userLogin, repoName);
        $scope.userRepos = RepoService.doGetRepos($stateParams.userLogin);
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


