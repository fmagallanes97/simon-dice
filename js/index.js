'use strict';

const $simon = document.querySelector('#simon-game');
const $play = document.querySelector('#btn-play');
const $colors = document.querySelectorAll('.panel');
const $notifications = document.querySelector('#container-notifications');

function playAnimation(element){
    element.classList.add('animate-border-panel');
}

function stopAnimation(){
    this.classList.remove('animate-border-panel');
}

function getActionsGamePanel(event){
    playAnimation(event.currentTarget);
    getUserPlay(event.currentTarget);
    manageGames();
}

function enableGamePanel(){
    $colors.forEach($color => {
        $color.addEventListener('click', getActionsGamePanel);
    })
}

function disableGamePanel(){
    $colors.forEach($color => {
        $color.removeEventListener('click', getActionsGamePanel);
    })
}

function showColorsOrder(colors){
    const DELAY = 700;

    colors.forEach((color, index) => {
        setTimeout(() => {
            playAnimation($simon.querySelector(`[data-color-game=${color}]`));
        }, DELAY * index)
    })
}

function getUserPlay(element){
    user.order.push(element.getAttribute('data-color-game'));
}

function createToastNotification(id='', msg=''){
    const $toastNotification = document.createElement('div');

    $toastNotification.classList.add('toast');
    $toastNotification.classList.add('animate-slide-in-toast');
    $toastNotification.id = id;
    $toastNotification.innerHTML = msg;

    $notifications.appendChild($toastNotification);
}

function updateProgressBar(level, { isGameOver = false, isGameWin = false } = {}){
    const $progressBar = $notifications.querySelector('#progress-bar');

    if($progressBar === null) return;

    const computedStyle = getComputedStyle($progressBar);
    const percentFraction = 100 / level;
    const progress = Number(computedStyle.getPropertyValue('--width')) + percentFraction;
    const isProgressBarFull = Math.round(progress) === 100;

    $progressBar.style.setProperty('--width', progress);

    if(isProgressBarFull || isGameOver || isGameWin){
        setTimeout(() => {
            $progressBar.classList.add('animate-slide-out-toast');
        }, 400);
        setTimeout(() => {
            $progressBar.remove()
        }, 700);
    }
}

function removeNotifications(){
    if($notifications === null) return;
    $notifications.innerHTML = '';
}

$colors.forEach($color => {
    $color.addEventListener('animationend', stopAnimation);
})

$play.addEventListener('click', (event) => {
    $play.disabled = true;
    removeNotifications();
    manageGames();
    event.preventDefault();
});