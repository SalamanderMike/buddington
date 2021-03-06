Component = angular.module('Components', []);

Component.directive('drawer', function() {
	return {
		template: "<div ng-class='{ show: visible }' ng-transclude></div>",
		scope: {
			visible: '='
		},
		restrict: 'E',
		transclude: true
	};
});

Component.directive('autoFocus',['$timeout', function ($timeout) {							// AUTOFOCUS INPUT FIELD ON PAGE LOAD
    return function postLink(scope, element, attrs) {
        $timeout(function() {
			element[0].focus();
		});
    }
}]);
Component.directive('focusField',['$timeout', function ($timeout) { 						// INPUT FIELD FOCUS ON CLICK
    return function (scope, element, attrs) {
        scope.$watch(attrs.focusField, function (value) {
            if (value) $timeout(function() {element[0].focus();} );
        });
    }
}]);
