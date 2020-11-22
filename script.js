const game_canvas = document.getElementById('game_canvas',{ alpha: false });
const ctx = game_canvas.getContext('2d');
const life_out = document.querySelector('.life');
const score_out = document.querySelector('.score');
const speed_out = document.querySelector('.speed');
const player = new Image();
let bomb_img = new Image();
let bombs_arr = [{
	position_x : 0,
	position_y : 0,
}];

/*much of declaration & initializations*/
const player_width = 50;
const player_height = 12;
const bomb_width = 35;
const bomb_height = 35;
const player_dirrection_variants = ["left", "right", "none"];
const player_pos_y = game_canvas.height - player_height;
const speed_multiply = 0.0001;
const base_bomb_velocity = 0.85;
let player_pos_x = 0;
let current_player_direction = player_dirrection_variants[2];
let bomb_counter = 0;
let health = 3;
let score = 0;
let bombs_catched_without_fail = 0;
/*function key_translator(event);
function key_break_handler(event);
function on_load_doc();
function cmd();*/




 const restart = ()=>{
 	console.log('restarted');
 	ctx.clearRect(0,0,9999,9999);
 	score = 0;
 	health = 3;
 	player_pos_x = 0;
 	bomb_counter = 0;
 	bombs_catched_without_fail = 0;
 	current_player_direction = player_dirrection_variants[2];
 }

const draw_player = (pos_x, pos_y, width, height)=>{
ctx.drawImage(player, Math.floor(pos_x), Math.floor(pos_y), width, height);
ctx.strokeRect(player, Math.floor(pos_x), Math.floor(pos_y), width, height);
}
const draw_bombs = ()=>{
	ctx.strokeStyle = 'rgb(255, 0, 0)';
	for(let i = 0; i < bomb_counter;i++){
	ctx.strokeRect(bombs_arr[i].position_x,  bombs_arr[i].position_y, bomb_width, bomb_height);
	ctx.drawImage(bomb_img, bombs_arr[i].position_x,  bombs_arr[i].position_y, bomb_width, bomb_height);
	}
}
const draw_ui = ()=>{
	/*  ctx.font = "1.5em Calibri";
	  let text_width = ctx.measureText("health "+health); 	 
  	  ctx.strokeText("health "+health, game_canvas.width - text_width.width, text_width.width/2);*/
  	  score_out.innerHTML = "score: " + score;
  	  life_out	.innerHTML = "life: " + health;
  	  speed_out	.innerHTML = "speed: " +(speed_multiply * score).toFixed(2);
}
let generate_bomb = ()=>{
	bombs_arr[bomb_counter] = new Object();
	bombs_arr[bomb_counter].position_x = Math.floor(Math.random() * Math.floor(game_canvas.width - bomb_width));
	bombs_arr[bomb_counter].position_y = Math.floor(Math.random() * Math.floor(0 + game_canvas.height/10));
	bomb_counter++;
}
let engine = ()=>{
	ctx.clearRect(0, 0, game_canvas.width, game_canvas.height);
	if(health > 0){
	draw_player(player_pos_x, player_pos_y, player_width, player_height);
	draw_bombs();
	draw_ui();
	cmd();
	}
	else{	
		life_out.innerHTML = "0, GAME WILL RESTART";
		alert('GAME OVER');
		setTimeout(restart(), 3000);
	}
	window.requestAnimationFrame(engine);
}
function cmd(){
	if(current_player_direction == player_dirrection_variants[1])
	{
		if(player_pos_x + player_width <= game_canvas.width)player_pos_x+=1.5 + (score*speed_multiply/2);
	}
	else if(current_player_direction == player_dirrection_variants[0])
	{
	if(player_pos_x  >= 0)player_pos_x-=1.5 - (score*speed_multiply/2);
	}
	/*else{
	}*/
	for(let i=0; i < bomb_counter;i++)
	{
		bombs_arr[i].position_y+=base_bomb_velocity + (speed_multiply*score);
		if(touch_bb_rect(bombs_arr[i].position_x,bombs_arr[i].position_y,bomb_width, bomb_height,player_pos_x, player_pos_y, player_width, player_height))
		{
			bombs_arr[i] = null;
			for(let j = i+1; j < bomb_counter;j++)
			{
				bombs_arr[i] = bombs_arr[j];
			}
			bomb_counter--;
			score+=100;
			bombs_catched_without_fail++;
			if(bombs_catched_without_fail == 10){
				bombs_catched_without_fail = 0;
				health++;
			}
			continue;
		}
		if(touch_bb_rect(bombs_arr[i].position_x,bombs_arr[i].position_y,bomb_width, bomb_height,0, game_canvas.height, game_canvas.width, game_canvas.height))
		{
			bombs_arr[i] = null;
			for(let j = i+1; j < bomb_counter;j++)
			{
				bombs_arr[i] = bombs_arr[j];
			}
			bomb_counter--;
			health--;
			bombs_catched_without_fail = 0;
		}
	}
}

document.addEventListener('DOMContentLoaded', on_load_doc);
function key_translator(event){
	//console.log(event);
	switch(event.keyCode)
	{
		case 39://right
		{
			current_player_direction = player_dirrection_variants[1];
			break;
		}
		case 37://left
		{
			current_player_direction = player_dirrection_variants[0];
			break;
		}
		default:
		{
			current_player_direction = player_dirrection_variants[2];
			break;
		}
	}
}
function key_break_handler(event){
	current_player_direction = player_dirrection_variants[2];
}
function on_load_doc(){
	console.log('started');
	player.src = 'player.png';
	bomb_img.src = 'bomb.png';
	engine();
	document.addEventListener('keydown', key_translator);
	document.addEventListener('keyup', key_break_handler);
	let i = setInterval(function(){
		generate_bomb();
	}, 1250);
	//generate_bomb();
}
const in_bb_rect = function(x_bb,y_bb, w_bb,h_bb, x_rgfl, y_rgfl, w_rgfl, h_rgfl)//if rect INSIDE other rect
{
	if(x_bb >= x_rgfl && x_bb + w_bb <= x_rgfl + w_rgfl )
	{
		if(y_bb >= y_rgfl && y_bb + h_bb <= y_rgfl + h_rgfl )return true;
	}
	return false;
}
const touch_bb_rect = function(x_bb,y_bb, w_bb,h_bb, x_rgfl, y_rgfl, w_rgfl, h_rgfl)//if rect can touch other rect(or inside him)
{
	if((x_bb <= x_rgfl + w_rgfl && x_bb >= x_rgfl) || (x_bb <= x_rgfl && x_bb + w_bb >= x_rgfl))
	{
		if(y_bb <= y_rgfl && y_bb  +h_bb>= y_rgfl){		
			return true;
		}
	}
	return false;
}