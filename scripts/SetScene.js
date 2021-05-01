//SetScene object 

/**
* SET SCENE OBJECT ================================================
* functions that pertain to scene creation/setting
*
**/

//set new background image
SetScene.background = function(imgSrcPath){
	return function(){
		//we can assume the canvas has been initialized already when
		//this function is called
		canvas = document.getElementById('theScreen');
		ctx = canvas.getContext("2d");

		var image = new Image();
		image.src = imgSrcPath;

		image.onload = function(){
			ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
		}
	}
}

//set up dialog
SetScene.dialog = function(character, dialog){

	var colon = ""; //this adds a colon if a character is specified.
		
	if(character !== ""){
		colon = ": ";
	}
		
	//helper function to handle how dialog is shown
	function typeDialog(index, textColor){
		//this one is for if the user just wants all the text shown at once. 
		if(textSpeed == 0){
			$('#dialog').replaceWith('<h3 id="dialog" style="color: ' + textColor + ';"' + '>' + character + colon + dialog + '</h3>');
			return;
		}
		update = true;
		//this is for showing text at a given speed
		$('#dialog').replaceWith('<h3 id="dialog" style="color: ' + textColor + ';"' + '>' + character + colon + dialog.substring(0, index) + '</h3>');
		if(index === dialog.length){
			update = false;
			return;
		}
		setTimeout(function(){
			typeDialog(index+1, textColor);
		}, textSpeed);
	}
	
	return function(){
			var color = '#000';
			if(Game.characters !== undefined){
				color = Game.characters[character];
			}
			$('#rowDialog').empty();
			//put just the name of character first (if character is specified)
			$('#rowDialog').append('<h3 id="dialog" style="color: ' + color + ';"' + '>' + character + colon + '</h3>');
			//then show dialog 
			typeDialog(0, color);
	}
}

//show character sprite
SetScene.showCharacter = function(name, characterSrc, direction, animation){
	return function(){
		var endDistance = canvas.width/6;
		if(animation === true){
			//update == true means that the user cannot skip the animation
			update = true;
			//move in from specified direction
			if(direction === "left"){
				$('#charScreen').prepend('<img id= ' + name + ' src=' + '"' + characterSrc + '"' + ' width=' + canvas.width/2.5 + 'px height=' + canvas.height/2 + 'px />');
				$('#' + name).css({'position': 'absolute', 'bottom': 0, 'left': -180, 'display': 'none'});
				//add class so we can hide the character when we change scenes
				$('#' + name).addClass('left');
				// stop pic animation when endDistance from left end
				slideIn(name, endDistance, direction);
			}else if(direction === "right"){
				$('#charScreen').prepend('<img id= ' + name + ' src=' + '"' + characterSrc + '"' + ' width=' + canvas.width/2.5 + 'px height=' + canvas.height/2 + 'px />');
				//initially place far right
				$('#' + name).css({'position': 'absolute', 'bottom': 0, 'right': -180, 'display': 'none'});
				$('#' + name).addClass('right');
				// stop pic animation when endDistance from right end
				slideIn(name, endDistance, direction);
			}
		}else if (animation === false){
			if(direction === "left"){
				//append an img element to the div layer on top of canvas
				$('#charScreen').prepend('<img id= ' + name + ' src=' + '"' + characterSrc + '"' + ' width=' + canvas.width/2.5 + 'px height=' + canvas.height/2 + 'px />');
				$('#' + name).css({'position': 'absolute', 'bottom': 0, 'left': endDistance});
				$('#' + name).addClass('left');
			}else if(direction === "right"){
				$('#charScreen').prepend('<img id= ' + name + ' src=' + '"' + characterSrc + '"' + ' width=' + canvas.width/2.5 + 'px height=' + canvas.height/2 + 'px />');
				$('#' + name).css({'position': 'absolute', 'bottom': 0, 'right': endDistance});
				$('#' + name).addClass('right');
			}
			//Add an option for CENTER?
		}	
	}
}

//adjust dialog speed
SetScene.setDialogSpeed = function(seconds){
	textSpeed = seconds;
}

//show character with custom bgm for that character
SetScene.showCharacterWithBGM = function(name, characterSrc, direction, animation, music){
	return function(){
		//SetScene.fadeAudio(0)();
		SetScene.showCharacter(name, characterSrc, direction, animation)();
		SetScene.playAudio(music)();
	}
}

//set a new background and clear the characters
SetScene.backgroundClearChar = function(imgSrcPath){
	return function(){
			SetScene.background(imgSrcPath)();
			$('#charScreen').empty();
	}
}

SetScene.changeCharacter = function(name, characterSrc){
	//change the picture/sprite of a character
	return function(){
		$('#' + name).attr('src', characterSrc);
	}
}

//show new background with music
SetScene.newBGwithMusic = function(picture, music){
	return function(){
		SetScene.background(picture)();
		SetScene.playAudio(music)();
	}
}

//show new background with music AND clear characters
SetScene.newBGwithMusicClearChar = function(picture, music){
	return function(){
		SetScene.backgroundClearChar(picture)();
		SetScene.playAudio(music)();
	}
}


//set new MUSIC with dialog
SetScene.dialogWithMusic = function(character, dialog, music){
	return function(){
		SetScene.dialog(character, dialog)();
		SetScene.playAudio(music)();
	}
}

//set new EFFECT sounds with dialog
SetScene.dialogWithEffect = function(character, dialog, sound){
	return function(){
		SetScene.dialog(character, dialog)();
		SetScene.playEffect(sound)();
	}
}

//move to a specific route
SetScene.moveToRoute = function(route){
	return function(){
		Game.branch(route)();
	}
}

//helper function for character slide-in animation
function slideIn(name, end, direction){
	
	//get the current location
	var initial = parseInt($('#' + name).css(direction));

	//once the image gets within the frame, show it!
	if(initial === -15){
		$('#' + name).css({'display': 'block'});
	}
	//if the image finally reaches the endpoint, stop
	if(end === initial){
		update = false;
		return;
	}
	
	if(direction === "right"){
		$('#' + name).css({'position': 'absolute', 'bottom': 0, 'right': initial+=5});
	}else if(direction === "left"){
		$('#' + name).css({'position': 'absolute', 'bottom': 0, 'left': initial+=5});
	}
	
	setTimeout(function(){
		slideIn(name, end, direction);
	}, 15);
}

SetScene.playAudio = function(audioSrc){
	//see: http://stackoverflow.com/questions/7692082/loading-audio-element-after-dynamically-changing-the-source
	return function(){
		//reset volume for audio file
		//console.log( parseFloat($('#volControl').val()));
		$('#music').prop("volume", document.getElementById('volControl').value);//parseFloat($('#volControl').val()));
		$('#music').attr("loop", true);
		
		var audioElement = document.getElementById("music");
		audioElement.src = audioSrc;
		audioElement.play();		
	}
}

SetScene.playEffect = function(audioSrc){
	return function(){
		$('#effects').attr("src", audioSrc);
		//$('#effects').attr("loop", false);
		$('#effects').trigger("play");
	}
}

//decrease volume by how much
SetScene.fadeAudio = function(volumeIncrement){
	return function(){
		$('#music').animate({volume: volumeIncrement}, 1000);
	}
}
