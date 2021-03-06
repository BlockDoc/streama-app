(function(){
  'use strict';

  angular.module('streama')
    .run(function($ionicPlatform, $rootScope, apiService, $state, localStorageService) {

      $rootScope.logout = logout;
      $rootScope.changeServerConnection = changeServerConnection;
      $rootScope.serverBasePath = localStorageService.get('streamaDomain');

      $ionicPlatform.ready(onPlatformReady);
      $rootScope.navLogo = '<img class="title-image" src="img/logo.png" />';


      function onPlatformReady() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          StatusBar.hide();
        }
      }

      function logout() {
        apiService.core.logout().then(function () {
          $state.go('setup');
        });
      }

      function changeServerConnection() {
        apiService.core.logout().then(function () {
          apiService.setBasePath(null);
          localStorageService.remove('streamaDomain');
          $state.go('setup');
        });
      }
    });
})();
