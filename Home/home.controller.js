'use strict';

var app = angular.module('app.home',[])
.controller('homeCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$location','CONS', function ($scope, $rootScope, $routeParams, $http, $location,CONS) {

    $rootScope.param = $routeParams.id;
    

}])