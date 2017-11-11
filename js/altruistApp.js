var altruistApp = {
    pages: {
        home: 0,
        dashboard: 1,
        catalog: 2,
        account: 3
    },
    currentPage: null,
    nodeURL: 'https://vivre.manky.me:3000/',
    angular: angular.module("altruistApp", ["ngRoute"])
};


altruistApp.angular.config(["$locationProvider", function ($locationProvider) {
    // hack for html5Mode customization
    $('a').each(function () {
        $a = $(this);
        if ($a.is('[target]') || $a.is('[ng-href]')) {
        } else {
            $a.attr('target', '_self');
        }
    });

    $locationProvider.html5Mode(true);
}]);

altruistApp.angular.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
        .when("/", {
            templateUrl: "templates/home.html",
            controller: "homeController"
        })
        .when("/home", {
            templateUrl: "templates/home.html",
            controller: "homeController"
        })
        .when("/dashboard", {
            templateUrl: "templates/dashboard.html",
            controller: "dashboardController"
        })
        .when("/account", {
            templateUrl: "templates/account.html",
            controller: "accountController"
        })
        .when("/catalog", {
            templateUrl: "templates/catalog.html",
            controller: "catalogController"
        })
        .otherwise({
            templateUrl: "templates/404.html"
        });

    $locationProvider.html5Mode({enabled: true, rewriteLinks: false});

}]);


altruistApp.angular.controller('altruistAppController', function ($scope, $http) {

});


altruistApp.angular.controller('homeController', function ($scope, $http) {

});


altruistApp.angular.controller('dashboardController', function ($scope, $http) {

});

altruistApp.angular.controller('catalogController', function ($scope, $http) {

});
