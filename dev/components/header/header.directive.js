angular.module("lotourApp").directive("headDirective",function(){
	return{
		templateUrl:"./components/header/header.html",
		restrict:"E",
		replace:true,
		scope:{
			backBtn:'@'
		},
		controller:function($scope){
             if ($scope.backBtn=='true'){
             	   $scope.backShow=true;
             }else{
             	   $scope.backShow=false;
             }
              
             $scope.getback = function(){
             	  history.go(-1)
             }
		}
	}
})


