import caseSpecialeHTML from "./caseSpeciale.html";

class CaseSpecialeController {
	constructor($rootScope, dataService) {
		this.$rootScope = $rootScope;
		this.dataService = dataService;
	}
}

CaseSpecialeController.$inject = ['$rootScope', 'dataService'];

export const caseSpeciale = {
	template: caseSpecialeHTML,
	controller: CaseSpecialeController,
	bindings: {
		maCase: '<'
	}
};