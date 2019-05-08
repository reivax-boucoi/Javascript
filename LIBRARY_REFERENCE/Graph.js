function Node(x,y){
    this.x=x;
    this.y=y;
    this.visited=false;
    this.currentweight=Infinity;
    
    this.show=function(){
        if(this.visited){
            fill(255,0,128);
        }else{
            fill(255,0,255);
        }
        strokeWeight(3);
        stroke(255);
        circle(this.x,this.y,40)
    }
}
