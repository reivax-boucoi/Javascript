function Node(p,value){
    this.x=width/2;
    this.y=50;
    this.parent=p;
    this.value=value;
    this.leftChild=null;
    this.RightChild=null;
    this.show=function(){
        fill(0,0,255);
        strokeWeight(4);
        stroke(255);   
        circle(this.x,this.y,40);
        noStroke();
        fill(255);
        textSize(20);
        text(this.value,this.x,this.y+2);
    }
}


function Tree(firstValue){
    this.origin=new Node(null,firstValue);
    
    this.show=function(){
        this.origin.show();
    }
}
