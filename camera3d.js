var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#C8C3BE',
    width: 800, //window.innerWidth,
    height: 600, //window.innerHeight,
    mode: Phaser.Scale.NONE,
    pixelArt: true,
    antialias: false,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};

var cursors;

var game = new Phaser.Game(config);
var sprites = new Array();
var camera;
var player;

function preload () {
    this.load.scenePlugin('Camera3DPlugin', 'camera3d.min.js', 'Camera3DPlugin', 'cameras3d');

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

var transform = new Phaser.Math.Matrix4().rotateX(-0.1).rotateY(-0.2).rotateZ(0.1)

function create () {
    cursors = this.input.keyboard.createCursorKeys();

    camera = this.cameras3d.add(85).setPosition(0,0,200);

    var sprite = camera.create(0,0,0, 'lamp1');

    // sprites.push(camera.createRect({ x:0, y:0, z:175}, 'lamp1'));
    // sprites.push(camera.createRect(-150, 0, 275, 'lamp1'));
    // sprites.push(new Sprite(this.add.image(200, 325, 'pond1')));
    // sprites.push(new Sprite(this.add.image(350, 450, 'tent1')));
    // sprites.push(new Sprite(this.add.image(450, 435, 'box1')));
    // sprites.push(new Sprite(this.add.image(435, 465, 'box1')));
    // sprites.push(new Sprite(this.add.image(150, 150, 'container3')));
    // sprites.push(new Sprite(this.add.image(220, 175, 'tent2')));
    // sprites.push(new Sprite(this.add.image(400, 300, 'container3')));
    // sprites.push(new Sprite(this.add.image(-300, 450, 'wall1')));
    // sprites.push(new Sprite(this.add.image(-100, 50, 'grass1')));
    // sprites.push(new Sprite(this.add.image(-120, 70, 'tree1')));
    // sprites.push(new Sprite(this.add.image(-300, 450, 'tree1')));
    // sprites.push(new Sprite(this.add.image(-200, 250, 'grass1')));
    // sprites.push(new Sprite(this.add.image(100, 450, 'grass1')));

    player = this.add.image(config.width/2, config.height/3 * 2, 'player1');

    updateScene();
}

function update() {
    var updated = false;
    if (cursors.left.isDown)
    {
        camera.x -= 1;
        updated = true;
    }
    else if (cursors.right.isDown)
    {
        camera.x += 1;
        updated = true;
    }

    if (cursors.up.isDown)
    {
        camera.z -= 1;
        updated = true;
    }
    else if (cursors.down.isDown)
    {
        camera.z += 1;
        updated = true;
    }

    if (updated) {
        updateScene();
    }
}

function updateScene() {
    camera.transformChildren(transform)
}
