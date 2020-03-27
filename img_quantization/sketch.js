let img;
let div=2;
function preload() {
	img = loadImage('frog.jpeg');
}
function setup() {
	createCanvas(512,640);
	image(img, 0, 0);
	loadPixels();
	let d=pixelDensity();
	for(let index=0;index<(d*d*4*img.width*img.height);index+=4){	
		let r=pixels[index];
		let g=pixels[index+1];
		let b=pixels[index+2];
		
		r=round(div*r/256)*256/div;
		g=round(div*g/256)*256/div;
		b=round(div*b/256)*256/div;
		
		pixels[index]=r;
		pixels[index+1]=g;
		pixels[index+2]=b;
	}
	updatePixels();
	image(img,0,320);
}

function draw() {
  
}