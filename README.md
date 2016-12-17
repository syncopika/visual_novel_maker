# visual_novel_maker
create an extremely basic visual novel! (with JavaScript)   
<b>dependencies: jQuery</b>
    
see some samples here: https://syncopika.github.io/visual_novel_maker    
    
<b>background:</b> I wanted to see if I could build something that would make visual novel creation easier. I don't play or make visual novels really, but they seem to be an interesting medium for story-telling. I tried to make my system work so that there wouldn't be too much JavaScript typing to be done. I also wanted an easy medium to integrate my music compositions in without relying on other people's projects. ^^    
    
<b>What is a visual novel?</b>    
Visual novels tend to be a choose-your-own adventure type of game, where the player follows a storyline and occasionally comes across multiple choices which may determine how the game ends. Visual novels appear to be very popular in Japan.
    
<b>design implementation:</b>    
I decided to go with three "classes", each with their own .js file. One is called SetScene, which holds mainly functions that pertain to handling scenes, such as outputting dialog, changing background pictures, changing character sprites, and audio stuff. Another "class" is called Game, which takes care of the mechanics, such as route branching, setting up characters and scene progression. Lastly, there is the Screen class, which is responsible for creating and maintaining the various screens I have layered.   <br>

In my implementation, I have a number of layered div elements, each with their own responsibility. The "ground" layer is a div with a canvas element (in retrospect, using a canvas may not have been a good idea, because of the CORS thing when testing - but I want to do some testing first to check), which holds the background image for a scene. The next div layer holds the character sprites, and above that is a layer that serves as an "options" page, with sliders to toggle volume and text speed. Lastly is a div layer which serves as the menu screen, and also holds the start button to initiate the game.    
    
##How to use:    
Make sure in the HTML file you wish to present your game in, in the \<head> section you place the following scripts:    
```
<script src='scripts/Screen.js'></script>
<script src='scripts/SetScene.js'></script>
<script src='scripts/Game.js'></script>
```    
You can make your game in a separate .js file, which would need to be placed in the \<head> section too, or within the HTML file itself in a \<script> section.   
```
//option 1
<head>
    <script src='yourGame.js'></script> //game script
    ...as well as my three scripts
</head>

//option 2
<head>
    my three scripts go here (setscene, screen, game)
</head>

...some html

<script>
    //make game here:
    //make screen
    //set up characters
    //set up routes
</script>
```
There are some rules that must be followed when using these scripts. One is using the Routes object, which should hold all the possible routes. There must always be a route called "mainRoute", which is where the player starts. Each route is a "property" of a dictionary({}); all the things that happen within a route (i.e. all the dialog, scene changes, etc...) are placed in an array, and this array is the "value" of a route. example:    
```
//The Routes object is already initialized, so no need to!  

Routes["mainRoute"] = [
    SetScene.dialog("", "hello world!"), //don't forget the comma!
    SetScene.showCharacter("hello", "world.png")
];    
```

##API documentation    
###Screen 

*Screen.<b>make</b>(width, height)* 

Takes two parameters that should be integers corresponding to the desired width and height of the screen where the game will show. Sets up the screens/layers needed for the game to operate. 

*Screen.<b>setDialogBox</b>(string)*

Takes a parameter that is a string which should contain the path to the desired background image for the dialog box. An example would be "\assets\dialogBox.png". Sets a background image for the dialog box area.

*Screen.<b>routeScreen</b>(option1, option1Name, option2, option2Name, option3, option3Name)*

Takes 6 parameters. The 'option1', 'option2', and 'option3' parameters should be the NAME of a route. 'option1Name', 'option2Name', and 'option3Name' should be whatever you want the buttons to be labeled as (each corresponding to a route choice). At the minimum, there should be two options available. If there is no 3rd option, 'option3' and 'option3Name' must be empty strings (i.e. ""). Additionally, calling this method should be the LAST action in a particular route (since the game is expected to branch to another route after this method). Shows the route option screen when called. Example implementation:    
```
Routes["route1"] = [...stuff...];
Routes["route2"] = [...stuff...];
Routes["route3"] = [...stuff...];

Routes["example"] = [
    ...dialog, etc...
    Screen.routeScreen("route1", "go to Route 1", "route2", "go to Route 2", "route3", "go to Route 3")
];
```
*Screen.<b>menuScreen</b>(menuBackground, style)*

Takes two parameters. *menuBackground* should be a string containing the path to the desired background image for the menu screen. *style* should be the string "col" (still working on adding other options), indicating that the menu buttons (currently only the start button) should appear as a column on the right side of the screen. This method should be declared after *Screen.make()*. Right now the only option is "col". Sorry!

<hr>
###Game

*Game.<b>character</b>(character, color)*

Takes two parameters. *character* should be a string containing the name of a character, and *color* should be a string containing a specified color (i.e. in hex code, so something like '#000' for black). Characters should be set up before setting up routes. 

<hr>
###SetScene

*SetScene.<b>setDialogSpeed</b>(seconds)*
Takes one parameter. *seconds* should be an integer value indicating how fast, in miliseconds, the dialog should show. You can set up a default speed with this method.

*SetScene.<b>background</b>(imgSrcPath)*

Takes one parameter - a string containing the path to the image you want to set as the background for a scene.

*SetScene.<b>dialog</b>(character, dialog)*

Takes two parameters. *character* should be a string containing the name of a character, and *dialog* should be a string containing the dialog for the specified character. 

*SetScene.<b>showCharacter</b>(name, characterSrc, direction, animation)*

Takes four parameters. *name* should be a string with the name of a character and *characterSrc* should be a string with the path to the character sprite. *direction* can be either the strings "left" or "right", indicating the direction from which the character should appear from. *animation* is a boolean (either true or false - not in a string) - true if the character should 'slide' in to position, or false if the character should just appear immediately. 

*SetScene.<b>showCharacterWithBGM</b>(name, characterSrc, direction, animation, music)*

Takes five parameters. This method is the same as above, except for *music*. *music* should be a string containing the path to a particular music file. The specific music file will play upon the showing of the character. Use this method if you want to play a particular character's theme, for example, whenever the character shows up.

*SetScene.<b>backgroundClearChar</b>(imgSrcPath)*

Takes one parameter - *imgSrcPath* is a string containing the path to the image you want to set for the background. Use this method if you want to show a new setting (note that this method clears the characters from the screen. if you want to change the background but keep the characters in place, just use SetScene.background().

*SetScene.<b>changeCharacter</b>(name, characterSrc)*

Takes two parameters. *name* is a string containing a specific character's name. *characterSrc* is a string containing the path to the character's sprite image. Use this method to change a character's sprite if they are already displayed. For example, if you want a character to have an expression change, use this method.

<hr>
