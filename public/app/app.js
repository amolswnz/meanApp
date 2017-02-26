(function() {
    angular.module('app', ['ngResource', 'ngRoute'])
        .config(function($routeProvider, $locationProvider) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });

            $routeProvider
                .when('/', {
                    templateUrl: '/partials/main/main',
                    controller: 'mvMainCtrl'
                })
                .when('/admin/users', {
                    templateUrl: '/partials/admin/user-list',
                    controller: 'mvUserListCtrl',
                    resolve: {
                        auth: function(mvIdentity, $q) {
                            if(mvIdentity.currentUser && mvIdentity.currentUser.roles.indexOf('Admin') > -1)
                                return true;
                            else
                                return $q.reject('na');
                        }
                    }
                });
        });

    angular.module('app').run(function($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function(evt, current, prev, rejection) {
            if(rejection === 'na')
                $location.path('/');
        });
    });
}());
