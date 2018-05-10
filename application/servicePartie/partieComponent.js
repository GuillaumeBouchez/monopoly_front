import partieHTML from "./partie.html";

class PartieComponentController {
	constructor(dataService, servicePartie) {
		this.dataService = dataService;
		this.servicePartie = servicePartie;
		//this.$interval = $interval;
		//partie
		this.tourJoueur = 1;
		//this.partieChanged = 0:

	}
	
	$onInit(){
		console.log('test');
		this.lanceTour();
		
	}
	
	lanceTour(){
		//Lancer de
		this.message = "Lancez les Dés";
    	this.dataService.readNfc()
		.then((data) => {
			console.log('Lecture NFC');
			console.log(data.data);
			
			if (data.data == "code nfc de" | true){
		    	//Tirage de
				this.de1 = 2;
		    	this.de2 = 1;
		    	this.message = "De 1 = "+ this.de1 + "  De 2 = "+ this.de2;
		    	
		    	this.dataService.bougerJoueur(this.tourJoueur, this.de1+this.de2);
		    	this.partieChanged();
		    	
		    	
		    	
		    	
		  
			} //true pour test
			
		})
		.catch((error) => {
			console.log(error);
		});
		
	}
	
	evalueCase(idCase){
		
		this.dataService.getCase(idCase)
		.then((data) => {
			var maCase = data.data;
			console.log(maCase);
			
			if (data.data.prop){
		    	//Tirage de
				this.de1 = 2;
		    	this.de2 = 1;
		    	this.message = "De 1 = "+ this.de1 + "  De 2 = "+ this.de2;
		    	
		    	this.dataService.bougerJoueur(this.tourJoueur, this.de1+this.de2);
		    	this.partieChanged();
			} //true pour test
			
		})
		.catch((error) => {
			console.log(error);
		});
	}
	
	
	
	
	
	
}

PartieComponentController.$inject = ['dataService','servicePartie'];

export const partie = {
		template: partieHTML,
		controller: PartieComponentController,
		bindings :{
			partieChanged : '&'
		}
	};