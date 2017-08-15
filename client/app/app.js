var app = angular.module('myApp', ['ngRoute', 'controllers']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '../views/home.html'
        }).when('/list', {
            templateUrl: '../views/list.html'
        }).when('/single/one/:id', {
            templateUrl: '../views/single.html'
        }).when('/add', {
            templateUrl: '../views/add.html'
        }).when('/users', {
            templateUrl: '../views/users.html'
        }).when('/user/:user', {
            templateUrl: '../views/user.html'
        })

    }]);
    
var controlApp = angular.module('controllers', []);
controlApp.controller('chirpReq', function($scope, $http, $location, $routeParams) {
    $scope.goToSingle = function(id){
        $location.path("/single/one/" + id);           
    } 

    $scope.goToUser = function(users){
        $location.path("/user/" + users);           
    }
    
    $http.get('/api/chirps')
    .then(function (response) {
      $scope.chirpList = response.data;
    });

    $scope.deleteChirp = function(id){
        $scope.deleteChirp = function(id){
        $http.delete("/api/chirps/one/" + id)
            .success(function(response){
                $http.get('/api/chirps')
                .then(function (response) {
                $location.path("/list/"); 
            });
        });              
        };  
    }    
});    
  
controlApp.controller('postReq', function($scope, $http, $location, $routeParams) {
$scope.insertData = function(){
    if ($scope.user === '' || $scope.message === '') {
            alert('fill out all fields');
    }else{
        $http.post('/api/chirps', {'user': $scope.user,'message': $scope.message})
            .success(function(response){
            $scope.user = "";
            $scope.message = "";
            $location.path("/list/");           
            $http.get('/api/chirps')
                .then(function (response) {
                $scope.chirpList = response.data;
            });
        });
    }
    }
});

controlApp.controller("singleController", function($scope, $routeParams, $http, $location){
    var myId = $routeParams.id;    
    $http.get("/api/chirps/one/" + myId)
       .then(function (response) {
            $scope.singleChirp = response.data;
    });
    $scope.deleteChirp = function(id){
        $http.delete("/api/chirps/one/" + id)
            .success(function(response){
                $http.get('/api/chirps')
                .then(function (response) {
                $location.path("/list/"); 
            });
        });    
    }
}); 

controlApp.controller("userControl", function($scope, $http, $location){ 
    $http.get('/api/users')
    .then(function (response) {
        $scope.userList = response.data;
    });
});
    
controlApp.controller("singleUser", function($scope, $http, $routeParams, $location){ 
    $http.get('/api/chirps/user/' + $routeParams.user)
       .then(function (response) {
            $scope.oneUser = response.data;
        });  
        $scope.deleteData = function(user){
            $http.delete("/api/chirps/user/" + user)
            .success(function(response){
                $location.path("/list/"); 
        });             
    }
});

function goToNewPage(element) {
    // var EleValue = element.value;
    if(element.value == "Users"){
        window.location = "#/users/";
    }else{
        window.location = "#/user/" + element.value;
    }
}


function goToNewPage(element) {
    window.location = "#/user/" + element.value;
}