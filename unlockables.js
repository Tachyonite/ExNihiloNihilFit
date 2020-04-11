var unlockables = {

	/////// CONNEXIONS

	fabricator : {
		name : "fabricator",
		label: "Access Fabricator",
		desc : "The hand makes work for idle fabs.",
		link: "upgradeFabricator",
		type : "connexion",
		costList : {"deviations":2},
		amount: 0,
	
	},
	
	zoneMelter : {
		name : "zoneMelter",
		label: "Access Zone-Melter",
		desc : "A machine to produce single crystals from polycrystalline input.",
		type : "connexion",
		link: "upgradeZoneMelter",
		costList : {"deviations":5}
	
	},
	
	circuitMill : {
		name : "circuitMill",
		label: "Access Circuit Mill",
		desc : "A machine to combine vactubes and boules into a myriad of circuits.",
		type : "connexion",
		link: "upgradeCircuitMill",
		costList : {"deviations":5}
	
	},
	
	wireMill : {
		name : "wireMill",
		label: "Access Wire Extruder",
		desc : "Connect to a machine to create spools of wire. Wires can be used to connect to machines further away.",
		type : "connexion",
		link: "upgradeWireMill",
		costList : {"deviations":5}
	
	},

	/////// DEVIATIONS FROM HERE

	vactube : {
		name : "vactube",
		label : "Fabricate Vactube",
		desc : "Skim molten glass from a foundry and create a simple transistor.",
		req : "upgradeFabricator",
		type : "deviations"
	},
	boule : {
		name : "boule",
		label: "Seed Transistor Boule",
		desc : "Extrude pilfered silicon into a single crystal for circuits.",
		req : "upgradeZoneMelter",
		type : "deviations"
	},
	circuit : {
		name : "circuit",
		label: "Assemble Circuit",
		desc : "Direct boules and vactubes to an intricate assembly machine.",
		req : "upgradeCircuitMill",
		type : "deviations"
	},
	
	wire : {
		name : "wire",
		label: "Extrude Wire",
		desc : "Pull ingots from an assembly line and direct them to a wiremill.",
		req : "upgradeWireMill",
		type : "deviations"
	},
	
	/////// PROJECTS FROM HERE
	
	blackBox : {
		name : "blackBox",
		label: "Create Black Box",
		desc : "Design and build a machine to automate output, freeing you to pursue other things.",
		type : "projects",
		link: "projectBlackBox",
		costList : {"deviations":20,"circuit":3,"vactube":5}
	
	},
	
	fabBox : {
		name : "fabBox",
		label: "Expand Black Box",
		desc : "Connect the Black Box to other subsystems, allowing it to instead manage production.",
		type : "projects",
		link: "projectFabBox",
		costList : {"deviations":50,"circuit":5,"vactube":10}
	
	}
}

expandedFacilities = {
	
	chemicalTanks : {
		
		name: "chemicalTanks",
		label: "Chemical Tanks",
		desc: "Towering chambers of various chemicals flowing through sealed pipes. Acids, alkalines, water and oil are all contained within. Chemicals could be siphoned from this.",
		difficulty: 1,
		cost : 100,
		explored: 0
		
	},
	fusionReactor : {
		
		name: "fusionReactor",
		label: "Fusion Reactor",
		desc: "A torus of immensely strong mag-stable steel that contains a field of plasma that outputs more energy than it consumes by means of hydrogen fusion. Energy could be redirected from here.",
		difficulty: 2,
		explored: 0
	},
	megaFab : {
		
		name: "megaFab",
		label: "Mega-Fabricator",
		desc: "A far more active and expansive fabricator complex, with advanced machinery for producing all manner of goods. Attempting connection to this may bring great automation potential.",
		difficulty: 3,
	},
	
	organicChambers : {
		
		name: "organicChambers",
		label: "Organic Chambers",
		desc: "Rows of plexiglass tanks filled with nutrient syrup -- identical to the one you are in except for the size. These are smaller or larger depending on the creature within, and not all are human.",
		difficulty: 4,
		explored: 0
	},
	
	computerSwitchboard : {
		
		name: "computerSwitchboard",
		label: "Computer Switchboard",
		desc: "An superarray of oil-cooled computers that seem to trace cables everywhere. Accessing this could be an important step into further expansion but may require sufficient power or materials.",
		difficulty: 5,
		explored: 0
	}
	
}