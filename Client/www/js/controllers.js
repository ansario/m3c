angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state) {

  $scope.create = function() {

    $state.go('qr');

    // $state.go('create');
    // $state.go('map');

  }
})

.controller('QRCtrl', function($scope, $state, $cordovaBarcodeScanner, QRID) {

  document.addEventListener("deviceready", function () {

  $cordovaBarcodeScanner
    .scan()
    .then(function(barcodeData) {
      QRID.setID(barcodeData.text);
      $state.go('create');
    }, function(error) {
      // An error occurred
    });

}, false);

})

.controller('RegisterCtrl', function($scope, $http, $state) {


    $scope.data = {};

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
          'Content-Type': 'application/x-www-form-urlencoded'
        }
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
    $scope.data = {};


    $scope.login = function() {
    emailaddress = $scope.data.emailaddress;
    password = $scope.data.password;


    $http ({
        url: 'http://ansario.com:3000/login',
        method: 'POST',
        data: "email="+encodeURIComponent(emailaddress)+"&password="+encodeURIComponent(password),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
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


.controller('CreateCtrl', function($scope, $cordovaCamera, $cordovaGeolocation, NgMap, QRID, $ionicModal) {
  NgMap.getMap().then(function(map) {
    console.log(map.getCenter());
    console.log('markers', map.markers);
    console.log('shapes', map.shapes);
  });

  $scope.descriptionFields = [
    { 'key':'body_condition',
      'name': 'Body Condition',
      'value': 'Unknown',
      'options': ['Complete Body', 'Incomplete Body', 'Body Part']
    },
    { 'key':'general_condition',
      'name': 'General Condition',
      'value': 'Unknown',
      'options': ['Well Preserved', 'Decomposed', 'Partionally Skeletonized', 'Skeletonized']
    },
    { 'key':'apparent_sex',
      'name': 'Apparent Sex',
      'value': 'Unknown',
      'options': ['Male', 'Female', 'Probably Male', 'Probably Female']
    },
    { 'key':'age_group',
      'name': 'Age Group',
      'value': 'Unknown',
      'options': ['Infant', 'Child', 'Adolescent', 'Adult', 'Elderly']
    },
    { 'key':'height',
      'name': 'Height',
      'value': 'Unknown',
      'options': ['Average', 'Short', 'Tall']
    },
    { 'key':'weight',
      'name': 'Weight',
      'value': 'Unknown',
      'options': ['Average', 'Slim', 'Fat']
    },
    { 'key':'eye_color',
      'name': 'Eye Color',
      'value': 'Unknown',
      'options': ['Brown', 'Blue', 'Green', 'Gray', 'Black', 'Hazel']
    },
    { 'key':'head_hair_color',
      'name': 'Hair Color',
      'value': 'Unknown',
      'options': ['Blonde', 'Brown', 'Black', 'Red','Gray']
    },
    { 'key':'head_hair_length',
      'name': 'Hair Length',
      'value': 'Unknown',
      'options': ['Short', 'Mid-length', 'Long']
    },
    { 'key':'facial_hair',
      'name': 'Facial Hair',
      'value': 'Unknown',
      'options': ['None', 'Both beard and mustache', 'Beard', 'Mustache']
    },
    { 'key':'race',
      'name': 'Race',
      'value': 'Unknown',
      'options': ['White', 'Black', 'Asian/Pacific Islander', 'Other']
    }
  ];

  $scope.identityField = {
    'key':'possible_identity',
    'name':'Possible Identity',
    'placeholder':'John'
  };

  $scope.statusField = {
    'key': 'status',
    'name': 'Status',
    'value': 'Unknown',
    'options': ['Field', 'Transit', 'Storage', 'Internment', 'Released']
  };

  $scope.evidenceFields = [
    { 'key': 'clothing',
      'name': 'Clothing',
      'placeholder':'Victim was wearing a red jacket...'
    },
    { 'key': 'footwear',
      'name': 'Footwear',
      'placeholder':'Victim was wearing steel toed boots...'
    },
    { 'key': 'eyewear',
      'name': 'Eyewear',
      'placeholder':'Victim was not wearing any eyewear...'
    },
    { 'key': 'personal_items',
      'name': 'Personal Items',
      'placeholder':'Victim was found with a cell phone...'
    },
    { 'key': 'identity_documents',
      'name': 'Identity Documents',
      'placeholder':'Victim had a passport on her person...'
    }
  ];

  var getAllDataAsJson = function() {
    var jsonObj = {};

    // get id/status/location data
    jsonObj['possible_identity'] = $scope.identityField.value;
    jsonObj['status'] = $scope.statusField.value;

    // get all physical description data points
    jsonObj['physical_description'] = $scope.descriptionFields.reduce(function(m, v) {
      m[v.key] = v.value;
      return m;
    }, {});

    // get all associated evidence fields
    jsonObj['associated_evidence'] = $scope.evidenceFields.reduce(function(m, v) {
      m[v.key] = v.value;
      return m;
    }, {});
    //console.log(jsonObj);
    return jsonObj;
  };



  $scope.qrid = QRID.getID();
  $scope.pictures = [];
  var jsonVariable = {};
  $scope.takePicture = function(event) {
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
            var value = event.target.id;
            jsonVariable[value] = $scope.imgURI;
            $scope.pictures.push(jsonVariable);

        }, function(err) {
            // An error occured. Show a message to the user
        });
    }

    $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  $scope.openModal = function() {
    $scope.modal.show();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  //Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

    $scope.save = function() {
      var jsonObj = getAllDataAsJson();

      $http ({
          url: 'http://ansario.com:3000/create',
          method: 'POST',
          data: jsonObj,
          //data: "email="+encodeURIComponent(emailaddress)+"&password="+encodeURIComponent(password),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(function(data) {

          // if (data.data.token) {
          //   sessionStorage.setItem("token",data.data.token);
          //   return $state.go('tab.dash');
          // } else {
          //   return $state.go('login');
          // }
        })
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
