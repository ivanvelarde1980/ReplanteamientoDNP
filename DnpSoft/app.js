var app = angular.module("app", ["ngRoute", "routeapp.controller", "angular-loading-bar"]);

app.config(function ($routeProvider, $httpProvider) {
    var route = {
        controller: 'RouteController',
        templateUrl: function (uri) {
            var pattern = new RegExp("[0-9]+");
            var part_uri = (!pattern.test(uri.param2) && typeof uri.param2 !== 'undefined') ? '/' + uri.param2 : '';
            console.log("App/view/" + uri.param1 + part_uri + ".html");
            return "App/view/" + uri.param1 + part_uri + ".html";
        }
    };

    $routeProvider
        .when('/:param1/:param2', route)
        .otherwise({ redirectTo: 'home/home' });

    $httpProvider.interceptors.push(function ($q) {
        return {
            'request': function (config) {
                config.headers = config.headers || {};
                if (sessionStorage.getItem("AccessToken")) {
                    config.headers.Authorization = 'Bearer ' + sessionStorage.getItem("AccessToken");
                }
                return config;
            },
            'responseError': function (response) {
                if (response.status === 401 || response.status === 403) {
                    console.log(response);
                }
                return $q.reject(response);
            }
        };
    });
});

//app.run(function ($rootScope, $location, $timeout) {
//    $rootScope.validate = function () {
//        if (!sessionStorage.getItem("SessionSeconds"))
//            $(location).attr('href', "index.html");
//    };

//    $rootScope.closeSession = function () {
//        sessionStorage.clear();
//        $(location).attr('href', "index.html");
//    };
//});
