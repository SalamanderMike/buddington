Crtl = angular.module('Controllers', []);

Crtl.controller('AppController', function ($scope, $rootScope, $interval, $translate) {
// SCOPE VARIABLES
	var app = this;
	var image = 1;
	var random;
	$scope.backgrounds = "background: url(../images/gallery-"+ image +".jpg) no-repeat center center fixed;background-size: cover;";
	$scope.format = 'M/d/yyyy h:mm:ss a';						// DATE AND TIME FORMAT
	$scope.languages = ['中国（简体)','English'];
	$scope.disable = false;										// ENABLE FUNCTIONALITY
	$scope.focusFocus = false;
	$scope.views = {
		HOME: false,
		SERVICES: false,
		PRODUCTS: false,
		NEWS: false,
		ABOUT: true
	}
	random = $interval(function() {
		var image = Math.floor((Math.random()*5)+1)
		$scope.backgrounds = "background: url(../images/gallery-"+ image +".jpg) no-repeat center center fixed;background-size: cover;";
	}, 5000);

// TEST AREA (HARD HAT REQUIRED)










// END OF TEST AREA


// SECTION: NAV-TABS
	app.tabFunction = function(tab) {
		console.time("TAB-FUNCTION");							// PERFORMANCE TESTING
		views = $scope.views;
		angular.forEach(Object.keys(views), function (page) {
			if (tab != page) {
				views[page] = false;
			} else {
				views[page] = true;
			};
		});
		$scope.views = views;
		console.timeEnd("TAB-FUNCTION");						// PERFORMANCE TESTING
	}


	


// SECTION: TODO
	app.todos = [												// Array of items for our Todo List
		{text:'Item #1', done:true},
		{text:'Item #2', done:false}
	];

	app.addTodo = function() {									// Function to add to our list
		app.todos.push({text:app.todoText, done:false});
		app.todoText = '';
		$scope.focusFocus = false;
	};

	app.remaining = function() {								// Function to find number of unchecked items
		var count = 0;
		angular.forEach(app.todos, function(todo) {
			count += todo.done ? 0 : 1;
		});
		return count;
	};

	app.clear = function() {									// Function to remove done items
		var allTodos = app.todos;
		app.todos = [];
		angular.forEach(allTodos, function(todo) {
			if (!todo.done) app.todos.push(todo);
		});
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







// SECTION: TRANSLATION
	app.chooseLanguage = function (lang) {
		console.time("LOCALIZE-FUNCTION");							// PERFORMANCE TESTING
		if (lang === "中国（简体)") {
			$translate.use('zhCN');
		} else if (lang === "English") {
			$translate.use('enUS');
		}
		console.timeEnd("LOCALIZE-FUNCTION");						// PERFORMANCE TESTING
	};
});

