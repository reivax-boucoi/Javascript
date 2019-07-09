class NoiseMap {

  var n=[];
  var octOffset=[];
  var w;
  var h;
  var scl;
  var layers;
  var lacunarity;
  var persistance;
  
  constructor(w, h, scl, layers, lacunarity, persistance) {
    
	for(var i=0;i<layers;i++){
		this.octOffset[i]=p5.Vector.random2D();
	}
	
    this.w=w;
    this.h=h;
    this.scl=scl;
    this.layers=layers;
    this.lacunarity=lacunarity;
    this.persistance=persistance;
  }
  function generate(){
    var xoff=w/2;
    var yoff=h/2;
	  for (var x=0; x<w; x++) {
		n[x]=[];
		for (var y=0; y<h; y++) {
			var l=0;
			n[x][y]=0;
			var amplitude=1;
			var frequency=1;
			var nx=(x-xoff)/scl*frequency+octOffset[l].x;
			var ny=(y-yoff)/scl*frequency+octOffset[l].y;
			n[x][y]+=noise(nx,ny)*amplitude;
      }
    }
  }
}
