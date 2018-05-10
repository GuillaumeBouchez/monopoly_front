export default class servicePartie {

    constructor(dataService, $rootScope) {
    	this.dataService = dataService;
    	this.partie = {tourJoueur : 1, message : "Lancez les dés"};
    	this.goNextStep = false;
    	this.$rootScope = $rootScope;
    	
    	this.$rootScope.$on('nfcEvent', function() {
    		console.log('NFC EVENT');
    	});
    }
    
    
    getPartie(){
    	return this.partie;
    }
    
    lancerDes(){
    	//Faire des nombres aléatoires + déplacer joueur 
    	
    	//while(this.goNextStep == false){
    	
    	this.dataService.readNfc()
    		.then((data) => {
    			console.log(data.data);
    			
    			if (data.data == "code nfc de"){
    				//tirage de
    		    	this.de1 = 2;
    		    	this.de2 = 1;
    		    	
    		    	this.partie.message = "De 1 = "+ this.de1 + "  De 2 = "+ this.de2;
    		    	
    			}
    			
    		})
    		.catch((error) => {
    			console.log(error);
    		});
    			
    	//}
    
    }
    
    lanceTour(){
    	this.lancerDes();
    }
    
    
    listen2nfc(){
    	this.dataService.readNfc()
		.then((data) => {
			this.$rootScope.$broadcast('nfcEvent');
			console.log(data.data);	
		})
		.catch((error) => {
			console.log(error);
		});
    	
    }

	/*$rootScope.$on('nfcEvent', function() {
		console.log('NFC EVENT');
	})*/
    

    
    bougeJoueur(){
    	
    }

}
servicePartie.$inject = ['dataService', '$rootScope'];
