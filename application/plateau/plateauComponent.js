import plateauHTML from "./plateau.html";

class PlateauComponentController {
	constructor(dataService, servicePartie) {
		this.dataService = dataService;
		this.servicePartie = servicePartie;
		console.log("construc");
		this.partie = servicePartie.getPartie();
		//this.servicePartie.lancePartie();
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
		
		this.servicePartie.lanceTour();
		this.partie = this.servicePartie.getPartie();
		
		
		
	}
	
	
	
	
	
	
}

PlateauComponentController.$inject = ['dataService','servicePartie'];

export const plateau = {
		template: plateauHTML,
		controller: PlateauComponentController
	};