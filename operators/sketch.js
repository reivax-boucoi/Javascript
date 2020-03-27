   let names= ["+", "-", "x","/","^","|"];
   let func=[ 
   function(a,b){return a+b;},
function(a,b){return a-b;},
function(a,b){return a*b;},
function(a,b){return a/b;},
function(a,b){return pow(a,b);},
function(a,b){return a*10+b;}
  ];
  
 let str=[];

function setup() {
	tryNb(1,{evaluation: 1, expression: '1'});
	console.log(str.length);
	//console.table(str);
}

function tryNb(nb,obj){
	if(nb<10){
		for(let op=0;op<names.length;op++){
			for(let y=nb+1;y<10;y++){
				let ev=func[op](obj.evaluation,y);
				let res='('+obj.expression.toString()+names[op]+y.toString()+')';
				tryNb(y,{evaluation: ev, expression: res});
			}
		}
	}
		if(obj.evaluation>0 && obj.evaluation<10000 && Number.isInteger(obj.evaluation))
		str.push(obj);
	
}