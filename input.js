const words = ["colorful", "examples", "describe", "elephant", "activate", "computer", "engineer", "software", "algorithm", "terminal"];
let selectedWord = "";
let guessedWord = [];
let guessedLetters = [];
let incorrectGuesses = 0; // Start from "hang0.png"


const correctLetterAudio = new Audio("correct_letter.mp3");
const correctWordAudio = new Audio("correct_word.mp3");

function newGame() {
    selectedWord = words[Math.floor(Math.random() * words.length)].toUpperCase();
    guessedWord = Array(selectedWord.length).fill('_');
    guessedLetters = [];
    incorrectGuesses = 0; // Start from "hang0.png"
    updateDisplay();
    updateHangmanImage(); // Initial display of "hang0.png"
}

function guessLetter() {
    const letterInput = document.getElementById("letter-input").value.toUpperCase();

    if (!letterInput.match(/[A-Z]/) || guessedLetters.includes(letterInput)) {
        alert("Please enter a valid letter that hasn't been guessed yet.");
        return;
    }

    guessedLetters.push(letterInput);

    if (selectedWord.includes(letterInput)) {
        for (let i = 0; i < selectedWord.length; i++) {
            if (selectedWord[i] === letterInput) {
                guessedWord[i] = letterInput;
            }
        }
        // Play correct letter sound
        correctLetterAudio.play();
    } else {
        incorrectGuesses++;
        updateHangmanImage();
    }

    if (guessedWord.join('') === selectedWord) {
        alert("Congratulations! You guessed the word!");
        // Play correct word sound
        correctWordAudio.play();
        newGame();
    } else if (incorrectGuesses === 7) {
        alert("Game Over. The word was: " + selectedWord);
        newGame();
    }

    updateDisplay();
}

function updateDisplay() {
    document.getElementById("word-display").innerHTML = guessedWord.join(' ');
    document.getElementById("guessed-letters").innerHTML = "Guessed Letters: " + guessedLetters.join(', ');
}

function updateHangmanImage() {
    const hangmanImage = document.getElementById("hangman-image");
    hangmanImage.src = "hang" + incorrectGuesses + ".png";
}

document.addEventListener("DOMContentLoaded", function() {
    newGame();
});
