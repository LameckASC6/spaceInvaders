let tenPointInvader;
let twentyPointInvader;
let fortyPointInvader;
let bossInvader;
let logo;
let currentScreen;
let shipImage;
let resetButton;

let myFont;
let hover;
let player = {
    health: 100,
    score: 0,
    lives: 3
}
let objArray;

let ship = {
    x: 455,
    y: 500,
    health: 100,
    score: 0,
    lives: 3
}

function preload() {
    tenPointInvader = loadImage('assets/10PointInvader.png');
    twentyPointInvader = loadImage('assets/20PointInvader.png');
    fortyPointInvader = loadImage('assets/40PointInvader.png');
    bossInvader = loadImage('assets/Boss.png');
    logo = loadImage('assets/spaceInvadersLogo.png');
    myFont = loadFont('assets/space_invaders.ttf');
    shipImage = loadImage('assets/ship.png');
}

function setup() {
    createCanvas(1000, 600);
    background('black');
    currentScreen = 'Start'
    shipImage.resize(50, 0);
    hover = false;
    objArray = [];
    for (let i = 0; i < 10; i++) {
        objArray.push({
            x: 50 * (1.5 * i + 1),
            y: 150,
            health: 100,
            pointValue: 10
        });
        objArray.push({
            x: 50 * (1.5 * i + 1),
            y: 225,
            health: 100,
            pointValue: 20
        });
        objArray.push({
            x: 50 * (1.5 * i + 1),
            y: 300,
            health: 100,
            pointValue: 40
        });
    }
    resetButton = createButton('Restart Game');
    resetButton.position(460, 350);
    resetButton.mousePressed(reset);
    resetButton.elt.style.visibility = 'hidden';
}

function draw() {
    let bulletX = ship.x + 25;
    let bulletY = ship.y;
    if (currentScreen == 'Start') {
        tenPointInvader.resize(75, 0);
        twentyPointInvader.resize(75, 0);
        fortyPointInvader.resize(75, 0);
        bossInvader.resize(75, 0);
        background('black');
        image(logo, 300, 10);
        image(tenPointInvader, 100, 250);
        image(twentyPointInvader, 100, 325);
        image(fortyPointInvader, 100, 400);
        image(bossInvader, 100, 525);
        textFont(myFont);
        fill('white');
        textSize(30);
        text(" = 10 POINTS", 200, 285);
        text(" = 20 POINTS", 200, 360);
        text(" = 40 POINTS", 200, 455);
        text(" = ??? POINTS", 200, 550);
        if (mouseX < 940 && mouseX > 530 && mouseY < 415 && mouseY > 375) hover = true;
        else hover = false;
        if (hover) {
            fill('green');
            text("PLAY  SPACE  INVADERS", 540, 410);
        } else {
            text("PLAY  SPACE  INVADERS", 540, 410);
        }
        resetButton.elt.style.visibility = 'hidden';
    }
    else if (currentScreen == 'Game') {
        background('black');
        tenPointInvader.resize(50, 0);
        twentyPointInvader.resize(50, 0);
        fortyPointInvader.resize(50, 0);
        bossInvader.resize(50, 0);
        fill('white');
        text('Lives: ', 650, 80);
        text(`Score: ${player.score}`, 25, 80)
        for(let i = 0; i < player.lives; i++){
        image(shipImage, 775 + (75 * i), 50);
        }
        if (objArray.length == 0) currentScreen = 'Game Over';
        for (let i = 0; i < objArray.length; i++) {
            if (objArray[i].pointValue == 10) {
                image(tenPointInvader, objArray[i].x, objArray[i].y);
            } else if (objArray[i].pointValue == 20) {
                image(twentyPointInvader, objArray[i].x, objArray[i].y);
            } else if (objArray[i].pointValue == 40) {
                image(fortyPointInvader, objArray[i].x, objArray[i].y);
            } else if (objArray[i].pointValue == 100) {
                image(bossInvader, objArray[i].x, objArray[i].y);
            }
        }
        if (ship.health == 0) {
            ship.lives--;
            ship.health = 100;
            ship.x = 455;
            ship.y = 500;
        }
        if (keyIsDown(LEFT_ARROW) && ship.x > 0) ship.x -= 3;
        else if (keyIsDown(RIGHT_ARROW) && ship.x < width - 50) ship.x += 3;
        if (keyIsDown(32)) {
            for(let i=0; i < 600; i++){
            rect(bulletX -1, bulletY - 10 - i, 2, 10);
            }
        }
        
        image(shipImage, ship.x, ship.y);
    } else if (currentScreen == 'Game Over') {
        background('black');
        tenPointInvader.resize(50, 0);
        twentyPointInvader.resize(50, 0);
        fortyPointInvader.resize(50, 0);
        bossInvader.resize(50, 0);
        image(shipImage, ship.x, ship.y);
        stroke('#07eb93');
        strokeWeight(10);
        fill('white');
        rect(300, 200, 400, 200, 20);
        fill('black');
        noStroke();
        textFont(myFont);
        textSize(30);
        text('Game Over', 410, 250);
        fill('white');
        text('Lives: ', 650, 80);
        text(`Score: ${player.score}`, 25, 80)
        for(let i = 0; i < player.lives; i++){
        image(shipImage, 775 + (75 * i), 50);
        }
        resetButton.elt.style.visibility = 'visible';
    }
}

