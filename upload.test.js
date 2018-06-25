describe('Upload test->', function() {
  // console.log(angular.mock);
  beforeEach(module('myApp'));
  var $controller, $rootScope;

  beforeEach(inject(function(_$controller_, _$rootScope_){
    $controller = _$controller_;
    $rootScope = _$rootScope_;
  }));

  describe('options->', function() {
    it('check whether upload url is correct', function() {
      var $scope = $rootScope.$new();
      var controller = $controller('uploadController', { $scope: $scope });
      expect($scope.options.url).to.equal('https://upload.wistia.com');
    });

    it('check whether upload formData contains api password', function() {
      var $scope = $rootScope.$new();
      var controller = $controller('uploadController', { $scope: $scope });
      expect($scope.options.formData).to.include({api_password:'8fc0f6bee7c040d813ad2b36d7427e46a4b3e71975c34c11a2aa00c8380bacdf',project_id:'12srzcra5i'});
    });

  });

  describe('progress returns to 0 after uploading->', function() {
    it('initial progress is 0', function() {
      var $scope = $rootScope.$new();
      var controller = $controller('uploadController', { $scope: $scope });
      expect($scope.progress.loaded).to.equal(0);
    });

    it('progress returns to 0', function() {
      var $scope = $rootScope.$new();
      var controller = $controller('uploadController', { $scope: $scope });
      $scope.progress.loaded=50;
      controller.doneRequest({},{result:{hashed_id:"url"}})
      expect($scope.progress.loaded).to.equal(0);
    });

  });

  describe('uploading var changing to false after done->', function() {
    it('initial uploading is true', function() {
      var $scope = $rootScope.$new();
      var controller = $controller('uploadController', { $scope: $scope });
      expect($scope.uploading).to.equal(true);
    });

    it('loading changes to false', function() {
      var $scope = $rootScope.$new();
      var controller = $controller('uploadController', { $scope: $scope });
      controller.doneRequest({},{result:{hashed_id:"url"}})
      expect($scope.uploading).to.equal(false);
    });

  });

  describe('file upload properties->', function() {

    var fileUpload;
    beforeEach(inject(function(_fileUpload_){
      fileUpload=_fileUpload_;
    }));

    it('datatype is json', function() {
      var $scope = $rootScope.$new();
      var controller = $controller('uploadController', { $scope: $scope, fileUpload: fileUpload });
      expect(fileUpload.defaults.dataType).to.equal('json');
    });

    it('done is equal to vm.doneRequest', function() {
      var $scope = $rootScope.$new();
      var controller = $controller('uploadController', { $scope: $scope, fileUpload: fileUpload });
      expect(fileUpload.defaults.done.toString()).to.equal(controller.doneRequest.toString());
    });

  });

  describe('file upload url->', function() {

    var fileUpload;
    beforeEach(inject(function(_fileUpload_){
      fileUpload=_fileUpload_;
    }));

    it('correct url is generated', function() {
      var $scope = $rootScope.$new();
      var controller = $controller('uploadController', { $scope: $scope, fileUpload: fileUpload });
      fileUpload.defaults.done({},{result:{hashed_id:"url"}});
      expect($scope.video_url).to.equal('https://fast.wistia.net/embed/iframe/url');
    });

  });

  describe('file upload error->', function() {

    var fileUpload;
    beforeEach(inject(function(_fileUpload_){
      fileUpload=_fileUpload_;
    }));

    it('error is initialised false', function() {
      var $scope = $rootScope.$new();
      var controller = $controller('uploadController', { $scope: $scope, fileUpload: fileUpload });
      expect($scope.error_upload).to.equal(false);
    });

    it('error is returned', function() {
      var $scope = $rootScope.$new();
      var controller = $controller('uploadController', { $scope: $scope, fileUpload: fileUpload });
      fileUpload.defaults.done({},{error:"new error"});
      expect($scope.error_upload).to.equal(true);
      expect($scope.error_message).to.equal('new error');
    });

  });


});
