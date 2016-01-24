// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ngMap', 'ionic-material'])

.run(function($ionicPlatform, $cordovaGeolocation) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

      $cordovaGeolocation
        .getCurrentPosition()
        .then(function (position) {
          lati = position.coords.latitude;
          longi = position.coords.longitude;

          sessionStorage.setItem("lat", lati);
          sessionStorage.setItem("long", longi);

          console.log(lati);
          console.log(longi);

        })
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })


  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('login', {
    url: '/login',
    controller: 'LoginCtrl',
    templateUrl: 'templates/login.html'
  })

  .state('register', {
    url: '/register',
    controller: 'RegisterCtrl',
    templateUrl: 'templates/Register.html'
  })

  .state('qr-create', {
    url: '/qr-create',
    controller: 'CreateQRCtrl',
    templateUrl: 'templates/qr-create.html'
  })

  .state('qr-update', {
    url: '/qr-update',
    controller: 'UpdateQRCtrl',
    templateUrl: 'templates/qr-update.html'
  })

  .state('create', {
    url: '/create',
    controller: 'CreateCtrl',
    templateUrl: 'templates/create.html'
  })

  .state('update', {
    url: '/update',
    controller: 'CreateCtrl',
    templateUrl: 'templates/update.html'
  })

  .state('map', {
    url: '/map',
    controller: 'MapCtrl',
    templateUrl: 'templates/map.html'
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
