describe('Navigation buttons', function() {

    beforeEach(() => {
        setFixtures(`
            <div id="main-menu"><div>
            <div id="help-menu"><div>
            <div id="menu-list"><div>
            <div id="game-view"><div>
            <div id="start-btn"><div>
            <div id="ready-btn"><div>
            <div id="continue-btn"><div>
            <div id="back-arrow"><div>
            <div id="menu-icon"><div>
            <div id="back-and-menu-icons"><div>
            <div id="score"><div>
            <div id="background-overlay"><div>
            <div id="game-view-text"><div>
            
        `);
    });

    describe('When the start button is clicked', function() {
        beforeEach(() => {
            startButton();
        });

        it('Hides the #main-menu', function() {
            expect($('#main-menu')).toHaveClass('d-none');
        });
        it('Shows the #game-view', function() {
            expect($('#game-view')).not.toHaveClass('d-none');
        });
        it('Shows the #back-and-menu-icons', function() {
            expect($('#back-and-menu-icons')).not.toHaveClass('d-none');
        });
        it('Shows the #score', function() {
            expect($('#score')).not.toHaveClass('d-none');
        });
    });

    describe('When help menu links are clicked', function() {
        beforeEach(() => {
            helpMenuLinks();
        });

        it('Hides the #main-menu', function() {
            expect($('#main-menu')).toHaveClass('d-none');
        });
        it('Hides the #game-view', function() {
            expect($('#game-view')).toHaveClass('d-none');
        });
        it('Hides the #score', function() {
            expect($('#score')).toHaveClass('d-none');
        });
        it('Hides the #menu-list', function() {
            expect($('#menu-list')).toHaveClass('d-none');
        });
        it('Shows the #help-menu', function() {
            expect($('#help-menu')).not.toHaveClass('d-none');
        });
        it('Shows the #back-and-menu-icons', function() {
            expect($('#back-and-menu-icons')).not.toHaveClass('d-none');
        });
        it('Shows the #background-overlay', function() {
            expect($('#background-overlay')).not.toHaveClass('d-none');
        });
    });

    describe('When the main menu link is clicked', function() {
        beforeEach(() => {
            mainMenuLink();
        });

        it('Hides the #score', function() {
            expect($('#score')).toHaveClass('d-none');
        });
        it('Hides the #menu-list', function() {
            expect($('#menu-list')).toHaveClass('d-none');
        });
        it('Hides the #back-and-menu-icons', function() {
            expect($('#back-and-menu-icons')).toHaveClass('d-none');
        });
        it('Hides the #background-overlay', function() {
            expect($('#background-overlay')).toHaveClass('d-none');
        });
        it('Shows the #main-menu', function() {
            expect($('#main-menu')).not.toHaveClass('d-none');
        });
    });

    describe('When the menu icon is clicked', function() {
        beforeEach(() => {
            menuIcon();
        });

        it('Hides the #help-menu', function() {
            expect($('#help-menu')).toHaveClass('d-none');
        });
        it('Hides the #game-view', function() {
            expect($('#game-view')).toHaveClass('d-none');
        });
        it('Hides the #score', function() {
            expect($('#score')).toHaveClass('d-none');
        });
        it('Shows the #background-overlay', function() {
            expect($('#background-overlay')).not.toHaveClass('d-none');
        });
        it('Shows the #menu-list', function() {
            expect($('#menu-list')).not.toHaveClass('d-none');
        });
        it('Shows the #back-and-menu-icons', function() {
            expect($('#back-and-menu-icons')).not.toHaveClass('d-none');
        });
    });

    describe('When the back arrow icon is clicked', function() {
        describe('If the #game-view is visible', function() {
            beforeEach(() => {
                backArrow();
            });

            it('Hides the #game-view', function() {
                expect($('#game-view')).toHaveClass('d-none');
            });
            it('Hides the #back-and-menu-icons', function() {
                expect($('#back-and-menu-icons')).toHaveClass('d-none');
            });
            it('Hides the #score', function() {
                expect($('#score')).toHaveClass('d-none');
            });
            it('Hides the #background-overlay', function() {
                expect($('#background-overlay')).toHaveClass('d-none');
            });
            it('Shows the #main-menu', function() {
                expect($('#main-menu')).not.toHaveClass('d-none');
            });
        });

        describe('If the #game-view is NOT visible', function() {
            beforeEach(() => {
                $('#game-view').addClass('d-none');
                backArrow();
            });

            it('Hides the #menu-list', function() {
                expect($('#menu-list')).toHaveClass('d-none');
            });
            it('Hides the #help-menu', function() {
                expect($('#help-menu')).toHaveClass('d-none');
            });
            it('Shows the #game-view', function() {
                expect($('#game-view')).not.toHaveClass('d-none');
            });
            it('Shows the #back-and-menu-icons', function() {
                expect($('#back-and-menu-icons')).not.toHaveClass('d-none');
            });
            it('Shows the #score', function() {
                expect($('#score')).not.toHaveClass('d-none');
            });
        });
    });

    describe('When the continue button is clicked', function() {
        it('Hides the #continue-btn', function() {
            continueButton();
            expect($('#continue-btn')).toHaveClass('d-none');
        });
        it('Calls the generateMove() function', function() {
            spyOn(window, "generateMove");
            continueButton();
            expect(window.generateMove).toHaveBeenCalled();
        });
        it('Replaces the #game-view-text with an empty string', function() {
            continueButton();
            expect($('#game-view-text').text()).toMatch('');
        });
    });

    describe('When the ready button is clicked', function() {
        beforeEach(function() {
            jasmine.clock().install();
        });
        afterEach(function() {
            jasmine.clock().uninstall();
        });
        
        it(`Replaces the #game-view-text with "Let's go!"`, function() {
            readyButton();
            jasmine.clock().tick(100);
            expect($('#game-view-text').text()).toMatch("Let's go!");
        });
        it(`Replaces the #game-view-text with an empty string after 1 second`, function() {
            readyButton();
            jasmine.clock().tick(1000);
            expect($('#game-view-text').text()).toMatch("");
        });
        it('Hides the #ready-btn', function() {
            readyButton();
            expect($('#ready-btn')).toHaveClass('d-none');
        });
        it('Calls the newGame() function after 1 second', function() {
            spyOn(window, "newGame");
            readyButton();
            jasmine.clock().tick(1000);
            expect($('#game-view-text').text()).toMatch("");
            expect(window.newGame).toHaveBeenCalled();
        });
    });
});

