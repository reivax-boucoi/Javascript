function Vehicule(x,y){
    this.pos=createVector(x,y);
    this.vel=createVector(1,1);
    this.acc=createVector(0,0);
    this.maxspeed=3;
    this.maxacc=.1;
    this.size=5;
    
    this.update=function(){
        this.boundaries();
        
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    
    this.applyForce=function(v){
        this.acc.add(v);
    }
    this.seek=function(x,y){
        let target=createVector(x,y);
        let des=p5.Vector.sub(target,this.pos);
        des.setMag(this.maxspeed);
        let steer=p5.Vector.sub(des,this.vel);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }
    this.avoid=function(x,y){
        let target=createVector(x,y);
        let des=p5.Vector.sub(target,this.pos);
        if(des.mag()<50){
            des.setMag(-this.maxspeed);
            let steer=p5.Vector.sub(des,this.vel);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    }

    this.show=function(){
        fill(0);
        stroke(255);
        push();
        
        translate(this.pos.x,this.pos.y);
        rotate(this.vel.heading()+PI/2);
        beginShape();
        vertex(this.size, this.size * 2);
        vertex(-this.size, this.size * 2);
        vertex(0, -this.size * 2);
        
        endShape(CLOSE);
        pop();
    }
    
    this.boundaries = function() {
        if (this.pos.x < 0) {
            this.pos.x=width;
        } else if (this.pos.x > width) {
            this.pos.x=0;
        }
        if (this.pos.y < 0) {
            this.pos.y=height;
        } else if (this.pos.y > height) {
            this.pos.y=0;
        }
    }
}
