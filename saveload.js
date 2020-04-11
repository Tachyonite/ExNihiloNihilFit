function save() {
    
    var savefile = {
        
        resourceMapping: resourceMapping,
		achievements: achievements,
		gameStages : gameStages,
		expandedFacilities : expandedFacilities
        
    }

    localStorage.setItem("save",JSON.stringify(savefile));
    
}

function load(){
    
    var savegame = JSON.parse(localStorage.getItem("save"));
    
    if (savegame.resourceMapping != "undefined"){resourceMapping=savegame.resourceMapping}
    if (savegame.achievements != "undefined"){achievements=savegame.achievements}
    if (savegame.gameStages != "undefined"){gameStages=savegame.gameStages}
    if (savegame.expandedFacilities != "undefined"){expandedFacilities=savegame.expandedFacilities}
	
	searchAchieves();
	
}

function deleteSave(){
    
    localStorage.clear();
    window.location.reload(true); 
    
}

try{
load();
}catch(Exception){}

save();

var saveTimer = setInterval(save, 10000);