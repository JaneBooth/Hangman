
//const fs = require("fs");


// function readTextFile() {
//     let dataText = fs.readFileSync("scrabbleWords.txt", "utf8");
//     return dataText;
// }

// wordArray = [];
// wordString = readTextFile();
// wordArray = wordString.split('"},{"word":"');


// wordArray[0] = wordArray[0].slice(-6);
// wordArray[wordArray.length-1] = wordArray[wordArray.length-1].slice(0,6)

let wordArray = ["hello", "fantastic", "hospital", "farmer", "children", "enormous", "sensitive", "party", "amazing", "hangman", "frustrating"];

let lettersGuessed = [];

let currentGuess = "";

let word = "";

let guessesLeft = 10;

function runGame(){
    lettersGuessed = [];
    currentGuess = "";
    guessesLeft = 10;
    const htmlGuessesRemaining = document.getElementById("guessesRemaining");
    htmlGuessesRemaining.innerText = "Guesses remaining: " + guessesLeft.toString();
    word = chooseWord(wordArray);
    displayHiddenWord(word);
    document.getElementById('inputId').style.display = 'inline';
    document.getElementById('submitGuess').style.display = 'inline';
    const htmlInstructions = document.getElementById("instructionsText");
    htmlInstructions.innerText = "";
    const htmlLettersGuessed = document.getElementById("lettersGuessed");
    htmlLettersGuessed.innerText = "";
}

function chooseWord(wordArray){
    return wordArray[Math.floor(Math.random()*wordArray.length)];
}

function displayHiddenWord(chosenWord){
    let display = "";
    [...chosenWord].forEach(letter =>{
        display = display + "_ ";
    });
    const htmlDisplay = document.getElementById("currentDisplay");
    htmlDisplay.innerText = display;
    
    
}

function checkGuess(){
    let guessText = document.getElementById("inputId").value;
    if(guessText.length == 0){
        const htmlInstructions = document.getElementById("instructionsText");
        htmlInstructions.innerText = "You must enter a letter to submit a guess";
    }
    else if(guessText.length > 1){
        const htmlInstructions = document.getElementById("instructionsText");
        htmlInstructions.innerText = "You can only guess one letter at a time";
    }
    else if( guessText.toUpperCase() != guessText.toLowerCase() ){
        let alreadyGuessed = false;
        lettersGuessed.forEach(letter=>{
            if(letter.charCodeAt(0) == guessText.toLowerCase().charCodeAt(0)){
                alreadyGuessed = true;
            }
        })
        if(alreadyGuessed == true){
            const htmlInstructions = document.getElementById("instructionsText");
            htmlInstructions.innerText = "You've already guessed that letter";
        }
        else{
            currentGuess = guessText.toLowerCase();
            lettersGuessed.push(currentGuess);
            let lettersGuessedText = "Letters guessed so far: ";
            lettersGuessed.forEach(letter=>{
                lettersGuessedText += letter + " "
            });
            const htmlLettersGuessed = document.getElementById("lettersGuessed");
            htmlLettersGuessed.innerText = lettersGuessedText;
            let correctGuess = false;
            [...word].forEach(letter =>{
                if(letter.charCodeAt(0) == currentGuess.charCodeAt(0) ){
                    correctGuess = true;
                }
            })
            if(correctGuess == false){
                guessesLeft -= 1;
                if(guessesLeft < 1){
                    const htmlInstructions = document.getElementById("instructionsText");
                    htmlInstructions.innerText = "You lost :( The correct word was: " + word;
                    document.getElementById('inputId').style.display = 'none';
                    document.getElementById('submitGuess').style.display = 'none';
                }
                const htmlGuessesRemaining = document.getElementById("guessesRemaining");
                htmlGuessesRemaining.innerText = "Guesses remaining: " + guessesLeft.toString();
            }
            else{
                let display = "";
                let checkWon = true;
                [...word].forEach(letter=>{
                    let letterGuessedBool = false;
                    lettersGuessed.forEach(letterGuessed=>{
                        if(letterGuessed.charCodeAt(0) == letter.charCodeAt(0)){
                            letterGuessedBool = true;
                        }
                        
                    })
                    if(letterGuessedBool){
                        display = display + letter + " ";
                    }
                    else{
                        display = display + "_ "
                        checkWon = false;
                    }
                });
                const htmlDisplay = document.getElementById("currentDisplay");
                htmlDisplay.innerText = display;
                if(checkWon == true){
                    const htmlInstructions = document.getElementById("instructionsText");
                    htmlInstructions.innerText = "You won :) congratulations!";
                    document.getElementById('inputId').style.display = 'none';
                    document.getElementById('submitGuess').style.display = 'none';
                }
            }
        }
        
    }
    else{
        const htmlInstructions = document.getElementById("instructionsText");
        htmlInstructions.innerText = "You can only guess letters";
    }

}




function bindButtons(){
    const submitGuess = document.getElementById("submitGuess");
    submitGuess.addEventListener("click", checkGuess);
    const startNewGame = document.getElementById("startNewGame");
    startNewGame.addEventListener("click", runGame);
    
}


bindButtons();

