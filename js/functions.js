'use strict';

const COLORS = ['red', 'blue', 'yellow', 'green'];

const computer = {
    order: [],
    level: 1,
}

const user = {
    order: [],
    turn: false
}

Array.prototype.random = function(){
    return this[Math.floor(Math.random() * this.length)];
}

function getColorsOrder(length){
    const order = [];

    for(let i=0; i < length; i++){
        order.push(COLORS.random());
    }
    
    return order;
}

function resetComputer(){
    computer.level = 1;
    computer.order.length = 0;
}

function resetGame(){
    user.turn = false;
    user.order.length = 0;
    $play.disabled = false;
    resetComputer();
    disableGamePanel();
}

function manageGames(){
    const i = user.order.length-1;
    const isGameOver = user.order[i] !== computer.order[i];
    const isLevelUp = (user.order.length === computer.order.length) && user.order.length > 0;
    const isGameWin = computer.level === 11;
    const isWaitingForUser = user.order.length > 0;

    updateProgressBar(computer.level, {isGameOver, isGameWin});

    if(isGameOver){
        resetGame();
        createToastNotification('game-over-notification', 'Ese no fue el color elegido✋😓');
        return;
    }else if(isLevelUp){
        computer.level++;
        user.order.length = 0;
    }else if(isGameWin){
        resetGame();
        createToastNotification('game-win-notification', 'Alcanzaste el nivel 10 locura!!!🤯🤯');
        return;
    }else if(isWaitingForUser){  
        return;
    }

    user.turn ? runUserGame() : runComputerGame();
}

function runComputerGame(){
    user.turn = true;
    computer.order = getColorsOrder(computer.level);

    disableGamePanel();

    setTimeout(() => {
        showColorsOrder(computer.order);
    }, 1000);
    setTimeout(() => {
        manageGames();
    }, 1000 * computer.level);
}

function runUserGame(){
    user.turn = false;

    createToastNotification('progress-bar', 'Ahora es tu turno!👊😁');
    enableGamePanel();
}