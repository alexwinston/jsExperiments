var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var camera;
var transform;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.scenePlugin('Camera3DPlugin', 'camera3d.min.js', 'Camera3DPlugin', 'cameras3d');

    this.load.image('particle', 'assets/lamp1.png');
}

function create ()
{
    camera = this.cameras3d.add(85).setZ(300).setPixelScale(128);

    var sprites = camera.createRect({ x: 4, y: 4, z: 16 }, { x: 48, y: 48, z: 32 }, 'particle');

    //  Our rotation matrix
    transform = new Phaser.Math.Matrix4().rotateX(-0.01).rotateY(-0.02).rotateZ(0.01);
}

function update ()
{
    camera.transformChildren(transform);
}