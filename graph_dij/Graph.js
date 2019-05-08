function Node(x,y){
    this.x=x;
    this.y=y;
    this.visited=false;
    this.currentweight=Infinity;
    this.paths=[];
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
    this.addPath=function(n,w){
        
    }
}

function Path(n1,n2,w){
    this.n1=n1;
    this.n2=n2;
    this.w=w;
    
}
