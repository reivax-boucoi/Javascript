class Segment{
    constructor(_p, len, _angle){
        if(_p.hasOwnProperty("angle")){
            this.parent=_p
        }
        this.a=_a;
        this.b.x=sin(_angle)*len+this.a.x;
        this.b.y=cos(_angle)*len+this.a.y;
        parent=null;
    }
    /*function show(){
        line(a.x,a.y,b.x,b.y);
    }*/
}
