# visual_novel_maker
create an extremely basic visual novel! (with JavaScript)   
<b>dependencies: jQuery</b>
    
see some samples here: https://syncopika.github.io/visual_novel_maker    
    
<b>background:</b> I wanted to see if I could build something that would make visual novel creation easier. I don't play or make visual novels really, but they seem to be an interesting medium for story-telling. I tried to make my system work so that there wouldn't be too much JavaScript typing to be done.    
    
<b>What is a visual novel?</b>    
Visual novels tend to be a choose-your-own adventure type of game, where th player follows a storyline and occasionally comes across multiple choices which may determine how the game ends. Visual novels appear to be very popular in Japan.
    
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
Then you have the option of either making your game in the HTML file in a \<script> section, or in a separate .js file, which would
need to be placed in the /<head> section too. If choosing the latter option, make sure that the menu screen is initialized
in a \<script> section of the HTML file.

There are some rules that must be followed when using the tools I've made. One is using the Routes object, which should hold all the possible routes. There must always be a route called "mainRoute", which is where the player starts. Each route is a "property" of a dictionary({}); all the things that happen within a route (i.e. all the dialog, scene changes, etc...) are placed in an array, and this array is the "value" of a route. example:    
```
//Routes is already initialized, so no need to!  

Routes["mainRoute"] = [
    SetScene.dialog("", "hello world!"), //don't forget the comma!
    SetScene.showCharacter("hello", "world.png")
];    
```

##API documentation    
###Screen
<hr>
###Game
<hr>
###SetScene
<hr>