function mousePressed() {
    if (currentScreen == 'Start' && hover) {
        currentScreen = 'Game';
    }
}

function keyPressed() {
    if (keyCode == 32) {
        rect()
        shoot();
    }
}

function shoot() {
    bulletX = ship.x + 25;
    bulletY = ship.y;
    let mainI;
    let myAlien = {};
    for (let i = objArray.length - 1; i >= 0; i--) {
        if (ship.x >= objArray[i].x - 25 && ship.x <= objArray[i].x + 25) {
            myAlien = objArray[i];
            mainI = i;
            break;
        }
    }
     if (mainI == undefined) {
         for (let i = bulletY; i > 0; i-=5) {
             background('black');
             tenPointInvader.resize(50, 0);
             twentyPointInvader.resize(50, 0);
             fortyPointInvader.resize(50, 0);
             bossInvader.resize(50, 0);
             if (objArray.length == 0) currentScreen = 'Game Over';
             for (let i = 0; i < objArray.length; i++) {
                 if (objArray[i].pointValue == 10) {
                     image(tenPointInvader, objArray[i].x, objArray[i].y);
                 } else if (objArray[i].pointValue == 20) {
                     image(twentyPointInvader, objArray[i].x, objArray[i].y);
                 } else if (objArray[i].pointValue == 40) {
                     image(fortyPointInvader, objArray[i].x, objArray[i].y);
                 } else if (objArray[i].pointValue == 100) {
                     image(bossInvader, objArray[i].x, objArray[i].y);
                 }
             }
             noStroke();
             fill('white');
             rect(bulletX, bulletY, 2, 10);
         }
     } else{
         for (let i = bulletY; i > myAlien.y; i-=5) {
                noStroke();
                fill('white');
                rect(bulletX, bulletY, 2, 10);
         }
         
         objArray.splice(mainI,1);
         if (objArray.length == 0) currentScreen = 'Game Over';
         player.score += myAlien.pointValue;
         
     }
}

function reset() {
    createCanvas(1000, 600);
    background('black');
    currentScreen = 'Start'
    player.score = 0;
    shipImage.resize(50, 0);
    hover = false;
    objArray = [];
    for (let i = 0; i < 10; i++) {
        objArray.push({
            x: 50 * (1.5 * i + 1),
            y: 150,
            health: 100,
            pointValue: 10
        });
        objArray.push({
            x: 50 * (1.5 * i + 1),
            y: 225,
            health: 100,
            pointValue: 20
        });
        objArray.push({
            x: 50 * (1.5 * i + 1),
            y: 300,
            health: 100,
            pointValue: 40
        });
    }
}