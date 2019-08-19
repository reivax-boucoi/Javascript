function Node(p,value){
    this.x=width/2;
    this.y=50;
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
        stroke(255);
        strokeWeight(4);
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
    this.insert=function(value){
        var currentNode=origin;
        var inserted=false;
        while(!inserted){
            if(value<currentNode.value){
                if(currentNode.leftChild!=null){
                    currentNode=currentNode.leftChild;
                }else{
                 currentNode.leftChild=new Node(currentNode,value);
                 inserted=true;
                }
            }else{
                if(currentNode.rightChild!=null){
                    currentNode=currentNode.rightChild;
                }else{
                 currentNode.rightChild=new Node(currentNode,value);   
                 inserted=true;
                }       
            }
        }
    }
}
