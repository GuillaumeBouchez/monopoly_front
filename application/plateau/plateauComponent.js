import plateauHTML from "./plateau.html";

class PlateauComponentController {
	constructor(dataService) {
		this.parkGratuitBinding = "Parking Gratuit";
		this.dataService = dataService;
	}
	
	$onInit() {
		this.dataService.getCases()
		.then(data => {
			console.log('Cases', data.data);
			this.cases = data.data;
		})
		.catch(error => {
            console.log('Erreur sur le tableau', error);
        })
	}
	
}

PlateauComponentController.$inject = ['dataService'];

export const plateau = {
		template: plateauHTML,
		controller: PlateauComponentController
	};