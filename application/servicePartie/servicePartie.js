export default class servicePartie {

    constructor(dataService) {
    	this.dataService = dataService;
    	this.partie = {tourJoueur : 1, message : "Lancez les dés"};
    }
    
    getPartie(){
    	return this.partie;
    }
    
    lancerDes(){
    	//Faire des nombres aléatoires + déplacer joueur
    	this.dataService.readNfc()
    		.then((data) => {
    			console.log(data.data);
    			
    			if (data.data == "code nfc de" | true){
    		    	this.de1 = 2;
    		    	this.de2 = 1;
    		    	
    		    	this.partie.message = "De 1 = "+ this.de1 + "  De 2 = "+ this.de2;
    		    	
    		    	
    		    	
    		    	console.log(this.partie);
    			} //true pour test
    			
    		})
    		.catch((error) => {
    			console.log(error);
    		});
    
    }
    
    reagit
    
    lanceTour(){
    	this.lancerDes();
    }
    
    

    
    bougeJoueur(){
    	
    }

}
servicePartie.$inject = ['dataService'];
