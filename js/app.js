/**
 * Created by morrykang on 6/24/15.
 */
(function() {
    var app = angular.module('myApp', ['ui.bootstrap','ngSanitize']);

    app.factory('Data', ['$http',function DataFactory ($http){

        return $http.get('/reviews.json');
    }]);

    app.controller("businessController",['$scope','Data',function($scope,Data){

        $scope.reviewInfo = {};
        $scope.rate = 0;
        $scope.max = 5;
        $scope.isReadonly = true;
        $scope.ratingStates = [
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'}
        ];
        $scope.address = '';
        Data.success(function(data){
            $scope.reviewInfo = data;
            $scope.rate = parseInt(data.business_info.total_rating.total_avg_rating);
            $scope.address = data.business_info.business_address.replace('<br>', ' ');
        });

    }]);

    app.controller('PaginationDemoCtrl', ['$scope','Data', function ($scope,Data) {

        $scope.reviewInfo = {};
        //for rating stars
        $scope.isReadonly = true;
        $scope.ratingStates = [
            {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'}
        ];
        //pagination
        $scope.maxSize = 5;
        //$scope.numPages = Math.ceil($scope.bigTotalItems/10);
        $scope.bigCurrentPage = 1;
        $scope.filteredReviews = {};
        Data.success(function(data){
            $scope.reviewInfo = data;

        });

        $scope.setPage = function (pageNo) {
            $scope.bigCurrentPage = pageNo;
        };

    }]);

    app.directive('reviews',function(){

        return {
            restrict: 'E',
            templateUrl: 'reviews.html',
        }

    });

    app.directive('business',function(){

        return {
            restrict: 'E',
            templateUrl: 'business.html',
        }
    });

    app.filter('startFrom', function() {
        return function(input, start) {
            start = +start; //parse to int
            return input.slice(start);
        }
    });
})();