angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state) {

  $scope.create = function() {
    $state.go('create');
    $state.go('map');
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


  //.controller('MapCtrl', function($scope) {
  //
  //})

  .controller('MapCtrl', function($scope, $ionicLoading, $compile) {
    //function initialize() {
    //  var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
    //
    //  var mapOptions = {
    //    center: myLatlng,
    //    zoom: 16,
    //    mapTypeId: google.maps.MapTypeId.ROADMAP
    //  };
    //  var map = new google.maps.Map(document.getElementById("map"),
    //    mapOptions);
    //
    //  //Marker + infowindow + angularjs compiled ng-click
    //  var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
    //  var compiled = $compile(contentString)($scope);
    //
    //  var infowindow = new google.maps.InfoWindow({
    //    content: compiled[0]
    //  });
    //
    //  var marker = new google.maps.Marker({
    //    position: myLatlng,
    //    map: map,
    //    title: 'Uluru (Ayers Rock)'
    //  });
    //
    //  google.maps.event.addListener(marker, 'click', function() {
    //    infowindow.open(map,marker);
    //  });
    //
    //  $scope.map = map;
    //}
    //google.maps.event.addDomListener(window, 'load', initialize);
    //
    //$scope.centerOnMe = function() {
    //  if(!$scope.map) {
    //    return;
    //  }
    //
    //  $scope.loading = $ionicLoading.show({
    //    content: 'Getting current location...',
    //    showBackdrop: false
    //  });
    //
    //  navigator.geolocation.getCurrentPosition(function(pos) {
    //    $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
    //    $scope.loading.hide();
    //  }, function(error) {
    //    alert('Unable to get location: ' + error.message);
    //  });
    //};
    //
    //$scope.clickTest = function() {
    //  alert('Example of infowindow with ng-click')
    //};

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
