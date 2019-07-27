
var nm;
var nr;
var scaleSlider,cnv;
function setup() {
    cnv=createCanvas(640, 480);
    nm=new NoiseMap(width, height, 100, 4, 2, 0.5);
    nr=new NoiseRenderer(nm);
    scaleSlider = createSlider(10, 10000, 100);
    //scaleSlider.position(25, 25);
    updateButton = createButton('Generate');
    //updateButton.position(25, 25);
    updateButton.mousePressed(button_update); 
    cnv.mousePressed(mapClick);
    background(0);
    nr.render();
}

function draw() {
    
}

function mapClick(){
    nr.renderMode=1-nr.renderMode;
    nr.render();
}
function button_update(){
    console.log(nr.nmap.scl);
    nr.nmap.scl=scaleSlider.value();
    console.log(nr.nmap.scl);
    nr.regenerate();
    nr.render();
    
}
