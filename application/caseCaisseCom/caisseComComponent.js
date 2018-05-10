import caisseComHTML from "./caisseCom.html";

class CaisseComController {
	constructor($rootScope, dataService) {
		this.$rootScope = $rootScope;
		this.dataService = dataService;
	}
}

ParkGratuitComponentController.$inject = ['$rootScope', 'dataService'];

export const parkGratuit = {
	template: caisseComHTML,
	controller: CaisseComController,
	bindings: {
		maCase: '<'
	}
};