/**
* Make game here ======================================
*
**/
//function start(){
	
Screen.menuScreen("menuScreen.png", "col");
Screen.setDialogBox("dialogBar.png");

//set up characters
Game.character("Nick", '#008080'),
Game.character("Patrick", '#f00099'),
Game.character("Michael", '#18182e'),
Game.character("Rize", '#885EAD'),

//always need main route - where the game starts
Routes["mainRoute"] = [
	//start
	SetScene.newBGwithMusic("itasha.png", "092916pianobgm2.wav"),
	SetScene.dialog("", "This is a very boring and pointless story. Please don't expect too much from it. Thank you."),
	SetScene.dialog("Nick", "Wow, that's a neat car!"),
	SetScene.dialog("Patrick", "I wish I had one!"),
	SetScene.dialog("Michael", "sadnfjknsjkdnfjksnfk"),
	SetScene.showCharacter("Cocoa", "cocoaCLEARBG.png", "left", false),
	SetScene.playEffect("test.wav"),
	SetScene.dialog("Nick", "what is that!?"),
	SetScene.dialog("Patrick", "I don't know!"),
	SetScene.dialog("Michael", "asjkdfhjkhsfkj"),
	SetScene.showCharacter("Rize", "rizeCLEARBG.png", "right", true),
	SetScene.dialog("Rize", "ahhhhhh!!!!"),
	SetScene.changeCharacter("Rize", "cocoaCLEARBG.png"),
	SetScene.dialog("Patrick", "wut!?"),
	SetScene.dialog("Nick", "should we get out of here?"),
	Screen.routeScreen("route1", "yes", "route2", "no", "route3", "ummmmmmm")
];

Routes["route1"] = [
	SetScene.background("Desert.jpg"),
	SetScene.dialog("Nick", "where are we?"),
	SetScene.dialog("Patrick", "dirt"),
	SetScene.showCharacter("Cocoa", "cocoaCLEARBG.png", "left", true),
	SetScene.dialog("Nick", "not again...")
];

Routes["route2"] = [
	SetScene.background("Penguins.jpg"),
	SetScene.dialog("Nick", "penguins"),
	SetScene.dialog("Patrick", "penguins?"),
	SetScene.dialog("Michael", "pengin")
];

Routes["route3"] = [
	false,
	SetScene.dialog("Nick", "guess we're stuck here...-___-"),
	SetScene.dialog("Patrick", "ndajkfnjksnjknskjaf"),
];

//}
