function Node(p,value){
    if(p==null){
        this.x=width/2;
        this.xspacing=width*0.47;
        this.y=50;
        this.depth=0;
    }else{
        this.xspacing=p.xspacing/2;
        if(p.value>value){
            this.x=p.x-this.xspacing;
        }else{
            this.x=p.x+this.xspacing;
        }
        this.y=p.y+10*sqrt(this.xspacing);
        this.depth=p.depth+1;
    }
    this.parent=p;
    this.value=value;
    this.leftChild=null;
    this.rightChild=null;
    this.show=function(){
        if(this.parent != null){
            strokeWeight(1);
            stroke(250);
            line(this.x,this.y,this.parent.x,this.parent.y);
        }
        if(this.leftChild != null){
            this.leftChild.show();
        }
        if(this.rightChild != null){
            this.rightChild.show();
        }
        fill(0,0,255);
        stroke(255);;
        circle(this.x,this.y,2+4*sqrt(this.xspacing));
        noStroke();
        fill(255);
        textSize(3*sqrt(this.xspacing));
        text(this.value,this.x,this.y+2);
    }
}


function Tree(firstValue){
    this.origin=new Node(null,firstValue);
    
    this.show=function(){
        this.origin.show();
    }

    this.insert=function(value){
        var currentNode=this.origin;
        var inserted=false;
        while(!inserted){
            if(value<currentNode.value){
                if(currentNode.leftChild!=null){
                    currentNode=currentNode.leftChild;
                }else{
                    currentNode.leftChild=new Node(currentNode,value);
                    inserted=true;
                }
            }else if(value>currentNode.value){
                if(currentNode.rightChild!=null){
                    currentNode=currentNode.rightChild;
                }else{
                    currentNode.rightChild=new Node(currentNode,value);
                    inserted=true;
                }       
            }else{
                inserted=true;
                console.log("existing value in tree !");
            }
        }
    }
}
