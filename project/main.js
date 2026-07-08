import { drawGrid } from "@/utils/grid.js";
import { drawAxes } from '@/utils/axes.js';
import { vector } from "@/utils/vec3.js";

//We can use this to load textures or sounds
export function preload() {

}

//Called once when program loads
export function setup() {
    camera(0, -200, 700);
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
                drawChar1(45, -40, 45, -40,(-15 + charInfo.char1.animTime * 50),0,0);
            } if (charInfo.char1.animTime >= 1 && charInfo.char1.animTime <= 1.75) {
                translate(0, 0, (charInfo.char1.animTime - 1) * 100);
                drawChar1(45, -40, 45, -40,(30 - (charInfo.char1.animTime - 1) * 150),0,0);
            }
            if (charInfo.char1.animTime > 1.75 && charInfo.char1.animTime < 3.25) {
                translate(0, 0, 75 - (charInfo.char1.animTime - 1.75) * 50)
                drawChar1(0,0,0,0,(-30 + (charInfo.char1.animTime - 1.75) * 20),0,0);
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
            if (charInfo.char1.animTime < 2.2) {
                translate(0, 0, charInfo.char1.animTime * -75);
            } else {
                translate(0, 0, -165);
            }
            if (charInfo.char1.animTime < 0.5) {
                drawChar1((charInfo.char1.animTime * 160), 0, 0, 0, charInfo.char1.animTime * 90, -10, -10, -10);
                // translate(-35 + (charInfo.char1.animTime * -40), -40 + (charInfo.char1.animTime * -78), (charInfo.char1.animTime * 90));
                // rotateZ(180 * charInfo.char1.animTime);
                // rotateY(180 * charInfo.char1.animTime);
                // drawSword();
                rotate();
            } else {
                drawChar1(80)
                translate(-40, -78, 45);
                rotateZ(90);
                rotateY(90);
                drawSword();
            }
            pop();
        },
        //special0: function(t, dt) {
        //
        //},
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
            translate(30, -40, 30);
            rotateY(180);
            rotateX(-110);
            drawSword2();
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
                drawChar2(110, -15, 0, 0);
                translate(-30, -100, 50);
                rotateZ(140);
                rotateX((charInfo.char2.animTime) * -90);
            }
            if (charInfo.char2.animTime > 1 && charInfo.char2.animTime <= 1.2) {
                translate(0, 0, 75);
                drawChar2(110, -15, 0, 0);
                translate(-30, -100, 50);
                rotateZ(140);
                rotateX(-90);
            }
            if (charInfo.char2.animTime > 1.2 && charInfo.char2.animTime <= 2.2) {
                translate(0, 0, (charInfo.char2.animTime - 0.2) * 75);
                drawChar2(110 - (charInfo.char2.animTime - 1.2) * 40, -15 - (charInfo.char2.animTime - 1.2) * 25, 0, 0);
                translate(-30, -100, 50);
                rotateZ(140);
                translate(0, -(charInfo.char2.animTime - 1.2) * 50, -10 * (charInfo.char2.animTime - 1.2))
                rotateX(-90);
                rotateY(180);
                rotateX((charInfo.char2.animTime - 1.2) * -90);
            }
            if (charInfo.char2.animTime > 2.2) {
                translate(0, 0, 150);
                drawChar2(70, -40, 0, 0);
                translate(-30, -100, 40);
                rotateZ(140);
                translate(0, -50, 0);
                rotateY(180);
            }
            drawSword2();
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
            if (charInfo.char2.animTime >= 1.75) [
                translate(0, 0, -112.5 + ((charInfo.char2.animTime - 1.75) * 75))
            ]
            drawChar2(110, -15, 0, 0);
            translate(-30, -100, 50);
            rotateZ(140);
            drawSword2();

            pop();
        },
        //ko: function (t, dt) {
        //
        //},
    },
    // char3: {
    //     idle: function (t, dt) {

    //     },
    //     attack: function (t, dt) {

    //     },
    //     defend: function (t, dt) {

    //     },
    // },
}

let currentScene = "startMenu";

let sceneTime = 0;

let scenes = {
    startMenu: function (t, dt) {
        sceneTime += dt;
        charInfo.char1.currentAnim = anims.char1.idle;
        charInfo.char2.currentAnim = anims.char2.idle;
        charInfo.char1.posX = -90;
        charInfo.char2.posX = 90;
        charInfo.char1.wpnState = "sheathed"
        charInfo.char2.wpnState = "sheathed"

        if (sceneTime > 3) {
            resetAnims()
            sceneTime = 0;
            currentScene = "sceneTwo";
        }
    },
    sceneTwo: function (t, dt) {
        sceneTime += dt
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
        charInfo.char1.currentAnim = anims.char1.defend;
        charInfo.char2.currentAnim = anims.char2.attack;
        charInfo.char1.posX = -90;
        charInfo.char1.rotY = 90;
        charInfo.char2.posX = 90;
        charInfo.char2.rotY = -90;
        charInfo.char1.wpnState = "held"
        charInfo.char2.wpnState = "held"
    }
}

function drawChar1(armRX, armRZ, armLX, armLZ, wpnD, wpnX, wpnY, wpnZ) {
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
    if (wpnD == undefined) {
        wpnD = 0
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
    if (charInfo.char1.wpnState == "held"){
        translate(0,25,0);
        rotate(wpnD, [wpnX,wpnY, wpnZ]);
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
    if (charInfo.char1.wpnState == "sheathed"){
        translate(-15, -100, -30);
        rotateY(90);
        rotateX(210);
        wpnInfo[charInfo.char1.currentWpn].draw();
    }
    pop();
}

function drawChar2(armRX, armRZ, armLX, armLZ) {
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