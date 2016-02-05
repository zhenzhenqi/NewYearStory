var p5_game = new p5(function (sketch) {
    var girl;
    var bg;

    //the scene is 4 times the width of the canvas
    var SCENE_W = window.innerWidth * 4;
    var SCENE_H = 600;
    var vel = 5;

    //            sketch.preload = function () {         
    //            }

    sketch.setup = function () {
        bg = new Group();
        for (var i = 0; i < 80; i++) {
            //create a sprite and add the 3 animations
            var rock = sketch.createSprite(sketch.random(0, SCENE_W), sketch.random(-SCENE_H, SCENE_H));
            //cycles through rocks 0 1 2
            rock.addImage(sketch.loadImage('assets/rocks' + i % 3 + '.png'));
            rock.depth = 0;
            bg.add(rock);
        }
        beijing = sketch.createSprite(1000, 450, 622, 363);
        beijing.addImage(sketch.loadImage('assets/beijing.png'));

        xian = sketch.createSprite(4000, 50, 1147, 393);
        xian.addImage(sketch.loadImage('assets/xian.png'));

        //create a sprite and add the 3 animations.
        girl = sketch.createSprite(50, 250, 50, 100); //xloc, yloc, width, height
        girl.addAnimation('stand', 'assets/stand.png');
        girl.addAnimation('walk', 'assets/walk1.png', 'assets/walk2.png');
        girl.addAnimation('front', 'assets/front1.png', 'assets/front2.png');
        girl.addAnimation('back', 'assets/back1.png', 'assets/back2.png');
        //create a canvas
        var game = sketch.createCanvas(window.innerWidth, 400);
        game.parent('p5Container');

    }

    sketch.draw = function () {
        sketch.camera.zoom = .5;

        //background color 
        sketch.background(240, 240, 240);

        //girl's shadow
        sketch.noStroke();
        sketch.fill(0, 0, 0, 20);
        sketch.ellipse(girl.position.x, girl.position.y + 105, 100, 30);

        //let the camera follow the girl 
        sketch.camera.position.x = girl.position.x;
        sketch.camera.position.y = girl.position.y;

        //animate the girl
        if (sketch.keyIsDown(sketch.LEFT_ARROW)) {
            girl.changeAnimation('walk');
            girl.mirrorX(-1);
            girl.velocity.x = -vel;
            girl.velocity.y = 0;
        } else if (sketch.keyIsDown(sketch.RIGHT_ARROW)) {
            girl.changeAnimation('walk');
            girl.mirrorX(1);
            girl.velocity.x = vel;
            girl.velocity.y = 0;
        } else if (sketch.keyIsDown(sketch.UP_ARROW)) {
            girl.changeAnimation('back');
            girl.velocity.y = -vel;
            girl.velocity.x = 0;
        } else if (sketch.keyIsDown(sketch.DOWN_ARROW)) {
            girl.changeAnimation('front');
            girl.velocity.y = vel;
            girl.velocity.x = 0;
        } else {
            girl.changeAnimation('stand');
            girl.velocity.x = 0;
            girl.velocity.y = 0;
        }

        //limit the girl movements
        if (girl.position.x < 0)
            girl.position.x = 0;
        if (girl.position.y < 0)
            girl.position.y = 0;
        if (girl.position.x > SCENE_W)
            girl.position.x = SCENE_W;
        if (girl.position.y > SCENE_H)
            girl.position.y = SCENE_H;

        sketch.drawSprites();

        if (girl.overlap(beijing)) {
            document.getElementById('beijing').style.visibility = 'visible';
        } else {
            document.getElementById('beijing').style.visibility = 'hidden';
        }

        if (girl.overlap(xian)) {
            document.getElementById('xian').style.visibility = 'visible';
        } else {
            document.getElementById('xian').style.visibility = 'hidden';
        }
    }

    sketch.keyPressed = function () {
        if (sketch.keyCode === sketch.ENTER) {
            console.log('enter!');
            document.getElementById('p5Container').style.display = 'none';
            document.getElementById('sceneContainer').style.visibility = 'block';
        }
    }
});

//var p5_scene = new p5(function (sketch) {
//                    sketch.setup = function () {
//                        var scene = createCanvas(window.innerWidth, 400);
//                        scene.parent('sceneContainer');
//
//                        sketch.draw = function () {
//                            background(0, 255, 0);
//                            fill(255, 0, 0);
//                            ellipse(width / 2, height / 2, 500, 500);
//                        }
//                    }
//});