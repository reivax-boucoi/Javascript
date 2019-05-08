function Node(x,y,nb){
    this.x=(x+.5)*width/9;
    this.y=(y+.5)*height/9;
    this.nb=nb;
    this.visited=0;//0: normal, 1:start, 2:end, 3:visited
    this.paths=[];
    this.show=function(c){
        
        if(this.visited==2){
            fill(200,0,0);
        }else if (this.visited==1){
            fill(0,200,0);
        }else if(this.visited==3){
            fill(255,0,255);
        }else{
            fill(0,0,255);
        }
        strokeWeight(4);
        if(this==c){
            stroke(255,0,0);
        }else{
            stroke(255);   
        }
        circle(this.x,this.y,40);
        noStroke();
        fill(255);
        textSize(20);
        text(this.nb,this.x,this.y+2);
    }
    this.addPath=function(n,w){
        this.paths.push(new Path(this,n,w));
    }
    this.pickPath=function(){
        var available=[];
        for(var i=0;i<this.paths.length;i++){
            if(this.paths[i].n2.visited==0 || this.paths[i].n2.visited==2){
                available.push(this.paths[i]);
            }
        }
        return random(available);
    }
}

function Path(n1,n2,w){
    this.n1=n1;
    this.n2=n2;
    this.w=w;
    
}

function Sequence(){
    this.p=[];
    this.w=0;
    this.add=function(p){
        this.p.push(p);
        this.w+=p.w;
    }
    this.run=function(n){
        for(var i=0;i<this.p.length;i++)
        if(this.p[i].n2.visited==0)this.p[i].n2.visited=3;
    }
}