describe("Game logic", function() {
    
    beforeEach(() => {
        setFixtures(`
            <div id="continue-btn"><div>
            <div id="score-number"><div>
        `);
        
        game.currentGame = ['#orange','green'];
        game.count = 8;
    });
    
    describe("newGame function", function() {
        it('should set game.currentGame to be an empty array', function() {
            newGame();
            expect(game.currentGame).toEqual([]);
        });
        it('should call addCount function', function() {
            spyOn(window,'addCount');
            newGame();
            expect(window.addCount).toHaveBeenCalled();
        });
        it('should set game.count to 0 then calls addCount function so it will be 1', function() {
            newGame();
            expect(game.count).toEqual(1);
        });
    });
    
    describe("addCount function", function() {
        it('should update #score-number with the game.count before the counter runs', function() {
            addCount();
            expect(parseInt($('#score-number').text())).toBe(game.count - 1);
        });
        it('should add 1 to game.count', function() {
            addCount();
            expect(game.count).toBe(9);
        });
        it('should call the  function generateMove if the continue button is hidden', function() {
            $('#continue-btn').addClass('d-none');
            spyOn(window,'generateMove');
            addCount();
            expect(window.generateMove).toHaveBeenCalled();
        });
    });
    
    describe('generateMove function', function() {
        it('should select a random value from the game.symbolsArray and push it to game.currentGame', function() {
            newGame();
            generateMove();
            expect(["#green", "#blue", "#orange", "#purple", "#yellow"]).toContain(game.currentGame.toString())
        });
    });
});
