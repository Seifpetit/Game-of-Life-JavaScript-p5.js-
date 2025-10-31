function Cell(a, b, c, d) {
	this.x = a;
	this.y = b;
	this.w = c;
	this.h = d;

	this.alive = false;//false = white;
	this.c = 200;
	this.s = 0;

	this.show = function() {
		push();
			stroke(0, 0, 255,50);
			//strokeWeight(2);
			fill(this.c)
			rect(this.x, this.y, this.w, this.h);
		pop();
	}

	this.update = function() {
		if (this.s == 3) {
			this.alive = true;
		}

		if (this.s > 3 || this.s < 2) {
			this.alive = false;
		}	
	}
}
