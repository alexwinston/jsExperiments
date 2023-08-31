var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#C8C3BE',
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    mode: Phaser.Scale.NONE,
    pixelArt: true,
    resolution: 3,
    antialias: false,
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};

var cursors;
var player = new Array();
var camera = { x:200, y:200 };
var vanishingDistance = 100;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('block', 'assets/block.png');
    this.load.image('lamp1', 'assets/lamp1.png');
    this.load.image('pond1', 'assets/pond1.png');
    this.load.image('box1', 'assets/box1.png');
    this.load.image('tent1', 'assets/tent1.png');
    this.load.image('container3', 'assets/container3.png');
}

function create ()
{
    cursors = this.input.keyboard.createCursorKeys();

    player.push(new Block(this.add.image(-150, 275, 'lamp1')));
    player.push(new Block(this.add.image(200, 325, 'pond1')));
    player.push(new Block(this.add.image(350, 450, 'tent1')));
    player.push(new Block(this.add.image(450, 435, 'box1')));
    player.push(new Block(this.add.image(435, 465, 'box1')));
    player.push(new Block(this.add.image(150, 150, 'container3')));
    player.push(new Block(this.add.image(400, 300, 'container3')));
    player.push(new Block(this.add.image(100, 100, 'block')));

    for (i = 0; i < player.length; i++) {
        updatePlayer(player[i]);
    }
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
        for (i = 0; i < player.length; i++) {
            updatePlayer(player[i]);
        }
    }
}

function updatePlayer(player) {
    var distance = camera.y - player.position.y;
    if (distance >= this.vanishingDistance) {
        player.setScale(0);
    } else if (distance <= 0) {
        player.setScale(1);
    } else {
        player.setScale(1 - (distance / this.vanishingDistance));
    }

    player.setPosition(camera);
}

class Block {
    constructor(image) {
        this.image = image;
        this.position = { x:image.x, y:image.y }
    }

    setScale(scale) {
        this.image.setScale(scale * 3);
    }

    setPosition(camera) {
        this.image.x = this.position.x - camera.x + 300;
        this.image.y = this.position.y - camera.y + 200;
    }
}
