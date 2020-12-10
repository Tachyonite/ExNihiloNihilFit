function renderConnexion(connexion){

	var connexionPanel = document.getElementById("connexion-panel"); 
	
	var upgrade = document.createElement("div");
	var upgradeHeader = document.createElement("div");

	upgradeHeader.classList.add("upgrade-header");

	upgrade.classList.add("upgrade");
	upgrade.classList.add("tooltip");
	upgrade.id = "access-"+connexion.name;
	
	upgradeHeader.onclick = function(){connect(connexion,connexion.link);};
	upgradeHeader.innerText = connexion.label;
	
	var outCost = "";
	for (cost in connexion.costList){
		outCost += "<img class='resource-image-small' src='images/"+resourceMapping[cost].icon+".png'>"+"<span style='margin-right:5px;'>"+connexion.costList[cost]+"</span>"
	}
	
	upgradeHeader.innerHTML = "<span class='tooltiptext'>"+connexion.desc+"</span><div style='min-width:180px;'>"+connexion.label+"</div><div class='upgrade-display' id='cost-"+connexion.name+"'>"+outCost+"</div>";

	upgrade.appendChild(upgradeHeader);
	
	connexionPanel.appendChild(upgrade);
	console.log(connexionPanel);

}

function renderProject(project){

	var connexionPanel = document.getElementById("projects-panel"); 
	var upgrade = document.createElement("div");
	var upgradeHeader = document.createElement("div");

	upgradeHeader.classList.add("upgrade-header");

	upgrade.classList.add("upgrade");
	upgrade.classList.add("tooltip");
	upgrade.id = "access-"+project.name;
	
	upgradeHeader.onclick = function(){connect(project,project.link);};
	upgradeHeader.innerText = project.label;
	
	var outCost = "";
	for (cost in project.costList){
		outCost += "<img class='resource-image-small' src='images/"+resourceMapping[cost].icon+".png'>"+"<span style='margin-right:5px;'>"+project.costList[cost]+"</span>"
	}
	
	upgradeHeader.innerHTML = "<span class='tooltiptext'>"+project.desc+"</span><div style='min-width:180px;'>"+project.label+"</div><div class='upgrade-display' id='cost-"+project.name+"'>"+outCost+"</div>";
	
	upgrade.appendChild(upgradeHeader);
	
	connexionPanel.appendChild(upgrade);

}

function renderDeviation(deviation){

	deviation = unlockables[deviation];
	dResource = resourceMapping[deviation.name];

	var deviationPanel = document.getElementById("deviation-panel"); 
	var upgrade = document.createElement("div");
	var upgradeHeader = document.createElement("div");
	var upgradex10 = document.createElement("div");
	var upgradex1 = document.createElement("div");

	upgrade.classList.add("upgrade");
	upgrade.classList.add("tooltip");
	upgradex10.classList.add("times-ten");
	upgradex1.classList.add("times-ten");
	
	var upgradeBody = document.createElement("div");

	upgrade.classList.add("upgrade");
	
	upgradeHeader.classList.add("upgrade-header");
	upgradeBody.classList.add("upgrade-body");
	upgradex1.onclick = function(){addResource(deviation.name)};
	upgradex10.onclick = function(){addResource(deviation.name,amount=10)};
	upgradeHeader.innerText = deviation.label;
	
	upgrade.id = "deviation-"+deviation.name;
	
	var outCost = "";
	for (cost in dResource.costList){
		outCost += "<img class='resource-image-small' src='images/"+resourceMapping[cost].icon+".png'>"+"<span style='margin-right:5px;'>"+dResource.costList[cost]+"</span>"
	}
	
	upgradeHeader.innerHTML = "<span class='tooltiptext'>"+deviation.desc+"</span><div style='display:flex;min-width:180px;'>"+"<img style='margin-right:10px;' class='resource-image-small' src='images/"+resourceMapping[deviation.name].icon+".png'>"+deviation.label+"</div><div class='upgrade-display' id='cost-"+deviation.name+"'>"+outCost+"</div>";
	upgradex10.innerHTML = "x10";
	upgradex1.innerHTML = "x1";
	upgrade.appendChild(upgradeHeader);
	upgrade.appendChild(upgradeBody);
	upgradeBody.appendChild(upgradex1);
	upgradeBody.appendChild(upgradex10);
	
	console.log(upgradex10)
	
	deviationPanel.appendChild(upgrade);

}