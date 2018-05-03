import casePropHTML from "./caseProp.html";

class CasePropController {
	constructor($rootScope, dataService) {
		this.$rootScope = $rootScope;
		this.dataService = dataService;
	}
}

CasePropController.$inject = ['$rootScope', 'dataService'];

export const caseProp = {
	template: casePropHTML,
	controller: CasePropController,
	bindings: {
		maCase: '<'
	}
};