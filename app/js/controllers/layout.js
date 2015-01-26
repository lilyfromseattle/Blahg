var homeControllerModule = angular.module('homeControllerModule', []);

homeControllerModule.controller('homeController', ['$scope', '$http', function($scope, $http) {
  $scope.hello = "Hi";

  $http.get('http://localhost:3000/posts')
  .success(function(data){
    $scope.posts = data;
  })

  var promise = $http.get('http://localhost:3000/posts')
  promise.success()

$http.get('http://localhost:3000/tags')
.success(function(data){
  $scope.tags = data;
});

$scope.getTagName = function(id) {
  var ret = "";

  for (i = 0; i < $scope.tags.length; i++){

    if(id == $scope.tags[i].id) {
      ret = $scope.tags[i].name
    }
  }
  return ret;
}

$scope.newPost = {"title": '', "content": '', "tag_ids": []}

$scope.submitNewPost = function(){

  var postToPush = {};
  postToPush.title = $scope.newPost.title;
  postToPush.content = $scope.newPost.content;
  // postToPush.date = Date.now;
  postToPush.tag_ids = [];
  for (i = 0; i < $scope.newPost.tag_ids.length; i++){
    tag = $scope.newPost.tag_ids[i];
    postToPush.tag_ids.push(tag);
  }
  $scope.posts.push(postToPush);

  $http.post('http://localhost:3000/posts',
{
  post: {
    title: $scope.newPost.title,
    content: $scope.newPost.content,
    date: Date.now()
  }
}
)
}

$scope.toggleId = function(id) {
  var i = $scope.newPost.tag_ids.indexOf(id);


  if(i == -1) {
    $scope.newPost.tag_ids.push(id);
  } else {
    $scope.newPost.tag_ids.splice(i, 1);
  }
}

$scope.tagArray = [];


$scope.addTag = function(id) {
  var i = $scope.tagArray.indexOf(id);

  if(i == -1) {
    $scope.tagArray.push(id);
  } else {
    $scope.tagArray.splice(i, 1);
  }
}
}]);


homeControllerModule.filter('selectedTags', function() {
  return function(posts, tagArray) {
    return posts.filter(function(post) {
      if(tagArray.length === 0) {
        return true;
      } else {
        for(var i = 0; i < tagArray.length; i++){
          if(post.tag_ids.indexOf(tagArray[i]) === -1){
            return false;
          }
        }
      }
      return true;
    })
  }
})

angular.module('ui.bootstrap.demo').controller('ButtonsCtrl', function ($scope) {
  $scope.singleModel = 1;

  $scope.radioModel = 'Middle';

  $scope.checkModel = {
    left: false,
    middle: true,
    right: false
  };
});

// var homeControllerModule = angular.module('homeControllerModule', []);
