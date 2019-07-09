class NoiseRenderer {
	
  var nmap;
  var terrains;
  var renderMode=0;
  contructor(m) {
    nmap=m;
    terrains=new Terrains();
  }
  function render() {
    nmap.generate();
    background(0);
    for (var y=0; y<nmap.n[0].length; y++) {
      for (var x=0; x<nmap.n.length; x++) {
        switch(renderMode){
         case 1:
           for(var i=0;i<terrains.terrain.length;i++){
             if(terrains.terrain[i].level>=(1-nmap.n[x][y])){
               stroke(terrains.terrain[i].col);
               break;
             }
           }
         break;
         default:
          stroke(nmap.n[x][y]*255);
         break;
        }
        point(x, y);
      }
    }
  }
}
