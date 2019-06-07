var font=[];
var cfont;
var vehicles = [];
var state=0;
let words=['Florence','Deranty','Koulkoul','Molocoloc'];
function preload() {
    font[0] = loadFont('font.ttf');
    font[1] = loadFont('font1.ttf');
    cfont=font[0];
}

function setup() {
    createCanvas(800, 300);
    colorMode(HSB);
    var c=setInterval(change, 5000);
    change();
}

function draw() {
    background(20);
    for (var i = 0; i < vehicles.length; i++) {
        var v = vehicles[i];
        v.behaviors();
        v.update();
        v.show();
    }
}
function mousePressed(){
    if(cfont==font[0]){
        cfont=font[1];
    }else{
        cfont=font[0];
        
    }
    state--;
    change();
}

function change(){
    var points = cfont.textToPoints(words[state], 50, 200, 150, {
        sampleFactor: .2,
    });
    var i=0;
    for (; i < points.length; i++) {
        var pt = points[i];
        if(i<vehicles.length){
            vehicles[i].target=createVector(pt.x,pt.y);
        }else{
            col = color(map(i, 0, points.length, 0, 360), 100, 100);
            var vehicle = new Vehicle(pt.x, pt.y,col);
            vehicles.push(vehicle);
        }
    }
    vehicles.splice(i,vehicles.length-i);
    state++;
    if(state>words.length-1)state=0;
}
