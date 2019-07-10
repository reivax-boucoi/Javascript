class NoiseRenderer {
	constructor(m) {
		this.nmap=m;
		this.terrains=new Terrains();
		this.renderMode=1;
		this.regenerate();
	}
	regenerate(){
		this.nmap.generate();
	}
	render() {
		background(0);
		for (var y=0; y<this.nmap.n[0].length; y++) {
		  for (var x=0; x<this.nmap.n.length; x++) {
			var c;
			switch(this.renderMode){
			 case 1:
			   for(var i=0;i<this.terrains.terrain.length;i++){
				 if(this.terrains.terrain[i].level>=map(this.nmap.n[x][y],this.nmap.minNoiseHeight,this.nmap.maxNoiseHeight,1,0)){
				   c=this.terrains.terrain[i].col;
				   break;
				 }
			   }
			 break;
			 default:
			  c=map(this.nmap.n[x][y],this.nmap.minNoiseHeight,this.nmap.maxNoiseHeight,0,255);
			 break;
			}
			stroke(c);
            point(x,y);
		  }
		}
	}
}
