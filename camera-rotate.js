var config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var r = 0;
var cursors;
var camera;
var text;
// var sprite3D;
var middle;
var axis;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.scenePlugin('Camera3DPlugin', 'camera3d.min.js', 'Camera3DPlugin', 'cameras3d');

    this.load.image('block', 'assets/tent1.png');
    this.load.image('ball', 'assets/player1.png');
}

function create ()
{
    camera = this.cameras3d.add(80, 800, 600).setPosition(0, 0, 25);
    camera.create(0, 0, 0, 'ball');

    middle = new Phaser.Math.Vector3(0, 0, 0);
    axis = new Phaser.Math.Vector3(1, 0, 0);

    cursors = this.input.keyboard.createCursorKeys();

    text = this.add.text(10, 10, '', { font: '16px Courier', fill: '#00ff00' });
}

var radians = 0;
function update ()
{
    radians += 0.01
    if (cursors.left.isDown)
    {
        camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        camera.x += 4;
    }

    if (cursors.up.isDown)
    {
        if (cursors.shift.isDown)
        {
            camera.y -= 4;
        }
        else
        {
            camera.z -= 4;
        }
    }
    else if (cursors.down.isDown)
    {
        if (cursors.shift.isDown)
        {
            camera.y += 4;
        }
        else
        {
            camera.z += 4;
        }
    }

    camera.rotateAround(middle, radians, axis);

    text.setText([
        'camera.x: ' + camera.x,
        'camera.y: ' + camera.y,
        'camera.z: ' + camera.z
    ]);
}