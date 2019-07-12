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


function highlightSelections() {

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
    Changes the score to match the counter (game.count), adds 1 onto counter
    and calls a function that generates the game move (generateMove())
*/
function addCount() {
    $('#scoreNumber').html(game.count);
    game.count++;
    generateMove();
}

// Resets all of the currentGame, player, and count to 0 or empty, then calls the counter function (addCount())
function newGame() {
    game.currentGame = [];
    game.count = 0;
    addCount();
}