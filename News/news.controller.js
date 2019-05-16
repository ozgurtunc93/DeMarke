'use strict';

var app = angular.module('app.news',[])
.controller('newsCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$location','CONS', function ($scope, $rootScope, $routeParams, $http, $location,CONS) {

    $rootScope.param = $routeParams.id;

}])