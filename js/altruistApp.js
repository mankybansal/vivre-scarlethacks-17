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
        .when("/product", {
            templateUrl: "templates/product.html",
            controller: "productController"
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

    searchByID: function (params, callback) {
        var settings = {};
        var str = "search/by/id/" + params.key;
        serverRequest("GET", str, settings, callback);
    },

    searchByCategory: function (params, callback) {
        var settings = {};
        var str = "search/by/category/" + params.key;
        serverRequest("GET", str, settings, callback);
    },

    trendingSearch: function (callback) {
        var settings = {};
        var str = "search/trending";
        serverRequest("GET", str, settings, callback);
    },

    borrowNow: function (params, callback) {
        var settings = {
            data: {
                token: params.token,
                post_id: params.post_id,
                poster_id: params.poster_id
            }
        };
        serverRequest("POST", "borrowReq", settings, callback);
    },

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
                    $scope.user = response2.result;
                    $scope.user.token = response2.token;
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


altruistApp.angular.controller('catalogController', function ($location, $scope, $http) {

        $scope.trending_items = {};

        $scope.autoComplete = null;

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
                if (response.success) {
                    $scope.autoComplete = response.result;
                }
                console.log(response);
            })
        };

        $scope.suggestions = {
            books: null,
            games: null,
            household: null,
            clothes: null,
            toys: null
        };


        $scope.loadSuggestions = function () {

            altruistApp.requests.searchByCategory({key: "Toys"}, function (response) {
                $scope.safeApply(function () {
                    if (response.success) {
                        $scope.suggestions.toys = response.result;
                    }
                    console.log("Toys", response);
                });
            });

            altruistApp.requests.searchByCategory({key: "Household"}, function (response) {
                $scope.safeApply(function () {
                    if (response.success) {
                        $scope.suggestions.household = response.result;
                    }
                    console.log("Household", response);
                });
            });

            altruistApp.requests.searchByCategory({key: "Clothes"}, function (response) {
                $scope.safeApply(function () {
                    if (response.success) {
                        $scope.suggestions.clothes = response.result;
                    }
                    console.log("Clothes", response);
                });
            });

            altruistApp.requests.searchByCategory({key: "Books"}, function (response) {
                $scope.safeApply(function () {
                    if (response.success) {
                        $scope.suggestions.books = response.result;
                    }
                    console.log("Books", response);
                });
            });

            altruistApp.requests.searchByCategory({key: "Video Games"}, function (response) {
                $scope.safeApply(function () {
                    if (response.success) {
                        $scope.suggestions.games = response.result;
                    }
                    console.log("Video Games", response);
                });
            });

        };


        $scope.itemClick = function (id) {
            console.log(id);
            var params = {
                id: id
            };

            $location.path("product").search(params);
        };

        $scope.autoSearch = function () {
            $scope.count += 1;
            $scope.count %= 3;

            if ($scope.searchVal === "") $scope.autoComplete = null;

            //console.log($scope.count);
            if ($scope.count == 2) {
                $scope.search();
            }
        };


        $scope.loadSuggestions();
    }
);


altruistApp.angular.controller('productController', function (store, $location, $scope, $http) {

    $scope.currentProduct = null;

    $scope.init = function () {
        altruistApp.requests.searchByID({key: $location.search().id}, function (response) {
            $scope.safeApply(function () {
                if (response.success) {
                    $scope.currentProduct = response.result;
                }
            });
        });
    };

    $scope.borrowNow = function () {
        $scope.user = store.get("userObject");

        var params = {
            token: $scope.user.token,
            post_id: $scope.currentProduct._id,
            poster_id: $scope.currentProduct.user[0]._id
        };

        altruistApp.requests.borrowNow(params, function (response) {
            $scope.safeApply(function () {
                console.log("BORROWWWWWWWWWWWWWWWWWWWW", response);
            });
        });


    };

    $scope.init();
});


