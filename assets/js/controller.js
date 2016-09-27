Crtl = angular.module('Controller', []);

Crtl.controller('AppController',['$scope', '$rootScope', '$http', '$interval', '$timeout', function ($scope, $rootScope, $http, $interval, $timeout) {
// SCOPE VARIABLES
	var app = this;
	var image = 1;
	var random;
	var map_auth;
	$scope.focusFocus = false;
	$scope.CONTACT = false;
	$scope.views = {
		HOME: true,
		SERVICES: false,
		PRODUCTS: false,
		NEWS: false,
		ABOUT: false
	}

	app.openPDF = function() {
		window.open('../resources/Orinda_News_0410.pdf','_blank');
	}


	$http.get('/config').then(function(response) {
		map_auth = "https://maps.googleapis.com/maps/api/js?key="+ response.data.result +"&callback=initMap";

		var googlMaps = angular.element('<script></script>');
		googlMaps.attr('src', map_auth);
	}).catch(function() {
		console.log("Could Not Find ENV Variable");
	});



// TEST AREA (HARD HAT REQUIRED)
	$scope.backgrounds = "background: url(../images/gallery-"+ image +".jpg) no-repeat center center fixed;background-size: cover;";

	random = $interval(function() {
		var image = Math.floor((Math.random()*5)+1)
		$scope.backgrounds = "background: url(../images/gallery-"+ image +".jpg) no-repeat center center fixed;background-size: cover;";
	}, 5000);
// END OF TEST AREA


// SECTION: NAV-TABS
	app.tabFunction = function(tab) {
		$scope.CONTACT = false;
		views = $scope.views;
		angular.forEach(Object.keys(views), function (page) {
			if (tab != page) {
				views[page] = false;
			} else {
				views[page] = true;
			};
		});
		$scope.views = views;
	};

	function initialize() {
		var LatLong = new google.maps.LatLng(37.8797452, -122.1814705);
		var mapOptions = { 
			center: LatLong,
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var marker = new google.maps.Marker({
		    position: LatLong,
		    title:"Hello World!"
		});
		map = new google.maps.Map(document.getElementById('map'), mapOptions);
		marker.setMap(map);
	};

	app.contact = function() {
		app.tabFunction('CONTACT');
		$scope.CONTACT = true;

		$timeout(function() {
			initialize();		
		},0)

	};



// SLIDING SIDE MENU
	$scope.leftVisible = false;
	$scope.rightVisible = false;

	app.close = function() {
		$scope.leftVisible = false;
		$scope.rightVisible = false;
	};

	app.showLeft = function(e) {
		$scope.leftVisible = true;
		e.stopPropagation();
	};

	app.showRight = function(e) {
		$scope.rightVisible = true;
		e.stopPropagation();
	}

	$rootScope.$on("documentClicked", _close);
	$rootScope.$on("escapePressed", _close);

	function _close() {
		$scope.$apply(function() {
			app.close(); 
		});
	}

	// function initialize() {
	// 	console.log("MAP!")
	// 	var mapCanvas = document.getElementById('map');
	// 	var mapOptions = {
	// 		center: new google.maps.LatLng(37.8797452,-122.1836645),
	// 		zoom: 10,
	// 		mapTypeId: google.maps.MapTypeId.ROADMAP
	// 	}
	// 	var map = new google.maps.Map(mapCanvas, mapOptions);
	// }




	// function initMap() {
	// 	var mapOptions = {
	// 		center: new google.maps.LatLng(37.879745,-122.181470),
	// 		zoom: 8,
	// 		mapTypeId: google.maps.MapTypeId.ROADMAP
	// 	};
	// 	var map = new google.maps.Map(document.getElementById("map"), mapOptions);
	// 	var geocoder = new google.maps.Geocoder();
	// 	geocoder.geocode({ 'address': "50 Vashell Way, Orinda, California 94563" }, function (results, status) {
	// 		if (status == google.maps.GeocoderStatus.OK) {
	// 			map.setCenter(results[0].geometry.location);
	// 			var marker = new google.maps.Marker({
	// 				map: map,
	// 				position: results[0].geometry.location,
	// 			});
	// 		} else 
	// 		alert("Problem with geolocation");

	// 	});
	// }
	// google.maps.event.addDomListener(window, 'load', initMap);

	  // app.map = function() {
	  // 	$timeout(function(){
			// console.log("MAP FUNCTION");
	  // 	}, 500)
	  // }





}]);
