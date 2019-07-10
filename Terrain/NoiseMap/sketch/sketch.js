
var nm;
var nr;

function setup() {
    createCanvas(640, 480);
    nm=new NoiseMap(width, height, 100, 4, 2, 0.5);
    nr=new NoiseRenderer(nm);
    scaleSlider = createSlider(10, 10000, 100);
    scaleSlider.position(25, 25);
    updateButton = createButton('Generate');
    updateButton.position(25, 25);
    updateButton.mousePressed(button_update); 
    background(0);
    nr.render();
}

function draw() {
    
}

function mouseReleased(){
    nr.renderMode=1-nr.renderMode;
    nr.render();
}
function button_update(){
    
    
}
