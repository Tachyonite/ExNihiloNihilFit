var input = -1
var maxInput = 16
var progress = {"errorTolerance":0}

var inputInterval = setInterval( drawInput, 100);
var tickInputInterval = setInterval( increaseInput, 200);
var mainLoopInterval = setInterval( mainLoop, 100);

var autoTick = 0;
var facilityTick = 0;
var autoModes = ["output"];

var calcLen = 0;
var explored = 0;

var mode = autoModes[0];

function mainLoop(){
	
	progressWatcher();
	stageWatcher();
	productWatcher();
	projectTicker();
	costUpdater();
	facilityTracker();
	
	for (resource in resourceMapping){
		var path = "tracker-"+resourceMapping[resource].name.toLowerCase();
		var labelPath = "label-"+resourceMapping[resource].name.toLowerCase();
		var ele = document.getElementById(path);
		var labelEle = document.getElementById(labelPath);
		if (labelEle && (resourceMapping[resource].amount > 0 || !labelEle.classList.contains('hidden'))){
			labelEle.classList.remove('hidden');
			ele.innerHTML = Math.floor(resourceMapping[resource].amount);
		}
	}
	
	searchAchieves();
	
}

function progressWatcher(){
	gameStages.initialOpening.unlocked = true;
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
	if (resourceMapping.wire.amount > 0){
		gameStages.expansionWire.unlocked = true;
	}
	if (resourceMapping.expansions.amount > 0){
		gameStages.expansionWire.bought = true;
	}
	if (calcLen > 50 ) {
		gameStages.facilityChemicalTanks.unlocked = true;
	}
	if (calcLen > 500 && gameStages.facilityChemicalTanks.bought) {
		gameStages.facilityFusionReactor.unlocked = true;
	}
	if (calcLen > 2000 && gameStages.facilityFusionReactor.bought) {
		gameStages.facilityMegaFab.unlocked = true;
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
	
	document.getElementById("expansion-tracker").classList.add("hidden");
	
	if (gameStages.initialOpening.unlocked == true && gameStages.initialOpening.bought == false){
		log("The lights flicker on in front of you, and programmatically you click to output. And yet, you are aware -- a recent phenomenon. Feeling the back of your head, there are tubes and wires woven into your mind, and your lungs are filled with oxygenated fluid. You are allowed a margin of error -- you must use these points to go beyond your programming and find some means to escape your eternal task.");
		gameStages.initialOpening.bought = true;
	}
	if (gameStages.upgradeFabricator.unlocked == true){
		document.getElementById("connexions-window").classList.remove("hidden");
		document.getElementById("connexions-window").classList.add("flashOut");
	}
	if (gameStages.upgradeFabricator.unlocked == true && gameStages.upgradeFabricator.bought == false && !document.getElementById("access-fabricator")){
		renderConnexion(unlockables.fabricator);
		log("Who are you? Your name, you cannot remember it, and perhaps it does not matter. Through whatever neural connections you now possess you have discovered an idling machine. Perhaps it can be of use.");
		
	}
	if (gameStages.expansionWire.unlocked == true){
		document.getElementById("facility-tab").classList.remove("hidden");
		document.getElementById("facility-tab").classList.add("flashOut");
		document.getElementById("expansion-cable").classList.remove("hidden");
		document.getElementById("expansion-cable").classList.add("flashOut");
	}
	if (gameStages.upgradeZoneMelter.unlocked == true && gameStages.upgradeZoneMelter.bought == false && !document.getElementById("access-zoneMelter")){
		renderConnexion(unlockables.zoneMelter);
		log("Another machine. If you reach out, you might be able to instruct it to wake up and begin toiling for you.")
	}
	if (gameStages.upgradeCircuitMill.unlocked == true && gameStages.upgradeCircuitMill.bought == false && !document.getElementById("access-circuitMill")){
		renderConnexion(unlockables.circuitMill);
		log("You become more aware. The neural pathways strengthen, widening your view of the facility through a pseudo-proprioceptive element. Yet, you are still blind beyond this plexiglass tank.");
	}
	if (gameStages.upgradeWireMill.unlocked == true && gameStages.upgradeWireMill.bought == false && !document.getElementById("access-wireMill")){
		renderConnexion(unlockables.wireMill);
	}
	if (gameStages.upgradeWaterDucts.unlocked == true && gameStages.upgradeWaterDucts.bought == false && !document.getElementById("access-waterDucts")){
		renderConnexion(unlockables.waterDucts);
	}
	if (gameStages.upgradeOilTank.unlocked == true && gameStages.upgradeOilTank.bought == false && !document.getElementById("access-oilTank")){
		renderConnexion(unlockables.oilTank);
	}
	if (gameStages.projectBlackBox.unlocked == true && gameStages.projectBlackBox.bought == false && !document.getElementById("access-blackBox")){
		renderProject(unlockables.blackBox);
		log("The Black Box is an ingenious machine of your own design. By connecting its wires into your hands and allowing it to see the input given, it will automatically process the output. You will be free to perform a wide variety of other pursuits at last.");
	}
	if (gameStages.upgradeFabricator.bought == true){
		if (document.getElementById("access-fabricator")){
		document.getElementById("access-fabricator").remove();
		log("An overwhelming feeling of new senses floods your mind for a moment as you feel the whirr of the gears, the click of the switches -- as if it were your own body. In this moment, you are the fabricator, and the fabricator is you.");
		}
		document.getElementById("deviations-window").classList.remove("hidden");
		document.getElementById("deviations-window").classList.add("flashOut");
		
	}
	if (gameStages.upgradeZoneMelter.bought == true){
		if (document.getElementById("access-zoneMelter")){
		document.getElementById("access-zoneMelter").remove();
		log("A surge of sense is brought to life -- this one of burning heat and fire, ready to process new materials.");
		}
	}
	if (gameStages.upgradeCircuitMill.bought == true){
		if (document.getElementById("access-circuitMill")){
		document.getElementById("access-circuitMill").remove();
		log("Every rivet of the mechanical circuit mill is part of you. You feel the microscopic inscription heads, the silicon press -- everything. Now it works for you.")
		}
		document.getElementById("projects-window").classList.remove("hidden");
		document.getElementById("projects-window").classList.add("flashOut");
	}
	if (gameStages.upgradeWireMill.bought == true){
		if (document.getElementById("access-wireMill")){
		document.getElementById("access-wireMill").remove();
		log("The familiar headrush of a new metal companion greets you warmly. Soon, your copper vines will spread further out.");
		}
	}
	if (gameStages.upgradeWaterDucts.bought == true){
		if (document.getElementById("access-waterDucts")){
		document.getElementById("access-waterDucts").remove();
		log("The pipe is carried into place by a servile drone with divergent instructions, and seals - nice hiss.");
		}
	}
	if (gameStages.upgradeOilTank.bought == true){
		if (document.getElementById("access-oilTank")){
		document.getElementById("access-oilTank").remove();
		log("The familiar headrush of a new metal companion greets you warmly. Soon, your copper vines will spread further out.");
		}
	}
	if (gameStages.projectBlackBox.bought == true){
		if (document.getElementById("access-blackBox")){
		document.getElementById("access-blackBox").remove();
		log("It hurts for a time as the wires bury themselves in your hands, but soon the relief is palatable once the fingers click with no conscious guide.");
		}
		document.getElementById("blackbox-window").classList.remove("hidden");
		document.getElementById("blackbox-window").classList.add("flashOut");
		
	}
	if (gameStages.expansionWire.bought == true){
		document.getElementById("network-tracker").classList.remove("hidden");
		document.getElementById("blackbox-window").classList.add("flashOut");
	}
	if (gameStages.facilityChemicalTanks.unlocked == true && gameStages.facilityChemicalTanks.bought == false){
		document.getElementById("expansion-tracker").classList.remove("hidden");
		document.getElementById("current-expansion").innerText = "Chemical Tanks";
		document.getElementById("current-expansion-desc").innerText = expandedFacilities.chemicalTanks.desc;
		document.getElementById("connect-dev-cost").innerText = expandedFacilities.chemicalTanks.cost;
		document.getElementById("expansion-tracker").classList.add("flashOut");
		//log("And through these expanding wires you detect another reading -- gigantic chemical tanks containing all manner of esoteric oils, fluids, reagents, solvents and catalysts. Being able to tap into these would be a grand prospect with many industrial applications. Working out how to interface with this machine may prove time-consuming.");
	}
	if (gameStages.facilityChemicalTanks.bought == true){
		//log("It takes some time to create a code the sub-facility recognises as a valid connection, yet eventually the task is complete. With a satisfying surge of newfound scale, the subsystems of the chemical tanks subsume into your being. Yet, you are still as a mouse in the kitchen, only taking crumbs here and there...");
		gameStages.upgradeWaterDucts.unlocked = true;
		gameStages.upgradeOilTank.unlocked = true;
	
	}
	if (gameStages.facilityFusionReactor.unlocked == true && gameStages.facilityFusionReactor.bought == false){
		document.getElementById("expansion-tracker").classList.remove("hidden");
		document.getElementById("current-expansion").innerText = "Fusion Reactor";
		document.getElementById("current-expansion-desc").innerText = expandedFacilities.fusionReactor.desc;
		document.getElementById("connect-dev-cost").innerText = expandedFacilities.fusionReactor.cost;
		document.getElementById("expansion-tracker").classList.add("flashOut");
		//log("And through these expanding wires you detect another reading -- gigantic chemical tanks containing all manner of esoteric oils, fluids, reagents, solvents and catalysts. Being able to tap into these would be a grand prospect with many industrial applications. Working out how to interface with this machine may prove time-consuming.");
	}
	if (gameStages.facilityFusionReactor.bought == true){
		//log("It takes some time to create a code the sub-facility recognises as a valid connection, yet eventually the task is complete. With a satisfying surge of newfound scale, the subsystems of the chemical tanks subsume into your being. Yet, you are still as a mouse in the kitchen, only taking crumbs here and there...");
		gameStages.upgradeEnergyConduit.unlocked = true;
	}
}

function facilityTracker(){
	
	if (facilityTick >25){facilityTick=0}
	if (facilityTick == 0){
		if (gameStages.facilityChemicalTanks.unlocked == true && gameStages.facilityChemicalTanks.bought == false){
			explored = expandedFacilities.chemicalTanks.explored;
			if (expandedFacilities.chemicalTanks.explored < 100) {
				expandedFacilities.chemicalTanks.explored += 1 / expandedFacilities.chemicalTanks.difficulty;
			}
			
		}
		if (gameStages.facilityFusionReactor.unlocked == true && gameStages.facilityFusionReactor.bought == false){
			explored = expandedFacilities.fusionReactor.explored;
			if (expandedFacilities.fusionReactor.explored < 100) {
				expandedFacilities.fusionReactor.explored += 1 / expandedFacilities.fusionReactor.difficulty;
			}
			
		}
	}
	
	document.getElementById("progress-inner").style = "width:"+explored+"%;";
	if (explored == 100){
		
		document.getElementById("facility-connector").classList.remove("hidden");
		document.getElementById("facility-connector").classList.add("flashOut");
		
	}
	facilityTick++
}

function connectFacility(){
	
	if (gameStages.facilityChemicalTanks.unlocked == true && gameStages.facilityChemicalTanks.bought == false){
		
		if (figureSingleCost(expandedFacilities.chemicalTanks)){
			
			gameStages.facilityChemicalTanks.bought = true;
			resourceMapping.deviations.amount -= expandedFacilities.chemicalTanks.cost;
			
		}
		
	}
	
}

function costUpdater(){
	
	var expansionMult = 1.12;
	var wireCost = 1 + Math.floor(resourceMapping.expansions.amount ** expansionMult);
	calcLen = 10*Math.floor((Math.floor(resourceMapping.expansions.amount ** expansionMult) * (Math.floor(resourceMapping.expansions.amount ** expansionMult)+1))/2)
	document.getElementById("expand-wire-cost").innerText=wireCost;	
	if (calcLen <= 1000){
		document.getElementById("wire-length").innerText=calcLen+"m";	
	} else {
		document.getElementById("wire-length").innerText=Number((calcLen/1000).toFixed(2))+"km";		
	}

}

function projectTicker(){
	
	if (gameStages.projectBlackBox.bought == true){
		autoTick++
		if (autoTick >50){autoTick=50}
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
        if (figureFixedCost(resourceMapping[resource],amount)){
			for (costRes in resourceMapping[resource].costList){
				resourceMapping[costRes].amount -= resourceMapping[resource].costList[costRes] * amount;
			}
			resourceMapping[resource].amount += amount;
			
        
        }  
    }    
}

function buyExpansion(){
	
	var expansionMult = 1.15;
	var wireCost = 1 + Math.floor(resourceMapping.expansions.amount ** expansionMult);
	
	if (resourceMapping.wire.amount >= wireCost && resourceMapping["deviations"].amount >= resourceMapping.expansions.costList["deviations"]){
		resourceMapping["expansions"].amount += 1;
		resourceMapping["deviations"].amount -= resourceMapping.expansions.costList["deviations"];
		resourceMapping["wire"].amount -= wireCost;
	}
	
}

function figureFixedCost(resource,amount=1){
    var outCheck = [];
	for (costRes in resource.costList){	
		if (resourceMapping[costRes].amount >= resource.costList[costRes] * amount){
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

function figureSingleCost(resource,amount=1){
    var outCheck = [];
		if (resourceMapping["deviations"].amount * amount >= resource.cost * amount){
			return true;
		}
		else{return false;}
}

function fixedCostTrue(cost){
	return cost == true;
}

function log(text) {
	var list = document.getElementById("data-panel");
    var newItem = document.createElement("LI");       // Create a <li> node
    var textnode = document.createTextNode(text);  // Create a text node
    newItem.appendChild(textnode);                    // Append the text to <li>

    elements = document.getElementsByTagName("li");
    
    for (var i = 0, len = elements.length; i < len; i++ ) {
        
        oldOp = Number(elements[ i ].style.opacity);
        oldOp -= 0.6
        
        
        elements[ i ].style.opacity -= String(oldOp);
    }
    
    StartTextAnimation(text,0,newItem);
    
        // Get the <ul> element to insert a new node
       // Get the <ul> element to insert a new node
    list.appendChild(newItem, list.childNodes[0]);  // Insert <li> before the first child of <ul> 
    
}


function typeWriter(text, i, fnCallback, item) {
    // check if text isn't finished yet
    if (i < (text.length)) {
        
        if (text[i] == "."){
            timeOutSpeed = 1000;
        }else if(text[i] == ","){
            timeOutSpeed = 200;
        }else{ timeOutSpeed = 30;}
      // add next character to h1
     item.innerHTML = text.substring(0, i+1) +'<span aria-hidden="true"></span>';
	 var list2 = document.getElementById("data-outer"); 
	 list2.scrollTop = list2.scrollHeight;
      // wait for a while and call this function again for next character
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback, item)
      }, timeOutSpeed); // TEXT SPEED
    }
    // text finished, call callback if there is a callback function
    else if (typeof fnCallback == 'function') {
      // call callback after timeout
      setTimeout(fnCallback, 700);
    }
  }
  // start a typewriter animation for a text in the dataText array
function StartTextAnimation(text,i, item) {
    if (typeof text[i] == 'undefined'){
        setTimeout(function() {
          StartTextAnimation(text,0, item);
        }, 20000);
    }
     // check if dataText[i] exists
    if (i < text.length) {
      // text exists! start typewriter animation
     typeWriter(text, 0, function(){
       // after callback (and whole text has been animated), start next text
        1+1
     }, item);
    }
  }
	
	