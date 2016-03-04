
/**
 * Created by yuesongwang on 2/29/16.
 */
myAppRepo.factory('RepoService',RepoService);

RepoService.$inject = ['$http','REST_API_ENDPOINT','$resource'];
function RepoService($http,REST_API_ENDPOINT , $resource){
    var service = {};
    service.repoResource = $resource(REST_API_ENDPOINT + '/users/:userId/repos',null,{'sync':{method:'PUT'}});

    service.doGetUserRepos = function(userId){
         $http.get(REST_API_ENDPOINT + '/users/' + userId + '/repos');
    };

    service.doUpdateUserRepos = function(userId){
        return $http.put(REST_API_ENDPOINT + '/users/' + userId + '/repos');
    };

    return service;
};