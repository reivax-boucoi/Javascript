function Vehicule(x,y){
    this.pos=createVector(x,y);
    this.vel=createVector(1,1);
    this.acc=createVector(0,0);
    this.maxspeed=5;
    this.maxacc=.5;
    this.maxhealth=100;
    this.size=7;
    this.health=this.maxhealth;
    
    this.update=function(){
        this.health-=0.005;
        this.health=constrain(this.health,0,this.maxhealth);
        this.boundaries();
        
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }
    
    this.applyForce=function(v){
        this.acc.add(v);
    }
    this.seek=function(food){
        let eaten=false;
        let bestF=undefined;
        let bestd=Infinity;
        for(let i=food.length-1;i>=0;i--){
            let d=this.pos.dist(food[i].pos);
            
            if(d<this.maxspeed){
                this.health+=food[i].value;
                food.splice(i,1);
                food.push(new Food());
                eaten=true;;
            }else if(d<=bestd){
                bestd=d;
                bestF=food[i];
            }
        }
        if(!eaten){
            let des=p5.Vector.sub(bestF.pos,this.pos);
            des.setMag(this.maxspeed);
            let steer=p5.Vector.sub(des,this.vel);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    }
    this.dead=function(){
        return this.health<0;
    }
    this.show=function(){
        fill(map(this.health,0,this.maxhealth,0,255));
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
    var d = 20;
    var desired = null;
    if (this.pos.x < d) {
        desired = createVector(this.maxspeed, this.vel.y);
    } else if (this.pos.x > width - d) {
        desired = createVector(-this.maxspeed, this.vel.y);
    }

    if (this.pos.y < d) {
        desired = createVector(this.vel.x, this.maxspeed);
    } else if (this.pos.y > height - d) {
        desired = createVector(this.vel.x, -this.maxspeed);
    }

    if (desired !== null) {
        desired.normalize();
        desired.mult(this.maxspeed);
        var steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }
    }
}

function Food(){
    this.pos=createVector(50+random(width-100),50+random(height-100));
    this.value=random()>.5?.2:-1;
    this.show=function(){
        if(this.value>0){
            fill(0,255,0);
        }else{
            fill(255,0,0);
        }
        noStroke();
        circle(this.pos.x,this.pos.y,7);
    }
}
