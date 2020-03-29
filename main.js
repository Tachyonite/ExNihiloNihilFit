var input = -1
var maxInput = 16
var progress = {"errorTolerance":0}

var inputInterval = setInterval( drawInput, 100);
var tickInputInterval = setInterval( increaseInput, 200);

var mainLoopInterval = setInterval( mainLoop, 100);

function mainLoop(){
	
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
}

function progressWatcher(){
	
	if (resources["deviations"]>=1 && progress["deviations"]==0){
		progress["deviations"] = 1
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
	resourceMapping["deviations"].amount+=input/32
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
    console.log(resourceMapping[resource]);
    if (fixed){
        if (figureFixedCost(resourceMapping[resource].baseCost,resourceMapping[resource],resourceMapping[resource].costResource,amount)){
            if (resourceMapping[resource].limit > resourceMapping[resource].amount){
                
                resourceMapping[resourceMapping[resource].costResource].amount -= resourceMapping[resource].baseCost;
                resourceMapping[resource].amount += amount;
                
            }
        
        }  
    }    
    
}

function figureFixedCost(cost,resource,req,amount=1){
    
    var totalCost = cost * amount
    if (resourceMapping[resource.costResource].amount >= resource.baseCost){
        return true;
    }
    return false;
    
}

for (r in resourceMapping){	
        colourLabels(resourceMapping[r]);	
    }
	
	