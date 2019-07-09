class NoiseMap {

  constructor(w, h, scl, layers, lacunarity, persistance) {
    
	this.octOffset=[];
	for(var i=0;i<layers;i++){
		this.octOffset[i]=p5.Vector.random2D();
		this.octOffset[i].setMag(random(-100000,100000));
	}
	this.n=[];
    this.w=w;
    this.h=h;
    this.scl=scl;
    this.layers=layers;
    this.lacunarity=lacunarity;
    this.persistance=persistance;
	this.maxNoiseHeight=-Infinity;
	this.minNoiseHeight=Infinity;
  }
  generate(){
    var xoff=this.w/2;
    var yoff=this.h/2;
	  for (var x=0; x<this.w; x++) {
		this.n[x]=[];
		for (var y=0; y<this.h; y++) {
			this.n[x][y]=0.5;
			var amplitude=1;
			var frequency=1;
			for(var l=0;l<this.layers;l++){
				var nx=(x-xoff)/this.scl*frequency+this.octOffset[l].x;
				var ny=(y-yoff)/this.scl*frequency+this.octOffset[l].y;
				this.n[x][y]+=noise(nx,ny)*amplitude;
				amplitude*=this.persistance;
				frequency*=this.lacunarity;
			}
			if(this.n[x][y]<=this.minNoiseHeight){
				this.minNoiseHeight=this.n[x][y];
			}
			if(this.n[x][y]>=this.maxNoiseHeight){
				this.maxNoiseHeight=this.n[x][y];
			}
      }
    }
  }
}
