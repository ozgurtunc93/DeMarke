var app = angular.module('myApp', ['ngRoute','mb-adaptive-backgrounds','app.home','app.news']);
app.constant('CONS', {
    appHttp: window.location.href.indexOf('localhost') > -1 ? 'http://192.168.1.27/api' : 'http://192.168.1.27/api',
});
app.directive('ngDelay', ['$timeout', function ($timeout) {
    return {
        restrict: 'A',
        scope: true,
        compile: function (element, attributes) {
            var expression = attributes['ngKeyup'];
            if (!expression)
                return;

            var ngModel = attributes['ngModel'];
            if (ngModel) attributes['ngModel'] = '$parent.' + ngModel;
            attributes['ngKeyup'] = '$$delay.execute()';

            return {
                post: function (scope, element, attributes) {
                    scope.$$delay = {
                        expression: expression,
                        delay: scope.$eval(attributes['ngDelay']),
                        execute: function () {
                            var state = scope.$$delay;
                            state.then = Date.now();
                            $timeout(function () {
                                if (Date.now() - state.then >= state.delay)
                                    scope.$parent.$eval(expression);
                            }, state.delay);
                        }
                    };
                }
            }
        }
    };
}])
app.filter('replace', [function () {

    return function (input, from, to) {

        if (input === undefined) {
            return;
        }

        var regex = new RegExp(from, 'g');
        return input.replace(regex, to);

    };


}]);
app.filter('split', function () {
    return function (input, splitChar, splitIndex) {
        return input.split(splitChar)[splitIndex];
    }
});

app.run(function($rootScope) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        console.log(event)
        console.log(next)
        console.log(current)

        // handle route changes     
    });
});
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('');

    $routeProvider
        .when('/', {
            templateUrl: 'Home/home.html'
        })
        .when('/news', {
            templateUrl: 'News/news.html'
        })
        .otherwise({
            redirectTo: '/'
        })


}]);



app.controller('mainCtrl', ['$scope', '$rootScope', '$routeParams', '$http', '$location','CONS', function ($scope, $rootScope, $routeParams, $http, $location,CONS) {

    $rootScope.param = $routeParams.id;
    $rootScope.mainCurrent;
    $rootScope.getList = function(id){
        $http.get('https://apiv2.bitcoinaverage.com/constants/exchangerates/global')
        .then(function successCallback(response) {
            $scope.currency = angular.fromJson( response.data );
            console.log($scope.currency)
            // when the response is available
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        
	}

}])