var accountApp = angular.module('accountApp', ["ui.router"]);

accountApp.factory('appFactory',['$http',
	function($http){
		var dataFactory = {};
		dataFactory.getLoginDetails = function(){
			var messageInformationReq = {
				method :'GET',
				url : 'http://vivre.manky.me:3000/users/me?token="123"',
				dataType : "json"
		};
		return $http(messageInformationReq);
	};
	
	return dataFactory;
	
}]);

accountApp.service('appService',['appFactory',
	function(appFactory){
		var service = {};

		service.getLoginDetails = function(callback){

			appFactory.getLoginDetails().success(function(response){
			var raw_json = JSON.stringify(response);
			var parsed_json = JSON.parse(raw_json);
			
					callback(parsed_json);
			
			return true;
		}).error(function() {
			callback(false);
		}) ;
		}
	return service;
}]);


accountApp.controller('mainController',['$scope', 'appService', 'appFactory',$location,$window, function($scope,appService,appFactory,$location,$window){
	 $scope.editorOptions = {
        lineWrapping : true,
        lineNumbers: true,
        
        mode: 'text/x-csrc',
    };

    $scope.user = {};
    $scope.getlogin = function(){
    	alert('lol')
    	console.log("checking");
    	appService.getLoginDetails(function(response) {
    		console.log("response " + response);
    	})};

}]);