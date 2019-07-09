class Terrain {
  constructor(n, l, c){
    this.name=n;
    this.level=l;
    this.col=c;
  }
}

class Terrains {
	
  constructor() {
	this.terrain=[];
    this.terrain[0]=new Terrain("sea",.2,color('#07528E'));
    this.terrain[1]=new Terrain("sand",.3,color('#FBD48A'));
    this.terrain[2]=new Terrain("earth",.6,color('#627E0F'));
    this.terrain[3]=new Terrain("hill",.8,color('#4F4E3C'));
    this.terrain[4]=new Terrain("peak",1,color('#FEF9F5'));
  }
}

