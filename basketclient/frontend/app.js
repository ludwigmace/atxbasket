var app = angular.module('app', ['ngMaterial', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('root', {
            url: '/',
            templateUrl: 'frontend/templates/home.html',
            controller: 'HomeCtrl'
        })
        .state('root.result', {
            url: 'results',
            views: {
                'modal@root': {
                    templateUrl: 'frontend/templates/results.html',
                    controller: 'ResultsCtrl'
                }
            }
        })
})

app.controller('HomeCtrl', function ($scope, $http, LocationService) {
    $scope.user = {};

    $scope.submit = function(user) {
        LocationService.get().then(function(res) {
            $http.post()
        })
    };
});

app.controller('ResultsCtrl', function($scope) {

});

app.service('LocationService', function($http, $q) {
    function nativeGeoCoder() {
        var defer = $q.defer();

        navigator.geolocation.getCurrentPosition(function(res){
            defer.resolve({
                lat: res.coords.latitude,
                lon: res.coords.longitude
            });
        });
        return defer.promise;
    }

    function geoCode(address) {
        // http://nominatim.openstreetmap.org/search?q=135+pilkington+avenue,+birmingham&format=json
        // TODO: make this work with address
        return nativeGeoCoder();
    }

    return {
        get: function(address) {
            if (!!address && typeof address === "string" && address !== "") {
                return geoCode(address);
            }
            return nativeGeoCoder();
        }
    }
})
