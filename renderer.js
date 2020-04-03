function renderConnexion(connexion){

	var connexionPanel = document.getElementById("connexion-panel"); 
	var upgrade = document.createElement("div");
	var upgradeHeader = document.createElement("div");
	var upgradeBody = document.createElement("div");

	upgradeHeader.classList.add("upgrade-header");
	upgradeBody.classList.add("upgrade-body");

	upgrade.classList.add("upgrade");
	upgrade.id = "access-"+connexion.name;
	
	upgradeHeader.onclick = function(){connect(connexion,connexion.link);};
	upgradeHeader.innerText = connexion.label;
	
	var outCost = "";
	for (cost in connexion.costList){
		outCost += "<span class='upgrade-display' id=cost-"+connexion.name+">"+"<img class='resource-image-small' src='images/"+resourceMapping[cost].icon+".png'>"+connexion.costList[cost]+"</span>"	
	}
	
	upgradeBody.innerHTML = outCost+"<br><i>"+connexion.desc+"</i>";
	
	upgrade.appendChild(upgradeHeader);
	upgrade.appendChild(upgradeBody);
	
	connexionPanel.appendChild(upgrade);

}

function renderDeviation(deviation){

	deviation = unlockables[deviation];
	dResource = resourceMapping[deviation.name]

	var deviationPanel = document.getElementById("deviation-panel"); 
	var upgrade = document.createElement("div");
	var upgradeHeader = document.createElement("div");
	var upgradeBody = document.createElement("div");

	upgrade.classList.add("upgrade");
	
	upgradeHeader.classList.add("upgrade-header");
	upgradeBody.classList.add("upgrade-body");
	
	upgradeHeader.onclick = function(){addResource(deviation.name)};
	upgradeHeader.innerText = deviation.label;
	
	upgrade.id = "deviation-"+deviation.name;
	
	var outCost = "";
	for (cost in dResource.costList){
		outCost += "<span class='upgrade-display' id=cost-"+deviation.name+">"+"<img class='resource-image-small' src='images/"+resourceMapping[cost].icon+".png'>"+dResource.costList[cost]+"</span>"	
	}
	
	upgradeBody.innerHTML = outCost+"<br><i>"+deviation.desc+"</i>";

	upgrade.appendChild(upgradeHeader);
	upgrade.appendChild(upgradeBody);
	
	deviationPanel.appendChild(upgrade);

}