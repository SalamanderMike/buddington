Crtl = angular.module('Controller', []);

Crtl.controller('AppController',['$scope', '$rootScope', '$http', '$interval', '$timeout', function ($scope, $rootScope, $http, $interval, $timeout) {
	var app = this;
	var image = 1;
	var random;
	var location,
		mapOptions,
		marker,
		map;
	$scope.focusFocus = false;
	$scope.CONTACT = false;
	$scope.views = {
		HOME: true,
		SERVICES: false,
		PRODUCTS: false,
		NEWS: false,
		ABOUT: false
	};

// GOOGLE MAPS
	(function() {
		$http.get('/config').then(function(response) {
			var map_auth = "https://maps.googleapis.com/maps/api/js?key="+ response.data;
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = map_auth;
			document.body.appendChild(script);
		}), function(err) {
			console.log("Could Not Find ENV Variable", err);
		};
	})();

	function initMap() {
		location = new google.maps.LatLng(37.8797452, -122.1814705);
		mapOptions = { 
			center: location,
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		marker = new google.maps.Marker({
			position: location,
			title:"Med Esthetics Rx"
		});
	};
	$timeout(function() {
		initMap();		
	},500)

	app.refreshMaps = function() {
		$timeout(function() {
			map = new google.maps.Map(document.getElementById('map'), mapOptions);	
		},0).then(function() {
			google.maps.event.addListenerOnce(map, 'idle', function() {
				google.maps.event.trigger(map, 'resize');
				marker.setMap(map);
			});
		})
	};


// CONTROLS
	app.contact = function() {
		app.tabFunction('CONTACT');
		$scope.CONTACT = true;
		app.refreshMaps();
	};

	app.openPDF = function() {
		window.open('../resources/Orinda_News_0410.pdf','_blank');
	};


// TEST AREA (HARD HAT REQUIRED)
	// $scope.backgrounds = "background: url(../images/gallery-"+ image +".jpg) no-repeat center center fixed;background-size: cover;";

	// random = $interval(function() {
	// 	var image = Math.floor((Math.random()*5)+1)
	// 	$scope.backgrounds = "background: url(../images/gallery-"+ image +".jpg) no-repeat center center fixed;background-size: cover;";
	// }, 5000);
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
	};

	$rootScope.$on("documentClicked", _close);
	$rootScope.$on("escapePressed", _close);

	function _close() {
		$scope.$apply(function() {
			app.close(); 
		});
	};
}]);
