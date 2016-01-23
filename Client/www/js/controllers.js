angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state) {

  $scope.create = function() {
    $state.go('create');
  }
})

.controller('RegisterCtrl', function($scope, $http, $state) {


    $scope.data = {}

    $scope.register = function() {
    // username = $scope.data.username,
    // pw = $scope.data.password

    var emailaddress = $scope.data.emailaddress;
    var password = $scope.data.password;
    var confirmpassword = $scope.data.confirmpassword;

    console.log(emailaddress);
    console.log(password);

    // return $state.go('tab.dash');
    $http ({
        url: 'http://ansario.com:3000/signup',
        method: 'POST',
        data: "&email="+encodeURIComponent(emailaddress) +"&password="+encodeURIComponent(password),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(function(data) {

        // if (data.data.token) {
          // sessionStorage.setItem("token",data.data.token);
          // return $state.go('tab.dash');
          return $state.go('login');
        // } else {
        // }
      })
   }


})

.controller('LoginCtrl', function($scope, $state, $http) {
    $scope.data = {}


    $scope.login = function() {
    emailaddress = $scope.data.emailaddress;
    password = $scope.data.password;


    $http ({
        url: 'http://ansario.com:3000/login',
        method: 'POST',
        data: "email="+encodeURIComponent(emailaddress)+"&password="+encodeURIComponent(password),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(function(data) {

        if (data.data.token) {
          sessionStorage.setItem("token",data.data.token);
          return $state.go('tab.dash');
        } else {
          return $state.go('login');
        }
      })
   }
})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('CreateCtrl', function($scope) {
  $scope.groups = [];
  // for (var i=0; i<10; i++) {
  //   $scope.groups[i] = {
  //     name: i,
  //     items: []
  //   };
  //   for (var j=0; j<3; j++) {
  //     $scope.groups[i].items.push(i + '-' + j);
  //   }
  // }

  $scope.groups = [
    {
      name: "Identity/Status/Location", items:
        [
          "Tets"
        ]
      }
  ]

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
});
