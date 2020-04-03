var unlockables = {

	/////// CONNEXIONS

	fabricator : {
		name : "fabricator",
		label: "Access Fabricator",
		desc : "The hand makes work for idle fabs.",
		link: "upgradeFabricator",
		type : "connexion",
		costList : {"deviations":2},
		cost : 2,
		amount: 0,
		costRes : "deviations"
	
	},
	
	zoneMelter : {
		name : "zoneMelter",
		label: "Access Zone-Melter",
		desc : "A machine to produce single crystals from polycrystalline input.",
		type : "connexion",
		link: "upgradeZoneMelter",
		costList : {"deviations":5},
		cost : 5,
		amount: 0,
		costRes : "deviations"
	
	},
	
	circuitMill : {
		name : "circuitMill",
		label: "Access Circuit Mill",
		desc : "A machine to combine vactubes and boules into a myriad of circuits.",
		type : "connexion",
		link: "upgradeZoneMelter",
		costList : {"deviations":5},
		cost : 5,
		amount: 0,
		costRes : "deviations"
	
	},

	/////// DEVIATIONS FROM HERE

	vactube : {
		name : "vactube",
		label : "Fabricate Vactube",
		desc : "A ubiquitous component, if not mundane.",
		req : "upgradeFabricator",
		type : "deviations",
		amount: 0,
	},
	boule : {
		name : "boule",
		label: "Fabricate Transistor Boule",
		desc : "Zone-melting is not a fast process.",
		req : "upgradeZoneMelter",
		type : "deviations",
		amount: 0,
	}
}