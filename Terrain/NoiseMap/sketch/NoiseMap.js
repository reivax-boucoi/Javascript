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
    this.octOffset=new p5.Vector[layers];
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
		n[x][y]=0;
        n[x][y]+=noise((var)(x-xoff)/scl, (var)(y-yoff)/scl);
      }
    }
  }
}
