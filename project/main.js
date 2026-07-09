import { drawGrid } from "@/utils/grid.js";
import { drawAxes } from '@/utils/axes.js';
import { vector } from "@/utils/vec3.js";

//We can use this to load textures or sounds
export function preload() {

}

//Called once when program loads
export function setup() {
    camera(0, -200, 700);

    document.getElementById("start").addEventListener('click', startButtonClicked);
    document.getElementById("swap").addEventListener('click', swapButtonClicked);
    document.getElementById("reset").addEventListener('click', resetButtonClicked);
    document.getElementById("1").addEventListener('click', oneButtonClicked);
    document.getElementById("2").addEventListener('click', twoButtonClicked);
    document.getElementById("3").addEventListener('click', threeButtonClicked);
    document.getElementById("4").addEventListener('click', fourButtonClicked);
    document.getElementById("5").addEventListener('click', fiveButtonClicked);
}

function startButtonClicked(){
    console.log("Start!");
    sceneTime = 0
    resetAnims();
    if (currentScene == "startMenu") {
        currentScene = "sceneTwo"
    }
    if (currentScene == "horse1") {
        if (chosenHorse != undefined){
        currentScene = "horse2"
        } else {
            console.log("choose a horse")
        }
    }

}

function swapButtonClicked(){
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

function resetButtonClicked(){
    resetAnims();
    charInfo.char1.stats.hp = 100
    charInfo.char2.stats.hp = 100
    currentScene = "startMenu"
}

let chosenHorse;

function oneButtonClicked() {
    if (currentScene == "horse1") {
        chosenHorse = 1
    }
}

function twoButtonClicked() {
    if (currentScene == "horse1") {
        chosenHorse = 2
    }
}

function threeButtonClicked() {
    if (currentScene == "horse1") {
        chosenHorse = 3
    }
}

function fourButtonClicked() {
    if (currentScene == "horse1") {
        chosenHorse =4
    }
}

function fiveButtonClicked() {
    if (currentScene == "horse1") {
        chosenHorse = 5
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
            } if (charInfo.char1.animTime >= 1 && charInfo.char1.animTime <= 1.75) {
                translate(0, 0, (charInfo.char1.animTime - 1) * 100);
                drawChar1(45, -40, 45, -40, (30 - (charInfo.char1.animTime - 1) * 150), 0, 0);
            }
            if (charInfo.char1.animTime > 1.75 && charInfo.char1.animTime < 3.25) {
                translate(0, 0, 75 - (charInfo.char1.animTime - 1.75) * 50)
                drawChar1(0, 0, 0, 0, (-30 + (charInfo.char1.animTime - 1.75) * 20), 0, 0);
            }
            if (charInfo.char1.animTime >= 3.25) {
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
        special: function(t, dt) {
            charInfo.char1.animTime += dt;
            push();
            translate(charInfo.char1.posX, charInfo.char1.posY, charInfo.char1.posZ);
            healthBar("char1");
            rotateY(charInfo.char1.rotY);
            translate(0,0,-120);
            if (charInfo.char1.animTime < 1){
                drawChar1(80 + (charInfo.char1.animTime * 100), 0, 80 + (charInfo.char1.animTime * -80), 0, 0, 90 + (charInfo.char1.animTime * -90), 0, -90 + (charInfo.char1.animTime * 90), 0, 15 + (charInfo.char1.animTime * -15))
            } 
            if (charInfo.char1.animTime >= 1 && charInfo.char1.animTime < 2) {
                drawChar1(180 + ((charInfo.char1.animTime - 1) * -150),((charInfo.char1.animTime -1) * -15),0,0,((charInfo.char1.animTime - 1) * -45),0,0,0,0,0)
            }
            if (charInfo.char1.animTime >= 2 && charInfo.char2.animTime < 3){
                drawChar1(30,-15,0,0,-45);
                push();
                translate(-30,0,220);
                drawBreak((charInfo.char1.animTime - 2) * 600);
                pop();
            }
            if (charInfo.char1.animTime >= 3) {
                drawChar1(30,-15,0,0,-45);
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
            //drawSword2();
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
            drawChar2(180);
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
    horse: {
        first: function(horse) {

        },
        second: function(horse) {

        },
        third: function(horse) {

        },
        fourth: function(horse) {

        },
        fifth: function(horse) {

        },
    }
}

let horses= {
    horse1: {
        color: [253, 255, 125],
        currentAnim: "e",
        name: "Johnathan"
    },
    horse2: {
        color: [125, 255, 136],
        currentAnim: "d",
        name: "Winning Ticket"
    },
    horse3: {
        color: [140, 245, 255],
        currentAnim: "c",
        name: "Harry Potter"
    },
    horse4: {
        color: [198, 140, 255],
        currentAnim: "b",
        name: "Owesn Edgecombarlow"
    },
    horse5: {
        color: [255, 143, 233],
        currentAnim: "a",
        name: "Bullshit With Fur"
    },
}

let currentScene = "startMenu";

let sceneTime = 0;

let scenes = {
    startMenu: function (t, dt) {
        sceneTime += dt;
        drawGround();
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
        sceneTime += dt
        drawGround();
        charInfo.char1.currentAnim = anims.char1.special;
        charInfo.char2.currentAnim = anims.char2.ko;
        charInfo.char1.posX = -90;
        charInfo.char1.rotY = 90;
        charInfo.char2.posX = 90;
        charInfo.char2.rotY = -90;
        if (sceneTime > 1){
            charInfo.char1.wpnState = "super";
        } else {
            charInfo.char1.wpnState = "held"
        }
        charInfo.char2.wpnState = "held";
    },
    horse1: function (t, dt) {
        sceneTime += dt
        charInfo.char1.visible = false
        charInfo.char2.visible = false
        drawCourse();
    },
    horse2: function (t, dt) {
        sceneTime += dt
        //ill get to this later
    }
}

function drawGround() {
    push();
    fill("green");
    box(500,1,500)
    translate(0,13,0);
    fill(133, 73, 0)
    box(500,25,500)
    pop();
}

function drawCourse() {
    push();
    strokeWeight(3);
    line(-250,0,250,250,0,250)
    line(-250,-50,250,250,-50,250)
    line(-250,-100,250,250,-100,250)
    line(-250,-150,250,250,-150,250)
    line(-250,-200,250,250,-200,250)
    line(-250,-250,250,250,-250,250)
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
        scale(1,2,1);
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
    for (let a = 0; a < 24; a++){
        if (a < 12){
            push();
            translate(0,20,0);
            fill(133, 73, 0)
            rotateY(30 * a);
            rotateX(-70);
            translate(0,-temp,0);
            box(15,40,5);
            pop();
        } else {
            push();
            translate(0,20,0);
            fill(133, 73, 0)
            rotateY(30 * a + 15);
            rotateX(-60);
            translate(0,-temp/1.5,0);
            box(10,40,5);
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
    translate(0, 0, 0.01);
    box(100, 25, 20);
    fill("green");
    translate((-50.01 + percent / 2), 0, 0.01);
    box(percent, 25.01, 20);
    pop();
}

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
}

// let currentText;

// function updateText() {
//     //Like add the text man..........
//     if (currentText != undefined && currentText != "none") {
//         textFont();
//         textSize();
//         text(currentText)
//     }
// }

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

    //updateText();

}