import parkGratuitHTML from "./parkGratuit.html";

class ParkGratuitComponentController {
	constructor($rootScope, dataService) {
		this.$rootScope = $rootScope;
		this.dataService = dataService;
	}

	$onInit() {
		this.dataService.getCase(20)
			.then(data => {
				console.log('Récupération de case', data.data);
				this.case = data.data;
			})
			.catch(error => {
				console.log('Erreur sur le tableau ', error);
			})
	}
}

ParkGratuitComponentController.$inject = ['$rootScope', 'dataService'];

export const parkGratuit = {
	template: parkGratuitHTML,
	controller: ParkGratuitComponentController,
	bindings: {
		oneWayBinding: '<'
	}
};