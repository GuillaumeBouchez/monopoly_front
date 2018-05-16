export default class dataService {

    constructor($http) {
        this.$http = $http;
        /*this.backUrl = "http://localhost:8081/RestServer/api/monopoly";*/
        this.backUrl = "http://192.168.137.1:8081/RestServer/api/monopoly";
    }

    //get all the player
    getJoueurs() {
       // return this.$http.get("http://localhost:8081/RestServer/api/monopoly/joueurs");
        return this.$http.get(this.backUrl+"/joueurs");
    }
    
    getJoueur(id){
    	return this.$http.get(this.backUrl+`/joueurs/${id}`);
    }
    

    getCases() {
        return this.$http.get(this.backUrl+"/cases");
    }

    getCase(idCase) {
        return this.$http.get(this.backUrl+`/cases/${idCase}`);
    }
    
    readNfc(){
    	
    	return this.$http.get(this.backUrl+ `/readNfc`);
    }
    
    bougerJoueur(id, dist){
    	return this.$http.get(this.backUrl+ `/deplacement`, {params : {idJoueur : id, resultDes : dist}});
    }
    
    achatProp(laCase, joueur){
    	return this.$http.get(this.backUrl+ `/achat`, {params : {idCase : laCase, idJoueur : joueur}});
    }
    
    caseSpeciale(laCase, joueur){
    	return this.$http.get(this.backUrl+ `/case-speciale`, {params : {idCase : laCase, idJoueur : joueur}});
    }
    
    transaction(j1, j2, _montant){
    	return this.$http.get(this.backUrl+ `/transaction`, {params : {idJoueur1 : j1, idJoueur2 : j2, montant: _montant}});
    }

}
dataService.$inject = ['$http'];
