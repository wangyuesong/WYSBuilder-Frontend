
/**
 * Created by yuesongwang on 2/29/16.
 */
myAppRepo.factory('RepoService',RepoService);

RepoService.$inject = ['$http','REST_API_ENDPOINT','$resource'];
function RepoService($http,REST_API_ENDPOINT , $resource){
    var service = {};
    service.repoResource = $resource(REST_API_ENDPOINT + '/:userLogin',null,{'sync':{method:'PUT'}});

    return service;
};