import fs from "fs";


function readTextFile() {
    let dataText = fs.readFileSync("scrabbleWords.txt", "utf8");
    return dataText;
}

wordArray = [];
wordString = readTextFile();
wordArray = wordString.split('"},{"word":"');


wordArray[0] = wordArray[0].slice(-6);
wordArray[wordArray.length-1] = wordArray[wordArray.length-1].slice(0,6)

lettersGuessed = [];

function runGame(){
    lettersGuessed = [];
    currentGuess = "";
    word = chooseWord(wordArray);
    console.log(word);
    displayHiddenWord(word);
}

function chooseWord(wordArray){
    return wordArray[Math.floor(Math.random()*wordArray.length)];
}

function displayHiddenWord(chosenWord){
    display = "";
    [...chosenWord].forEach(letter =>{
        display = display + "_" + " ";
    });
    const htmlDisplay = document.getElementById("currentDisplay");
    htmlDisplay.innerText = display;
    
    
}

function checkGuess(){
    let guessText = document.getElementsByClassName("inputClass");
    if(guessText.length == 0){
        const htmlInstructions = document.getElementById("instructionsText");
        htmlInstructions.innerText = "You must enter a letter to submit a guess";
    }
    else if(guessText.length > 1){
        const htmlInstructions = document.getElementById("instructionsText");
        htmlInstructions.innerText = "You can only guess one letter at a time";
    }
    else if( guessText.toUpperCase() != guessText.toLowerCase() ){
        currentGuess = guessText.toLowerCase;
    }
    else{
        const htmlInstructions = document.getElementById("instructionsText");
        htmlInstructions.innerText = "You can only guess one letter at a time";
    }

}


function bindButtons(){
    const startNewGame = document.getElementById("startNewGame");
    startNewGame.addEventListener("click", runGame);
    const submitGuess = document.getElementById("submitGuess");
    submitGuess.addEventListener("click", checkGuess);
}



bindButtons();
console.log(playerGuess());