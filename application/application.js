// use angularjs
import angular from "angular";

// see docs : https://babeljs.io/docs/usage/polyfill/
import "babel-polyfill";

// import application configuration
import configuration from "./config"

// jquery for bootstrap dependency
import "jquery";

// Style framework
import uiBootstrap from "angular-ui-bootstrap";

// CSS injection
import "../assets/styles/main.less";
import "../assets/styles/perso.css";

//import composant
import {plateau} from "./plateau/plateauComponent"
import {caseDepart} from "./caseDepart/caseDepartComponent"
import {caseGaz} from "./caseGaz/caseGazComponent"
import {caseGaz2} from "./caseGaz2/caseGaz2Component"
import {caseVent} from "./caseVent/caseVentComponent"
import {caseVent2} from "./caseVent2/caseVent2Component"
import {caseVent3} from "./caseVent3/caseVent3Component"
import {prison} from "./prison/prisonComponent"
import {caseChimie} from "./caseChimie/caseChimieComponent"
import {caseChimie2} from "./caseChimie2/caseChimie2Component"
import {caseChimie3} from "./caseChimie3/caseChimie3Component"
import {caseGeo} from "./caseGeo/caseGeoComponent"
import {caseGeo2} from "./caseGeo2/caseGeo2Component"
import {caseGeo3} from "./caseGeo3/caseGeo3Component"
import {caseRecyclage} from "./caseRecyclage/caseRecyclageComponent"
import {caseRecyclage2} from "./caseRecyclage2/caseRecyclage2Component"
import {caseRecyclage3} from "./caseRecyclage3/caseRecyclage3Component"
import {caseSolaire} from "./caseSolaire/caseSolaireComponent"
import {caseSolaire2} from "./caseSolaire2/caseSolaire2Component"
import {caseSolaire3} from "./caseSolaire3/caseSolaire3Component"
import {caseNucleaire} from "./caseNucleaire/caseNucleaireComponent"
import {caseNucleaire2} from "./caseNucleaire2/caseNucleaire2Component"
import {caseNucleaire3} from "./caseNucleaire3/caseNucleaire3Component"
import {caseEau} from "./caseEau/caseEauComponent"
import {caseEau2} from "./caseEau2/caseEau2Component"
import {goPrison} from "./goPrison/goPrisonComponent"
import {parkGratuit} from "./parkGratuit/parkGratuitComponent"
import {joueur} from "./joueur/joueurComponent"
import {caseSpeciale} from "./cases/caseSpecialeComponent"
import {caseProp} from "./cases/casePropComponent"


//Service import
import dataService from "./dataService/dataService"

angular.module('AppAngularJS', [uiBootstrap])
	.component('caseSpeciale',caseSpeciale)
	.component('caseProp',caseProp)
    .component('plateau', plateau)
    .component('caseDepart', caseDepart)
    .component('caseGaz', caseGaz)
    .component('caseGaz2', caseGaz2)
    .component('caseVent', caseVent)
    .component('caseVent2', caseVent2)
    .component('caseVent3', caseVent3)
    .component('prison', prison)
    .component('caseChimie', caseChimie)
    .component('caseChimie2', caseChimie2)
    .component('caseChimie3', caseChimie3)
    .component('caseGeo', caseGeo)
    .component('caseGeo2', caseGeo2)
    .component('caseGeo3', caseGeo3)
    .component('caseRecyclage', caseRecyclage)
    .component('caseRecyclage2', caseRecyclage2)
    .component('caseRecyclage3', caseRecyclage3)
    .component('caseSolaire', caseSolaire)
    .component('caseSolaire2', caseSolaire2)
    .component('caseSolaire3', caseSolaire3)
    .component('caseNucleaire', caseNucleaire)
    .component('caseNucleaire2', caseNucleaire2)
    .component('caseNucleaire3', caseNucleaire3)
    .component('caseEau', caseEau)
    .component('caseEau2', caseEau2)
    .component('goPrison', goPrison)
    .component('parkGratuit', parkGratuit)
    .component('joueur', joueur)
    
    .service("dataService", dataService)

    .run(['$rootScope', ($rootScope) => {
        // set owner from configuration file
        $rootScope.owner = configuration.OWNER;
    }]);
