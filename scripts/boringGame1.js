//boring game 1 - just pics and simple dialog

Screen.menuScreen("background1edit.png", "col");
Screen.setDialogBox("dialogBar.png");

//always need main route - where the game starts
Routes["mainRoute"] = [
	//start
	SetScene.background("what1.png"),
	SetScene.dialog("", "Wow, a forest!"),
	SetScene.background("airport1.png"),
	SetScene.dialog("", "wow, an airport! This looks familiar..."),
	SetScene.background("desertedplace.png"),
	SetScene.dialog("", "hmm, where is this? looks kinda...dead..."),
	SetScene.background("fin.png"),
	SetScene.background("credits.png")
];


