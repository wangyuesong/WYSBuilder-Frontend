'use strict';

var myAppOneRepo = angular.module('myApp.oneRepo',['ngResource']).value('$anchorScroll', angular.noop);
//Disable autoscrooll

myAppOneRepo.controller('OneRepoController', OneRepoController);
myAppOneRepo.controller("OneRepoBuildsController", OneRepoBuildsController);
//myAppOneRepo.controller("OneRepoBuildDetailController" is down there
//OneRepoCurrentController is down there
myAppOneRepo.controller("OneRepoBranchesController", OneRepoBranchesController);
//myAppOneRepo.value("$anchorScroll",angular.noop);


OneRepoController.$inject = ['$scope','$stateParams','OneRepoService','$localStorage','$http'];
function OneRepoController($scope, $stateParams,OneRepoService) {
    $scope.currentRepo = OneRepoService.oneRepoResource.get({userLogin: $stateParams.userLogin, repoName: $stateParams.repoName});
}



OneRepoBuildsController.$inject = ['$scope','$stateParams','OneRepoService','$localStorage','$http'];
function OneRepoBuildsController($scope, $stateParams,OneRepoService) {
    //All builds from datastore
    $scope.allBuilds = OneRepoService.oneRepoBuildResource.query({
        userLogin: $stateParams.userLogin,
        repoName: $stateParams.repoName,
        isArray:true});
    //$scope.queryTerm
}


OneRepoBranchesController.$inject = ['$scope','$stateParams','OneRepoService'];
function OneRepoBranchesController($scope, $stateParams,OneRepoService) {
    //All builds from datastore
    $scope.allBranches = OneRepoService.oneRepoBranchResource.query({
        userLogin: $stateParams.userLogin,
        repoName: $stateParams.repoName,
        isArray:true});
    //$scope.queryTerm
}



myAppOneRepo.controller("OneRepoBuildDetailController",function($scope,$stateParams,OneRepoService,$timeout){
    var statusArray = ['FAILURE','ABORTED','SUCCESS'];
    //$anchorScroll.disableAutoScrolling();
    $scope.buildDetail = OneRepoService.oneRepoBuildResource.get({
        userLogin: $stateParams.userLogin,
        repoName: $stateParams.repoName, buildName: $stateParams.buildName
    });

    var refreshPromise;
    function refreshBuildDetail(){
        $scope.buildDetail.$promise.then(function(result){
            $scope.buildDetail = OneRepoService.oneRepoBuildResource.get({
                userLogin: $stateParams.userLogin,
                repoName: $stateParams.repoName, buildName: $stateParams.buildName
            });
            if(statusArray.indexOf(result.status) == -1){
                refreshPromise = $timeout(refreshBuildDetail,5000);
            }
        });
    };
    refreshPromise = $timeout(refreshBuildDetail,5000);
});



myAppOneRepo.controller("OneRepoCurrentController",function($scope,$stateParams,OneRepoService,$timeout){
    var statusArray = ['FAILURE','ABORTED','SUCCESS'];
    //$anchorScroll.disableAutoScrolling();
    $scope.buildDetail = OneRepoService.oneRepoMostRecentBuildResource.get({
        userLogin: $stateParams.userLogin,
        repoName: $stateParams.repoName,
    });

    var refreshPromise;
    function refreshBuildDetail(){
        $scope.buildDetail.$promise.then(function(result){
            $scope.buildDetail = OneRepoService.oneRepoMostRecentBuildResource.get({
                userLogin: $stateParams.userLogin,
                repoName: $stateParams.repoName,
            });
            if(statusArray.indexOf(result.status) == -1){
                refreshPromise = $timeout(refreshBuildDetail,5000);
            }
        });
    };
    refreshPromise = $timeout(refreshBuildDetail,5000);
});
