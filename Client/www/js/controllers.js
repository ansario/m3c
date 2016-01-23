angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $state) {

  $scope.create = function() {
    $state.go('qr');
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

.controller('CreateCtrl', function($scope, $cordovaCamera, $ionicPopup, QRID, $http) {

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

    $scope.save = function() {
      getAllDataAsJson();

      $http ({
          url: 'http://ansario.com:3000/create',
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
});
