angular.module('routeapp.controller', [])
    .controller('RouteController', function ($scope, $routeParams, $controller) {
        var prefix = $routeParams.param2;
        $controller(prefix + 'Controller', { $scope: $scope });
});