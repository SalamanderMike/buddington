Crtl = angular.module('Controllers', []);

Crtl.controller('AppController', function ($scope, $rootScope, $interval) {
// SCOPE VARIABLES
	var app = this;
	var image = 1;
	var random;
	$scope.focusFocus = false;
	$scope.CONTACT = false;
	$scope.views = {
		HOME: false,
		SERVICES: false,
		PRODUCTS: false,
		NEWS: false,
		ABOUT: true
	}




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
		if (tab == 'CONTACT') {
			$scope.CONTACT = true;
		}
		$scope.views = views;
	}



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


});
