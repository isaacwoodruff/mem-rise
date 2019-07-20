// Navigation

// When Start button is clicked it hides the main menu, then shows the game view and back/menu icons
$('#start-btn').click(function() {
    startButton();
});

function startButton(){
    $('#main-menu').addClass('d-none');
    $('#game-view, #back-and-menu-icons, #score').removeClass('d-none');
}

// When How To Play/ Help menu link is clicked it hides the main menu, menu list, then game view and shows the help menu
$('.help-menu-link').click(function() {
    helpMenuLinks();
});

function helpMenuLinks(){
    $('#main-menu, #menu-list, #game-view, #score').addClass('d-none');
    $('#help-menu, #back-and-menu-icons, #background-overlay').removeClass('d-none');
}
// When the Main Menu link is clicked in the menu list it hides the menu list and back/menu icons, then shows the main menu
$('#main-menu-link').click(function() {
    mainMenuLink();
});

function mainMenuLink() {
    $('#menu-list, #back-and-menu-icons, #score, #background-overlay').addClass('d-none');
    $('#main-menu').removeClass('d-none');
}

// When the 3 stacked bars icon is clicked it hides the help menu and game view, then shows the menu list
$('#menu-icon').click(function() {
    menuIcon();
});

function menuIcon(){
    $('#help-menu, #game-view, #score').addClass('d-none');
    $('#back-and-menu-icons, #menu-list, #background-overlay').removeClass('d-none');
}
/*
    When back arrow icon is clicked
    if game view is not the current window it hides help menu, menu list and main menu, then shows game view
    else it hides the game view, back/menu icons, then shows main menu
*/
$('#back-arrow').click(function() {
    backArrow();
});

function backArrow(){
    if (!$('#game-view').hasClass('d-none')) {
        $('#game-view, #back-and-menu-icons, #score, #background-overlay').addClass('d-none');
        $('#main-menu').removeClass('d-none');
    }else {
        $('#main-menu, #menu-list, #help-menu, #background-overlay').addClass('d-none');
        $('#game-view, #back-and-menu-icons, #score').removeClass('d-none');
    }
}

// When the continue button is clicked it will hide itself and continue to generate a move
$('#continue-btn').click(function() {
    continueButton();
});

function continueButton(){
    $('#game-view-text').text("");
    $('#continue-btn').addClass('d-none');
    generateMove();
}

// When the ready button is clicked it will hide itself and start a new game
$('#ready-btn').click(function() {
    readyButton();
});

function readyButton(){
    $('#game-view-text').text("Let's go!");
    $('#ready-btn').addClass('d-none');
    setTimeout(function(){
        $('#game-view-text').text("");
        newGame();
    }, 1000);
}

// Text Animations

/*
    This uses the textillate.js plugin along with animate.css and lettering.js libraries
    to create a flashing text animation
*/
$('.text-flash').textillate({
    in: {
        effect: 'flash',
        delayScale: 2,
        delay: 50,
    },
    out: {
        effect: 'flash',
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

// Resets all of the currentGame, player, and count to 0, then calls the counter function addCount()
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
    $('#score-number').text(game.count);
    game.count++;
    
    
    // If continue button is hidden that means it's the start of a new game
    if($('#continue-btn').hasClass('d-none')){
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
    the array.
*/
function highlightSelections() {
    for (let i = 0; i < game.currentGame.length; i++) {
        /*
            If i is equal to 0 this instantly highlights the first currentGame value.
            It adds and removes the animation for the symbols selected
        */
        if (i == 0) {
            addSymbolAnimations(game.currentGame[i]);
            setTimeout(function() {
                removeSymbolAnimations(game.currentGame[i]);
            }, 700);
        /*
            When variable i is equal to anything besides 0 the outer setTimeout method will
            multiply i by 1000. This will show the currentGame values 1 second after each other.
            It adds and removes the animation for the symbols selected
        */
        }else {
            setTimeout(function() {
                addSymbolAnimations(game.currentGame[i]);
                setTimeout(function() {
                    removeSymbolAnimations(game.currentGame[i]);
                }, 700);
            }, i * 1000);
        }
    }
    resetPreviousPlayerSelection();
}

/*
    Resets game.player, then adds a click event listener for each value in the 
    game.symbolsArray, then when a user clicks on a game symbol it pushes the
    ID of said symbol to the game.player array. It also adds an animation so the
    player knows they've clicked a symbol
*/
function resetPreviousPlayerSelection() {
    game.player = [];
    
    for (let i = 0; i < game.symbolsArray.length; i++) {
        let symbolSetArrayValue = game.symbolsArray[i];
        
        $(symbolSetArrayValue).click(function() {
            addSymbolAnimations(symbolSetArrayValue);
            
            setTimeout(function() {
                removeSymbolAnimations(symbolSetArrayValue);
            }, 700);
            
            game.player.push(symbolSetArrayValue);
            checkPlayerSelection();
        });
    }
}

/*
    This checks the players selection against the current game selection. 
    If the length of both is the same, then it compares the values within 
    the two arrays. If they are the same, it shows the continue button which
    once clicked will start the next move. If the values are not the same
    then it ends the current game by calling the function newGame()
*/
function checkPlayerSelection() {
    if (game.player.length == game.currentGame.length) {
        
        // Removes the click event listener for every symbol in the game.symbolsArray
        for (let i = 0; i < game.symbolsArray.length; i++) {
            let symbolSetArrayValue = game.symbolsArray[i];
            
            $(symbolSetArrayValue).unbind('click');
        }
        
        let congratsMessages = ['Well done!','Good job!','You got this!','Nice!'];
        
        if (game.player.toString() === game.currentGame.toString()) {
            $('#game-view-text').text(congratsMessages[Math.floor(Math.random() * congratsMessages.length)]);
            $('#continue-btn').removeClass('d-none');
            addCount();
        }else {
            $('#game-view-text').replaceWith('<p id="game-view-text" class="position-absolute-center">Wrong move! <br> Try again</p>');
            $('#ready-btn').removeClass('d-none');
        }
    }
}

// Add classes highlight, animated, and tada which animated the symbols
function addSymbolAnimations(symbolSetValue) {
    $(symbolSetValue).addClass('highlight');
    $(symbolSetValue).addClass('animated');
    $(symbolSetValue).addClass('tada');
}

// Remove classes highlight, animated, and tada which animated the symbols
function removeSymbolAnimations(symbolSetValue) {
    $(symbolSetValue).removeClass('highlight');
    $(symbolSetValue).removeClass('animated');
    $(symbolSetValue).removeClass('tada');
}