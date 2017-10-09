var badugi = angular.module('badugi', ['ngRoute']);

badugi.config(function ($routeProvider) {
    
    $routeProvider
        .when('/login',
            {
                controller: 'LoginController',
                templateUrl: 'login.html'
            })
        .when('/register',
            {
            controller: 'RegisterController',
            templateUrl: 'register.html'
            })
        .when('/home',
            {
            controller: 'ProfilController',
            templateUrl: 'profil.html'
            }
        .when('/game',
            {
            controller: 'ProfilController',
            templateUrl: 'profil.html'
            }
        .otherwise({redirectTo: '/'});

});
              

badugi.controller('Login', function ($scope, $rootScope, $window, $http, $httpParamSerializer) {
    console.log("Login controller");
        
    $scope.loginFailed = false;
    $scope.credentials = {};
  
    $scope.login(){
       var request = {
           method: 'POST',
           url: '/api/login',
           headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
           data: $httpParamSerializer($scope.credentials)  
       };
        
         .then(function successCallback(response) {
                $rootScope.authenticated = true;
                $rootScope.user = response.data;
                $location.path('/');
                $scope.loginFailed = false;
            }, function errorCallback(response) {
                $scope.loginFailed = true;
            });
        
      };    
        
 $scope.logout = function() {
        $http
            .post('/api/logout', {})
            .success(function(response) {
                $rootScope.authenticated = false;
                $rootScope.user = {};
            })
            .error(function(err) {
                $rootScope.authenticated = true;
            });
    }
        
  
      
});