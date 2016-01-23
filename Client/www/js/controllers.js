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


.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('CreateCtrl', function($scope, $cordovaCamera, $cordovaGeolocation) {

  var clicked_id = "";

  $scope.ShowClass = function(event)
  {
    clicked_id = event.target.class;
  }
  $scope.takePicture = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 300,
            targetHeight: 300,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false
        };

        $cordovaCamera.getPicture(options).then(function(imageData) {
            $scope.imgURI = "data:image/jpeg;base64," + imageData;
        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

  //var posOptions = {timeout: 10000, enableHighAccuracy: false};
  //$cordovaGeolocation
  //  .getCurrentPosition(posOptions)
  //  .then(function (position) {
  //    var lat  = position.coords.latitude
  //    var long = position.coords.longitude
  //  }, function(err) {
  //    // error
  //  });


  $scope.getLoc = function() {

   $cordovaGeolocation
     .getCurrentPosition()
     .then(function(position) {
       var lat = position.coords.latitude;
       var long = position.coords.longitude;

       var latString = lat.toString();
       var longString = long.toString();
       $scope.geoString  = "(" + latString + "," + longString + ")";


       console.log($scope.lat);
       console.log($scope.long);
       console.log($scope.geoString);
     }, function(err) {

       //An error occurred. Show message to the user
     });


  }

});
