import caseChimieHTML from "./caseChimie.html";

class CaseChimieController {
	constructor($rootScope, dataService){
		this.$rootScope = $rootScope;
		this.dataService = dataService;
	}
}

CaseChimieController.$inject = ['$rootScope', 'dataService'];

export const caseChimie = {
		template: caseChimieHTML,
		controller: CaseChimieController
	};