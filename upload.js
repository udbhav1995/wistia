app.controller("uploadController",["$scope","fileUpload","$sce",function(sc,fu,sce) {
  var vm=this;
  sc.options={
    url: 'https://upload.wistia.com',
    formData:{
      api_password:'8fc0f6bee7c040d813ad2b36d7427e46a4b3e71975c34c11a2aa00c8380bacdf',
      project_id:'12srzcra5i'
    }
  };
  sc.progress={};
  sc.progress.loaded=0;

  sc.error_upload=false;
  sc.uploading=true;
  sc.video_src=sce.trustAsResourceUrl('https://fast.wistia.net/embed/iframe/avk9twrrbn');

  vm.doneRequest=function (e, data) {
    if(data && !data.error){
      sc.progress.loaded=0;
      sc.uploading=false;
      if(typeof data != 'undefined' && typeof data.result != 'undefined' && typeof data.result.hashed_id != 'undefined'){
        sc.video_url="https://fast.wistia.net/embed/iframe/"+data.result.hashed_id;
      }
      else {
        sc.video_url='https://fast.wistia.net/embed/iframe/avk9twrrbn';
      }
      sc.video_src=sce.trustAsResourceUrl(sc.video_url);
    }
    else{
      sc.progress.loaded=0;
      sc.error_upload=true
      sc.error_message=data.error;
    }
  }

  fu.defaults={
    dataType:'json',
    add:function(e,data){
      sc.progress=data.progress();
      data.submit();
    },
    done: vm.doneRequest
  }


}])
