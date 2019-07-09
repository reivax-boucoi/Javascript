class Terrains {
	
  constructor() {
    terrain[0]=new Terrain("sea",.3,color('#07528E'));
    terrain[1]=new Terrain("sand",.35,color('#FBD48A'));
    terrain[2]=new Terrain("earth",.6,color('#627E0F'));
    terrain[3]=new Terrain("hill",.85,color('#4F4E3C'));
    terrain[4]=new Terrain("peak",1,color('#FEF9F5'));
    
  }
}
class Terrain {
  Terrain(n, l, c){
    this.name=n;
    this.level=l;
    this.col=c;
  }
}
