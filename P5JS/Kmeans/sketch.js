var disp =.5;
var bits=9;
var data =[];
var ite=0;
var centroids;
function setup() {
    createCanvas(500,500);
    button = createButton("Iterate");
    button.mousePressed(kmean);
    background(0);
    strokeWeight(3);
    stroke(0);
    fill(255);
    var xys=new Array(bits);
    var step=height/(sqrt(bits)+1);
    for(var i=0;i<bits;i++){
        xys[i]=createVector(step+step*(i%sqrt(bits)),step+step*(floor(i/sqrt(bits))%sqrt(bits)));
    }
    disp=disp*step;
    
    centroids=new Array(bits);
    for(var i=0;i<centroids.length;i++){
        fillColor(i);
        centroids[i]=createVector(random(height),random(height));
        ellipse(centroids[i].x,centroids[i].y,10,10);        
    }
    data=new Array(4000);
    for(var i=0;i<data.length;i++){
        r=p5.Vector.random2D();
        r.mult(disp*random());
        data[i]=createVector(xys[i%bits].x,xys[i%bits].y);
        data[i].add(r);
        point(data[i].x,data[i].y);
    }
    colorMode(HSB, 255,255,255);
}
function kmean(){
    if(ite%2){
        kmean2();
    }else{
        kmean1();
    }
    ite++;
}
function kmean1(){
    var swapped=false;
    for(var i=0;i<data.length;i++){
        var d=Pdist(data[i],centroids[data[i].z]);
        var index=data[i].z;
        for(var j=0;j<centroids.length;j++){
            if(Pdist(data[i],centroids[j])<d){
                d=Pdist(data[i],centroids[j]);
                index=j;
                swapped=true;
            }
        }
        data[i].z=index;
    }
    if(!swapped){
        console.log("kmean finished  in "+((ite/2)+1)+" iterations !");
        
    }
}
function kmean2(){
    for(var i=0;i<centroids.length;i++){
        newpos=createVector(0,0,0);
        var n=0;
        for(var j=0;j<data.length;j++){
            if(data[j].z==i){
                newpos.add(data[j]);
                n++;
            }
        }
        if(n==0){
            console.log("relocated lost centroid !");
            newpos.set(random(height),random(width));
        }else{
        newpos.div(n);
        }
        centroids[i]=newpos;
    }
}
function fillColor(a){//a: 0->bits-1
    stroke(255*(a+1)/(1+bits),255,255);
}
function Pdist(a,b){
    return (abs(a.x-b.x)*abs(a.x-b.x)+abs(a.y-b.y)*abs(a.y-b.y));
}
function draw() {
    background(0);
    for(var i=0;i<data.length;i++){
        
        fillColor(data[i].z);
        point(data[i].x,data[i].y);
    }
    for(var i=0;i<centroids.length;i++){
        fillColor(i);
        ellipse(centroids[i].x,centroids[i].y,10,10);        
    }

}
