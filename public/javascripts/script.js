var userName;
var userImg;

console.log('loading');



var myApp = angular.module("myApp", ["firebase"]);

myApp.controller("chatController", ["$scope", "$firebaseArray",
 function ($scope, $firebaseArray) {
        var ref = firebase.database().ref().child("messages");
        $scope.chats = $firebaseArray(ref);

        $scope.update = function (user) {
            var newmessage = {
                from: userName || "Anonymous Armadillo",
                body: user.chat,
                img: userImg
            };
            console.log(newmessage);
            $scope.chats.$add(newmessage);
            user.chat = "";
        }
        
        firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        userName = user.displayName;
        userImg = user.photoURL;
        console.log(user.name + "signed in");
        $scope.userName = userName;
    }
});
 }
]);
