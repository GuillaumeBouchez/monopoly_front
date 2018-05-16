import plateauHTML from "./plateau.html";

class PlateauComponentController {
	constructor(dataService, servicePartie, $interval, $scope) {
		this.dataService = dataService;
		this.servicePartie = servicePartie;
		
	}
	
	$onInit() {
		//Mise à jour des infos affichées par le front
		this.getListeCases();
		this.getListeJoueurs();		
		
	}
	
	onPartieChanged(){
		//Mise à jour des infos affichées par le front
		this.getListeCases();
		this.getListeJoueurs();		
	}
	
	//Met à jour la liste des joueurs via webservice
	getListeJoueurs(){
		this.dataService.getJoueurs()
		.then(data => {
			this.joueurs = data.data;
			console.log(data.data);
		})
		.catch(error => {
            console.log('Erreur sur le tableau', error);
        })
	}
	
	//Met à jour la liste des cases du plateau
	getListeCases(){
		this.dataService.getCases()
		.then(data => {
			this.cases = data.data;
		})
		.catch(error => {
            console.log('Erreur sur le tableau', error);
        })
	}

}//Fin Controller

PlateauComponentController.$inject = ['dataService','servicePartie','$interval', '$scope'];

export const plateau = {
		template: plateauHTML,
		controller: PlateauComponentController
	};