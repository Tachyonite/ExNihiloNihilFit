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
		outCost += "<img class='resource-image-small' src='images/"+resourceMapping[cost].icon+".png'>"+"<span style='margin-right:5px;'>"+connexion.costList[cost]+"</span>"
	}
	
	upgradeHeader.innerHTML = "<div style='min-width:180px;'>"+connexion.label+"</div><div class='upgrade-display' id='cost-"+connexion.name+"'>"+outCost+"</div>";
	upgradeBody.innerHTML = "<i>"+connexion.desc+"</i>"

	upgrade.appendChild(upgradeHeader);
	upgrade.appendChild(upgradeBody);
	
	connexionPanel.appendChild(upgrade);
	console.log(connexionPanel);

}

function renderProject(project){

	var connexionPanel = document.getElementById("projects-panel"); 
	var upgrade = document.createElement("div");
	var upgradeHeader = document.createElement("div");
	var upgradeBody = document.createElement("div");

	upgradeHeader.classList.add("upgrade-header");
	upgradeBody.classList.add("upgrade-body");

	upgrade.classList.add("upgrade");
	upgrade.id = "access-"+project.name;
	
	upgradeHeader.onclick = function(){connect(project,project.link);};
	upgradeHeader.innerText = project.label;
	
	var outCost = "";
	for (cost in project.costList){
		outCost += "<img class='resource-image-small' src='images/"+resourceMapping[cost].icon+".png'>"+"<span style='margin-right:5px;'>"+project.costList[cost]+"</span>"
	}
	
	upgradeHeader.innerHTML = "<div style='min-width:180px;'>"+project.label+"</div><div class='upgrade-display' id='cost-"+project.name+"'>"+outCost+"</div>";
	upgradeBody.innerHTML = "<i>"+project.desc+"</i>"
	
	upgrade.appendChild(upgradeHeader);
	upgrade.appendChild(upgradeBody);
	
	connexionPanel.appendChild(upgrade);

}

function renderDeviation(deviation){

	deviation = unlockables[deviation];
	dResource = resourceMapping[deviation.name];

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
		outCost += "<img class='resource-image-small' src='images/"+resourceMapping[cost].icon+".png'>"+"<span style='margin-right:5px;'>"+dResource.costList[cost]+"</span>"
	}
	
	upgradeHeader.innerHTML = "<div style='min-width:180px;'>"+deviation.label+"</div><div class='upgrade-display' id='cost-"+deviation.name+"'>"+outCost+"</div>";
	upgradeBody.innerHTML = "<i>"+deviation.desc+"</i>"
	upgrade.appendChild(upgradeHeader);
	upgrade.appendChild(upgradeBody);
	
	
	deviationPanel.appendChild(upgrade);

}