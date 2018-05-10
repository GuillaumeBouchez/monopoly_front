import caseDepartHTML from "./caseDepart.html";

class caseDepartController{
	constructor($rootScope, dataService) {
		this.$rootScope = $rootScope;
		this.dataService = dataService;
	}
}

caseDepartController.$inject = ['$rootScope', 'dataService'];

export const caseDepart = {
		template: caseDepartHTML,
		controller:caseDepartController,
		bindings: {
			maCase: '<'
		}
	};