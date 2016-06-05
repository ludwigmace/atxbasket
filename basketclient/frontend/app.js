var app = angular.module('app', ['ngMaterial', 'ui.router']);

// http://nominatim.openstreetmap.org/search?q=135+pilkington+avenue,+birmingham&format=json
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

app.controller('HomeCtrl', function ($scope, LocationService) {
    $scope.submit = function() {

    };
});

app.controller('ResultsCtrl', function($scope) {

});

app.service('LocationService', function($http, $q) {
    
    return {
        get: function(address) {
            if (address) {
                return geoCode(address);
            }
            return nativeGeoCoder(address);
        }
    }
})
