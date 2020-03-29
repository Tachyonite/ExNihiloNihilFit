// -----------------------

var resourceMapping = {
	output : {
        name : "Output",
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
        baseCost : 1,
        amount: 0,
		costResource:"deviations",
        clickValue: 1,
        fps: 0,
        mult: 1,
        idle: 0,
        limit: 10
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


