//this is where variables will be initialized or defined
var element;
var index;
var splice;
var indexedrotor;
var slice = [];
//the alphabet will be for reference in transcribing
//the input into numbers and vice versa
var alphabet = ['a', 'b', 'c', 'd', 'e', 'f',
    'g', 'h', 'i', 'j', 'k', 'l',
    'm', 'n', 'o', 'p', 'q', 'r',
    's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

//alphabet check is boolean for if the last inputted letter is in the
//alphabet
var alphabetcheck;


//establishes var object for input
var input = {
	string: "",
	list : [],
	transcribed : [],
	transcribedsingle : [],
	rotortranscribed: 0,
	rotortranscribedsingle:[],
	finallist: [],
	finalstring: ""
};

//establishes var object for ouput and x cooridinates of the output
var output = {
	x: 0,
}

// establishes rotor dials for ui and turning of rotors
var rotor = {
	dial1: 0,
	dial2: 0,
	dial3: 0,
	master: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25],
	modifier:0
};


//creates function for changing letters to number
// in the alphabet
function list_transcribe(){
		for(element in input.list){
			index = 0
			while(input.list[element] != alphabet[index]){
				index += 1;
			}
			input.transcribedsingle.push(index);
		}
}

//creates function for changing letters to index in
//the modified rotor
function rotor_transcribe(){
	for(element in input.transcribed){
		input.rotortranscribed = rotor.master[input.transcribed[element]];
	}
	rotor.dial1 += 1;
 	if (rotor.dial1 == 26) {
    rotor.dial1 = 0;
  	rotor.dial2 += 1;
	}
  if (rotor.dial2 == 26) {
    rotor.dial2 = 0;
  	rotor.dial3 += 1;
	}
}

function setup() {
    //creates the screen	
    createCanvas(800,800);
}

function draw() {
 	background(220);
	noStroke();
	//creates notches to turn initial dial settings
    fill(160);
	triangle(200, 100, 150, 150, 250, 150);
    triangle(400, 100, 350, 150, 450, 150);
    triangle(600, 100, 550, 150, 650, 150);
    triangle(200, 400, 150, 350, 250, 350);
    triangle(400, 400, 350, 350, 450, 350);
    triangle(600, 400, 550, 350, 650, 350);
  //creates text both in the movable dials and infront of the input line and output line
  fill(0);
  textSize(60);
  text(input.string, 200, 546);
  text(input.finalstring, 200,690);
  text(alphabet[rotor.dial3], 186, 260);
  text(alphabet[rotor.dial2], 386, 260);
  text(alphabet[rotor.dial1], 586, 260);
  text('input', 40, 550);
  text('output', 13, 690);
  //creates lines for input and output text
  stroke(0, 0, 0);
  strokeWeight(4);
  line(200, 550, 650, 550);
  line(200, 700, 650, 700);
  
	//function that ignores the key press and continues with the code
	//as well as the alert to the user
	if(alphabetcheck == false){
		fill(255,0,0);
		noStroke();
		textSize(100);
		text('not',350,300);
		text('in alphabet', 200,400);
		setTimeout(function(){alphabetcheck = true;},5000);
	}
	//makes sure that onces dials go before a or after z 
  //they wrap around to the beginning
  // or end of the alphabet
  if (rotor.dial1 == 26) {
    rotor.dial1 = 0
  }
  if (rotor.dial1 == -1) {
    rotor.dial1 = 25
  }
  if (rotor.dial2 == 26) {
    rotor.dial2 = 0
  }
  if (rotor.dial2 == -1) {
    rotor.dial2 = 25
  }
  if (rotor.dial3 == 26) {
    rotor.dial3 = 0
  }
  if (rotor.dial3 == -1) {
    rotor.dial3 = 25
  }
}

function keyPressed(){
	
	//checks if key is in the alphabet
	if(alphabet.includes(key)){
		rotor.master = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
		
		//puts input letters in the input.list list
		//for transcription
		input.list.push(key);
		if(input.list.length > 15){
			input.string = "";
			slice = input.list.slice(input.list.length-15,input.list.length);
			for( element in slice){
				input.string += slice[element];
			}
		}else{
			input.string += input.list[input.list.length-1];
		}
		list_transcribe();
		//
        input.transcribed.push(input.transcribedsingle[input.transcribedsingle.length-1]);
	  	//for testing the input.transcribed function
        console.log(input.transcribed);
        console.log(input.transcribedsingle);
		index += 1;
	  	
        //optimizes code in that it removes from the input list once it goes of the screen
        if(index % 5 == 0){
			if(index % 20 == 0){
				input.transcribed.pop(0,20);
			}
			input.transcribed.pop(0,5);	
			console.log('working');
		}
		var rotormod = {
            //measures how far dials have been turned to modify the code.
			dial1 : int(rotor.dial1),
			dial2 : int(rotor.dial2),
			dial3 : int(rotor.dial3)
		}

        //makes a single modifier with which to modify the code.
		rotor.modifier = rotormod.dial1 + rotormod.dial2*rotormod.dial2 +       rotormod.dial3*rotormod.dial3*rotormod.dial3;
		
		while(rotor.modifier > 1){
			if(rotor.modifier - 25 < 1){
			  //infinite loop protection
              break;
			}
				rotor.modifier -= 25;
		}
		
		splice = rotor.master.splice(0,rotor.modifier);
		
		for(element in splice){
			rotor.master.push(splice[element]);
		}
		print(rotor.master);
		rotor_transcribe();
		
	    //adds to the final outputted string	
        input.finallist.push(alphabet[input.rotortranscribed]);

		if(input.finallist.length > 15){		
			input.finalstring = "";
			slice = input.finallist.slice(input.finallist.length - 15, input.finallist.length);
			for( element in slice){
				input.finalstring += slice[element];
			}
		}else{
			input.finalstring += input.finallist[input.finallist.length-1];	
		}	
	}else{
		alphabetcheck = false;
		console.log('working');
	}
}

//activates when mouse is clicked
function mouseClicked() {
  //checks for mouse's position and activates dials
  if (mouseX < 250 && mouseX > 150 && mouseY < 150 && mouseY > 100) {
    rotor.dial3 += 1;
  }
  if (mouseX < 250 && mouseX > 150 && mouseY < 400 && mouseY > 350) {
    rotor.dial3 -= 1;
  }
  if (mouseX < 450 && mouseX > 350 && mouseY < 150 && mouseY > 100) {
    rotor.dial2 += 1;
  }
  if (mouseX < 450 && mouseX > 350 && mouseY < 400 && mouseY > 350) {
    rotor.dial2 -= 1;
  }
  if (mouseX < 650 && mouseX > 550 && mouseY < 150 && mouseY > 100) {
    rotor.dial1 += 1;
  }
  if (mouseX < 650 && mouseX > 550 && mouseY < 400 && mouseY > 350) {
    rotor.dial1 -= 1;
  }
}
