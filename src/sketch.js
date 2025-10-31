let cells = [];
	let nb_cells_w;//vertical
	let nb_cells_h;//horizontal
	let cell_w = 20;
	let cell_h = 20;

let fr;
let generation = 0;
let startGame = false;

function setup() {
	createCanvas(windowWidth,windowHeight);
	document.addEventListener('contextmenu', event => event.preventDefault());//remove right click

	/*cell_w = width/nb_cells_w;
	cell_h = height/nb_cells_h;*/

	nb_cells_w = floor(width/cell_w);
	nb_cells_h = floor(height/cell_h);



	fr = createP('');

	for (var i = 0; i < nb_cells_w; i++) {
		cells[i] = [];
		for (var j = 0; j < nb_cells_h; j++) {
			cells[i][j] = new Cell(i*cell_w, j*cell_h, cell_w, cell_h);
			if (floor(random(5)) == 1) {
				cells[i][j].alive = true;
			}
		}
	}

	frameRate(20);
}

function draw() {
  	background(200);

  	fr.html(generation);

  	for (var i = 0; i < nb_cells_w; i++) {
		for (var j = 0; j < nb_cells_h; j++) {
			if (cells[i][j].alive == true) {cells[i][j].c = 0;}
			else {cells[i][j].c = 200;}
			cells[i][j].show();
			cells[i][j].s = 0;
		}
	}

	if (mouseIsPressed === true && startGame == false) {
		if (mouseX <= width && mouseX >=0 && mouseY <= height && mouseY >= 0)//no error//
		{
			if (mouseButton === LEFT) {
				clicked_cells(mouseX, mouseY, 0);
			}
			else {
				clicked_cells(mouseX, mouseY, 1);
			}
		}
		
	}


	

	if (startGame === true) {
		gameRules();
		generation++;
		for (var i = 0; i < nb_cells_w; i++) {
			for (var j = 0; j < nb_cells_h; j++) {
				cells[i][j].update();
			}
		}
	}

}





function gameRules() {

	for (var i = 0; i < nb_cells_w; i++) {
		for (var j = 0; j < nb_cells_h; j++) {

			console.log('---------------');
			if (i != 0                      && cells[i-1][j].alive === true)   {cells[i][j].s++;console.log('left ');}
			if (i != 0 && j != 0 	        && cells[i-1][j-1].alive === true) {cells[i][j].s++;console.log('left top');}
			if (i != 0 && j != nb_cells_h-1 && cells[i-1][j+1].alive === true) {cells[i][j].s++;console.log('left down');}


			if (j != 0            && cells[i][j-1].alive === true)  {cells[i][j].s++;console.log('Bot ');}
			if (j != nb_cells_h-1 && cells[i][j+1].alive === true) 	{cells[i][j].s++;console.log('Top ');}
					
			
			
			if (i != nb_cells_w-1                      && cells[i+1][j].alive === true)   {cells[i][j].s++;console.log('right ');}
			if (i != nb_cells_w-1 && j != 0            && cells[i+1][j-1].alive === true) {cells[i][j].s++;console.log('right top ');}
			if (i != nb_cells_w-1 && j != nb_cells_h-1 && cells[i+1][j+1].alive === true) {cells[i][j].s++;console.log('right down');}
			
			
			
			console.log('X: ',i+1, 'Y: ',j+1);
			console.log(cells[i][j].s);
			console.log('---------------');

			//.RULES.

		}
	}
}













function keyPressed() {
	if (keyCode == 32) {
		startGame = !startGame;
	}
	if (keyCode == 13) {
		for (var i = 0; i < nb_cells_w; i++) {
			for (var j = 0; j < nb_cells_h; j++) {
				cells[i][j].alive = false;
			}
		}
	}
}




function clicked_cells(x, y, z) {

	let a = floor(x/cell_w);
	let b = floor(y/cell_h);

	if (z == 0) {
		cells[a][b].alive = true;
	}
	else {
		cells[a][b].alive = false;
	}
}