angular.module('CrudApp', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {templateUrl: 'assets/tpl/lists.html', controller: ListCtrl}).
      when('/artists', {templateUrl: 'assets/tpl/lists_artists.html', controller: ListArtistsCtrl}).
      when('/add-user', {templateUrl: 'assets/tpl/add-new.html', controller: AddCtrl}).
      when('/add-artist', {templateUrl: 'assets/tpl/add-new-artist.html', controller: AddArtistCtrl}).
      when('/edit/:id', {templateUrl: 'assets/tpl/edit.html', controller: EditCtrl}).
      otherwise({redirectTo: '/'});
}]);

function ListCtrl($scope, $http) {
  $http.get('api/users').success(function(data) {
    $scope.users = data;
  });
}

function ListArtistsCtrl($scope, $http) {
  $http.get('api/artists').success(function(data) {
    $scope.artists = data;
  });
}

function AddCtrl($scope, $http, $location) {
  $scope.master = {};
  $scope.activePath = null;

  $scope.add_new = function(user, AddNewForm) {

    $http.post('api/add_user', user).success(function(){
      $scope.reset();
      $scope.activePath = $location.path('/');
    });

    $scope.reset = function() {
      $scope.user = angular.copy($scope.master);
    };

    $scope.reset();

  };
}

function AddArtistCtrl($scope, $http, $location) {
  $scope.master = {};
  $scope.activePath = null;

  $scope.add_artist_new = function(artist, AddNewArtistForm) {

    $http.post('api/add_artist', artist).success(function(){
      $scope.reset();
      $scope.activePath = $location.path('/');
    });

    $scope.reset = function() {
      $scope.artist = angular.copy($scope.master);
    };

    $scope.reset();

  };
}

function EditCtrl($scope, $http, $location, $routeParams) {
  var id = $routeParams.id;
  $scope.activePath = null;

  $http.get('api/users/'+id).success(function(data) {
    $scope.users = data;
  });

  $scope.update = function(user){
    $http.put('api/users/'+id, user).success(function(data) {
      $scope.users = data;
      $scope.activePath = $location.path('/');
    });
  };

  $scope.delete = function(user) {
    console.log(user);

    var deleteUser = confirm('Are you absolutely sure you want to delete?');
    if (deleteUser) {
      $http.delete('api/users/'+user.id);
      $scope.activePath = $location.path('/');
    }
  };
}