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