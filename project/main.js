import { drawGrid } from "@/utils/grid.js";
import { drawAxes } from '@/utils/axes.js';
import { vector } from "@/utils/vec3.js";

let font;

//We can use this to load textures or sounds
export function preload() {
    font = loadFont("https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf");
}

//Called once when program loads
export function setup() {
    document.getElementById("start").addEventListener('click', startButtonClicked);
    document.getElementById("swap").addEventListener('click', swapButtonClicked);
    document.getElementById("reset").addEventListener('click', resetButtonClicked);
    document.getElementById("1").addEventListener('click', oneButtonClicked);
    document.getElementById("2").addEventListener('click', twoButtonClicked);
    document.getElementById("3").addEventListener('click', threeButtonClicked);
    document.getElementById("4").addEventListener('click', fourButtonClicked);
    document.getElementById("5").addEventListener('click', fiveButtonClicked);
    document.getElementById("+").addEventListener('click', plusButtonClicked);
    document.getElementById("-").addEventListener('click', minusButtonClicked);
}

let temp = ["zero", "one", "two", "three", "four"]

let bet = 0

function plusButtonClicked(){
    if (bet < money){
        bet += 1
    }
}

function minusButtonClicked(){
    if ( bet > 0 ) {
        bet -= 1
    }
}

// Source - https://stackoverflow.com/a/2450976
// Posted by ChristopheD, modified by community. See post 'Timeline' for change history
// Retrieved 2026-07-09, License - CC BY-SA 4.0

