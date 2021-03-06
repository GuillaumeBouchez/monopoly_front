import partieHTML from "./partie.html";

class PartieComponentController {
	constructor(dataService, servicePartie) {
		this.dataService = dataService;
		this.servicePartie = servicePartie;
		this.codeNfcDe = "04 78 06 7A 99 3C 84";
		this.codeNfcOui = "04 21 73 2A AD 43 80";
		this.codeNfcNon = "04 F0 D1 81 A0 22 80";
		this.carteNfcSortiePrison = "9B 07 CD 18";

	}

	$onInit(){
		this.tourJoueur = 1;
		//Lance le tour du joueur de this.tourJoueur
		//this.lanceTour();
		this.getJoueur(this.tourJoueur);

	}

	relanceTour(){
		this.getJoueur(this.tourJoueur);
	}

	lanceTourSuivant(){
		//Recuperer le joueur dont c'est le tour
		this.tourJoueur ++;
		if (this.tourJoueur == 5){
			this.tourJoueur = 1;
		}
		console.log('tour joueur ' + this.tourJoueur);
		this.getJoueur(this.tourJoueur);
	}

	evalueCase(idCase){

		console.log("Evaluation de la case " + idCase);
		this.dataService.getCase(idCase)
		.then((data) => {
			var maCase = data.data;
			console.log(maCase);

			if (data.data.typeCase == "PROPRIETE" & data.data.idJoueur == 0 ){
				console.log("CASE A VENDRE");
				this.message = "Souhaitez vous acheter cette Propriété ?"


					this.dataService.readNfc()
					.then(data => {
						console.log('Resultat lecture NFC : '+ data.data);
						if (data.data == this.joueur.nfcTag){
							this.acheterProp(this.joueur.position, this.joueur.id);

						}else{
							if(data.data != this.codeNfcNon){
								this.message = "Veuillez scanner la carte de refus";
								this.evalueCase(idCase);
							}
							else{
								console.log('Le joueur ne veut pas acheter');
								this.partieChanged();
								this.lanceTourSuivant();
							}
						}

					})
					.catch(error => {
						this.evalueCase(idCase);
					})


			}else if (data.data.typeCase != "PROPRIETE"){
				this.dataService.caseSpeciale(this.joueur.position, this.joueur.id)
				.then(data => {
					console.log(data);
					this.message = data.data; 
				})
				.catch(error => {
					console.log(error);
				})

				this.partieChanged();
				this.sleep(5000)
				.then(() => {this.lanceTourSuivant();})


			}else if (data.data.idJoueur != 0){
				//Paye connard
				this.message = "TRANSACTION de " + this.joueur.id + " vers " + data.data.idJoueur + " montant = " +  data.data.loyer;
				console.log(this.message);
				this.dataService.transaction(this.joueur.id, data.data.idJoueur, data.data.loyer)
				.then(data => {
					this.message = "TRANSACTION EFFECTUEE";
					this.sleep(5000);
					this.partieChanged();

					this.lanceTourSuivant();

				}).catch(error => {
					this.message = "Les cartes scannées ne sont pas les bonnes. Réessayez";
					this.sleep(3000)
					.then(()=>{
						this.evalueCase(idCase);
					});
				});

			}



		})
		.catch((error) => {
			console.log(error);
		});
	}

	acheterProp(laCase, joueur){
		this.dataService.achatProp(laCase, joueur)
		.then(data => {
			console.log(data);
			if (data.status == 200){
				console.log("Propriété achetee");
				this.message = "Propriété achetee";
				this.lanceTourSuivant();
				this.partieChanged();

			}else{
				console.log("propriété non achetée");
				this.message = "Achat impossible";
				this.lanceTourSuivant();
			}


		})
		.catch(error => {
			console.log("propriété non achétée");
			this.message = "Achat impossible";
			this.lanceTourSuivant();
		})
	}

	getJoueur(id){
		this.dataService.getJoueur(id)
		.then(data => {
			console.log('récupération du joueur :')
			console.log(data.data);
			this.joueur = data.data;
			//On a recupere le joueur, on peut lancer les des
			if(this.joueur.estElimine == true){
				this.lanceTourSuivant();
			}
			else{
				this.lancerDes();
			}
		})
		.catch(error => {
			console.log('Erreur recupération joueur', error);
		});
	}

