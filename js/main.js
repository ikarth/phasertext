// Isaac Karth, 2019-7-31
// Based on code from Nathan Altice

"use strict";

// This is a demonstration, so we're just going to use a single state
// Something to keep in mind: for debugging, it's useful to isolate
// the part of the code that you're concerned about.

// Only one global variable
var game;

// bind pause key to browser window event
window.onkeydown = function(event) {
	// capture keycode (event.which for Firefox compatibility)
	var keycode = event.keyCode || event.which;	
	if(keycode === Phaser.Keyboard.P) {
		pauseGame();
	}
}

function pauseGame() {
	// toggle game pause
	game.paused ? game.paused = false : game.paused = true;
}



// Set up the play state and some custom internal constants
var Play = function(game){};
Play.prototype = {
	preload: function() {
		game.load.path = '../../assets/fonts/';
		game.load.bitmapFont('gem', 'gem.png', 'gem.xml');
		game.load.path = '../assets/img/';
	},
	create: function() {
		this.text_elements = [];
		function addText(x, y, text) {
			// check out  https://photonstorm.github.io/phaser-ce/Phaser.Text.html for more details
			let textStyle = {
				font: "Zapfino, Verdana",
				align: "center",
				fontSize: 32
			};	
			let new_text_element = game.add.text(x, y, text, textStyle);
			this.text_elements.append(new_text_element);
		}

		// physics and gravity
		game.physics.startSystem(Phaser.Physics.P2JS);
		game.physics.p2.gravity.y = 500;

		// add group to spawn letters into later...
		this.alphaBits = game.add.group();

		// set some colors...
		game.stage.backgroundColor = '#FACADE';

		this.palette = {		// setup a palette object
			A: '#1B1B3A',
			B: '#693668',
			C: '#A74482', 
			D: '#F84AA7',
			E: '#FF3562' 
		};

		this.greeting_text = 'Hello World!\nHere is some text with some newlines.\nThis typeface is called Georgia.\nIt is a serif font.\nYou should edit this string to add your\nown text. Make sure that it\'s really long\nso we can demonstrate word wrapping.';
		
		let text_style = {
			font: 'Georgia',
			fontSize: 32, 
			fill: this.palette.D,
		};
		this.greeting = game.add.text(32, 32, this.greeting_text, text_style);
		//this.greeting.setText("Now it says this!");
		

		// enable a p2 body on greeting text
		//game.physics.p2.enable(this.greeting);
	
		/*
		// text
		var textStyle = {
			font: 'Pacifico',
			fontSize: 24,
			wordWrap: true,
			wordWrapWidth: 586,
			fill: this.palette[4]
		};

		var text = game.add.text(32, 32, 'This is a test of a Google font. It should look all scripty. Hopefully it works, because otherwise I will look like a REAL COOL GUY.', textStyle);

		textStyle = {
			font: 'Shadows Into Light',
			fontSize: 24,
			wordWrap: true,
			wordWrapWidth: 586,
			fill: this.palette[3]
		}

		text = game.add.text(32, 325, 'Apparently we had reached a great height in the atmosphere, for the sky was a dead black, and the stars had ceased to twinkle. By the same illusion which lifts the horizon of the sea to the level of the spectator on a hillside, the sable cloud beneath was dished out, and the car seemed to float in the middle of an immense dark sphere, whose upper half was strewn with silver. Looking down into the dark gulf below, I could see a ruddy light streaming through a rift in the clouds.', textStyle);
		*/
		// let text01 = game.add.bitmapText(32, 32, 'gem', 'Bitmap text, yeah!', 12);
		// let text02 = game.add.bitmapText(32, 64, 'gem', 'OK, that was too small...', 24);
		// let text03 = game.add.bitmapText(32, 128, 'gem', 'Here\'s the default size of 32 ;p');
		// let text04 = game.add.bitmapText(32, 256, 'gem', 'NOW I AM SHOUTING!', 64);
		// let text05 = game.add.bitmapText(32, 375, 'gem', 'BLUR', 256);

	},
	update: function() {
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			//this.spawnAlphabet();
		}
	},
	render: function() {
		//game.debug.text('Spacebar = alphabet rain', 32, 32, '#ffff00');
	},
	spawnAlphabet: function() {
		// spawn random letters
		let x = Math.random() * game.world.width;
		let textStyle = {
			font: 'Charter',
			fontSize: 32, 
			fill: this.palette[Math.floor(Math.random() * this.palette.length)]
		};
		// grab a random letter from the alphabet
		let alphabet = "abcdefghijklmnopqrstuvwxyz";
		//let alphabet = "あえいうおはへひふほかけきくこまめみむもられりるろたてちつと";
		let letter = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
		let alphaBit = game.add.text(x, game.world.height*0.1, letter, textStyle);

		// add p2 physics and a circle body
		game.physics.p2.enable(alphaBit, false);
		alphaBit.body.setCircle(5);
		
		// add the letter to the group
		this.alphaBits.add(alphaBit);
	},
};

// init and states
game = new Phaser.Game(650, 650);
game.state.add('Play', Play);
game.state.start('Play');