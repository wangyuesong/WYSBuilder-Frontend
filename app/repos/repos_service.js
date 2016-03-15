
/**
 * Created by yuesongwang on 2/29/16.
 */
myAppRepo.factory('RepoService',RepoService);

RepoService.$inject = ['$http','REST_API_ENDPOINT','$resource'];
function RepoService($http,REST_API_ENDPOINT , $resource){
    var service = {};

    service.repoResource = $resource(REST_API_ENDPOINT + '/:userLogin',null,{'sync':{method:'PUT'}});
    service.oneRepoHookResource = $resource(REST_API_ENDPOINT + '/:userLogin/:repoName/hook');

    service.doSyncRepos = function(userLogin){
        this.repoResource.sync({userLogin: userLogin},{}); //Don't forget payload for put
    };
    service.doGetRepos = function(userLoginName){
        return this.repoResource.query({userLogin: userLoginName});
    };

    service.doAddWebhook = function(userLogin, repoName){
        this.oneRepoHookResource.save({userLogin:userLogin, repoName:repoName},{});
    }
    service.doDeleteWebhook = function(userLogin, repoName){
        this.oneRepoHookResource.delete({userLogin:userLogin, repoName:repoName});
    }
    return service;
};