$(document).ready(function () {

    // -------------------------- Global Variables Start ---------------------------

    // This variable holds an array with objects inside of it to make it easier to call with jQuery in the functions below
    var triviaGame = [{
            myQuestions: 'How many blocks of gold were used to craft the enchanted golden apple in the past?', 
            possibleAnswers: ['8', '9', '5', '4'],
            correctAnswer: 0,
            // photo: "assets/images/pupusas.jpg"
        }, {
            myQuestions: 'What resource isn\'t used when constructing the pyramid for a beacon?', 
            possibleAnswers: ['Diamond', 'Iron', 'Emerald', 'Coal'],
            correctAnswer: 3,
            // photo: "assets/images/mtdew.gif"
         }, {
            myQuestions: 'How much iron is needed to craft an anvil?', 
            possibleAnswers: ['29', '31', '25', '33'],
            correctAnswer: 1,
            // photo: "assets/images/coffee.gif"
        }, {
            myQuestions: 'How many bookshelves are needed to make a level 30 enchantment?', 
            possibleAnswers: ['15', '10', '19', '25'],
            correctAnswer: 0,
            // photo: "assets/images/harvey.jpg"
        }, {
            myQuestions: 'What can you use to make a turtle follow you?', 
            possibleAnswers: ['Grass', 'Kelp', 'Sugarcane', 'Seagrass'],
            correctAnswer: 3,
            // photo: "assets/images/dozen.jpg"
        }, {
            myQuestions: 'What version of Minecraft were bees added to the game?', 
            possibleAnswers: ['1.09', '1.11', '1.15', '1.10'],
            correctAnswer: 2,
            // photo: "assets/images/herring.jpg"
        }, {
            myQuestions: 'What hostile mob can be used to get the heads of other mobs?', 
            possibleAnswers: ['Wither', 'Charged Creeper', 'Zombie', 'Enderman'],
            correctAnswer: 1,
            // photo: "assets/images/lemon.gif"
        }, {
            myQuestions: 'What kind of pickaxe do you need to mine and collect obsidian?', 
            possibleAnswers: ['Stone', 'Iron', 'Gold', 'Diamond'],
            correctAnswer: 3,
            // photo: "assets/images/guava.gif"
        }, {
            myQuestions: 'What hostile mob drops the Totem of Undying item?', 
            possibleAnswers: ['Evoker', 'Blaze', 'Pillager', 'Witch'],
            correctAnswer: 0,
            // photo: "assets/images/pupusas.jpg"
        }, {
            myQuestions: 'How much experience do you get from killing a respawned Enderdragon?', 
            possibleAnswers: ['12,000', '5,000', '2,000', '500'],
            correctAnswer: 3,
            // photo: "assets/images/pupusas.jpg"
         }];
    
    // These are some global variables that I will need to use in the functions below, mainly to keep track of what the user has guessed,
    // whether the timer/ game is running, what question is going to be asked and to count the number of incorrect/correct/unanswered questions
    let numberCorrect= 0;
    let numberIncorrect= 0;
    let numberOfunanswered= 0;
    let timer= 10;
    var intervalId;
    var playerGuess= '';
    var gameRunning= false;
    var questionCount= triviaGame.length;
    var pick;
    var index;
    var newArray= [];
    // This variable will hold the questions that have been asked
    var usedQuestionHolder= [];

    // -------------------------- Global Variables End ---------------------------
    
    // This line right here is used to hide the play again button from view until the game is over
    $('#restartGame').hide();

    // -------------------------- Start Game Start ---------------------------

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

    // -------------------------- Start Game End ---------------------------

    // -------------------------- Timer Start -------------------------

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
        $('#TimeRemaining').html('<h>Time remaining: ' + timer + '</h5>');
        timer --;
    
        // This will stop the time when it reaches 0,  increase the value for the numberofunanswered variable, and tell the
        // player that their time is up
        if (timer < 0) {

            numberOfunanswered++;
            // This will stop the timer for just a moment
            stop();
            $('#possibleAnswers').html('<p>Oof! You ran out of time! The correct answer is: ' + pick.possibleAnswers[pick.correctAnswer] + '</p>');
            hidepicture();

        }	

    }
    
    // This function is pretty self explanatory, it just stops the timer when the player answers a question
    function stop() {

        gameRunning = false;
        clearInterval(intervalId);

    }

    // -------------------------- Timer End -------------------------

    // -------------------------- Questions Start ---------------------------

    // This function will randomly pick a question from the array of objects, then it'll display the question for the player,
    // and then loop through the array to hit all the possible questions and display their answers
    function displayQuestion() {

        // These 2 variables are how the webpage randomly chooses a question for the player to answer
        index= Math.floor(Math.random()*triviaGame.length);
        pick= triviaGame[index];

        // This is how the randomly chosen question will be shown on the screen when the user clicks the play button
        $('#questionsHere').html('<h6>' + pick.myQuestions + '</h6>');
        for(var i = 0; i < pick.possibleAnswers.length; i++) {

            // This for loop is how the possible answers to the questions generated above are shown to the 
            // player
            var answerblocks = $('<div>');
            // The variable answer blocks is going to generate <div>s for the user to see
            answerblocks.addClass('userChoice');
            answerblocks.html(pick.possibleAnswers[i]);
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
        if (playerGuess === pick.correctAnswer) {

            stop();
            numberCorrect++;
            // playerGuess= '' will clear the input that the user chose for the last question so that they can choose another
            // answer for the next question that comes up
            playerGuess= '';
            $('#possibleAnswers').html('<p>You got it right! Good job!</p>');
            hidepicture();
    
        } else {

            stop();
            numberIncorrect++;
            playerGuess= '';
            $('#possibleAnswers').html('<p>Doh! You got it wrong, the correct answer is: ' + pick.possibleAnswers[pick.correctAnswer] + '</p>');
            hidepicture();

        }

        })

    }

    // -------------------------- Questions End ---------------------------
    
    function hidepicture () {
        $("#possibleAnswers").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        triviaGame.splice(index,1);
    
        var hidpic = setTimeout(function() {
            $("#possibleAnswers").empty();
            timer= 10;
    
        //run the score screen if all questions answered
        if ((numberIncorrect + numberCorrect + numberOfunanswered) === questionCount) {
            $("#questionsHere").empty();
            $("#questionsHere").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#possibleAnswers").append("<h4> Correct: " + numberCorrect + "</h4>" );
            $("#possibleAnswers").append("<h4> Incorrect: " + numberIncorrect + "</h4>" );
            $("#possibleAnswers").append("<h4> Unanswered: " + numberOfunanswered + "</h4>" );
            $("#restartGame").show();
            numberCorrect = 0;
            numberIncorrect = 0;
            numberOfunanswered = 0;
    
        } else {
            startTimer();
            displayQuestion();
    
        }
        }, 2500);
    
    
    }
    
    // This is the function that will restart the game when the player has gone through all 10 questions
    // and they hit the play again button
    $('#restartGame').on('click', function() {

        // The function mainly consists of emptying the questions from the array that they were stored in so 
        // that the user doesn't see repeat questions, the line below this is used to hide the play again button
        $('#restartGame').hide();
        $('#possibleAnswers').empty();
        $('#questionsHere').empty();
        startTimer();
        displayQuestion();
    
    })
    
})