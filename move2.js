var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#C8C3BE',
    width: window.innerWidth,
    height: window.innerHeight,
    mode: Phaser.Scale.NONE,
    pixelArt: true,
    // resolution: 3,
    antialias: false,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};

var cursors;

var vanishingPoint = { x:config.width / 2, y:config.height / 5 }
var vanishingDistance = 250;

var game = new Phaser.Game(config);
var camera = { x:100, y:200 };
var sprites = new Array();

var block1;
var block2;
var player;

function preload () {
    this.load.image('block', 'assets/block.png');
    this.load.image('bg1', 'assets/bg1.png');
    this.load.image('player1', 'assets/player1.png');
    this.load.image('grass1', 'assets/grass1.png');
    this.load.image('tree1', 'assets/tree1.png');
    this.load.image('lamp1', 'assets/lamp1.png');
    this.load.image('pond1', 'assets/pond1.png');
    this.load.image('box1', 'assets/box1.png');
    this.load.image('tent1', 'assets/tent1.png');
    this.load.image('tent2', 'assets/tent2.png');
    this.load.image('container3', 'assets/container3.png');
    this.load.image('wall1', 'assets/wall1.png');
}

function create () {
    cursors = this.input.keyboard.createCursorKeys();

    lineRectangle = this.add.graphics({ x:0, y:0});
    lineRectangle.lineStyle(1, 0x0000FF, 1.0);
    lineRectangle.fillStyle(0x0000FF, 1.0);
    lineRectangle.strokeRect(100, 100, -100, -100);

    var bg = this.add.image(0, 75, 'bg1');
    bg.displayWidth = config.width * 2;
    bg.displayHeight = vanishingPoint.y;
    
    sprites.push(new Sprite(this.add.image(-150, 275, 'lamp1')));
    sprites.push(new Sprite(this.add.image(200, 325, 'pond1')));
    sprites.push(new Sprite(this.add.image(350, 450, 'tent1')));
    sprites.push(new Sprite(this.add.image(450, 435, 'box1')));
    sprites.push(new Sprite(this.add.image(435, 465, 'box1')));
    sprites.push(new Sprite(this.add.image(150, 150, 'container3')));
    sprites.push(new Sprite(this.add.image(220, 175, 'tent2')));
    sprites.push(new Sprite(this.add.image(400, 300, 'container3')));
    sprites.push(new Sprite(this.add.image(-300, 450, 'wall1')));
    sprites.push(new Sprite(this.add.image(-100, 50, 'grass1')));
    sprites.push(new Sprite(this.add.image(-120, 70, 'tree1')));
    sprites.push(new Sprite(this.add.image(-300, 450, 'tree1')));
    sprites.push(new Sprite(this.add.image(-200, 250, 'grass1')));
    sprites.push(new Sprite(this.add.image(100, 450, 'grass1')));
    sprites.push(new Sprite(this.add.image(camera.x, camera.y, 'box1')));

    camera.x -= config.width / 2;
    camera.y -= config.height / 2;
    console.log(camera);

    player = new Sprite(this.add.image(0, 0, 'player1'));

    block1 = new Sprite(this.add.image(0, 0, 'block'));
    block1.setScale(.01);
    block2 = new Sprite(this.add.image(0, 0, 'block'));
    block2.setScale(.01);

    updateScene();
}

function update() {
    var updated = false;
    if (cursors.left.isDown)
    {
        camera.x -= 2;
        updated = true;
    }
    else if (cursors.right.isDown)
    {
        camera.x += 2;
        updated = true;
    }

    if (cursors.up.isDown)
    {
        camera.y -= 2;
        updated = true;
    }
    else if (cursors.down.isDown)
    {
        camera.y += 2;
        updated = true;
    }

    if (updated) {
        updateScene();
    }
}

function updateScene() {
    updateHorizonLine(camera);
    for (i = 0; i < sprites.length; i++) {
        updateSprite(sprites[i]);
    }
}

function updateHorizonLine(camera) {
    var horizon = horizonLine(camera);
    block1.position = { x:horizon.x, y:horizon.y };
    block1.setPosition(camera);
    block2.position = { x:horizon.x, y:horizon.y + vanishingDistance };
    block2.setPosition(camera);

    player.position = block2.position;
    player.position.y += 50;
    player.setPosition(camera);
}

function horizonLine(camera) {
    var x = camera.x + vanishingPoint.x;
    var y = camera.y + vanishingPoint.y;

    return { x:x, y:y };
}

function updateSprite(sprite) {
    var horizon = horizonLine(camera);
    var distance = horizon.y - sprite.position.y + vanishingDistance;
    if (distance >= this.vanishingDistance) {
        sprite.setScale(0);
    } else if (distance <= 0) {
        sprite.setScale(1);
    } else {
        sprite.setScale(1 - (distance / this.vanishingDistance));
    }

    sprite.setPosition(camera);
}

class Sprite {
    constructor(image) {
        this.image = image;
        this.image.setOrigin(0,1);
        this.position = { x:image.x, y:image.y }
    }

    setScale(scale) {
        this.image.setScale(scale * 4);
    }

    setPosition(camera) {
        var scale = this.image.scale / 4;
        
        var offsetX = 0;
        if (scale < 1) {
            offsetX = (camera.x + config.width / 2) - this.position.x;
        }
        
        var perspectiveX = offsetX * scale - offsetX;
        this.image.x = this.position.x - camera.x - (perspectiveX * .6);
        this.image.y = this.position.y - camera.y;
    }
}
