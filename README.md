# flashcard-generator & Karaoke Cloze!!! 

## Description

In this application the user has three choices. 
1) Create a Flashcard (Basic or Cloze) 
2) Play a basic flash card game where the user is prompted with a cloze question to fill in the lyric. If correct, the user gets a point, if wrong the correct answer is displayed. The right and wrong answers are tallied up and the total is displayed at the end of the game. 
3) Do nothing. App closes. 

The complete list of questions and answers for this application is inside the [questions.js](questions.js) file. The flash cards are constructed with the `ClozeCard` constructor defined in [flashCards.js](flashCards.js). 

## Install

To install the application, first clone this repository:

	git clone git@github.com:tiffw/Flashcard-Generator.git
	
Then install the [inquirer](https://www.npmjs.com/package/inquirer) package for command line interaction.

	npm install inquirer

## Run

To run the game execute the following command:

	node app.js
	
**Enjoy!**