function unhideMetric(resource){
    
    var path = "label-"+resource;
    document.getElementById(path).classList.remove('hidden');
    
}

function addProduct(resource){
	
	renderDeviation(resource);
	
}

var achievements = {

	vactubeUnlocked : {unlocked: false, trigger: resourceMapping.vactube, amount: 1, effects:["unhideMetric"], effector:'vactube'},
    bouleUnlocked : {unlocked: false, trigger: resourceMapping.boule, amount: 1, effects:["unhideMetric"], effector:'boule'},
    circuitUnlocked : {unlocked: false, trigger: resourceMapping.circuit, amount: 1, effects:["unhideMetric"], effector:'circuit'},
    wireUnlocked : {unlocked: false, trigger: resourceMapping.wire, amount: 1, effects:["unhideMetric"], effector:'wire'}

}

var gameStages = {
	
	initialOpening : {unlocked: false, bought: false},
	upgradeFabricator : {unlocked: false, bought: false},
	upgradeZoneMelter : {unlocked: false, bought: false},
	upgradeCircuitMill : {unlocked: false, bought: false},
	upgradeWireMill : {unlocked: false, bought: false},
	projectBlackBox	: {unlocked: false, bought: false},
	projectNeuralBox	: {unlocked: false, bought: false},
	projectOptics	: {unlocked: false, bought: false},
	expansionWire	: {unlocked: false, bought: false}
	
}

function searchAchieves(){
    
    for (cheev in achievements){
        if (achievements[cheev].unlocked || achievements[cheev].trigger.amount >= achievements[cheev].amount){
            
			for (effect in achievements[cheev].effects){
				switch (effect){
					case "unhideMetric":
						unhideMetric(achievements[cheev].effector);
						achievements[cheev].unlocked = true;
						break;                
					case "none":
						break;		
				}
				cheev.effects;
            }
        }
    }
}

