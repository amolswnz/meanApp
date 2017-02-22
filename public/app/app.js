(function() {
    angular.module('app', ['ngResource', 'ngRoute'])
        .config(function($routeProvider, $locationProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: '/partials/main/main',
                    controller: 'mvMainCtrl'
                });
        });
}());
