function save() {
    
    var savefile = {
        
        resourceMapping: resourceMapping
        
    }

    localStorage.setItem("save",JSON.stringify(savefile));
    console.log("Game Saved");
    
}

function load(){
    
    var savegame = JSON.parse(localStorage.getItem("save"));
    
    if (savegame.resourceMapping != "undefined"){resourceMapping=savegame.resourceMapping}
    
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