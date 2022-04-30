//mr.cat's neighborhood

if(window.speechSynthesis){
    // https://stackoverflow.com/questions/49506716/speechsynthesis-getvoices-returns-empty-array-on-windows
    var voices = window.speechSynthesis.getVoices();
    if(voices.length > 0){
        setupGame(voices);
    }else{
        // at least on chrome, voices may not be available right away so we need this event listener
        window.speechSynthesis.addEventListener("voiceschanged", () => {
            voices = window.speechSynthesis.getVoices();
            setupGame(voices);
        });
    } 
}else{
    setupGame();
}

function setupGame(voices=null){
    Screen.menuScreen("artAssets/mrcatsneighborhood.png", "col");
    Screen.setDialogBox("artAssets/dialogBar.png");

    //set up characters
    //for better cross-browser experience, only microsoft david and zira are used (since they seem to be available on chrome, edge and firefox)
    var david = voices.filter(v => v.name.toLowerCase().indexOf("david") >= 0)[0];
    var zira = voices.filter(v => v.name.toLowerCase().indexOf("zira") >= 0)[0];
    
    Game.character("cat", '#000', (voices ? david : null));
    //Game.character("kitty", '#000');
    //Game.character("tabby", '#000');
    Game.character("deer", '#000', (voices ? zira : null));
    Game.character("rabbit", '#000', (voices ? zira : null)); // if on Chrome, I would use voices[12] - google uk english female
    Game.character("crow", '#000', (voices ? david : null));   // if on Chrome, I would use voices[13] - google uk english male

    //always need main route - where the game starts
    Routes["mainRoute"] = [
        SetScene.newBGwithMusic("artAssets/cat1.png", "audioAssets/112316energeticbgm.wav"),
        SetScene.dialog("cat", "hi there! hmm, how did you get here?"),
        SetScene.background("artAssets/cat2.png"),
        SetScene.dialog("cat", "anyway, since you're here, let me show you around my neighborhood!"),
        SetScene.background("artAssets/cat7.png"),
        SetScene.dialog("cat", "actually, hmm, is there anything you'd like to do first?"),
        Screen.routeScreen("visitHouse", "visit mr.cat's house", "park", "go to the park", "", "")
    ];

    Routes["visitHouse"] = [
        SetScene.newBGwithMusic("artAssets/foyer.png", "audioAssets/112316happybgm.wav"),
        SetScene.showCharacter("cat", "artAssets/cat3.png", "left", false),
        SetScene.dialog("cat", "meowmeomeow! (trans. 'welcome!')"), 
        SetScene.dialog("cat", "This is the foyer of my humble abode."),
        SetScene.background("artAssets/livingRoom.png"),
        SetScene.dialog("cat", "This is where my pets sometime nap. They also come here to talk about nonsense."),
        SetScene.background("artAssets/foodDish.png"),
        SetScene.dialog("cat", "And this is my food dish. It is currently empty. Would you like to fill it?"),
        Screen.routeScreen("feed", "yes", "no", "no", "", "")
    ];

    Routes["feed"] = [
        false, //don't change background
        SetScene.newBGwithMusic("artAssets/foodDishFilled.png", "audioAssets/112316happybgm.wav"),
        SetScene.changeCharacter("cat", "artAssets/cat6.png"),
        SetScene.dialog("cat", "Yay, thank youuuuuu!!!! (purring sounds)"),
        SetScene.dialog("cat", "Let me show you another room."),
        SetScene.background("artAssets/room1.png"),
        SetScene.changeCharacter("cat", "artAssets/cat3.png"),
        SetScene.dialog("cat", "This is where one of my pets sleeps. Pretty nice, eh?"),
        SetScene.dialog("cat", "I actually designed this room myself."),
        SetScene.changeCharacter("cat", "artAssets/cat6.png"),
        SetScene.dialog("cat", "I forget, have we gone to the park yet? I like the park!"),
        Screen.routeScreen("end", "yes, we have", "park", "not yet", "", "")
    ];

    Routes["no"] = [
        false,
        SetScene.changeCharacter("cat", "artAssets/cat4.png"),
        SetScene.dialog("cat", "I'll be watching you...:3"),
        SetScene.dialog("cat", "Let's go to the park."),
        SetScene.moveToRoute("park")
    ];

    Routes["park"] = [
        SetScene.newBGwithMusic("artAssets/park1.png", "audioAssets/112316happybgm.wav"),
        SetScene.showCharacter("cat", "artAssets/cat3.png", "left", false),
        SetScene.dialog("cat", "Here is the local park! I'll introduce you to some of my friends."),
        SetScene.showCharacter("deer", "artAssets/deer.png", "right", true),
        SetScene.dialog("cat", "Ah, if it isn't deer! How are you deer? This is my new friend!"),
        SetScene.dialog("deer", "Hi cat! nice to meet you, cat's friend. Enjoy the grass here!"),
        SetScene.backgroundClearChar("artAssets/park2.png"),
        SetScene.showCharacter("cat", "artAssets/cat3.png", "right", false),
        SetScene.dialog("cat", "This is a bridge! as you can see, there's a nice creek as well."),
        SetScene.showCharacterWithBGM("crow", "artAssets/crow.png", "left", false, "audioAssets/112416solocellobgm.wav"), //play new music when new character shows
        SetScene.dialog("crow", "Hey cat. who's that?"),
        SetScene.dialog("cat", "That's rude, crow! this is my new friend."),
        SetScene.dialog("crow", "Oh, why didn't you say so earlier? hello cat's friend."),
        SetScene.dialog("cat", "We're going to go to the pond now. see ya!"),
        SetScene.newBGwithMusicClearChar("artAssets/park3.png","audioAssets/112316happybgm.wav"), //new background, clear characters, and new music
        SetScene.showCharacter("cat", "artAssets/cat6.png", "left", false),
        SetScene.dialog("cat", "...and welcome to the pond!"),
        SetScene.showCharacterWithBGM("rabbit", "artAssets/bunny.png", "right", false, "audioAssets/112416xylophonebgm.wav"), //play new music when new character shows
        SetScene.dialog("rabbit", "Oooo fancy seeing you here, cat."),
        SetScene.dialog("cat", "Rabbit! and bunnies! Perfect timing. This is my new friend!"),
        SetScene.dialog("rabbit", "How do you do? We're off to take our nap. Bye!"),
        SetScene.playAudio("audioAssets/112316happybgm.wav"),
        SetScene.dialog("cat", "Bye! Well, that was fun. I don't have anymore to show you, sorry! I forgot - have I shown you my house?"),
        Screen.routeScreen("end", "yes", "visitHouse", "no", "", "")
    ];

    Routes["end"] = [
        SetScene.showCharacter("cat", "artAssets/cat6.png", "left", false),
        SetScene.dialog("cat", "I take it you can find your way home? I'm glad to have met you, thanks for visiting!!"),
        SetScene.backgroundClearChar("artAssets/fin.png"),
        SetScene.background("artAssets/credits.png"),
        SetScene.background("artAssets/thankyou.png")
    ];
}