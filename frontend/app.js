var app = angular.module('app', ['ngMaterial', 'ui.router', 'ngAnimate']);

app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('root', {
            url: '/',
            templateUrl: 'frontend/templates/home.html',
            controller: 'HomeCtrl'
        })
        .state('root.results', {
            url: 'results',
            views: {
                'modal@root': {
                    templateUrl: 'frontend/templates/results.html',
                    controller: 'ResultsCtrl'
                }
            }
        })
})

app.controller('HomeCtrl', function ($scope, $http, $state, LocationService) {
    $scope.user = {};
    $scope.amenities = [];

    $scope.$watch('amenities');

    $scope.submit = function(user, $event) {
        var loadingClass = 'star-loading';
        var starEl = angular.element($event.currentTarget).find('md-icon')[0];

        starEl.classList.add(loadingClass);

        LocationService.get().then(function(res) {

            $http.get('fakedata/test.json').then(function(response) {
                $scope.amenities = response.data;
                starEl.classList.remove(loadingClass);
                $state.transitionTo('root.results');
            })
        })
    };
});

app.controller('ResultsCtrl', function($scope, $state) {
    $scope.amenities = $scope.$parent.amenities;

    $scope.close = function() {
        $state.transitionTo('root');
    };

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
