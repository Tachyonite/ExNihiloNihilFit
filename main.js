var input = -1
var maxInput = 16
var progress = {"errorTolerance":0}

var inputInterval = setInterval( drawInput, 100);
var tickInputInterval = setInterval( increaseInput, 200);

var mainLoopInterval = setInterval( mainLoop, 100);

function mainLoop(){
	
	progressWatcher();
	stageWatcher();
	productWatcher();
	
	for (resource in resourceMapping){
		var path = "tracker-"+resourceMapping[resource].name.toLowerCase();
		var labelPath = "label-"+resourceMapping[resource].name.toLowerCase();
		var ele = document.getElementById(path);
		var labelEle = document.getElementById(labelPath);
		if (resourceMapping[resource].amount > 0){
			labelEle.classList.remove('hidden');
			ele.innerHTML = Math.floor(resourceMapping[resource].amount);
		}else{
			if (resource != "output" && resource != "deviations")
			labelEle.classList.add('hidden');
			ele.innerHTML = 0;
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
	}
	if (gameStages.upgradeFabricator.unlocked == true && gameStages.upgradeFabricator.bought == false && !document.getElementById("access-fabricator")){
		renderConnexion(unlockables.fabricator);
	}
	if (gameStages.upgradeZoneMelter.unlocked == true && gameStages.upgradeZoneMelter.bought == false && !document.getElementById("access-zoneMelter")){
		renderConnexion(unlockables.zoneMelter);
	}
	if (gameStages.upgradeFabricator.bought == true){
		if (document.getElementById("access-fabricator")){
		document.getElementById("access-fabricator").remove();
		}
		document.getElementById("deviations-window").classList.remove("hidden");
		
	}
	if (gameStages.upgradeZoneMelter.bought == true){
		if (document.getElementById("access-zoneMelter")){
		document.getElementById("access-zoneMelter").remove();
		}
	}
	
}

function connect(connexion,requirementSatisfy){
	console.log(requirementSatisfy);
	gameStages[requirementSatisfy].bought = true;
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
	
	