
function CMD_inbox(){
	let item=inputQueue.retrieveContent();
	if(item!=undefined){
		carrierMan.grab(item);
	}else{
		console.log("Inbox empty !");
	}
}

function CMD_outbox(){
	let item=carrierMan.drop();
	if(item!=undefined){
		outputQueue.pushContent(item);
	}else{
		console.log("Error, carrier hands empty !");
	}
}
function getAddress(index, mode){
	if(index>=grid.length || index <0){
			console.log("Error, index "+index+" out of bounds [0 to "+grid.length+'] !');
		}else{
			if(mode=="address"){
				let r=grid.read(index);
				if(r>=grid.length || r <0){
					return r;
				}else{
					console.log("Error, index "+r+" out of bounds [0 to "+grid.length+'] !');
				}
			}else{
				return index;
			}
		}
}
function CMD_copyTo(index,mode){
	let item=carrierMan.drop();
	if(item!=undefined){
		index=getAddress(index,mode);
		if(index !=undefined)grid.write(item,index);
	}else{
		console.log("Error, carrier hands empty !");
	}
}

function CMD_copyFrom(index,mode){
	let item=undefined;
	index=getAddress(index,mode);
	if(index !=undefined){
		item=grid.read(index);
		if(item!=undefined){
			carrierMan.grab(item);
		}
	}
}