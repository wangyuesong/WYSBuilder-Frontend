///**
// * Created by yuesongwang on 2/17/16.
// */
////Auth
//myAppLogin.factory('AuthService',AuthService);
//
//
//AuthService.$inject = ['$http','$cookieStore','$base64','$rootScope','REST_API_ENDPOINT','$localStorage'];
//function AuthService($http, $cookieStore, $base64, $rootScope, REST_API_ENDPOINT,$localStorage){
//    var authService = {};
//
//    //doOAuthRegister
//    authService.doOAuthRegister = function(oauthCallbackResult){
//        return $http.post(REST_API_ENDPOINT + '/auth/github',oauthCallbackResult);
//    }
//    //
//    ////Login
//    //authService.doLogin = function (credential) {
//    //    var url = g_server_ip + '/rest/user/login';
//    //    return $http.post(url, credential);
//    //};
//    //
//    ////Auth callback
//    //authService.doAuthCallback = function(){
//    //
//    //}
//    //
//    ////Set credential
//    //authService.doSetCredential = function(email,password){
//    //    var authData = $base64.encode(email + ':' + password);
//    //    $rootScope.globals = {
//    //        currentUser: {
//    //            email: email,
//    //            authData: authData
//    //        }
//    //    };
//    //    console.log("Put credential to cookie and rootScope");
//    //    $http.defaults.headers.common.Authorization = 'Basic ' + authData;
//    //    $cookieStore.put('globals',$rootScope.globals);
//    //};
//    //
//    ////Clear credential
//    //authService.doClearCredential = function(){
//    //    $rootScope.globals = {};
//    //    $cookieStore.remove('globals');
//    //    $http.defaults.headers.common.Authorization = 'Basic';
//    //}
//    //
//    //
//    ////Test
//    //authService.doTest = function(test){
//    //    var url = g_server_ip + '/rest/test';
//    //    $http.post(url,test);
//    //};
//
//    //doOAuthRegister
//
//    return authService;
//};
//
//
//////SessionService
////myAppLogin.service('SessionService',SessionService);
////SessionService.$inject = ['$rootScope','$cookieStore'];
////function SessionService($rootScope,$cookieStore){
////    this.create = function (email) {
////        $rootScope.globals = {
////            currentUser : {
////                email: email
////            }
////        };
////        $cookieStore.put('globals',$rootScope.globals);
////
////    };
////    this.destory = function () {
////        $rootScope.globals = {};
////        $cookieStore.remove('globals');
////    }
////};