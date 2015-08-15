///<reference path="../typings/angularjs/angular.d.ts" />

export interface HomeScope extends ng.IScope {
	Message : string;
}

export class HomeController {
	constructor($scope : HomeScope){
		$scope.Message = 'Welcome to <%= projectName %>!'
	}
}