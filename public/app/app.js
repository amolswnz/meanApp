(function() {
    angular.module('app', ['ngResource', 'ngRoute'])
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/partials/main',
                    controller: 'mainCtrl'
                });
        });
}());


angular.module('app').controller('mainCtrl', function($scope) {
    $scope.txt = "Hello angular";
});
