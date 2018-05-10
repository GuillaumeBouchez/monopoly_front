import caseSpecialeHTML from "./caseSpeciale.html";

class CaseSpecialeController {
	constructor($rootScope, dataService) {
		this.$rootScope = $rootScope;
		this.dataService = dataService;
	}
	
	joueurSurCase(id){
		for (var joueur in joueursSurCase){
			if (joueur.id == id){
				return true;
			}
		}
		return false;
		
	}
}

CaseSpecialeController.$inject = ['$rootScope', 'dataService'];

export const caseSpeciale = {
	template: caseSpecialeHTML,
	controller: CaseSpecialeController,
	bindings: {
		maCase: '<',
		rotation : '@'
	}
};