class NoiseRenderer {
  contructor(m) {
    this.nmap=new NoiseMap(width, height, scale, 1, 2, 0.5);;
    this.terrains=new Terrains();
	this.renderMode=0;
  }/*
  render() {
    this.nmap.generate();
    background(0);
    for (var y=0; y<this.nmap.n[0].length; y++) {
      for (var x=0; x<this.nmap.n.length; x++) {
        switch(this.renderMode){
         case 1:
           for(var i=0;i<this.terrains.terrain.length;i++){
             if(this.terrains.terrain[i].level>=(1-this.nmap.n[x][y])){
               stroke(this.terrains.terrain[i].col);
               break;
             }
           }
         break;
         default:
          stroke(this.nmap.n[x][y]*255);
         break;
        }
        point(x, y);
      }
    }
  }*/
}
