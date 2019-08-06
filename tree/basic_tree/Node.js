function Node(p,value){
    if(p==null){
        this.x=width/2;
        this.y=50;
    }else{
        if(p.value>value){
            this.x=p.x-50;
        }else{
            this.x=p.x+50;
        }
        this.y=p.y+50;
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
    this.depthArray.push([this.origin]);
    this.show=function(){
        this.origin.show();
    }
    this.setWidth=function(){
        var n=this.depthArray[this.depthArray.length-1].length;
        console.log(n);
        for(var i=0;i<n;i++){
            var row=this.depthArray[this.depthArray.length-1];
            console.log(i,i/n);
            //row[i].x=((i/n)-0.5)*width*0.8;
            console.log(row[i].x);
        }
        
        
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
                    if(this.depthArray[currentNode.leftChild.depth]==null){
                        this.depthArray[currentNode.leftChild]=new Array(currentNode.leftChild);
                    }else{
                        this.depthArray[currentNode.leftChild.depth].push(currentNode.leftChild);
                    }
                    inserted=true;
                }
            }else if(value>currentNode.value){
                if(currentNode.rightChild!=null){
                    currentNode=currentNode.rightChild;
                }else{
                    currentNode.rightChild=new Node(currentNode,value);
                    if(this.depthArray[currentNode.rightChild.depth]==null){
                        this.depthArray[currentNode.rightChild]=new Array(currentNode.rightChild);
                    }else{
                        this.depthArray[currentNode.rightChild.depth].push(currentNode.rightChild);
                    }
                    inserted=true;
                }       
            }else{
                inserted=true;
                console.log("existing value in tree !");
            }
        }
        this.setWidth();
    }
}
