import casePropHTML from "./caseProp.html";

class CasePropController {
	constructor($rootScope, dataService) {
		this.$rootScope = $rootScope;
		this.dataService = dataService;
	}
	
	joueurSurCase(id){
		for (var joueur in maCase.joueursSurCase){
			console.log(joueur);
			if (joueur.id == id){
				return true;
			}
		}
		return false;
		
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