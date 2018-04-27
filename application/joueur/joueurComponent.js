import joueurHTML from "./joueur.html";

class JoueurComponentController {
	constructor($rootScope, dataService) {
		this.$rootScope = $rootScope;
		this.dataService = dataService;
	}

	$onInit() {
		this.dataService.getJoueurs()
		.then(data => {
			console.log('joueurs', data.data);
			this.joueurs = data.data;
		})
		.catch(error => {
            console.log('Erreur sur le tableau', error);
        })
	}
}

JoueurComponentController.$inject = ['$rootScope', 'dataService'];

export const joueur = {
		template: joueurHTML,
		controller: JoueurComponentController 
	};