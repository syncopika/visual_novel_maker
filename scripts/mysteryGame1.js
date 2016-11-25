//mystery game
Screen.menuScreen("artAssets/mysteryGame.png", "col");
Screen.setDialogBox("artAssets/dialogBar.png");

Routes["mainRoute"] = [
	SetScene.newBGwithMusic("artAssets/readingroom1.png", "audioAssets/112416melancholypianobgm.wav"),
	SetScene.dialog("", "'Twas one night whilst in my reading room, analysing lines from Ovid, as I often do,"),
	SetScene.dialogWithEffect("", "when I was startled by several rather large knocks upon my front door.", "audioAssets/knockingSoundsSmall.wav"),
	SetScene.dialog("", "mind you, it was a quarter before 9 o'clock and I was not to be expecting guests."),
	SetScene.dialogWithEffect("", "'Perhaps it is the constable?,' I thought, for a string of petty crimes had been committed lately.", "audioAssets/knockingSoundsSmall.wav"),
	SetScene.dialogWithEffect("", "Anyhow, I hurried to the door.", "audioAssets/knockingSounds.wav"),
	SetScene.background("artAssets/stairs.png"),
	SetScene.dialogWithEffect("", "The knocking persisted as I went down the stairs, and as I got to the door.", "audioAssets/knockingSounds.wav"),
	SetScene.background("artAssets/neighborhood.png"),
	SetScene.dialog("", "I opened the door, but there was no one. There was not a soul to be seen at all in the street!"),
	SetScene.dialog("", "What a curious phenomenon. As I was about to close the door, I saw on my doorstep..."),
	SetScene.background("artAssets/letter.png"),
	SetScene.dialog("", "... a neatly arranged envelope, with a most interesting wax seal."),
	SetScene.dialog("", "Inscribed on the seal was what appeared to be a chimera-like creature, along with several characters that were unknown to me."),
	SetScene.dialog("", "The parchment quality was very high, and on the front read: 'to A.B.' in very fine calligraphy."),
	SetScene.dialog("", "I had very little doubt that I was the addressee of this letter, as those were my initials."),
	SetScene.dialog("", "Unperturbed by the preceding knocking, I went back to my study to further examine the note."),
	SetScene.background("artAssets/upstairs.png"),
	SetScene.dialog("", "As I was returning to my study, it suddenly became very cold. I did not recall my residence being as frigid when I had left."),
	SetScene.dialog("", "I attributed the cold to a strong draft, and eagerly hurried to my desk to analyse the letter."),
	SetScene.background("artAssets/desk.png"),
	SetScene.dialog("", "However, when I returned, a particular book that I had not opened for a long time was sitting, open-faced, right in the middle of the desk."),
	SetScene.dialog("", "It was a catalogue of very old paintings and portraits."),
	SetScene.dialog("", "'I was certainly not using that book when I left', I thought. But I was too concerned about the letter to care about the book."),
	SetScene.dialog("", "'I cast it aside and carefully opened the letter."),
	SetScene.dialog("", "It read: 'I hope this letter finds you well. Please meet me at the Castle at noon on the twelfth. There are important matters to discuss.'"),
	SetScene.dialog("", "'How strange!' Not one signature either! Believing it to be a mere childish prank, I tossed the letter in a drawer and forgot about it."),
	SetScene.newBGwithMusic("artAssets/upstairs.png", "audioAssets/112416melancholypianobgm2.wav"),
	SetScene.dialog("", "On the night of the twelfth, I realized I had made a terrible mistake; a mistake that would continue to haunt me forever."),
	SetScene.background("artAssets/lame.png"),
	SetScene.dialog("", "gahhhh, this story sounds so lame!!"),
	SetScene.background("thankyou.png")
];
