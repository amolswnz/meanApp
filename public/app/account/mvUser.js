(function() {
    'use strict';

    angular.module('app')
        .factory('mvUser', function($resource) {
            var UserResource = $resource('/api/users/:id', {_id: "@id"});

            UserResource.prototype.isAdmin = function() {
                return this.roles && this.roles.indexOf('Admin') > -1;
            };

            return UserResource;
        });
}());
