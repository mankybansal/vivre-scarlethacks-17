var altruistApp = {
    pages: {
        home: 0,
        dashboard: 1,
        catalog: 2,
        account: 3,
        product: 4,
        pageNotFound: 5
    },
    currentPage: null,
    nodeURL: 'http://vivre.manky.me:3000/',
    angular: angular.module("altruistApp", ["ngRoute", "angular-storage"])
};


altruistApp.angular.config(["$locationProvider", function ($locationProvider) {
    //$locationProvider.html5Mode(true);
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
        }).otherwise({
        templateUrl: "templates/404.html"
    });

    //$locationProvider.html5Mode({enabled: true, rewriteLinks: false});

}]);

function serverRequest(method, endpoint, settings, callback) {
    settings.method = method;
    settings.url = altruistApp.nodeURL + endpoint;
    settings.dataType = "json";
    console.log("Settings: ", settings);

    $.ajax(settings).done(function (response) {
        console.log("Response: ", response);
        callback && callback(response);
    });
}

altruistApp.requests = {
    login: function (params, callback) {
        var settings = {
            data: {
                token: params.token
            }
        };
        serverRequest("POST", "login", settings, callback);
    },

    register: function (params, callback) {
        var settings = {
            data: {
                token: params.token,
                name: params.name,
                email: params.email,
                phoneNo: params.phoneNo,
                aNo: params.aNo,
                bNumber: params.bNumber,
                city: params.city,
                community: params.community
            }
        };
        serverRequest("POST", "register", settings, callback);
    },

    getCommunities: function (callback) {
        var settings = {};
        serverRequest("GET", "community", settings, callback);
    },

    search: function (params, callback) {
        var settings = {};
        var str = "search/by/" + params.key;
        serverRequest("GET", str, settings, callback);
    },

    trendingSearch: function (callback) {
        var settings = {};
        var str = "search/trending";
        serverRequest("GET", str, settings, callback);
    }
};

altruistApp.angular.controller('altruistAppController', function ($scope, store, $http) {

    $scope.user = {
        token: null,
        name: null,
        email: null,
        phoneNo: null,
        aNo: null,
        bNumber: null,
        city: null,
        community: null
    };

    $scope.communities = null;
    $scope.requireRegister = false;
    $scope.loginOverlay = false;
    $scope.loggedIn = false;


    $scope.onSignIn = function (googleUser) {
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());

        $scope.user.token = profile.getId();
        $scope.user.email = profile.getEmail();
        $scope.user.name = profile.getName();

        $scope.user.token = profile.getId();

        $scope.login();
    };

    $scope.signOut = function () {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
        store.remove('userObject');
        $scope.loggedIn = false;
    };

    $scope.login = function () {

        var params = {
            token: $scope.user.token
        };

        altruistApp.requests.login(params, function (response2) {
            console.log(response2);
            $scope.safeApply(function () {
                if (!response2.success) {
                    //alert("LOGIN FAIL");
                    $scope.requireRegister = true;
                    altruistApp.requests.getCommunities(function (response) {
                        $scope.safeApply(function () {
                            $scope.communities = response.result
                        });
                    });
                } else {
                    //alert("LOGIN SUCCESS");
                    $scope.user = response2.result;
                    $scope.loginSuccess();
                }
            });
        });
    };


    $scope.loginSuccess = function () {
        $scope.loggedIn = true;
        console.log("User: ", $scope.user);
        $scope.requireRegister = false;
        $scope.loginOverlay = false;
        store.set('userObject', $scope.user);
    };

    $scope.checkLoggedIn = function () {
        var myUser = store.get('userObject');
        if (myUser) {
            $scope.user = myUser;
            //alert("LOGGED IN");
            $scope.loginSuccess();
        } else {
            //alert("NOT LOGGED IN");
        }
    };

    $scope.checkLoggedIn();

    window.onSignIn = $scope.onSignIn;
    window.signOut = $scope.signOut;

    $scope.register = function () {
        console.log($scope.user);
        altruistApp.requests.register($scope.user, function (response) {
            $scope.safeApply(function () {
                $scope.login();
            })
        });
    };

    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function'))
                fn();
        } else
            this.$apply(fn);
    };

    $scope.showLogin = function () {
        $scope.loginOverlay = true;
    };

    $scope.hideLogin = function () {
        $scope.loginOverlay = false;
    };

});

altruistApp.angular.controller('homeController', function ($scope, $http) {

});

altruistApp.angular.controller('dashboardController', function ($scope, $http) {

});

altruistApp.angular.controller('accountController', function ($scope, $http) {
    //Need User Details

});
//code for search


altruistApp.angular.controller('catalogController', function ($scope, $http) {
    $scope.trending_items = {};
    $scope.getTrending = function () {
        altruistApp.requests.trendingSearch(function (response) {
            $scope.safeApply(function () {
                $scope.trending_items = response.result;
            });

        })
    };

    $scope.safeApply = function (fn) {
        var phase = this.$root.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function'))
                fn();
        } else
            this.$apply(fn);
    };

    $scope.getTrending();


    $scope.search = function () {
        var params = {
            key: $scope.searchVal
        };
        altruistApp.requests.search(params, function (response) {
            console.log(response);
        })
    }
});

