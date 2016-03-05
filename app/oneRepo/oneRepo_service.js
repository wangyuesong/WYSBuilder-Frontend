
/**
 * Created by yuesongwang on 2/29/16.
 */
myAppOneRepo.factory('OneRepoService',OneRepoService);

OneRepoService.$inject = ['$http','REST_API_ENDPOINT','$resource'];
function OneRepoService($http,REST_API_ENDPOINT , $resource){
    var service = {};
    service.oneRepoResource = $resource(REST_API_ENDPOINT + '/:userLogin/:repoName');
    return service;
};