function shuffle(array) {
    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {

        // Pick a remaining element...
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
}
// the above array shuffler was copied from StackOverflow

function randomSelect() {
    return Math.floor(Math.random() * temp.length)
}

function startButtonClicked() {
    console.log("Start!");
    sceneTime = 0
    resetAnims();
    if (currentScene == "startMenu") {
        currentScene = "sceneTwo"
    }
    if (currentScene == "horse1") {
        if (chosenHorse != undefined) {
            currentScene = "horse2";
            money -= bet
            shuffle(temp);
            horses[temp[0]].place = 1
            horses[temp[1]].place = 2
            horses[temp[2]].place = 3
            horses[temp[3]].place = 4
            horses[temp[4]].place = 5
        } else {
            console.log("choose a horse")
        }
    }
    if (currentScene == "horse3") {
        currentScene = "horse1"
        bet = 0
    }

}

let money = 100

function swapButtonClicked() {
    if (currentScene == "startMenu") {
        resetAnims();
        sceneTime = 0
        currentScene = "horse1"
    } else if (currentScene == "horse1") {
        resetAnims();
        sceneTime = 0;
        currentScene = "startMenu"
    }
}

function resetButtonClicked() {
    resetAnims();
    charInfo.char1.stats.hp = 100
    charInfo.char2.stats.hp = 100
    currentScene = "startMenu"
    money = 100
    bet = 0
}

let chosenHorse = "zero";

let slot = 0

function oneButtonClicked() {
    if (currentScene == "horse1") {
        chosenHorse = "zero"
        slot = 0
    }
}

function twoButtonClicked() {
    if (currentScene == "horse1") {
        chosenHorse = "one"
        slot = 1
    }
}

function threeButtonClicked() {
    if (currentScene == "horse1") {
        chosenHorse = "two"
        slot = 2
    }
}

function fourButtonClicked() {
    if (currentScene == "horse1") {
        chosenHorse = "three"
        slot = 3
    }
}

function fiveButtonClicked() {
    if (currentScene == "horse1") {
        chosenHorse = "four"
        slot = 4
    }
}

let charInfo = {
    char1: {
        stats: {
            maxHp: 100,
            hp: 100,
        },
        currentAnim: undefined,
        animTime: 0,
        visible: true,
        posX: 0,
        posY: 0,
        posZ: 0,
        rotY: 0,
        currentWpn: "sword",
        wpnState: "held",
    },
    char2: {
        stats: {
            maxHp: 100,
            hp: 100
        },
        currentAnim: undefined,
        animTime: 0,
        visible: true,
        posX: 0,
        posY: 0,
        posZ: 0,
        rotY: 0,
        currentWpn: "sword2",
        wpnState: "held",
    },
    char3: {
        stats: {
            maxHp: 100,
            hp: 100,
        },
        visible: false,
        posX: 0,
        posY: 0,
        posZ: 0,
        rotY: 0,
        wpnState: "held",
    }
}

let scaleVar;

function resetAnims() {
    charInfo.char1.animTime = 0
    charInfo.char2.animTime = 0
    charInfo.char3.animTime = 0
    charInfo.char1.posX = 0
    charInfo.char1.posY = 0
    charInfo.char1.posZ = 0
    charInfo.char2.posX = 0
    charInfo.char2.posY = 0
    charInfo.char2.posZ = 0
    charInfo.char3.posX = 0
    charInfo.char3.posY = 0
    charInfo.char3.posZ = 0
    charInfo.char1.rotY = 0
    charInfo.char2.rotY = 0
    charInfo.char3.rotY = 0
}

let anims = {
    char1: {
        idle: function (t, dt) {
            charInfo.char1.animTime += dt;
            push();
            translate(charInfo.char1.posX, charInfo.char1.posY, charInfo.char1.posZ);
            healthBar("char1");
            rotateY(charInfo.char1.rotY);
            scaleVar = 1 + Math.sin(charInfo.char1.animTime) / 200;
            scale(scaleVar, scaleVar, scaleVar);
            drawChar1();
            translate(-15, -100, -30);
            rotateY(90);
            rotateX(210);
            //drawSword();
            pop();
        },
        attack: function (t, dt) {
            charInfo.char1.animTime += dt;
            push();
            translate(charInfo.char1.posX, charInfo.char1.posY, charInfo.char1.posZ);
            healthBar("char1");
            rotateY(charInfo.char1.rotY);
            if (charInfo.char1.animTime < 1) {
                drawChar1(45, -40, 45, -40, (-15 + charInfo.char1.animTime * 50), 0, 0);
            }
            if (charInfo.char1.animTime >= 1 && charInfo.char1.animTime <= 1.75) {
                translate(0, 0, (charInfo.char1.animTime - 1) * 100);
                drawChar1(45, -40, 45, -40, (30 - (charInfo.char1.animTime - 1) * 150), 0, 0);
            }
            if (charInfo.char1.animTime > 1.75 && charInfo.char1.animTime < 3.25) {
                translate(0, 0, 75 - (charInfo.char1.animTime - 1.75) * 50)
                drawChar1(0, 0, 0, 0, (-30 + (charInfo.char1.animTime - 1.75) * 20), 0, 0);
            }
            if (charInfo.char1.animTime >= 3.25) {
                translate(0, 0,)
                drawChar1();
                translate(-35, -40, 0);
            }
            pop();
        },
        defend: function (t, dt) {
            charInfo.char1.animTime += dt;
            push();
            translate(charInfo.char1.posX, charInfo.char1.posY, charInfo.char1.posZ);
            healthBar("char1");
            rotateY(charInfo.char1.rotY);
            if (charInfo.char1.animTime < 1.5) {
                translate(0, 0, charInfo.char1.animTime * -80);
            } else {
                translate(0, 0, -120);
            }
            if (charInfo.char1.animTime < 0.5) {
                drawChar1((charInfo.char1.animTime * 160), 0, (charInfo.char1.animTime * 160), 0, 0, (charInfo.char1.animTime * 180), 0, (charInfo.char1.animTime * -180), 0, (charInfo.char1.animTime * 15));
            } else {
                drawChar1(80, 0, 80, 0, 0, 90, 0, -90, 0, 15)
            }
            pop();
        },
        special: function (t, dt) {
            charInfo.char1.animTime += dt;
            push();
            translate(charInfo.char1.posX, charInfo.char1.posY, charInfo.char1.posZ);
            healthBar("char1");
            rotateY(charInfo.char1.rotY);
            translate(0, 0, -120);
            if (charInfo.char1.animTime < 1) {
                drawChar1(80 + (charInfo.char1.animTime * 100), 0, 80 + (charInfo.char1.animTime * -80), 0, 0, 90 + (charInfo.char1.animTime * -90), 0, -90 + (charInfo.char1.animTime * 90), 0, 15 + (charInfo.char1.animTime * -15))
            }
            if (charInfo.char1.animTime >= 1 && charInfo.char1.animTime < 2) {
                drawChar1(180)
            }
            if (charInfo.char1.animTime >= 2 && charInfo.char1.animTime < 3) {
                drawChar1(180 + ((charInfo.char1.animTime - 2) * -150), ((charInfo.char1.animTime - 2) * -15), 0, 0, ((charInfo.char1.animTime - 2) * -45), 0, 0, 0, 0, 0)
            }
            if (charInfo.char1.animTime >= 3 && charInfo.char2.animTime < 4) {
                drawChar1(30, -15, 0, 0, -45);
                push();
                translate(-30, 0, 220);
                drawBreak((charInfo.char1.animTime - 3) * 600);
                pop();
            }
            if (charInfo.char1.animTime >= 4) {
                drawChar1(30, -15, 0, 0, -45);
            }
            pop();
        },
    },
    char2: {
        idle: function (t, dt) {
            charInfo.char2.animTime += dt;
            push();
            translate(charInfo.char2.posX, charInfo.char2.posY, charInfo.char2.posZ);
            healthBar("char2");
            rotateY(charInfo.char2.rotY);
            scaleVar = 1 + Math.sin(charInfo.char2.animTime) / 200;
            scale(scaleVar, scaleVar, scaleVar);
            drawChar2();
            pop();
        },
        attack: function (t, dt) {
            charInfo.char2.animTime += dt;
            push();
            translate(charInfo.char2.posX, charInfo.char2.posY, charInfo.char2.posZ);
            healthBar("char2");
            rotateY(charInfo.char2.rotY);

            if (charInfo.char2.animTime <= 1) {
                translate(0, 0, charInfo.char2.animTime * 75);
                drawChar2(110, -15, 0, 0, 0, 0, 140, (charInfo.char2.animTime * -90));
            }
            if (charInfo.char2.animTime > 1 && charInfo.char2.animTime <= 1.5) {
                translate(0, 0, 75);
                drawChar2(110, -15, 0, 0, 0, 180, 40, 90, 0, 0);
            }
            if (charInfo.char2.animTime > 1.5 && charInfo.char2.animTime <= 2.5) {
                translate(0, 0, (charInfo.char2.animTime - 0.5) * 75);
                drawChar2(110 - (charInfo.char2.animTime - 1.5) * 70, -15 - (charInfo.char2.animTime - 1.5) * 15, 0, 0, -90);
            }
            if (charInfo.char2.animTime > 2.5) {
                translate(0, 0, 150);
                drawChar2(40, -30, 0, 0, -90);
            }
            pop();
        },
        defend: function (t, dt) {
            charInfo.char2.animTime += dt;
            push();
            translate(charInfo.char2.posX, charInfo.char2.posY, charInfo.char2.posZ);
            healthBar("char2");
            rotateY(charInfo.char2.rotY);
            if (charInfo.char2.animTime > 1 && charInfo.char2.animTime < 1.75) {
                translate(0, 0, -(charInfo.char2.animTime - 1) * 150)
            }
            if (charInfo.char2.animTime >= 1.75) {
                translate(0, 0, -112.5 + ((charInfo.char2.animTime - 1.75) * 75))
            }
            drawChar2(110, -15, 0, 0, 0, 0, 140);
            pop();
        },
        ko: function (t, dt) {
            charInfo.char2.animTime += dt;
            push();
            translate(charInfo.char2.posX, charInfo.char2.posY, charInfo.char2.posZ);
            healthBar("char2");
            rotateY(charInfo.char2.rotY);
            if (charInfo.char2.animTime < 2) {
                translate(0, 0, 150);
                drawChar2(40 + (charInfo.char2.animTime) * -20, -30 + (charInfo.char2.animTime) * 15, 0, 0, -90 + (charInfo.char2.animTime) * 45);
            }
            if (charInfo.char2.animTime >= 2 && charInfo.char2.animTime < 3) {
                translate(0, 0, 150 - (charInfo.char2.animTime - 2) * 120)
                drawChar2();
            }
            if (charInfo.char2.animTime >= 3 && charInfo.char2.animTime < 4) {
                translate(0, 0, 30);
                rotateX((charInfo.char2.animTime - 3) * 90);
                translate(0, (charInfo.char2.animTime - 3) * -75, 0);
                drawChar2();
            }
            if (charInfo.char2.animTime >= 4) {
                translate(0, 0, -45);
                rotateX(90);
                drawChar2();
            }
            pop();
        },
    },
    // char3: {
    //     idle: function (t, dt) {

    //     },
    //     attack: function (t, dt) {

    //     },
    //     defend: function (t, dt) {

    //     },
    // },
    zero: {
        first: function () {
            push(); 
            if (sceneTime < 5){
            translate(-450 + sceneTime * 190 ,-160,1)
            drawHorse0()
            } else {
                translate(500,-160,1)
                drawHorse0()
            }
            pop();
        },
        second: function () {
            push(); 
            if (sceneTime < 6){
            translate(-450 + sceneTime * 158.33 ,-160,1)
            drawHorse0()
            } else {
                translate(500,-160,1)
                drawHorse0()
            }
            pop();
        },
        third: function () {
            push(); 
            if (sceneTime < 7){
            translate(-450 + sceneTime * 125.71 ,-160,1)
            drawHorse0()
            } else {
                translate(500,-160,1)
                drawHorse0()
            }
            pop();
        },
        fourth: function () {
            push(); 
            if (sceneTime < 8){
            translate(-450 + sceneTime * 118.75 ,-160,1)
            drawHorse0()
            } else {
                translate(500,-160,1)
                drawHorse0()
            }
            pop();
        },
        fifth: function () {
            push(); 
            if (sceneTime < 9){
            translate(-450 + sceneTime * 105.55 ,-160,1)
            drawHorse0()
            } else {
                translate(500,-160,1)
                drawHorse0()
            }
            pop();
        },
        idle: function () {
            push();
            translate(-450,-160,0)
            drawHorse0()
            pop();
        },
        finish: function () {
            push();
            translate(500,-160,1)
            drawHorse0()
            pop();
        }
    },
    one: {
        first: function () {
            push(); 
            if (sceneTime < 5){
            translate(-450 + sceneTime * 190 ,-60,1)
            drawHorse1()
            } else {
                translate(500,-60,1)
                drawHorse1()
            }
            pop();
        },
        second: function () {
            push(); 
            if (sceneTime < 6){
            translate(-450 + sceneTime * 158.33 ,-60,1)
            drawHorse1()
            } else {
                translate(500,-60,1)
                drawHorse1()
            }
            pop();
        },
        third: function () {
            push(); 
            if (sceneTime < 7){
            translate(-450 + sceneTime * 125.71 ,-60,1)
            drawHorse1()
            } else {
                translate(500,-60,1)
                drawHorse1()
            }
            pop();
        },
        fourth: function () {
            push(); 
            if (sceneTime < 8){
            translate(-450 + sceneTime * 118.75 ,-60,1)
            drawHorse1()
            } else {
                translate(500,-60,1)
                drawHorse1()
            }
            pop();
        },
        fifth: function () {
            push(); 
            if (sceneTime < 9){
            translate(-450 + sceneTime * 105.55 ,-60,1)
            drawHorse1()
            } else {
                translate(500,-60,1)
                drawHorse1()
            }
            pop();
        },
        idle: function () {
            push();
            translate(-450,-60,0)
            drawHorse1()
            pop();
            
        },
        finish: function () {
            push();
            translate(500,-60,1)
            drawHorse1()
            pop();
        }
    },
    two: {
        first: function () {
            push(); 
            if (sceneTime < 5){
            translate(-450 + sceneTime * 190 ,40,1)
            drawHorse2()
            } else {
                translate(500,40,1)
                drawHorse2()
            }
            pop();
        },
        second: function () {
            push(); 
            if (sceneTime < 6){
            translate(-450 + sceneTime * 158.33 ,40,1)
            drawHorse2()
            } else {
                translate(500,40,1)
                drawHorse2()
            }
            pop();
        },
        third: function () {
            push(); 
            if (sceneTime < 7){
            translate(-450 + sceneTime * 125.71 ,40,1)
            drawHorse2()
            } else {
                translate(500,40,1)
                drawHorse2()
            }
            pop();
        },
        fourth: function () {
            push(); 
            if (sceneTime < 8){
            translate(-450 + sceneTime * 118.75 ,40,1)
            drawHorse2()
            } else {
                translate(500,40,1)
                drawHorse2()
            }
            pop();
        },
        fifth: function () {
            push(); 
            if (sceneTime < 9){
            translate(-450 + sceneTime * 105.55 ,40,1)
            drawHorse2()
            } else {
                translate(500,40,1)
                drawHorse2()
            }
            pop();
        },
        idle: function () {
            push();
            translate(-450,40,0)
            drawHorse2()
            pop();
        },
        finish: function () {
            push();
            translate(500,40,1)
            drawHorse2()
            pop();
        }
    },
    three: {
        first: function () {
            push(); 
            if (sceneTime < 5){
            translate(-450 + sceneTime * 190 ,140,1)
            drawHorse3()
            } else {
                translate(500,140,1)
                drawHorse3()
            }
            pop();
        },
        second: function () {
            push(); 
            if (sceneTime < 6){
            translate(-450 + sceneTime * 158.33 ,140,1)
            drawHorse3()
            } else {
                translate(500,140,1)
                drawHorse3()
            }
            pop();
        },
        third: function () {
            push(); 
            if (sceneTime < 7){
            translate(-450 + sceneTime * 125.71 ,140,1)
            drawHorse3()
            } else {
                translate(500,140,1)
                drawHorse3()
            }
            pop();
        },
        fourth: function () {
            push(); 
            if (sceneTime < 8){
            translate(-450 + sceneTime * 118.75 ,140,1)
            drawHorse3()
            } else {
                translate(500,140,1)
                drawHorse3()
            }
            pop();
        },
        fifth: function () {
            push(); 
            if (sceneTime < 9){
            translate(-450 + sceneTime * 105.55 ,140,1)
            drawHorse3()
            } else {
                translate(500,140,1)
                drawHorse3()
            }
            pop();
        },
        idle: function () {
            push();
            translate(-450,140,0)
            drawHorse3()
            pop();
            
        },
        finish: function () {
            push();
            translate(500,140,1)
            drawHorse3()
            pop();
        }
    },
    four: {
        first: function () {
            push(); 
            if (sceneTime < 5){
            translate(-450 + sceneTime * 190 ,240,1)
            drawHorse4()
            } else {
                translate(500,240,1)
                drawHorse4()
            }
            pop();
        },
        second: function () {
            push(); 
            if (sceneTime < 6){
            translate(-450 + sceneTime * 158.33 ,240,1)
            drawHorse4()
            } else {
                translate(500,240,1)
                drawHorse4()
            }
            pop();
        },
        third: function () {
            push(); 
            if (sceneTime < 7){
            translate(-450 + sceneTime * 125.71 ,240,1)
            drawHorse4()
            } else {
                translate(500,240,1)
                drawHorse4()
            }
            pop();
        },
        fourth: function () {
            push(); 
            if (sceneTime < 8){
            translate(-450 + sceneTime * 118.75 ,240,1)
            drawHorse4()
            } else {
                translate(500,240,1)
                drawHorse4()
            }
            pop();
        },
        fifth: function () {
            push(); 
            if (sceneTime < 9){
            translate(-450 + sceneTime * 105.55 ,240,1)
            drawHorse4()
            } else {
                translate(500,240,1)
                drawHorse4()
            }
            pop();
        },
        idle: function () {
            push();
            translate(-450,240,0)
            drawHorse4()
            pop();
            
        },
        finish: function () {
            push();
            translate(500,240,1)
            drawHorse4()
            pop();
        }
    },
}

function drawHorse1() {
    push();
    
    //Mane
    fill(horses.one.color)
    beginShape();
    vertex(-100,0,0);
    vertex(-72,0,0);
    vertex(-75,-25,0);
    vertex(-65,-50,0);
    vertex(-50,-60,0);
    vertex(-50,-70,0);
    vertex(-70,-55,0);
    vertex(-85,-20,0);
    endShape();

    //Head
    fill(horses.one.color)
    beginShape();
    vertex(-72,0,0);
    vertex(-75,-25,0);
    vertex(-65,-50,0);
    vertex(-50,-60,0);
    vertex(-50,-70,0);
    vertex(-47,-75,0);
    vertex(-42,-78,0);
    vertex(-40,-70,0);
    vertex(-25,-60,0);
    vertex(-22,-50,0);
    vertex(-5,-38,0);
    vertex(-3,-32,0);
    vertex(-5,-26,0);
    vertex(-10,-20,0)
    vertex(-29,-25,0);
    vertex(-25,-5,0);
    vertex(-26,0,0)
    endShape();

    //Head Details
    line(-40,-70,1,-43,-60,1)
    line(-29,-25,0,-40,-30,0)

    //Eye
    fill(0,0,0);
    beginShape();
    vertex(-37,-59,1);
    vertex(-33,-60,1);
    vertex(-30,-58,1);
    vertex(-27,-55,1);
    vertex(-29,-52,1);
    vertex(-36,-55,1);
    endShape();

    fill(25,25,25);
    beginShape();
    vertex(-3,-30,1);
    vertex(-5,-38,1);
    vertex(-13,-43,1);
    vertex(-10,-34,1);
    endShape();

    pop();
}

function drawHorse0() {
    push();
    
    //Mane
    fill(horses.zero.color)
    beginShape();
    vertex(-100,0,0);
    vertex(-72,0,0);
    vertex(-75,-25,0);
    vertex(-65,-50,0);
    vertex(-50,-60,0);
    vertex(-50,-70,0);
    vertex(-70,-55,0);
    vertex(-85,-20,0);
    endShape();

    //Head
    fill(horses.zero.color)
    beginShape();
    vertex(-72,0,0);
    vertex(-75,-25,0);
    vertex(-65,-50,0);
    vertex(-50,-60,0);
    vertex(-50,-70,0);
    vertex(-47,-75,0);
    vertex(-42,-78,0);
    vertex(-40,-70,0);
    vertex(-25,-60,0);
    vertex(-22,-50,0);
    vertex(-5,-38,0);
    vertex(-3,-32,0);
    vertex(-5,-26,0);
    vertex(-10,-20,0)
    vertex(-29,-25,0);
    vertex(-25,-5,0);
    vertex(-26,0,0)
    endShape();

    //Head Details
    line(-40,-70,1,-43,-60,1)
    line(-29,-25,0,-40,-30,0)

    //Eye
    fill(0,0,0);
    beginShape();
    vertex(-37,-59,1);
    vertex(-33,-60,1);
    vertex(-30,-58,1);
    vertex(-27,-55,1);
    vertex(-29,-52,1);
    vertex(-36,-55,1);
    endShape();

    fill(25,25,25);
    beginShape();
    vertex(-3,-30,1);
    vertex(-5,-38,1);
    vertex(-13,-43,1);
    vertex(-10,-34,1);
    endShape();

    pop();
}

function drawHorse2() {
    push();
    
    //Mane
    fill(horses.two.color)
    beginShape();
    vertex(-100,0,0);
    vertex(-72,0,0);
    vertex(-75,-25,0);
    vertex(-65,-50,0);
    vertex(-50,-60,0);
    vertex(-50,-70,0);
    vertex(-70,-55,0);
    vertex(-85,-20,0);
    endShape();

    //Head
    fill(horses.two.color)
    beginShape();
    vertex(-72,0,0);
    vertex(-75,-25,0);
    vertex(-65,-50,0);
    vertex(-50,-60,0);
    vertex(-50,-70,0);
    vertex(-47,-75,0);
    vertex(-42,-78,0);
    vertex(-40,-70,0);
    vertex(-25,-60,0);
    vertex(-22,-50,0);
    vertex(-5,-38,0);
    vertex(-3,-32,0);
    vertex(-5,-26,0);
    vertex(-10,-20,0)
    vertex(-29,-25,0);
    vertex(-25,-5,0);
    vertex(-26,0,0)
    endShape();

    //Head Details
    line(-40,-70,1,-43,-60,1)
    line(-29,-25,0,-40,-30,0)

    //Eye
    fill(0,0,0);
    beginShape();
    vertex(-37,-59,1);
    vertex(-33,-60,1);
    vertex(-30,-58,1);
    vertex(-27,-55,1);
    vertex(-29,-52,1);
    vertex(-36,-55,1);
    endShape();

    fill(25,25,25);
    beginShape();
    vertex(-3,-30,1);
    vertex(-5,-38,1);
    vertex(-13,-43,1);
    vertex(-10,-34,1);
    endShape();

    pop();
}

function drawHorse3() {
    push();
    
    //Mane
    fill(horses.three.color)
    beginShape();
    vertex(-100,0,0);
    vertex(-72,0,0);
    vertex(-75,-25,0);
    vertex(-65,-50,0);
    vertex(-50,-60,0);
    vertex(-50,-70,0);
    vertex(-70,-55,0);
    vertex(-85,-20,0);
    endShape();

    //Head
    fill(horses.three.color)
    beginShape();
    vertex(-72,0,0);
    vertex(-75,-25,0);
    vertex(-65,-50,0);
    vertex(-50,-60,0);
    vertex(-50,-70,0);
    vertex(-47,-75,0);
    vertex(-42,-78,0);
    vertex(-40,-70,0);
    vertex(-25,-60,0);
    vertex(-22,-50,0);
    vertex(-5,-38,0);
    vertex(-3,-32,0);
    vertex(-5,-26,0);
    vertex(-10,-20,0)
    vertex(-29,-25,0);
    vertex(-25,-5,0);
    vertex(-26,0,0)
    endShape();

    //Head Details
    line(-40,-70,1,-43,-60,1)
    line(-29,-25,0,-40,-30,0)

    //Eye
    fill(0,0,0);
    beginShape();
    vertex(-37,-59,1);
    vertex(-33,-60,1);
    vertex(-30,-58,1);
    vertex(-27,-55,1);
    vertex(-29,-52,1);
    vertex(-36,-55,1);
    endShape();

    fill(25,25,25);
    beginShape();
    vertex(-3,-30,1);
    vertex(-5,-38,1);
    vertex(-13,-43,1);
    vertex(-10,-34,1);
    endShape();

    pop();
}

function drawHorse4() {
    push();
    
    //Mane
    fill(horses.four.color)
    beginShape();
    vertex(-100,0,0);
    vertex(-72,0,0);
    vertex(-75,-25,0);
    vertex(-65,-50,0);
    vertex(-50,-60,0);
    vertex(-50,-70,0);
    vertex(-70,-55,0);
    vertex(-85,-20,0);
    endShape();

    //Head
    fill(horses.four.color)
    beginShape();
    vertex(-72,0,0);
    vertex(-75,-25,0);
    vertex(-65,-50,0);
    vertex(-50,-60,0);
    vertex(-50,-70,0);
    vertex(-47,-75,0);
    vertex(-42,-78,0);
    vertex(-40,-70,0);
    vertex(-25,-60,0);
    vertex(-22,-50,0);
    vertex(-5,-38,0);
    vertex(-3,-32,0);
    vertex(-5,-26,0);
    vertex(-10,-20,0)
    vertex(-29,-25,0);
    vertex(-25,-5,0);
    vertex(-26,0,0)
    endShape();

    //Head Details
    line(-40,-70,1,-43,-60,1)
    line(-29,-25,0,-40,-30,0)

    //Eye
    fill(0,0,0);
    beginShape();
    vertex(-37,-59,1);
    vertex(-33,-60,1);
    vertex(-30,-58,1);
    vertex(-27,-55,1);
    vertex(-29,-52,1);
    vertex(-36,-55,1);
    endShape();

    fill(25,25,25);
    beginShape();
    vertex(-3,-30,1);
    vertex(-5,-38,1);
    vertex(-13,-43,1);
    vertex(-10,-34,1);
    endShape();

    pop();
}

let horses = {
    zero: {
        color: [253, 255, 125],
        currentAnim: "anims.horse.idle",
        name: "Johnathan",
    },
    one: {
        color: [125, 255, 136],
        currentAnim: "d",
        name: "Winning Ticket",
    },
    two: {
        color: [140, 245, 255],
        currentAnim: "c",
        name: "Harry Potter",
    },
    three: {
        color: [198, 140, 255],
        currentAnim: "b",
        name: "Owesn Edgecombarlow",
    },
    four: {
        color: [255, 143, 233],
        currentAnim: "a",
        name: "Bullshit With Fur",
    },
}

let currentScene = "startMenu";

let sceneTime = 0;

let scenes = {
    startMenu: function (t, dt) {
        camera(0, -200, 700);
        sceneTime += dt;
        drawGround();
        horsesVis = false
        charInfo.char1.visible = true
        charInfo.char2.visible = true
        charInfo.char1.currentAnim = anims.char1.idle;
        charInfo.char2.currentAnim = anims.char2.idle;
        charInfo.char1.posX = -90;
        charInfo.char2.posX = 90;
        charInfo.char1.wpnState = "sheathed"
        charInfo.char2.wpnState = "sheathed"
    },
    sceneTwo: function (t, dt) {
        camera(0, -200, 700);
        sceneTime += dt
        drawGround();
        if (sceneTime >= 3.25) {
            sceneTime = 0
            resetAnims();
            currentScene = "sceneThree"
        }
        charInfo.char1.currentAnim = anims.char1.attack;
        charInfo.char2.currentAnim = anims.char2.defend;
        charInfo.char1.posX = -90;
        charInfo.char1.rotY = 90;
        charInfo.char2.posX = 90;
        charInfo.char2.rotY = -90;
        charInfo.char1.wpnState = "held"
        charInfo.char2.wpnState = "held"
        if (sceneTime >= 1.5) {
            charInfo.char2.stats.hp = 98
        }
    },
    sceneThree: function (t, dt) {
        camera(0, -200, 700);
        sceneTime += dt
        drawGround();
        charInfo.char1.currentAnim = anims.char1.defend;
        charInfo.char2.currentAnim = anims.char2.attack;
        charInfo.char1.posX = -90;
        charInfo.char1.rotY = 90;
        charInfo.char2.posX = 90;
        charInfo.char2.rotY = -90;
        charInfo.char1.wpnState = "held";
        charInfo.char2.wpnState = "held";
        if (sceneTime >= .75) {
            charInfo.char1.stats.hp = 67;
        }
        if (sceneTime >= 1.7) {
            charInfo.char1.stats.hp = 34;
        }
        if (sceneTime >= 3.25) {
            sceneTime = 0;
            resetAnims();
            currentScene = "sceneFour";
        }
    },
    sceneFour: function (t, dt) {
        camera(0, -200, 700);
        sceneTime += dt
        drawGround();
        charInfo.char1.currentAnim = anims.char1.special;
        charInfo.char2.currentAnim = anims.char2.ko;
        charInfo.char1.posX = -90;
        charInfo.char1.rotY = 90;
        charInfo.char2.posX = 90;
        charInfo.char2.rotY = -90;
        if (sceneTime > 1) {
            charInfo.char1.wpnState = "super";
        } else {
            charInfo.char1.wpnState = "held"
        }
        charInfo.char2.wpnState = "held";
        if (sceneTime < 3) {
            charInfo.char2.stats.hp = 98
        }
        if (sceneTime >= 3 && sceneTime < 4) {
            charInfo.char2.stats.hp = 98 + ((sceneTime - 3) * -99)
        }
    },
    horse1: function (t, dt) {
        horsesVis = true
        horses.zero.currentAnim = anims.zero.idle
        horses.one.currentAnim = anims.one.idle
        horses.two.currentAnim = anims.two.idle
        horses.three.currentAnim = anims.three.idle
        horses.four.currentAnim = anims.four.idle
        camera(0, -0, 700);
        sceneTime += dt;
        charInfo.char1.visible = false;
        charInfo.char2.visible = false;
        drawCourse();

        push();
        translate(-600,-200 + slot * 100,0)
        drawArrow();
        pop();
    },
    horse2: function (t, dt) {
        camera(0, -0, 700);
        sceneTime += dt;
        drawCourse();
        
        horses[temp[0]].currentAnim = anims[temp[0]].first
        horses[temp[1]].currentAnim = anims[temp[1]].second
        horses[temp[2]].currentAnim = anims[temp[2]].third
        horses[temp[3]].currentAnim = anims[temp[3]].fourth
        horses[temp[4]].currentAnim = anims[temp[4]].fifth

        if(sceneTime > 10) {
            sceneTime = 0
            currentScene = "horse3"
            if (chosenHorse == temp[0]) {
                money += bet * 2;
            }
        }
    },
    horse3: function (t, dt) {
        camera(0,-0, 700);
        sceneTime += dt;
        drawCourse();

        horses.zero.currentAnim = anims.zero.finish
        horses.one.currentAnim = anims.one.finish
        horses.two.currentAnim = anims.two.finish
        horses.three.currentAnim = anims.three.finish
        horses.four.currentAnim = anims.four.finish
    }
}

function drawGround() {
    push();
    fill("green");
    box(500, 1, 500)
    translate(0, 13, 0);
    fill(133, 73, 0)
    box(500, 25, 500)
    pop();
}

function drawCourse() {
    push();
    translate(0, -0, 0)
    plane(1000, 500, 100, 100)
    strokeWeight(3);
    line(-500, 250, 0, 500, 250, 0)
    line(-500, 150, 0, 500, 150, 0)
    line(-500, 50, 0, 500, 50, 0)
    line(-500, -50, 0, 500, -50, 0)
    line(-500, -150, 0, 500, -150, 0)
    line(-500, -250, 0, 500, -250, 0)
    fill("green")
    translate(450, 0, 1)
    plane(100, 500, 100, 100)
    pop();
}

function drawArrow() {
    push();
    fill(255,0,0)
    beginShape();
    vertex(0,0,0);
    vertex(-25,-25,0);
    vertex(-25,25,0);
    endShape();
    pop();
}

function drawChar1(armRX, armRZ, armLX, armLZ, wpnX, wpnY, wpnZ, wpnX2, wpnY2, wpnZ2) {
    if (armRX == undefined) {
        armRX = 0
    }
    if (armLX == undefined) {
        armLX = 0
    }
    if (armRZ == undefined) {
        armRZ = 0
    }
    if (armLZ == undefined) {
        armLZ = 0
    }
    if (wpnX == undefined) {
        wpnX = 0
    }
    if (wpnY == undefined) {
        wpnY = 0
    }
    if (wpnZ == undefined) {
        wpnZ = 0
    }
    if (wpnX2 == undefined) {
        wpnX2 = 0
    }
    if (wpnY2 == undefined) {
        wpnY2 = 0
    }
    if (wpnZ2 == undefined) {
        wpnZ2 = 0
    }
    push();
    strokeWeight(0);
    translate(0, -50, 0);
    push();
    fill(0, 204, 245);
    cylinder(28, 80);
    translate(0, -50, 0);
    fill(255, 255, 255);
    cylinder(25, 20);
    pop();
    push();
    translate(30, -35, 0);
    rotateX(armLX);
    rotateZ(-15 - armLZ);
    translate(0, 25, 0);
    fill(115, 227, 250);
    cylinder(6, 50)
    pop();
    push();
    translate(-30, -35, 0);
    rotateX(armRX);
    rotateZ(15 + armRZ);
    translate(0, 25, 0);
    push();
    fill(115, 227, 250);
    cylinder(6, 50);
    pop();
    if (charInfo.char1.wpnState == "held") {
        translate(0, 25, 0);
        rotateX(-90 + wpnX);
        rotateY(wpnY);
        rotateZ(wpnZ);
        rotateX(wpnX2);
        rotateY(wpnY2);
        rotateZ(wpnZ2);
        wpnInfo[charInfo.char1.currentWpn].draw();
    }
    if (charInfo.char1.wpnState == "super") {
        translate(0, 25, 0);
        rotateX(-90 + wpnX);
        rotateY(wpnY);
        rotateZ(wpnZ);
        rotateX(wpnX2);
        rotateY(wpnY2);
        rotateZ(wpnZ2);
        scale(1, 2, 1);
        fill("yellow");
        wpnInfo[charInfo.char1.currentWpn].draw();
    }
    pop();
    push();
    fill(115, 227, 250);
    translate(12, 40, 0);
    cylinder(10, 20);
    translate(-24, 0, 0);
    cylinder(10, 20);
    pop();
    pop();
    push();
    if (charInfo.char1.wpnState == "sheathed") {
        translate(-15, -100, -30);
        rotateY(90);
        rotateX(210);
        wpnInfo[charInfo.char1.currentWpn].draw();
    }
    pop();
}

function drawChar2(armRX, armRZ, armLX, armLZ, wpnX, wpnY, wpnZ, wpnX2, wpnY2, wpnZ2) {
    if (armRX == undefined) {
        armRX = 0
    }
    if (armLX == undefined) {
        armLX = 0
    }
    if (armRZ == undefined) {
        armRZ = 0
    }
    if (armLZ == undefined) {
        armLZ = 0
    }
    if (wpnX == undefined) {
        wpnX = 0
    }
    if (wpnY == undefined) {
        wpnY = 0
    }
    if (wpnZ == undefined) {
        wpnZ = 0
    }
    if (wpnX2 == undefined) {
        wpnX2 = 0
    }
    if (wpnY2 == undefined) {
        wpnY2 = 0
    }
    if (wpnZ2 == undefined) {
        wpnZ2 = 0
    }
    push();
    strokeWeight(0);
    translate(0, -50, 0);
    push();
    fill(99, 99, 99);
    cylinder(28, 80);
    translate(0, -50, 0);
    fill(255, 255, 255);
    cylinder(25, 20);
    pop();
    push();
    translate(30, -35, 0);
    rotateX(armLX);
    rotateZ(-15 - armLZ);
    translate(0, 25, 0);
    fill(115, 0, 0);
    cylinder(6, 50)
    pop();
    push();
    translate(-30, -35, 0);
    rotateX(armRX);
    rotateZ(15 + armRZ);
    translate(0, 25, 0);
    push();
    fill(115, 0, 0);
    cylinder(6, 50);
    pop();
    if (charInfo.char2.wpnState == "held") {
        translate(0, 25, 0);
        rotateX(-90 + wpnX);
        rotateY(wpnY);
        rotateZ(wpnZ);
        rotateX(wpnX2);
        rotateY(wpnY2);
        rotateZ(wpnZ2);
        wpnInfo[charInfo.char2.currentWpn].draw();
    }
    pop();
    push();
    fill(115, 0, 0);
    translate(12, 40, 0);
    cylinder(10, 20);
    translate(-24, 0, 0);
    cylinder(10, 20);
    pop();
    push();
    rotateX(180);
    translate(0, 70, 0);
    fill(232, 225, 142);
    strokeWeight(1);
    cone(50, 20);
    pop();
    pop();
    push();
    if (charInfo.char2.wpnState == "sheathed") {
        translate(30, -40, 30);
        rotateY(180);
        rotateX(-110);
        wpnInfo[charInfo.char2.currentWpn].draw();
    }
    pop();
}

function drawChar3() {
    push();
    strokeWeight(0);
    translate(0, -50, 0);
    push();
    fill(162, 0, 255);
    cylinder(28, 80);
    translate(0, -50, 0);
    fill(255, 255, 255);
    cylinder(25, 20);
    pop();
    push();
    translate(30, -10, 0);
    rotateZ(-15);
    fill(94, 25, 255);
    cylinder(6, 50)
    pop();
    push();
    translate(-30, -10, 0);
    rotateZ(15);
    fill(94, 25, 255);
    cylinder(6, 50);
    pop();
    push();
    fill(94, 25, 255);
    translate(12, 40, 0);
    cylinder(10, 20);
    translate(-24, 0, 0);
    cylinder(10, 20);
    pop();
    pop();
}

let wpnInfo = {
    sword: {
        stats: {
            atk: 10
        },
        draw: function () {
            push();
            strokeWeight(1);
            translate(0, -20, 0);
            beginShape();
            vertex(2.5, 0, 7.5);
            vertex(2.5, -80, 7.5);
            vertex(2.5, -87.5, 0);
            vertex(2.5, -80, -7.5);
            vertex(2.5, 0, -7.5);
            endShape();
            beginShape();
            vertex(2.5, 0, -7.5);
            vertex(0, 0, -10);
            vertex(0, -80, -10);
            vertex(2.5, -80, -7.5);
            endShape();
            beginShape();
            vertex(0, 0, -10);
            vertex(-2.5, 0, -7.5);
            vertex(-2.5, -80, -7.5);
            vertex(0, -80, -10);
            endShape();
            beginShape();
            vertex(-2.5, 0, 7.5);
            vertex(-2.5, -80, 7.5);
            vertex(-2.5, -87.5, 0);
            vertex(-2.5, -80, -7.5);
            vertex(-2.5, 0, -7.5);
            endShape();
            beginShape();
            vertex(2.5, 0, 7.5);
            vertex(0, 0, 10);
            vertex(0, -80, 10);
            vertex(2.5, -80, 7.5);
            endShape();
            beginShape();
            vertex(0, 0, 10);
            vertex(-2.5, 0, 7.5);
            vertex(-2.5, -80, 7.5);
            vertex(0, -80, 10);
            endShape();
            beginShape();
            vertex(0, -80, 10);
            vertex(2.5, -80, 7.5);
            vertex(2.5, -87.5, 0);
            vertex(0, -90, 0);
            endShape();
            beginShape();
            vertex(0, -90, 0);
            vertex(-2.5, -87.5, 0);
            vertex(-2.5, -80, 7.5);
            vertex(0, -80, 10);
            endShape();
            line(0, -80, 10, 0, -90, 0);
            beginShape();
            vertex(-2.5, -87.5, 0);
            vertex(0, -90, 0);
            vertex(0, -80, -10);
            vertex(-2.5, -80, -7.5);
            endShape();
            beginShape();
            vertex(0, -90, 0);
            vertex(0, -80, -10);
            vertex(2.5, -80, -7.5);
            vertex(2.5, -87.5, 0);
            endShape();
            translate(0, 5, 0);
            box(7.5, 10, 35);
            translate(0, 15, 0);
            cylinder(2.5, 30,);
            translate(0, 15, 0);
            sphere(4)
            pop();

        },
    },
    sword2: {
        stats: {
            atk: 20
        },
        draw: function () {
            push();
            strokeWeight(1)
            translate(0, -12, 0);
            beginShape();
            vertex(1.5, 0, 3);
            vertex(1.5, -70, 3);
            vertex(1.5, -80, -5.5);
            vertex(1.5, 0, -5.5);
            endShape();
            beginShape();
            vertex(-1.5, 0, 3);
            vertex(-1.5, -70, 3);
            vertex(-1.5, -80, -5.5);
            vertex(-1.5, 0, -5.5);
            endShape();
            beginShape();
            vertex(1.5, 0, -5.5);
            vertex(1.5, -80, -5.5);
            vertex(0, -85.5, -5.5);
            vertex(-1.5, -80, -5.5);
            vertex(-1.5, 0, -5.5);
            endShape();
            beginShape();
            vertex(1.5, 0, 3);
            vertex(1.5, -70, 3);
            vertex(0, -72.5, 5.5);
            vertex(0, 0, 5.5);
            endShape();
            beginShape();
            vertex(-1.5, 0, 3);
            vertex(-1.5, -70, 3);
            vertex(0, -72.5, 5.5);
            vertex(0, 0, 5.5);
            endShape();
            beginShape();
            vertex(1.5, -70, 3);
            vertex(1.5, -80, -5.5);
            vertex(0, -85.5, -5.5);
            vertex(0, -72.5, 5.5);
            endShape();
            beginShape();
            vertex(-1.5, -70, 3);
            vertex(-1.5, -80, -5.5);
            vertex(0, -85.5, -5.5);
            vertex(0, -72.5, 5.5);
            endShape();
            translate(0, 2, 0);
            box(10, 4, 18);
            translate(0, 12, 0);
            box(3, 20, 5);
            pop();
        }
    }
}

function drawSword() {
    push();
    translate(0, -20, 0);
    beginShape();
    vertex(2.5, 0, 7.5);
    vertex(2.5, -80, 7.5);
    vertex(2.5, -87.5, 0);
    vertex(2.5, -80, -7.5);
    vertex(2.5, 0, -7.5);
    endShape();
    beginShape();
    vertex(2.5, 0, -7.5);
    vertex(0, 0, -10);
    vertex(0, -80, -10);
    vertex(2.5, -80, -7.5);
    endShape();
    beginShape();
    vertex(0, 0, -10);
    vertex(-2.5, 0, -7.5);
    vertex(-2.5, -80, -7.5);
    vertex(0, -80, -10);
    endShape();
    beginShape();
    vertex(-2.5, 0, 7.5);
    vertex(-2.5, -80, 7.5);
    vertex(-2.5, -87.5, 0);
    vertex(-2.5, -80, -7.5);
    vertex(-2.5, 0, -7.5);
    endShape();
    beginShape();
    vertex(2.5, 0, 7.5);
    vertex(0, 0, 10);
    vertex(0, -80, 10);
    vertex(2.5, -80, 7.5);
    endShape();
    beginShape();
    vertex(0, 0, 10);
    vertex(-2.5, 0, 7.5);
    vertex(-2.5, -80, 7.5);
    vertex(0, -80, 10);
    endShape();
    beginShape();
    vertex(0, -80, 10);
    vertex(2.5, -80, 7.5);
    vertex(2.5, -87.5, 0);
    vertex(0, -90, 0);
    endShape();
    beginShape();
    vertex(0, -90, 0);
    vertex(-2.5, -87.5, 0);
    vertex(-2.5, -80, 7.5);
    vertex(0, -80, 10);
    endShape();
    line(0, -80, 10, 0, -90, 0);
    beginShape();
    vertex(-2.5, -87.5, 0);
    vertex(0, -90, 0);
    vertex(0, -80, -10);
    vertex(-2.5, -80, -7.5);
    endShape();
    beginShape();
    vertex(0, -90, 0);
    vertex(0, -80, -10);
    vertex(2.5, -80, -7.5);
    vertex(2.5, -87.5, 0);
    endShape();
    translate(0, 5, 0);
    box(7.5, 10, 35);
    translate(0, 15, 0);
    cylinder(2.5, 30,);
    translate(0, 15, 0);
    sphere(4)
    pop();

}

function drawSword2() {
    push();
    strokeWeight(1)
    translate(0, -12, 0);
    beginShape();
    vertex(1.5, 0, 3);
    vertex(1.5, -70, 3);
    vertex(1.5, -80, -5.5);
    vertex(1.5, 0, -5.5);
    endShape();
    beginShape();
    vertex(-1.5, 0, 3);
    vertex(-1.5, -70, 3);
    vertex(-1.5, -80, -5.5);
    vertex(-1.5, 0, -5.5);
    endShape();
    beginShape();
    vertex(1.5, 0, -5.5);
    vertex(1.5, -80, -5.5);
    vertex(0, -85.5, -5.5);
    vertex(-1.5, -80, -5.5);
    vertex(-1.5, 0, -5.5);
    endShape();
    beginShape();
    vertex(1.5, 0, 3);
    vertex(1.5, -70, 3);
    vertex(0, -72.5, 5.5);
    vertex(0, 0, 5.5);
    endShape();
    beginShape();
    vertex(-1.5, 0, 3);
    vertex(-1.5, -70, 3);
    vertex(0, -72.5, 5.5);
    vertex(0, 0, 5.5);
    endShape();
    beginShape();
    vertex(1.5, -70, 3);
    vertex(1.5, -80, -5.5);
    vertex(0, -85.5, -5.5);
    vertex(0, -72.5, 5.5);
    endShape();
    beginShape();
    vertex(-1.5, -70, 3);
    vertex(-1.5, -80, -5.5);
    vertex(0, -85.5, -5.5);
    vertex(0, -72.5, 5.5);
    endShape();
    translate(0, 2, 0);
    box(10, 4, 18);
    translate(0, 12, 0);
    box(3, 20, 5);
    pop();
}

function drawBreak(temp) {
    strokeWeight(0);
    for (let a = 0; a < 24; a++) {
        if (a < 12) {
            push();
            translate(0, 20, 0);
            fill(133, 73, 0)
            rotateY(30 * a);
            rotateX(-70);
            translate(0, -temp, 0);
            box(15, 40, 5);
            pop();
        } else {
            push();
            translate(0, 20, 0);
            fill(133, 73, 0)
            rotateY(30 * a + 15);
            rotateX(-60);
            translate(0, -temp / 1.5, 0);
            box(10, 40, 5);
            pop();

        }
    }

}

let percent;

function healthBar(char) {
    push();
    translate(0, -150, 0);
    percent = (charInfo[char].stats.hp / charInfo[char].stats.maxHp) * 100;
    fill(0, 0, 0);
    box(110, 30, 20);
    fill(255, 255, 255);
    if (percent < 1) {
        fill(255, 0, 0);
    }
    translate(0, 0, 0.01);
    box(100, 25, 20);
    fill("green");
    translate((-50.01 + percent / 2), 0, 0.01);
    box(percent, 25.01, 20);
    pop();
}

let horsesVis;

function updateAnims(t, dt) {
    if (charInfo.char1.visible == true) {
        charInfo.char1.currentAnim(t, dt);
    }
    if (charInfo.char2.visible == true) {
        charInfo.char2.currentAnim(t, dt);
    }
    if (charInfo.char3.visible == true) {
        charInfo.char3.currentAnim(t, dt);
    }
    if (horsesVis == true){
        horses.zero.currentAnim(t, dt);
        horses.one.currentAnim(t, dt);
        horses.two.currentAnim(t, dt);
        horses.three.currentAnim(t, dt);
        horses.four.currentAnim(t, dt);
    }
}


function updateText() {
    textScenes[currentScene]();
}

let textScenes = {
    startMenu: function () {
        push();
        resetMatrix();
        fill(255, 255, 255);
        stroke(255);
        textFont(font);
        textSize(36);
        translate(-0, -160, 499)
        box(185, 40, 1)
        translate(-90, 14, 1);
        text("Press Start", 0, 0)
        pop();
    },
    sceneTwo: function () {

    },
    sceneThree: function () {

    },
    sceneFour: function () {
        if (sceneTime >= 1 && sceneTime < 2) {
            push();
            resetMatrix();
            fill(255, 255, 255);
            stroke(255, 234, 0);
            textFont(font);
            textSize(36);
            translate(20, -160, 499)
            box(290, 80, 1)
            translate(-95, -10, 1);
            text("Ultimate:", 0, 0)
            text("Thundering Blade", -50, 40)
            pop();
        }
        if (sceneTime >= 5) {
            push();
            resetMatrix();
            fill(255, 255, 255);
            stroke(0, 0, 255);
            textFont(font);
            textSize(36);
            translate(-0, -160, 499)
            box(185, 40, 1)
            translate(-85, 14, 1);
            text("Blue Wins!", 0, 0)
            pop();
        }

    },
    horse1: function () {
        push();
        resetMatrix();
        fill(255, 255, 255);
        stroke(255);
        textFont(font);
        textSize(30);
        translate(0, 0, 5)
        translate(-0, 0, 0);
        text("Selected Horse: " + horses[chosenHorse].name, -300, -300)
        text("$" + money, 600, -300)
        text(bet, -710,75)
        pop();
    },
    horse2: function () {
        push();
        resetMatrix();
        fill(255, 255, 255);
        stroke(255);
        textFont(font);
        textSize(30);
        translate(0, 0, 5)
        translate(-0, 0, 0);
        text("Selected Horse: " + horses[chosenHorse].name, -300, -300)
        text("$" + money, 600, -300)
        text(bet, -710,75)
        pop();
    },
    horse3: function () {
        push();
        resetMatrix();
        fill(255, 255, 255);
        stroke(255);
        textFont(font);
        textSize(30);
        translate(0, 0, 5)
        translate(-0, 0, 0);
        text("Winning Horse: " + horses[temp[0]].name, -300, -300)
        text("$" + money, 600, -300)
        text(bet, -710,75)
        text("Rankings:", 600,-200)
        text(horses[temp[0]].name,510,-150)
        text(horses[temp[1]].name,510,-100)
        text(horses[temp[2]].name,510,-50)
        text(horses[temp[3]].name,510,0)
        text(horses[temp[4]].name,510,50)
        pop();
    }
}

//Called every frame
export function draw(t, dt) {
    background(30, 30, 30); //Clear the background to dark grey 
    //orbitControl(); //Enable mouse movement in the scene
    ambientLight(80, 80, 80);  //Add some ambient light to the scene

    directionalLight(255, 255, 255, 1, 1, -1); //Add a white directional light

    //drawGrid(); //Draw the grid
    //drawAxes(); //Draw the axes

    stroke(0);  //Make the stroke black
    strokeWeight(1); //Make it thin

    scenes[currentScene](t, dt);

    updateAnims(t, dt);

    updateText();
}