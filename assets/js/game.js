// Navigation

// When Start button is clicked it hides the main menu, then shows the game view and back/menu icons
$('.start-btn').click(function() {
    $('.main-menu').addClass('d-none');
    $('.game-view, .back-and-menu-icons').removeClass('d-none');
});

// When How To Play/ Help link is clicked it hides the main menu, menu list, then game view and shows the help menu
$('.help-menu-link').click(function() {
    $('.main-menu, .menu-list, .game-view').addClass('d-none');
    $('.help-menu, .back-and-menu-icons').removeClass('d-none');
});

// When the Main Menu link is clicked in the menu list it hides the menu list and back/menu icons, then shows the main menu
$('.main-menu-link').click(function() {
    $('.menu-list, .back-and-menu-icons').addClass('d-none');
    $('.main-menu').removeClass('d-none');
});

// When the 3 stacked bars icon is clicked it hides the help menu and game view, then shows the menu list
$('.fa-bars').click(function() {
    $('.help-menu, .game-view').addClass('d-none');
    $('.back-and-menu-icons, .menu-list').removeClass('d-none');
});

/*
    When back arrow icon is clicked
    if game view is not the current window it hides help menu, menu list and main menu, then shows game view
    else it hides the game view, back/menu icons, then shows main menu
*/
$('.fa-arrow-left').click(function() {
    if (!$('.game-view').hasClass('d-none')) {
        $('.game-view, .back-and-menu-icons').addClass('d-none');
        $('.main-menu').removeClass('d-none');
    }
    else {
        $('.main-menu, .menu-list, .help-menu').addClass('d-none');
        $('.game-view, .back-and-menu-icons').removeClass('d-none');
    }
});

// Text Animations

/*
    This uses the textillate.js plugin along with animate.css and lettering.js libraries
    to create a flashing text animation
*/
$('.text-flash').textillate({
    in: {
        effect: 'flash',
        //shuffle: true,
        //sync: true,
        delayScale: 2,
        delay: 50,
    },
    out: {
        effect: 'flash',
        //shuffle: true,
        //sync: true,
        delayScale: 2,
        delay: 50
    },
    loop: true
});


// Game

/* 
    Creates a game object with an array (currentGame) which keeps track of the sequence of symbols generated by the game,
    and an array (player) which keeps track of what symbols the player chooses,
    and another array (symbolsArray) which contains all the possible choices of symbols,
    a counter (count) to keep track of the amount of symbols successfully chosen, this is also the score
*/
var game = {
    currentGame: [],
    player: [],
    symbolsArray: ['#green', '#blue', '#orange', '#purple', '#yellow'],
    count: 0
};

/* 
    This function highlights the symbol/currentGame value so the user can see
    which image they have to click
*/

// Resets all of the currentGame, player, and count to 0 or empty, then calls the counter function (addCount())
function newGame() {
    game.currentGame = [];
    game.count = 0;
    addCount();
}

/*  
    Changes the score to match the counter (game.count), adds 1 onto counter and
    checks to see if the continue button is hidden (or has the class 'd-none'),
    if the button is not visible, which means its at the start of a new game,
    it calls a function that generates a new move, generateMove()
*/
function addCount() {
    $('#scoreNumber').html(game.count);
    game.count++;
    
    /*
        Checks if the continue button is hidden (d-none), if it is that means it's
        the start of a new game
    */
    if($('.continue-btn').hasClass('d-none')){
        generateMove();
    }
}

/*
    Uses the Math object to generate a random number with a max length of the symbolsArray,
    then calls a function to highlight the selected symbols (highlightSelections())
*/
function generateMove() {
    game.currentGame.push(game.symbolsArray[Math.floor(Math.random() * game.symbolsArray.length)]);
    highlightSelections();
}

/*
    This function highlights the values in the game.currentGame array by adding a CSS class.
    The class is then removed after a short amount of time and moves onto the next value in
    the array. It loops through each value in game.currentGame and passes the value to the
    function timer(i). The function resetPlayer is called at the end of the selections.
*/
function highlightSelections() {
    for (let i = 0; i < game.currentGame.length; i++) {
        timer(i);
    }

    function timer(i) {
        /*
            If i is equal to 0 this instantly highlights the first currentGame value.
            Then it removes the highlight class after some time.
        */
        if (i == 0) {
            $(game.currentGame[i]).addClass('highlight');
            setTimeout(function() {
                $(game.currentGame[i]).removeClass('highlight');
            }, 1000);
            /*
                When variable i is equal to anything besides 0 the outer setTimeout method will
                multiply i by 1000. This will show the currentGame values 1 second after each other.
                Then it removes the highlight class after some time.
            */
        }
        else {
            setTimeout(function() {
                $(game.currentGame[i]).addClass('highlight');
                setTimeout(function() {
                    $(game.currentGame[i]).removeClass('highlight');
                }, 1000);
            }, i * 1120);
        }
    }
    resetPlayer();
}

/*
    Resets game.player so that when the highlightSelection function has displayed all
    of the selected values in game.currentGame, it resets the users previous selections
    in game.player to allow the user to start the new selections
*/
function resetPlayer() {
    game.player = [];
}

/*
    Adds a click event listener for each value in the game.symbolsArray, then when a user
    clicks on a game symbol it pushes the ID of said symbol to the game.player array
*/
function playerClickListener() {
    for (let i = 0; i < game.symbolsArray.length; i++) {
        let symbolSetArrayValue = game.symbolsArray[i];
        $(symbolSetArrayValue).click(function() {
            $(symbolSetArrayValue).addClass('highlight');
            setTimeout(function() {
                $(symbolSetArrayValue).removeClass('highlight');
            }, 100);
            game.player.push(symbolSetArrayValue);
            checkPlayerSelection();
        });
    }
}

playerClickListener();

/*
    This checks the players selection (game.player) against the current game
    selection (game.currentGame). If the length of both is the same, then it 
    compares the values within the two arrays. If they are the same, it shows
    the continue button which once clicked will start the next move. If the 
    values are not the same then it ends the current game by calling the 
    function newGame() which resets the game.currentGame array
*/
function checkPlayerSelection() {
    if (game.player.length == game.currentGame.length) {
        if (game.player.toString() === game.currentGame.toString()) {
            console.log('checkPlayerSelection is True');
            $('.continue-btn').removeClass('d-none');
            addCount();
        }else {
            console.log('checkPlayerSelection is false');
            $('#game-view-text').text("Wrong move! Try again");
            $('.ready-btn').removeClass('d-none');
        }
    }
}

// When the continue button is clicked it will hide itself and continue to generate a move
$('.continue-btn').click(function() {
    $('.continue-btn').addClass('d-none');
    generateMove();
});

// When the ready button is clicked it will hide itself and start a new game
$('.ready-btn').click(function() {
    $('#game-view-text').text("Let's go!");
    $('.ready-btn').addClass('d-none');
    setTimeout(function(){
        $('#game-view-text').text("");
        newGame();
    }, 1000);
});
