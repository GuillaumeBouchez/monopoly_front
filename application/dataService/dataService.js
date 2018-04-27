export default class dataService {

    constructor($http) {
        this.$http = $http;
    }

    //get all the player
    getJoueurs() {
        return this.$http.get("http://192.168.137.1:8080/RestServer/api/monopoly/joueurs");
    }

    getCases() {
        return this.$http.get("http://192.168.137.1:8080/RestServer/api/monopoly/cases")
    }

    getCase(idCase) {
        return this.$http.get(`http://192.168.137.1:8080/RestServer/api/monopoly/cases/${idCase}`)
    }

    //http://192.168.137.1:8080/RestServer/api/monopoly/cases/12

}
dataService.$inject = ['$http'];
