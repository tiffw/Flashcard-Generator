

var BasicCard = require('./basic.js');

var ClozeCard = require('./cloze.js');

var inquirer = require('inquirer');

var fs = require ('fs');


var start = function() {
  inquirer.prompt({
    name: "questUser",
    type: "rawlist",
    message: "Would you like to do?",
    choices: ["Add a Flashcard", "Play Karaoke Cloze", "No Thanks!"]
  }).then(function(answer) {
    // based on their answer, either call the bid or the post functions
    if (answer.questUser === "Add a Flashcard") {
      addFlashCard();
    }
    else if (answer.questUser === "Play Karaoke Cloze") {
      askQuestion();
    }
    else if (answer.questUser === "No Thanks!") {
      console.log("Ok, fine, don't play today! ")
    }

  });
};

start();

var addFlashCard = function(){
	inquirer.prompt([{
	    name: "addCard",
	    type: "rawlist",
	    message: "What kind of flashcard do you want?",
	    choices: ["Basic Flashcard", "Cloze Flashcard"]
	  }]).then(function(answer) {
	    // based on their answer, either call the bid or the post functions
	    if (answer.addCard === "Basic Flashcard") {
	    	 inquirer.prompt([{
                name: 'front',
                message: 'What is the question?',
                validate: function(input) {
                    if (input === '') {
                        console.log('answer the question please.');
                        return false;
                    } else {
                        return true;
                    }
                }
          
      },
        {
          	name: 'back',
          	message: "What is the answer?",
          	validate: function(input) {
    				if (input === "") {
    					console.log('ok, cool');
      				return false;
    				} 
            else {
    				return true;
  			    }
        }
        }]).then(function(answer){
          var newBasicCard = new BasicCard(answer.front, answer.back);
          newBasicCard.create();
          start();
        });
      } else if (answer.addCard === 'Cloze Flashcard') {
        inquirer.prompt([{
          name: 'text',
          message: "Enter the full text?",
          validate: function(input){
            if(input === ""){
              console.log("Enter the full text");
              return false;
            }
            else {
              return true;
            }
          }

          },
          {
            name: 'cloze',
            message: 'What is the cloze portion?',
            validate: function(input){
              if (input === ''){
                console.log('Cloze, please');
                return false;
              }
              else {
                return true;
              }
            
            }
        }]).then(function(answer){
          var text = answer.text;
          var cloze = answer.cloze;
          if (text.includes(cloze)){
            var newClozeCard = new ClozeCard (text, cloze);
            newClozeCard.create();
            start();
          }
          else {
            console.log('Good job! ');
          }

        });
      }
  });
};

// Import the flash cards constructor implementations
var flashCards = require('./flashCards.js');
// Import the full list of questions
var questions = require('./questions.js').questions;

// Variable that holds the cloze-deleted questions list
var closeQuestions = [];

// Populate the cloze-deleted questions list
for (var i = 0; i < questions.length; i++) {
  var q = new flashCards.ClozeCard(questions[i].full, questions[i].cloze);
  closeQuestions.push(q);
}

// What question the user is currently on
var currentQuestion = 0;
// How many questions the user has gotten right
var answerRight = 0;
// How many questions the user has gotten wrong
var answerWrong = 0;

// askQuestion prompts the user to answer a given cloze-deleted question
function askQuestion() {
  inquirer.prompt([
    {
      type: 'input',
      message: closeQuestions[currentQuestion].partial + '\nAnswer: ',
      name: 'userGuess'
    }
  ]).then(function (answers) {
    console.log('\n');

    // Check if the user has guessed correctly
    if (answers.userGuess.toLowerCase() === closeQuestions[currentQuestion].cloze.toLowerCase()) {
      console.log('Correct!');
      answerRight++;
    } else {
      console.log('Incorrect!');
      answerWrong++;
    }

    // Show the correct answer
    console.log(closeQuestions[currentQuestion].full);
    console.log('-------------------------------------\n');

    // Advance to the next question
    if (currentQuestion < closeQuestions.length - 1) {
      currentQuestion++;
      askQuestion();
    } else {
      console.log('Game Over!');
      console.log('Correct Answers: ' + answerRight);
      console.log('Incorrect Answers: ' + answerWrong);

      console.log('-------------------------------------\n');

      // Prompt the user to play again
      inquirer.prompt([
        {
          type: 'confirm',
          message: 'Would you like to play again?',
          name: 'playAgain'
        }
      ]).then(function (answers) {
        if (answers.playAgain) {
          // Reset the game
          currentQuestion = 0;
          answerRight = 0;
          answerWrong = 0;

          // Begin asking the questions!
          askQuestion();
        } else {
          // Exit the game
          console.log('You Rock!! Thanks for playing - Karaoke Cloze');
        }
      })
    }
  })
}










































