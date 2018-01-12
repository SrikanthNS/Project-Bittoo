angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {   

  $scope.flipin = function(){    
    $('.flipper').addClass('flip');
    $('.more-back').show();
    $('.more-front').hide();
  };

  $scope.flipout = function(){
    $('.flipper').removeClass('flip');
    $('.more-front').show();
    $('.more-back').hide();
    
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

.controller('GalleryCtrl', function($scope, $ionicBackdrop, $ionicModal, $ionicSlideBoxDelegate, $ionicScrollDelegate) {
 
 $scope.allImages = [{
    src: 'https://s3.amazonaws.com/bittoopics/photo_2016-06-15_20-41-49.jpg'
  }, {
    src: 'https://s3.amazonaws.com/bittoopics/photo_2016-06-15_21-13-33.jpg'
  },{
    src: 'https://s3.amazonaws.com/bittoopics/photo_2016-06-17_13-33-20.jpg'
  },{
    src: 'https://s3.amazonaws.com/bittoopics/IMG-20160409-WA0006.jpg'
  },{
    src: 'https://s3.amazonaws.com/bittoopics/IMG_20151016_183634332.jpg'
  },{
    src: 'https://s3.amazonaws.com/bittoopics/BeautyPlus_20160520122753_save.jpg'
  },{
    src: 'https://s3.amazonaws.com/bittoopics/IMG_20160514_143716977.jpg'
  },{
    src: 'https://s3.amazonaws.com/bittoopics/imageedit_1_4087605655.jpg'
  },{
    src: 'https://s3.amazonaws.com/bittoopics/photo_2016-06-15_20-41-41.jpg'
  },{
    src: 'https://s3.amazonaws.com/bittoopics/photo_2016-06-15_20-40-35.jpg'
  },{
    src: 'https://s3.amazonaws.com/bittoopics/photo_2016-06-17_13-33-16.jpg'
  },{
    src: 'https://s3.amazonaws.com/bittoopics/photo_2016-06-15_20-40-50.jpg'
  },{
    src: 'https://s3.amazonaws.com/bittoopics/photo_2016-06-15_20-41-09.jpg'
  },{
    src: 'https://s3.amazonaws.com/bittoopics/photo_2016-06-15_20-41-20.jpg'
  },{
    src: 'https://s3.amazonaws.com/bittoopics/photo_2016-06-15_20-41-23.jpg'
  },{
    src: 'https://s3.amazonaws.com/bittoopics/photo_2016-06-15_20-41-35.jpg'
  }
  ]; 

  $scope.images_set1 = [{
    src: $scope.allImages[0].src
  }, {
    src: $scope.allImages[1].src
  },{
    src: $scope.allImages[2].src
  },{
    src: $scope.allImages[3].src
  }];

  $scope.images_set2 = [{
    src: $scope.allImages[4].src
  }, {
    src: $scope.allImages[5].src
  },{
    src: $scope.allImages[6].src
  },{
    src: $scope.allImages[7].src
  }];

  $scope.images_set3 = [{
    src: $scope.allImages[8].src
  }, {
    src: $scope.allImages[9].src
  },{
    src: $scope.allImages[10].src
  },{
    src: $scope.allImages[11].src
  }];

  $scope.images_set4 = [{
    src: $scope.allImages[12].src
  }, {
    src: $scope.allImages[13].src
  },{
    src: $scope.allImages[14].src
  },{
    src: $scope.allImages[15].src
  }];

  
  $scope.zoomMin = 1;  

  $scope.showImages = function(num, index) {
    $scope.activeSlide = (num * 4)+index;
    $scope.showModal('templates/gallery-zoomview.html');
  };
   
  $scope.showModal = function(templateUrl) {
    $ionicModal.fromTemplateUrl(templateUrl, {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    });
  }
   
  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.modal.remove()
  };
   
  $scope.updateSlideStatus = function(slide) {
    var zoomFactor = $ionicScrollDelegate.$getByHandle('scrollHandle' + slide).getScrollPosition().zoom;
    if (zoomFactor == $scope.zoomMin) {
      $ionicSlideBoxDelegate.enableSlide(true);
    } else {
      $ionicSlideBoxDelegate.enableSlide(false);
    }
  };
})

.controller('MapCtrl', function($scope, $state, $cordovaGeolocation, $timeout) {
  var options = {timeout: 10000, enableHighAccuracy: true};
 
  $cordovaGeolocation.getCurrentPosition(options).then(function(position){
 
    var Current_lat_lng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var cur_lat = position.coords.latitude;
    var cur_lng = position.coords.longitude
    var latLng = new google.maps.LatLng(13.4317009, 77.7228264);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
 
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
      
    google.maps.event.addListenerOnce($scope.map, 'idle', function(){
 
      var marker = new google.maps.Marker({
          map: $scope.map,
          animation: google.maps.Animation.DROP,
          position: latLng
      });      
      

      var address = '<address> \
        Vasavi Kalyana Mantapa,<br> \
        DBM Road, Chikballapur Rural,<br> \
        Karnataka - 561207<br> \
        <i style="color:green"> \
         on 23rd June, Thursday @ 11:30 AM </i> \
        </address><br> \
        <a href="geo:cur_lat,cur_lng?q=13.4317009,77.7228264">Open in Google maps</a>';

       var infoWindow = new google.maps.InfoWindow({
          content: address
      }); 
       
      $timeout(function() {          
          infoWindow.open($scope.map, marker);
          
      }, 2000);
      google.maps.event.addListener(marker, 'click', function () {
          infoWindow.open($scope.map, marker);
      });
     
    });



  }, function(error){
    console.log("Could not get location");
    alert("Location is off")
  });
})


.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});