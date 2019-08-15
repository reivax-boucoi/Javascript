function Node(p,value){
    if(p==null){
        this.x=width/2;
        this.y=50;
        this.depth=0;
    }else{
        if(p.value>value){
            this.x=p.x-50;
        }else{
            this.x=p.x+50;
        }
        this.y=p.y+50;
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
    this.depthArray=[];
    this.depthArray[0].push(origin);
    this.show=function(){
        this.origin.show();
    }
    this.insert=function(value){
        var currentNode=this.origin;
        console.log("inserting "+value);
        var inserted=false;
        while(!inserted){
            console.log("currentValue "+currentNode.value);
            if(value<currentNode.value){
                console.log("less");
                if(currentNode.leftChild!=null){
                    currentNode=currentNode.leftChild;
                }else{
                    currentNode.leftChild=new Node(currentNode,value);
                    this.depthArray[currentNode.leftChild.depth].push(currentNode.leftChild);
                    inserted=true;
                }
            }else{
                console.log("more");
                if(currentNode.rightChild!=null){
                    currentNode=currentNode.rightChild;
                }else{
                    currentNode.rightChild=new Node(currentNode,value);  
                    this.depthArray[currentNode.rightChild.depth].push(currentNode.rightChild); 
                    inserted=true;
                }       
            }
        }
    }
}
