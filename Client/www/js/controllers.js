angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state) {

    $scope.create = function() {
        $state.go('qr-create');
    }

    $scope.update = function() {
        $state.go('qr-update');
    }
})

.controller('CreateQRCtrl', function($scope, $state, $cordovaBarcodeScanner, QRID) {

    document.addEventListener("deviceready", function() {

        $cordovaBarcodeScanner
            .scan()
            .then(function(barcodeData) {
                QRID.setID(barcodeData.text);
                $state.go('create');
            }, function(error) {
                // An error occurred
            });

    }, false);


  $scope.goBack = function (){
    $state.go('tab.dash')
  }
})


.controller('UpdateQRCtrl', function($scope, $state, $cordovaBarcodeScanner, QRID) {

    document.addEventListener("deviceready", function() {

        $cordovaBarcodeScanner
            .scan()
            .then(function(barcodeData) {
                QRID.setID(barcodeData.text);
                $state.go('update');
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
        $http({
            url: 'http://45.79.159.147:3000/signup',
            method: 'POST',
            data: "&email=" + encodeURIComponent(emailaddress) + "&password=" + encodeURIComponent(password),
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

  $scope.goBack = function () {
    $state.go('login');
  }


})

.controller('LoginCtrl', function($scope, $state, $http) {
    $scope.data = {};


    $scope.login = function() {
        emailaddress = $scope.data.emailaddress;
        password = $scope.data.password;
        emailaddress = emailaddress.toLowerCase();

        $http({
            url: 'http://45.79.159.147:3000/login',
            method: 'POST',
            data: "email=" + encodeURIComponent(emailaddress) + "&password=" + encodeURIComponent(password),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data) {

            if (data.data.token) {
                sessionStorage.setItem("token", data.data.token);
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





.controller('MapCtrl', function($scope, $cordovaGeolocation,$state) {


    $scope.la = sessionStorage.getItem("lat");
    $scope.lo = sessionStorage.getItem("long");

    $scope.goBack = function () {
      $state.go('tab.dash');
    }


})



//.controller('MapCtrl', function($scope, $ionicLoading, $compile) {
//
//})

.controller('UpdateCtrl', function($scope, $cordovaCamera, $cordovaGeolocation, QRID, $http) {


    $http({
        url: 'http://45.79.159.147:3000/users?id=' + "Hello World",
        method: 'GET',

        //data: "email="+encodeURIComponent(emailaddress)+"&password="+encodeURIComponent(password),
        // headers: {
        //   'Content-Type': 'application/json',
        // },
    }).then(function(data) {


        $scope.user = data.user;

        console.log(data);
        // if (data.data.token) {
        //   sessionStorage.setItem("token",data.data.token);
        return $state.go('tab.dash');
        // } else {
        //   return $state.go('login');
        // }
    })
})


.controller('CreateCtrl', function($scope, $cordovaCamera, $cordovaGeolocation, $ionicPopup, QRID, $http, $ionicModal, $state) {

    $scope.descriptionFields = [{
        'key': 'body_condition',
        'name': 'Body Condition',
        'value': 'Unknown',
        'options': ['Complete Body', 'Incomplete Body', 'Body Part']
      },
      {
        'key': 'general_condition',
        'name': 'General Condition',
        'value': 'Unknown',
        'options': ['Well Preserved', 'Decomposed', 'Partionally Skeletonized', 'Skeletonized']
      },
      {
        'key': 'apparent_sex',
        'name': 'Apparent Sex',
        'value': 'Unknown',
        'options': ['Male', 'Female', 'Probably Male', 'Probably Female']
      },
      {
        'key': 'age_group',
        'name': 'Age Group',
        'value': 'Unknown',
        'options': ['Infant', 'Child', 'Adolescent', 'Adult', 'Elderly']
      },
      {
        'key': 'height',
        'name': 'Height',
        'value': 'Unknown',
        'options': ['Average', 'Short', 'Tall']
      },
      {
        'key': 'weight',
        'name': 'Weight',
        'value': 'Unknown',
        'options': ['Average', 'Slim', 'Fat']
      },
      {
        'key': 'eye_color',
        'name': 'Eye Color',
        'value': 'Unknown',
        'options': ['Brown', 'Blue', 'Green', 'Gray', 'Black', 'Hazel']
      },
      {
        'key': 'head_hair_color',
        'name': 'Hair Color',
        'value': 'Unknown',
        'options': ['Blonde', 'Brown', 'Black', 'Red', 'Gray']
      },
      {
        'key': 'head_hair_length',
        'name': 'Hair Length',
        'value': 'Unknown',
        'options': ['Short', 'Mid-length', 'Long']
      },
      {
        'key': 'facial_hair',
        'name': 'Facial Hair',
        'value': 'Unknown',
        'options': ['None', 'Both beard and mustache', 'Beard', 'Mustache']
      },
      {
        'key': 'race',
        'name': 'Race',
        'value': 'Unknown',
        'options': ['White', 'Black', 'Asian/Pacific Islander', 'Other']
      }
    ];

    $scope.identityField = {
      'key': 'possible_identity',
      'name': 'Possible Identity',
      'placeholder': 'John'
    };

    $scope.statusField = {
      'key': 'status',
      'name': 'Status',
      'value': 'Unknown',
      'options': ['Field', 'Transit', 'Storage', 'Internment', 'Released']
    };

    $scope.evidenceFields = [
      {
        'key': 'clothing',
        'name': 'Clothing',
        'placeholder': 'Victim was wearing a red jacket...'
      },
      {
        'key': 'footwear',
        'name': 'Footwear',
        'placeholder': 'Victim was wearing steel toed boots...'
      },
      {
        'key': 'eyewear',
        'name': 'Eyewear',
        'placeholder': 'Victim was not wearing any eyewear...'
      },
      {
        'key': 'personal_items',
        'name': 'Personal Items',
        'placeholder': 'Victim was found with a cell phone...'
      },
      {
        'key': 'identity_documents',
        'name': 'Identity Documents',
        'placeholder': 'Victim had a passport on her person...'
      }
    ];

    var getAllDataAsJson = function () {
      var jsonObj = {};

      // get id/status/location data
      jsonObj['qr_id'] = $scope.qrid;
      jsonObj['possible_identity'] = $scope.identityField.value;
      jsonObj['status'] = $scope.statusField.value;
      jsonObj['geotag'] = {
        'latitude': $scope.latString,
        'longitude': $scope.longString
      };


      // get all physical description data points
      jsonObj['physical_description'] = $scope.descriptionFields.reduce(function (m, v) {
        m[v.key] = v.value;
        return m;
      }, {});

      // get all associated evidence fields
      jsonObj['associated_evidence'] = $scope.evidenceFields.reduce(function (m, v) {
        m[v.key] = v.value;
        return m;
      }, {});

      // get picture data
      jsonObj['recorded_information'] = $scope.pictures;

      //console.log(jsonObj);
      return jsonObj;
    };


    $scope.qrid = QRID.getID();
    $scope.pictures = {};

    $scope.takePicture = function (event) {
      var options = {
        quality: 75,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: Camera.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 300,
        targetHeight: 300,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $cordovaCamera.getPicture(options).then(function (imageData) {
        $scope.imgURI = "data:image/jpeg;base64," + imageData;
        var value = event.target.id;
        $scope.pictures[value] = $scope.imgURI;

      }, function (err) {
        // An error occured. Show a message to the user
      });
    };

    $scope.save = function () {
      var jsonObj = getAllDataAsJson();
      console.log(jsonObj);

        $http({
            url: 'http://45.79.159.147:3000/create',
            method: 'POST',
            data: jsonObj,
            //data: "email="+encodeURIComponent(emailaddress)+"&password="+encodeURIComponent(password),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(function(data) {

            // if (data.data.token) {
            //   sessionStorage.setItem("token",data.data.token);
            return $state.go('tab.dash');
            // } else {
            //   return $state.go('login');
            // }
        })
    };

    $scope.goBack = function () {
      $state.go('qr');
    }


    $scope.getLoc = function () {

      var latString = sessionStorage.getItem("lat").toString();
      var longString = sessionStorage.getItem("long").toString();
      $scope.geoString = "(" + latString + "," + longString + ")";


      console.log($scope.geoString);
    };


  });
