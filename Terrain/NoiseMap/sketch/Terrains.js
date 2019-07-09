class Terrains {
	
  constructor() {
    terrain[0]=new Terrain("sea",.3,#07528E);
    terrain[1]=new Terrain("sand",.35,#FBD48A);
    terrain[2]=new Terrain("earth",.6,#627E0F);
    terrain[3]=new Terrain("hill",.85,#4F4E3C);
    terrain[4]=new Terrain("peak",1,#FEF9F5);
    
  }
}
class Terrain {
  Terrain(n, l, c){
    this.name=n;
    this.level=l;
    this.col=c;
  }
}
