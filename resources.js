// -----------------------

var resourceMapping = {
	output : {
        name : "Output",
		icon: "cachedOutput",
        amount: 0,
        baseCost: 0,
        clickValue: 1,
        fps: 0,
        mult: 1,
        idle: 0,
        limit: 2000
    },
	deviations : {
        name : "Deviations",
		icon: "errorCycle",
        baseCost : 100,
        amount: 0,
        clickValue: 1,
        fps: 0,
        mult: 1,
        idle: 0,
        limit: 10
    },
	vactube : {
        name : "Vactubes",
		icon: "vacTube",
        amount: 0,
		costList : {"deviations":1},
        clickValue: 1,
        fps: 0,
        mult: 1,
        idle: 0,
        limit: 100
    },
	boule : {
        name : "Boules",
		icon: "siliconBoule",
        amount: 0,
		costList : {"deviations":10},
        clickValue: 1,
        fps: 0,
        mult: 1,
        idle: 0,
        limit: 100
    },
	circuit : {
        name : "Circuits",
		icon: "circuit",
        amount: 0,
		costList : {"deviations":3,"vactube":3,"boule":1},
        clickValue: 1,
        fps: 0,
        mult: 1,
        idle: 0,
        limit: 100
    },
	wire : {
        name : "Wire",
		icon: "wire",
        amount: 0,
		costList : {"deviations":5},
        clickValue: 1,
        fps: 0,
        mult: 1,
        idle: 0,
        limit: 100
    }
};


function colourLabels(resource){
	var path = "label-"+resource.name.toLowerCase();
	var str = document.getElementById(path).innerText;
	if (str.toLowerCase().indexOf(path) > -1) {
		str = str.replace(resource.name, '<span style="color:'+resource.color+';">'+resource.name+'</span>');  
	}
	document.getElementById(path).children[1].innerHTML = str.replace(resource.name, '<span style="color:'+resource.color+';">'+resource.name+'</span>');		
}


