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

// When back arrow icon is clicked it hides help menu, menu list and main menu, then shows game view
$('.fa-arrow-left').click(function() {
    if(!$('.game-view').hasClass('d-none')){
        $('.game-view, .back-and-menu-icons').addClass('d-none');
        $('.main-menu').removeClass('d-none');
    }else{
        $('.main-menu, .menu-list, .help-menu').addClass('d-none');
        $('.game-view, .back-and-menu-icons').removeClass('d-none');
    }
});