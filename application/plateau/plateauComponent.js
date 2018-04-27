import plateauHTML from "./plateau.html";

class PlateauComponentController {
	constructor() {
		this.parkGratuitBinding = "Parking Gratuit";
	}
}

PlateauComponentController.$inject = [];

export const plateau = {
		template: plateauHTML,
		controller: PlateauComponentController
	};