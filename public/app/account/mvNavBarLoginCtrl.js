(function() {
    'use strict';
    angular.module('app')
        .controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location) {
            $scope.identity = mvIdentity;
            $scope.signin = function(username, password) {
                console.log('login cliked');
                mvAuth.authenticateUser(username, password)
                    .then(function(success) {
                        if(success) {
                            mvNotifier.notify('You have been logged in!');
                        } else {
                            mvNotifier.notify('ERROR logging in. Incorrect username/password!');
                        }
                    });
             };
             $scope.signout = function() {
                 mvAuth.logoutUser().then(function() {
                     $scope.username = "";
                     $scope.password = "";
                     mvNotifier.notify('You have been successfully logged out !');
                     $location.path('/');
                 });
             };
        });
}());
