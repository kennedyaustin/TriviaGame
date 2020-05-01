$(document).ready(function () {

    // -------------------------- Global Variables Start ---------------------------

    // This variable holds an array with objects inside of it to make it easier to call with jQuery in the functions below
    var triviaGame = [{
            myQuestions: 'How many blocks of gold were used to craft the enchanted golden apple in the past?', 
            possibleAnswers: ['8', '9', '5', '4'],
            correctAnswer: 0,
            photo: 'assets/images/gapple.png'
        }, {
            myQuestions: 'What resource isn\'t used when constructing the pyramid for a beacon?', 
            possibleAnswers: ['Diamond', 'Iron', 'Emerald', 'Coal'],
            correctAnswer: 3,
            photo: 'assets/images/coal.png'
         }, {
            myQuestions: 'How much iron is needed to craft an anvil?', 
            possibleAnswers: ['29', '31', '25', '33'],
            correctAnswer: 1,
            photo: 'assets/images/anvil.jpg'
        }, {
            myQuestions: 'How many bookshelves are needed to make a level 30 enchantment?', 
            possibleAnswers: ['15', '10', '19', '25'],
            correctAnswer: 0,
            photo: 'assets/images/enchantTable.png'
        }, {
            myQuestions: 'What can you use to make a turtle follow you?', 
            possibleAnswers: ['Grass', 'Kelp', 'Sugarcane', 'Seagrass'],
            correctAnswer: 3,
            photo: 'assets/images/turtle.png'
        }, {
            myQuestions: 'What version of Minecraft were bees added to the game?', 
            possibleAnswers: ['Version 1.09', 'Version 1.11', 'Version 1.15', 'Version 1.10'],
            correctAnswer: 2,
            photo: 'assets/images/bees.jpg'
        }, {
            myQuestions: 'What hostile mob can be used to get the heads of other mobs?', 
            possibleAnswers: ['Wither', 'Charged Creeper', 'Zombie', 'Enderman'],
            correctAnswer: 1,
            photo: 'assets/images/chargedCreeper.jpg'
        }, {
            myQuestions: 'What kind of pickaxe do you need to mine and collect obsidian?', 
            possibleAnswers: ['Stone', 'Iron', 'Gold', 'Diamond'],
            correctAnswer: 3,
            photo: 'assets/images/diamondPic.jpg'
        }, {
            myQuestions: 'What hostile mob drops the Totem of Undying item?', 
            possibleAnswers: ['Evoker', 'Blaze', 'Pillager', 'Witch'],
            correctAnswer: 0,
            photo: 'assets/images/undying.jpg'
        }, {
            myQuestions: 'How much experience do you get from killing a respawned Enderdragon?', 
            possibleAnswers: ['12,000', '5,000', '2,000', '500'],
            correctAnswer: 3,
            photo: 'assets/images/enddragon.png'
         }];
    
    // These are some global variables that I will need to use in the functions below, mainly to keep track of what the user has guessed,
    // whether the timer/ game is running, what question is going to be asked and to count the number of incorrect/correct/unanswered questions
    let numberCorrect= 0;
    let numberIncorrect= 0;
    let numberOfunanswered= 0;
    let timer= 15;
    var intervalId;
    var playerGuess= '';
    var gameRunning= false;
    var questionCount= triviaGame.length;
    var corresponding;
    var index;
    // This variable will hold the questions that have been asked
    var usedQuestionHolder= [];

    // -------------------------- Global Variables End ---------------------------
    
    // This line right here is used to hide the play again button from view until the game is over
    $('#restartGame').hide();

    // -------------------------- Start Game Function Start ---------------------------

    $('#startGame').on("click", function () {

        // Upon the user clicking on the startGame button, the button will disappear from view, a question will be displayed,
        // and the timer will be started
        $('#startGame').hide();
        displayQuestion();
        startTimer();

        // For the number of objects inside of the triviaGame array, a trivia game question will be pushed into the usedQuestionHolder
        // array so that the user won't see a repeating question during their game
        for(var i = 0; i < triviaGame.length; i++) {

        usedQuestionHolder.push(triviaGame[i]);

        }

    })

    // -------------------------- Start Game Function End ---------------------------

    // -------------------------- Timer Functions Start -------------------------

    // This function will start the timer 
    function startTimer() {

        if (!gameRunning) {

        // if the variable gameRunning is true, then the countingDown function will be used, and it will count down by 1 second (1000ms)
        intervalId= setInterval(countingDown, 1000); 

        }

    }

    // This is the function that will make the timer count down, as well as display the countdown on the screen for the player
    function countingDown() {

        // This will show the user how much time they have left to answer the current question
        $('#TimeRemaining').html('<h5>Time remaining: ' + timer + '</h5>');
        timer --;
    
        // This will stop the time when it reaches 0,  increase the value for the numberofunanswered variable, and tell the
        // player that their time is up
        if (timer < 0) {

            numberOfunanswered++;
            // This will stop the timer for just a moment
            stop();
            $('#possibleAnswers').html('<p>Oof! You ran out of time! The correct answer is: ' + corresponding.possibleAnswers[corresponding.correctAnswer] + '</p>');
            pictures();

        }	

    }
    
    // This function is pretty self explanatory, it just stops the timer when the player answers a question
    function stop() {

        gameRunning = false;
        clearInterval(intervalId);

    }

    // -------------------------- Timer Functions End -------------------------

    // -------------------------- Questions Function Start ---------------------------

    // This function will randomly corresponding a question from the array of objects, then it'll display the question for the player,
    // and then loop through the array to hit all the possible questions and display their answers
    function displayQuestion() {

        // These 2 variables are how the webpage randomly chooses a question for the player to answer
        $('#questionsHere').show();
        index= Math.floor(Math.random()*triviaGame.length);
        corresponding= triviaGame[index];

        // This is how the randomly chosen question will be shown on the screen when the user clicks the play button
        $('#questionsHere').html('<h6>' + corresponding.myQuestions + '</h6>');
        for(var i = 0; i < corresponding.possibleAnswers.length; i++) {

            // This for loop is how the possible answers to the questions generated above are shown to the 
            // player
            var answerblocks = $('<div>');
            // The variable answer blocks is going to generate <div>s for the user to see
            answerblocks.addClass('userChoice');
            answerblocks.html(corresponding.possibleAnswers[i]);
            // The code below is assigning each block a position so that the webpage can check
            // whether the chosen box contains the correct value for the answer
            answerblocks.attr('data-guessvalue', i);
            $('#possibleAnswers').append(answerblocks);

        }
    
    
    
        // This pulls from the class that was added above to put the information needed into the answerblocks
        $('.userChoice').on('click', function () {

        // Next is defining the variable for the users guess, this will grab the array position from where the user click among the 
        // 4 answers that are shown to them
        playerGuess= parseInt($(this).attr('data-guessvalue'));
    
        // This if/else statement deals with what happens when the player click the correct or incorrect answer
        if (playerGuess === corresponding.correctAnswer) {

            stop();
            numberCorrect++;
            // playerGuess= '' will clear the input that the user chose for the last question so that they can choose another
            // answer for the next question that comes up
            playerGuess= '';
            $('#possibleAnswers').html('<p>You got it right! Good job!</p>');
            $('#questionsHere').hide();
            pictures();
    
        } else {

            stop();
            numberIncorrect++;
            playerGuess= '';
            $('#possibleAnswers').html('<p>Doh! You got it wrong, the correct answer is: ' + corresponding.possibleAnswers[corresponding.correctAnswer] + '</p>');
            $('#questionsHere').hide();
            pictures();

        }

        })

    }

    // -------------------------- Questions Function End ---------------------------
    
    // This function will hide the pictures until the user clicks on one of the answer choices,
    // and either gets the question correct or wrong
    function pictures() {

        // Underneath the possibleAnswers id the photo that corresponds to the question will appear
        $('#possibleAnswers').append('<img src=' + corresponding.photo + '>');
        triviaGame.splice(index,1);
    
        var pics = setTimeout(function() {

            $('#possibleAnswers').empty();
            timer= 15;
    
            // This if/else statement will end the game/continue by adding together all the questions that have 
            // been done by the player and if it = the length of the array of objects then it ends the game
            if ((numberIncorrect + numberCorrect + numberOfunanswered) === questionCount) {

                // This will 'hide' the div where the questions are shown to the player and display the text below instead
                $('#questionsHere').empty();
                $('#questionsHere').html('<h3>Game Over!  Here\'s how you did: </h3>');
                // Then these will also be shown underneath the text above, one under the other
                $('#possibleAnswers').append('<h4> Correct: ' + numberCorrect + '</h4>');
                $('#possibleAnswers').append('<h4> Incorrect: ' + numberIncorrect + '</h4>');
                $('#possibleAnswers').append('<h4> Unanswered: ' + numberOfunanswered + '</h4>');
                // Now that the game is done, the play again button will show itself to the player if they want to try again
                $('#restartGame').show();
                numberCorrect = 0;
                numberIncorrect = 0;
                numberOfunanswered = 0;
    
            } else {

            startTimer();
            displayQuestion();
    
            }

        // Time before the next question is shown
        }, 2500);
    
    }

    // -------------------------- Restart Function Start ---------------------------
    
    // This is the function that will restart the game when the player has gone through all 10 questions
    // and they hit the play again button
    $('#restartGame').on('click', function() {

        // The function mainly consists of emptying the questions from the array that they were stored in so 
        // that the user doesn't see repeat questions, the line below this is used to hide the play again button
        $('#restartGame').hide();
        $('#possibleAnswers').empty();
        $('#questionsHere').empty();
        // This will make the questions appear again after we empty the questions array
        for(var i = 0; i < usedQuestionHolder.length; i++) {

            triviaGame.push(usedQuestionHolder[i]);

        }
        startTimer();
        displayQuestion();
    
    })

    // -------------------------- Restart Function End ---------------------------
    
})