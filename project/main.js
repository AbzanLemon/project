import { drawGrid } from "@/utils/grid.js";
import { drawAxes } from '@/utils/axes.js';
import { vector } from "@/utils/vec3.js";

//We can use this to load textures or sounds
export function preload() {

}

//Called once when program loads
export function setup() {
    camera(300, -200, 700);
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
        atkStart: function () {
            this.animTime = 0
            this.currentAnim = anims.char1.attack
        },
        atkEnd: function () {
            this.animTime = 0
            this.currentAnim = anims.char1.idle
        },
        defStart: function () {
            this.animTime = 0
            this.currentanim = anims.char1.defend
        },
        defEnd: function () {
            this.animTime = 0
            this.currentanim = anims.char1.idle
        }
    },
    char2: {
        stats: {
            maxHp: 100,
            hp: 100
        },
        currentAnim: undefined,
        animTime: 0,
        visible: false,

    },
    char3: {
        stats: {
            maxHp: 100,
            hp: 100,
        },
        visible: false
    }
}

let scaleVar;

let anims = {
    char1: {
        idle: function (t, dt) {
            charInfo.char1.animTime += dt;
            push();
            healthBar("char1");
            scaleVar = 1 + Math.sin(charInfo.char1.animTime) / 100;
            //scale(scaleVar, scaleVar, scaleVar);
            drawChar1();
            translate(-15,-100,-30);
            rotateY(90);
            rotateX(210);
            drawSword();
            pop();
        },
        attack: function (t, dt) {
            charInfo.char1.animTime += dt;
            push();
            translate(0, 0, charInfo.char1.animTime * 10);
            healthBar("char1");
            drawChar1();
            translate(-35,-40,0);
            if (charInfo.char1.animTime < 1){
                rotateX(-60 + charInfo.char1.animTime * 50);
                drawSword();
            } if (charInfo.char1.animTime >= 1 && charInfo.char1.animTime <= 1.75){
                rotateX(-10 - (charInfo.char1.animTime - 1) * 150);
                drawSword();
            } 
            if (charInfo.char1.animTime > 1.75 && charInfo.char1.animTime <2) {
                rotateX(-122.5);
                drawSword();
            }
            if (charInfo.char1.animTime >= 2){
                charInfo.char1.animTime = 0;
                currentScene = "sceneThree";
            }
            pop();
        },
        defend: function (t, dt) {
            charInfo.char1.animTime += dt;
            push();
            translate(charInfo.char1.animTime, 0, 0);
            pop();
        }
    },
}

let currentScene = "startMenu";

let scenes = {
    startMenu: function (t, dt) {
        charInfo.char1.currentAnim = anims.char1.idle;
        if (t > 5) {
            charInfo.char1.animTime = 0
            currentScene = "screenTwo";
        }
    },
    screenTwo: function (t, dt) {
        charInfo.char1.currentAnim = anims.char1.attack;
    },
    sceneThree: function (t, dt) {
        charInfo.char1.currentAnim = anims.char1.idle;
    }
}

function drawChar1() {
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
    translate(30, -10, 0);
    rotateZ(-15);
    fill(115, 227, 250);
    cylinder(6, 50)
    pop();
    push();
    translate(-30, -10, 0);
    rotateZ(15);
    fill(115, 227, 250);
    cylinder(6, 50);
    pop();
    push();
    fill(115, 227, 250);
    translate(12, 40, 0);
    cylinder(10, 20);
    translate(-24, 0, 0);
    cylinder(10, 20);
    pop();
    pop();
}

function drawChar2() {
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
    translate(30, -10, 0);
    rotateZ(-15);
    fill(115, 0, 0);
    cylinder(6, 50)
    pop();
    push();
    translate(-30, -10, 0);
    rotateZ(15);
    fill(115, 0, 0);
    cylinder(6, 50);
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

//Called every frame
export function draw(t, dt) {
    background(30, 30, 30); //Clear the background to dark grey 
    orbitControl(); //Enable mouse movement in the scene
    ambientLight(80, 80, 80);  //Add some ambient light to the scene

    directionalLight(255, 255, 255, 1, 1, -1); //Add a white directional light

    drawGrid(); //Draw the grid
    //drawAxes(); //Draw the axes

    stroke(0);  //Make the stroke black
    strokeWeight(1); //Make it thin

    scenes[currentScene](t, dt);

    updateAnims(t, dt);

}