import parkGratuitHTML from "./parkGratuit.html";

class ParkGratuitComponentController {
	constructor($rootScope, dataService) {
		this.$rootScope = $rootScope;
		this.dataService = dataService;
	}
}

ParkGratuitComponentController.$inject = ['$rootScope', 'dataService'];

export const parkGratuit = {
	template: parkGratuitHTML,
	controller: ParkGratuitComponentController,
	bindings: {
		maCase: '<'
	}
};