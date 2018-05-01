export default class dataService {

    constructor($http) {
        this.$http = $http;
        this.backUrl = "http://localhost:8081/RestServer/api/monopoly";
    }

    //get all the player
    getJoueurs() {
       // return this.$http.get("http://localhost:8081/RestServer/api/monopoly/joueurs");
        return this.$http.get(this.backUrl+"/joueurs");
    }

    getCases() {
        return this.$http.get(this.backUrl+"/cases");
    }

    getCase(idCase) {
        return this.$http.get(this.backUrl+`/cases/${idCase}`);
    }

    //http://192.168.137.1:8080/RestServer/api/monopoly/cases/12

}
dataService.$inject = ['$http'];
