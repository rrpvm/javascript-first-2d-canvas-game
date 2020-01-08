let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
document.addEventListener('keydown', moving);
document.addEventListener('keyup', movingUp);

var player = new Image();
player.src = 'player.png';
var bomb = new Image();
bomb.src = 'bomb.png';

let posX = 0;
let posY = 95;

let posBx = [];
let posBy = [];
let bombs = 0;
let count = 0;

let score = 0;
let health = 3;
var dirR = false;
var dirL = false;
let maxScore;
function moving(e)
{
	if(health > 0)
	{
		var key = e.keyCode;
	
		switch(key)
		{
			case 39:
			{
				dirR = true;
				dirL = false;
				break;
			}
			case 37:
			{
				dirR = false;
				dirL = true;
				break;
			}

		}
	}
}
function movingUp(e)
{
	if(health > 0)
	{
		var key = e.keyCode;
	
		switch(key)
		{
			case 39:
			{
				dirR = false;
				dirL = false;
				break;
			}
			case 37:
			{
				dirR = false;
				dirL = false;
				break;
			}

		}
	}
}
function doMove()
{
if(dirR == true)
{
	posX = posX + 3;
}
if(dirL == true)
{
	posX = posX - 3;
}
if(posX -5 < 0)
		{
			dirL = false;
			console.log("borders");
			posX+=8;
		}
		if(posX +62.5 > canvas.width)
		{
			dirR = false;
			console.log("borders");
			posX-=8;
		}
}

	function spawnBomb()
{
	if(count % 2 == 0)
	{
		posBx[count] = parseInt(Math.random(300,400) * 100);
	}
	else
	{
		posBx[count] = parseInt(Math.random(600,1200) * 100);
	}
posBy[count] = parseInt(-20);
count++;
}
function collision()
{
	for(var i = 0; i < count; i++)
	{
		var rez = posX + posY;
		var rez2 = posBx[i] + posBy[i];
		if(rez - rez2 < 15 && rez > 110)
		{
			//console.log(rez);
			//console.log(rez2);
		//console.log(rez-rez2);
			posBy[i] = -100;
			score +=100;
				ctx.clearRect(posBx[i],posBy[i], bomb.width, bomb.height);
		}
		if(rez < 110 && rez - rez2 < -30)
		{
			score +=100;
			posBy[i] = -100;
				ctx.clearRect(posBx[i],posBy[i], bomb.width, bomb.height);
		}
		
		
	}
}

function draw()
{
if(health > 0)
{

	ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.drawImage(player,posX,posY);
 ctx.font = "12px serif";
 ctx.fillText("health = " + health, 235, 15);
 ctx.fillText("score = " + score, 235, 25);
 collision();
for(let i = 0; i < count; i++)
{
	posBy[i] = posBy[i] + 1;
	if(posBy[i] + 50 > canvas.height)
	{
		count--;
		health--;
		posBy[i] = -64;
		ctx.clearRect(posBx[i],posBy[i], bomb.width, bomb.height);
		
	}
	else
	{
		if(posBy[i] > 0)
		{
				ctx.drawImage(bomb, posBx[i],posBy[i]);
		}
	
	}

}


}
else
{
ctx.clearRect(0,0, canvas.width, canvas.height);
ctx.font = "48px serif";
ctx.fillText("GAME OVER", 10,80);


}
}






	var timer = setInterval(draw, 700/10);
	var timer1 = setInterval(doMove, 900/10);
var timerToSpawnBomb = setInterval(spawnBomb, 3000);






