'use strict';

var app=angular.module('myApp', [
  "blueimp.fileupload"
]).
config(['$locationProvider','$httpProvider', function(lp,hp) {
  lp.hashPrefix('!');
  // set all post requests content type
  hp.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
}]);