	lancerDes(){
		//On attend que le joueur place la carte dé
		this.message = "Lancez les dés";
		this.dataService.readNfc()
		.then((data) => {
			console.log('Resultat lecture NFC : '+ data.data);


			if (data.data == this.codeNfcDe){
				//On tire les dés
				this.de1 = Math.floor((Math.random() * 6) + 1);
				this.de2 = Math.floor((Math.random() * 6) + 1);
				this.resultDes = this.de1 + this.de2;
				this.message = "Résultats des dés : " + this.resultDes;
				this.sleep(5000);

				console.log('Resultat dés' + (this.de1 + this.de2) + "(" + this.de1 + " + " + this.de2 + ")");

				//Bouger joueur + mettre à jour le plateau et joueur
				this.dataService.bougerJoueur(this.joueur.id, this.de1, this.de2);
				//MàJ dans front
				this.joueur.position += this.de1 + this.de2;
				this.joueur.position =  this.joueur.position % 40;
				this.partieChanged();
				this.dataService.getJoueur(this.joueur.id)
				.then(data=>{
					if(data.data.position != 30){
						this.sleep(5000).then(() => {
							this.evalueCase(data.data.position);
						})
					}
					else{
						this.message = "Passez une carte pour la prison";
						this.dataService.readNfc()
						.then(data =>{
							if(data.data == this.carteNfcSortiePrison){
								this.dataService.carteSortiePrison(this.joueur.id)
								.then(data=>{
									this.message = "Vous utilisez une carte sortie de prison";
									this.sleep(5000)
									.then(()=>{
										this.partieChanged();
										this.lanceTourSuivant();
									});
								})
								.catch(error=>{
									this.message = "Vous n'avez pas de carte sortie de prison";
									this.sleep(5000)
									.then(()=>{
										this.partieChanged();
										this.lanceTourSuivant();
									});
								});
							}
							else if(data.data == this.joueur.nfcTag){
								this.dataService.amendePrison(this.joueur.id)
								.then(data=>{
									this.message = "Vous payez l'amende et sortez de prison";
									this.sleep(5000)
									.then(()=>{
										this.partieChanged();
										this.lanceTourSuivant();
									});
								})
								.catch(error=>{
									this.message = "Vous n'avez pas assez d'argent pour payer l'amende";
									this.sleep(5000)
									.then(()=>{
										this.partieChanged();
										this.lanceTourSuivant();
									});
								})
							}
							else if(data.data == this.codeNfcNon){
								this.message = "Vous restez en prison";
								this.sleep(5000)
								.then(()=>{
									this.partieChanged();
									this.lanceTourSuivant();
								});
							}
							else{
								this.message = "Cette carte n'est pas reconnue, votre tour passe";
								this.sleep(3000)
								.then(()=>{
									this.partieChanged();
									this.lanceTourSuivant();
								})
							}
						})
					}
				})
			}else{
				this.lancerDes();
			}

		})
		.catch((error) => {
			console.log(error);
			this.lancerDes();
		});

		/*this.carteLue = this.lireCarteNfc();
		if (this.carteLue == this.codeNfcDe){
			//On tire les dés
			this.de1 = 2;
			this.de2 = 1;
			this.message = "De 1 = "+ this.de1 + "  De 2 = "+ this.de2;

			console.log('Resultat dés' + (this.de1 + this.de2));

			//Bouger joueur + mettre à jour le plateau et joueur
			this.dataService.bougerJoueur(this.joueur.id, this.de1+this.de2);
			//MàJ dans front
			this.joueur.position += this.de1 + this.de2;
			this.joueur.position =  this.joueur.position % 40;
			this.partieChanged();
		}*/

	}

	lireCarteNfc(){

		this.dataService.readNfc()
		.then((data) => {
			console.log('Resultat lecture NFC : '+ data.data);
			return data.data;
		})
		.catch((error) => {
			console.log(error);
		});

	}

	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

}//Fin Controller


PartieComponentController.$inject = ['dataService','servicePartie'];

export const partie = {
		template: partieHTML,
		controller: PartieComponentController,
		bindings :{
			partieChanged : '&'
		}
};