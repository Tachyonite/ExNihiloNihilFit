var input = -1
var maxInput = 16
var progress = {"errorTolerance":0}

var inputInterval = setInterval( drawInput, 100);
var tickInputInterval = setInterval( increaseInput, 200);
var mainLoopInterval = setInterval( mainLoop, 100);

var autoTick = 0
var autoModes = ["output"]
var mode = autoModes[0]

function mainLoop(){
	
	progressWatcher();
	stageWatcher();
	productWatcher();
	projectTicker();
	
	for (resource in resourceMapping){
		var path = "tracker-"+resourceMapping[resource].name.toLowerCase();
		var labelPath = "label-"+resourceMapping[resource].name.toLowerCase();
		var ele = document.getElementById(path);
		var labelEle = document.getElementById(labelPath);
		if (resourceMapping[resource].amount > 0 || !labelEle.classList.contains('hidden')){
			labelEle.classList.remove('hidden');
			ele.innerHTML = Math.floor(resourceMapping[resource].amount);
		}
	}
	
	searchAchieves();
	
}

function progressWatcher(){
	
	if (resourceMapping.deviations.amount > 0){
		gameStages.upgradeFabricator.unlocked = true;
	}
	if (resourceMapping.vactube.amount > 3){
		gameStages.upgradeZoneMelter.unlocked = true;
	}
	if (resourceMapping.boule.amount > 1){
		gameStages.upgradeCircuitMill.unlocked = true;
	}
	if (resourceMapping.circuit.amount > 1){
		gameStages.projectBlackBox.unlocked = true;
	}
	if (gameStages.projectBlackBox.bought == true){
		gameStages.upgradeWireMill.unlocked = true;
	}
}

function productWatcher(){
	
	for (connex in unlockables){
		if (unlockables[connex].req == undefined){continue;}
		if (unlockables[connex].req && gameStages[unlockables[connex].req].bought){
			if (!document.getElementById("deviation-"+connex)){
				renderDeviation(connex);
			}
		}
	}
}

function stageWatcher(){
	
	if (gameStages.upgradeFabricator.unlocked == true){
		document.getElementById("connexions-window").classList.remove("hidden");
		document.getElementById("connexions-window").classList.add("flashOut");
	}
	if (gameStages.upgradeFabricator.unlocked == true && gameStages.upgradeFabricator.bought == false && !document.getElementById("access-fabricator")){
		renderConnexion(unlockables.fabricator);
	}
	if (gameStages.upgradeZoneMelter.unlocked == true && gameStages.upgradeZoneMelter.bought == false && !document.getElementById("access-zoneMelter")){
		renderConnexion(unlockables.zoneMelter);
	}
	if (gameStages.upgradeCircuitMill.unlocked == true && gameStages.upgradeCircuitMill.bought == false && !document.getElementById("access-circuitMill")){
		renderConnexion(unlockables.circuitMill);
	}
	if (gameStages.upgradeWireMill.unlocked == true && gameStages.upgradeWireMill.bought == false && !document.getElementById("access-wireMill")){
		renderConnexion(unlockables.wireMill);
	}
	if (gameStages.projectBlackBox.unlocked == true && gameStages.projectBlackBox.bought == false && !document.getElementById("access-blackBox")){
		renderProject(unlockables.blackBox);
	}
	if (gameStages.upgradeFabricator.bought == true){
		if (document.getElementById("access-fabricator")){
		document.getElementById("access-fabricator").remove();
		}
		document.getElementById("deviations-window").classList.remove("hidden");
		document.getElementById("deviations-window").classList.add("flashOut");
		
	}
	if (gameStages.upgradeZoneMelter.bought == true){
		if (document.getElementById("access-zoneMelter")){
		document.getElementById("access-zoneMelter").remove();
		}
	}
	if (gameStages.upgradeCircuitMill.bought == true){
		if (document.getElementById("access-circuitMill")){
		document.getElementById("access-circuitMill").remove();
		}
		document.getElementById("projects-window").classList.remove("hidden");
		document.getElementById("projects-window").classList.add("flashOut");
	}
	if (gameStages.upgradeWireMill.bought == true){
		if (document.getElementById("access-wireMill")){
		document.getElementById("access-wireMill").remove();
		}
	}
	if (gameStages.projectBlackBox.bought == true){
		if (document.getElementById("access-blackBox")){
		document.getElementById("access-blackBox").remove();
		}
		document.getElementById("blackbox-window").classList.remove("hidden");
		document.getElementById("blackbox-window").classList.add("flashOut");
	}
	
}

function projectTicker(){
	
	if (gameStages.projectBlackBox.bought == true){
		autoTick++
		if (mode == "output" && input == maxInput && autoTick == 50) {
			autoTick = 0;
			zeroInput();
		}
		if (mode == "production" && autoTick == 50){
			
			var item = items[Math.floor(Math.random() * items.length)];

		}
	}
}

function switchMode(){
	
	if (autoModes.indexOf(mode) == autoModes.length-1){
		mode = autoModes[0]
	}else{
		mode = autoModes[autoModes.indexOf(mode)]+1
	}
	document.getElementById("auto-task").innerText = mode;
	
}

function connect(connexion,requirementSatisfy){
	if (figureFixedCost(connexion)){
		console.log(requirementSatisfy);
		gameStages[requirementSatisfy].bought = true;
		
			for (costRes in connexion.costList){
				resourceMapping[costRes].amount -= connexion.costList[costRes];
			}                
	}
}

function increaseInput(){
	
	if (input < maxInput){
		
		input++;
		if (input>=0){
		var inputNodes = document.getElementsByClassName("input-pip");
			if (input<inputNodes.length){
				inputNodes[input].innerText = Math.round(Math.random());
			}
		}
	}
	
	
}

function zeroInput(){
	if (input>=1){
	resourceMapping["output"].amount+=input;
	resourceMapping["deviations"].amount+=input/4
	}
	var inputNodes = document.getElementsByClassName("input-pip");
	
	for (var i=0;i<inputNodes.length;i++){
		inputNodes[i].innerText = "";
		if (i<=input){
			inputNodes[i].classList.remove("full-pip");	
			inputNodes[i].classList.add("flashOut");
			inputNodes[i].style.webkitAnimationName = 'flashOut';
			
		}
	}
	input = -1;
	
}

function drawInput(){
	var inputNodes = document.getElementsByClassName("input-pip");
	
	for (var i=0;i<inputNodes.length;i++){
		if (i<=input){
			inputNodes[i].classList.add("full-pip");
			inputNodes[i].classList.add("slideIn");
			inputNodes[i].classList.remove("flashOut");	
			inputNodes[i].style.webkitAnimationName = 'slideIn';
		}
	}
	
}

function addResource(resource,amount=1,fixed=true){
    if (fixed){
        if (figureFixedCost(resourceMapping[resource])){
            if (resourceMapping[resource].limit > resourceMapping[resource].amount){
                for (costRes in resourceMapping[resource].costList){
					resourceMapping[costRes].amount -= resourceMapping[resource].costList[costRes];
				}
                resourceMapping[resource].amount += amount;
                
            }
        
        }  
    }    
}

function figureFixedCost(resource,amount=1){
    var outCheck = [];
	for (costRes in resource.costList){	
		if (resourceMapping[costRes].amount >= resource.costList[costRes]){
			outCheck.push(true);
		}
		else{outCheck.push(false)}
	}
	if (outCheck.every(fixedCostTrue)){
		return true;
		}
	else{
		return false;
		}
}

function fixedCostTrue(cost){
	return cost == true;
}
	
	