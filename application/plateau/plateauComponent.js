import plateauHTML from "./plateau.html";

class PlateauComponentController {
	constructor(dataService, servicePartie, $interval, $scope) {
		this.dataService = dataService;
		this.$scope = $scope;
		$scope.dataService = dataService;
		this.servicePartie = servicePartie;
		console.log("construc");
		this.partie = servicePartie.getPartie();
		this.$interval = $interval;
		this.cases = [];
		
		/*this.$interval(function() {
			
			dataService.getCases()
			.then(data => {
				console.log('Cases', data.data);
				this.cases = data.data;
			})
			.catch(error => {
	            console.log('Erreur sur le tableau', error);
	        })
			
			console.log('REFRESH');
			
			
			} , 2000);*/
		
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
			
			console.log('REFRESH');
			
			
			/*} , 2000);*/
		
	}
	
	onPartieChanged(){
		console.log("udpdate Update plateau");
		
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

PlateauComponentController.$inject = ['dataService','servicePartie','$interval', '$scope'];

export const plateau = {
		template: plateauHTML,
		controller: PlateauComponentController
	};