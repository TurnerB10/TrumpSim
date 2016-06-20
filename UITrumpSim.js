function loadLevelUI() {
/*	
	ctx.font = 'bold 20px Serif';
	ctx.fillStyle = 'white';
	ctx.fillText('High Score:', 10, 30);
	
	ctx.font = 'bold 20px Serif';
	ctx.fillStyle = 'white';
	ctx.fillText(pad(highScore, SCORE_DIGITS), 10, 60);
*/
	ctx.font = 'bold 20px Serif';
	ctx.fillStyle = 'white';
	ctx.fillText('Score:', 10, 30);
	
	ctx.font = 'bold 20px Serif';
	ctx.fillStyle = 'white';
	ctx.fillText(pad(score, SCORE_DIGITS), 10, 60);
	
	ctx.font = 'bold 20px Serif';
	ctx.fillStyle = 'white';
	ctx.fillText('Campaign Trail:', 420, 20);
	
	ctx.font = 'bold 20px Serif';
	ctx.fillStyle = 'red';
	ctx.fillText(election, electionx, 43);
	
	ctx.font = 'bold 20px Serif';
	ctx.fillStyle = 'white';
	ctx.fillText(stageNum, 490, 65);
	
	ctx.font = 'bold 20px Serif';
	ctx.fillStyle = 'white';
	ctx.fillText('Small Loans Of 1 Million Dollars Left:', 10, 593);
	
	ctx.font = 'bold 20px Serif';
	ctx.fillStyle = tryColor;
	ctx.fillText(tries, 350, 594);
}

function loadcodeRedUI() {
	ctx.font = 'bold 100px Serif';
	ctx.fillStyle = 'red';
	ctx.fillText('Hillary Wins!', 215, 100);
			
	ctx.font = 'bold 50px Serif';
	ctx.fillStyle = 'yellow';
	ctx.fillText("Your Score:", 380, 160);
			
	ctx.font = 'bold 50px Serif';
	ctx.fillStyle = 'yellow';
	ctx.fillText(pad(score, SCORE_DIGITS), 410, 200);
			
	ctx.font = 'bold 40px Serif';
	ctx.fillStyle = 'red';
	ctx.fillText('(President)', 150, 310);
			
	ctx.font = 'bold 40px Serif';
	ctx.fillStyle = 'red';
	ctx.fillText('(Vice-President)', 578, 255);
			
	ctx.font = 'bold 50px Serif';
	ctx.fillStyle = 'red';
	ctx.fillText("Try Again?", 390, 530);
			
	ctx.font = 'bold 50px Serif';
	ctx.fillStyle = 'red';
	ctx.fillText(Math.ceil(timer), 500, 580);
}

function loadcodeGreenUI() {
	ctx.font = 'bold 80px Serif';
	ctx.fillStyle = 'lime';
	ctx.fillText('America Is Great Again!', 90, 70);
			
	ctx.font = 'bold 50px Serif';
	ctx.fillStyle = 'lime';
	ctx.fillText("Your Score:", 375, 310);
			
	ctx.font = 'bold 50px Serif';
	ctx.fillStyle = 'lime';
	ctx.fillText(pad(score, SCORE_DIGITS), 405, 360);
			
	ctx.font = 'bold 50px Serif';
	ctx.fillStyle = 'lime';
	ctx.fillText("Journey For Trump's relection?", 170, 430);
			
	ctx.font = 'bold 50px Serif';
	ctx.fillStyle = 'lime';
	ctx.fillText(Math.ceil(timer), 500, 480);
}
