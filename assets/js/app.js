// Configuration des routes du module
angular.module('CrudApp', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      //utilisateurs
      when('/users', {templateUrl: 'assets/tpl/lists.html', controller: ListCtrl}).      
      when('/add-user', {templateUrl: 'assets/tpl/add-new.html', controller: AddCtrl}).      
      when('/edit/:id', {templateUrl: 'assets/tpl/edit.html', controller: EditCtrl}).
      //artists
      when('/artists', {templateUrl: 'assets/tpl/lists_artists.html', controller: ListArtistsCtrl}).
      when('/add-artist', {templateUrl: 'assets/tpl/add-new-artist.html', controller: AddArtistCtrl}).
      when('/edit-artist/:id', {templateUrl: 'assets/tpl/edit-artist.html', controller: EditArtistCtrl}).
      otherwise({redirectTo: '/'});
}]);

/* ------------------------------------------------------*/
// Controllers Listing
/* ------------------------------------------------------*/
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

/* ------------------------------------------------------*/
// Controller Ajout
/* ------------------------------------------------------*/
function AddCtrl($scope, $http, $location) {
  $scope.master = {};
  $scope.activePath = null;

  $scope.add_new = function(user, AddNewForm) {
    $http.post('api/add_user', user).success(function(){
      $scope.reset();
      $scope.activePath = $location.path('/users');
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

  $scope.add_new_artist = function(artist, AddNewArtistForm) {
    
    $http.post('api/add_artist', artist).success(function(){
        $scope.reset();
        $scope.activePath = $location.path('/artists');
    });

    $scope.reset = function() {
        $scope.artist = angular.copy($scope.master);
    };

    $scope.reset();

  };
}


/* ------------------------------------------------------*/
// Controller Edition
/* ------------------------------------------------------*/
function EditCtrl($scope, $http, $location, $routeParams) {
  var id = $routeParams.id;
  $scope.activePath = null;

  $http.get('api/users/'+id).success(function(data) {
    $scope.users = data;
  });

  $scope.update = function(user){
    $http.put('api/users/'+id, user).success(function(data) {
      $scope.users = data;
      $scope.activePath = $location.path('/users');
    });
  };

  $scope.delete = function(user) {
    var deleteUser = confirm('Are you absolutely sure you want to delete?');
    if (deleteUser) {
      $http.delete('api/users/'+user.id);
      $scope.activePath = $location.path('/users');
    }
  };
}

function EditArtistCtrl($scope, $http, $location, $routeParams) {
  var id = $routeParams.id;
  $scope.activePath = null;

  $http.get('api/artists/'+id).success(function(data) {
    $scope.artists = data;
  });

  $scope.updateArtist = function(artist){
    $http.put('api/artists/'+id, artist).success(function(data) {
      $scope.artists = data;
      $scope.activePath = $location.path('/artists');
    });
  };

  $scope.deleteArtist = function(artist) {
    var deleteArtist = confirm('Are you absolutely sure you want to delete?');
    if (deleteArtist) {
      $http.delete('api/artists/'+artist.id);
      $scope.activePath = $location.path('/artists');
    }
  };
}