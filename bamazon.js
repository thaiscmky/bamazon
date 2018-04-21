var inquirer = require("inquirer");
var userInput = process.argv;
userInput.splice(0,2);


startapp();
function startapp() {

    // We create a list prompt. Specifying that the user must pick a random number between 1 and 5.
    console.log('Welcome to BAmazon, the next best thing in shopping via shell!');
    inquirer.prompt([
        {
            type: "list",
            name: "userGuess",
            message: "Try to stay alive! Guess a number between [1-5]",
            choices: ["1", "2", "3", "4", "5"]
        }

    ]).then(function(guess) {

    });
}