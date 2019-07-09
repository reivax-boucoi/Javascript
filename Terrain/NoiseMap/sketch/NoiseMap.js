class NoiseMap {

  constructor(w, h, scl, layers, lacunarity, persistance) {
    
	this.octOffset=[];
	for(var i=0;i<layers;i++){
		this.octOffset[i]=p5.Vector.random2D();
	}
	this.n=[];
    this.w=w;
    this.h=h;
    this.scl=scl;
    this.layers=layers;
    this.lacunarity=lacunarity;
    this.persistance=persistance;
  }
  generate(){
    var xoff=w/2;
    var yoff=h/2;
	  for (var x=0; x<w; x++) {
		this.n[x]=[];
		for (var y=0; y<h; y++) {
			var l=0;
			this.n[x][y]=0;
			var amplitude=1;
			var frequency=1;
			var nx=(x-xoff)/scl*frequency+this.octOffset[l].x;
			var ny=(y-yoff)/scl*frequency+this.octOffset[l].y;
			this.n[x][y]+=noise(nx,ny)*amplitude;
      }
    }
  }
}
