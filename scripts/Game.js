//game functions
//i.e. branching, game start, add characters, etc.

/**
* GAME OBJECT ================================================
*
**/

//set up character
Game.character = function(character, color){
	//give character text a color
	//create another object within the game object called "characters", which will store info for all the characters
	if(Game.characters === undefined){
		Game.characters = {};
		Game.characters[character] = color; 
	}else{
		Game.characters[character] = color; 
	}
}

//TODO: make a progress bar
Game.makeProgressBar = function(){
	//create a div element?
}

/**
*  Game.branch(routeName) allows for the game to branch out to a new route
*   
**/
Game.branch = function(routeName){
	return function(){
		//update route
		currentRoute = routeName;
		//make bookmark 0 and start at the beginning of the next route array
		bookmark = 0;
		//make update false
		update = false;
		//move all characters off the screen
		//characters on screen have either a left or right class
		//a new route may have "false" as the first index, indicating no change in background for
		//the next scene.
		if(Routes[routeName][0] !== false){
			$(".left").each(function(){
				$(this).css("display", "none");
				$(this).css("left", -180);
			});
			$(".right").each(function(){
				$(this).css("display", "none");
				$(this).css("right", -180);
			});
		}else{
			//to skip the 'false' entry in the array
			bookmark = 1;
		}
		Game.nextScene();
	}
}


Game.nextScene = function(){
	if(bookmark < Routes[currentRoute].length){
		Routes[currentRoute][bookmark++]();
	}else{
		$('#rowDialog').empty();
		bookmark = 0;
	}
}

/**
* initialize the game - i.e. allow traversal through array for each scene
*
**/
var lastTouchTime = 0; // use this to help detect double taps
var numTaps = 0;
function gameStart(){
	$(document).keydown(function(e){
		e.preventDefault();
		if(e.which == 32 && update === false){
			// spacebar
			Game.nextScene();
		}
	});
	
	// support mobile touch events. can refactor this later
	// https://forum.jquery.com/topic/doubletap-event
	// https://stackoverflow.com/questions/10614481/disable-double-tap-zoom-option-in-browser-on-touch-devices/53236027
	document.addEventListener("touchstart", function(evt){
		var now = Date.now();
		if(numTaps === 2){
			// is time elapsed small enough to be considered a double tap?
			var msDiff = now - lastTouchTime;
			if(msDiff < 300 && update === false){
				Game.nextScene();
			}
			numTaps = 1;
		}else{
			numTaps++;
		}
		lastTouchTime = now;
	});
}

//make spacebar prevent the default action (i.e. scrolling)
$(document).keydown(function(e){
	e.preventDefault();
});

//set new background AND music
function newBGwithMusic(picture, music){
	SetScene.background(picture);
	SetScene.playAudio(music);
}
