var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    backgroundColor: '#C8C3BE',
    width: window.innerWidth,
    height: window.innerHeight,
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
var keys;

var game = new Phaser.Game(config);
var sprites = new Array();
var camera;
var player;

function preload () {
    this.load.image('block', 'assets/block.png');
    this.load.image('bg1', 'assets/bg1.png');
    this.load.image('player1', 'assets/player1.png');
    this.load.image('player2', 'assets/player2.png');
    this.load.image('grass1', 'assets/grass1.png');
    this.load.image('grass2', 'assets/grass2.png');
    this.load.image('tree1', 'assets/tree1.png');
    this.load.image('lamp1', 'assets/lamp1.png');
    this.load.image('pond1', 'assets/pond1.png');
    this.load.image('pond2', 'assets/pond2.png');
    this.load.image('box1', 'assets/box1.png');
    this.load.image('tent1', 'assets/tent3.png');
    this.load.image('tent2', 'assets/tent2.png');
    this.load.image('container3', 'assets/container3.png');
    this.load.image('container4', 'assets/container4.png');
    this.load.image('wall1', 'assets/wall1.png');
    this.load.image('tower1', 'assets/tower1.png');
    this.load.image('rubble1', 'assets/rubble1.png');
}

function create () {
    cursors = this.input.keyboard.createCursorKeys();
    keys = {
        a: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
        d: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
    }

    camera = new Camera(config.width, config.height);
    camera.position.set(0, -100, 155);

    var bg = this.add.image(0, (config.height / 10), 'bg1');
    bg.displayWidth = config.width * 2;
    bg.displayHeight = (config.height / 5) * 2;
    console.log(bg.displayHeight);
    bg.setDepth(-1000);

    sprites.push(new Sprite(this.add.image(-10, 275, 'tower1')));
    sprites.push(new Sprite(this.add.image(-150, 275, 'lamp1')));
    sprites.push(new Sprite(this.add.image(200, 325, 'pond1')));
    sprites.push(new Sprite(this.add.image(100, 125, 'pond2')));
    sprites.push(new Sprite(this.add.image(350, 450, 'tent1')));
    sprites.push(new Sprite(this.add.image(376, 445, 'box1')));
    sprites.push(new Sprite(this.add.image(370, 450, 'box1')));
    sprites.push(new Sprite(this.add.image(10, 10, 'container4')));
    sprites.push(new Sprite(this.add.image(150, 150, 'container3')));
    sprites.push(new Sprite(this.add.image(220, 175, 'tent2')));
    sprites.push(new Sprite(this.add.image(400, 300, 'container3')));
    sprites.push(new Sprite(this.add.image(-300, 450, 'wall1')));
    sprites.push(new Sprite(this.add.image(-100, 50, 'grass1')));
    sprites.push(new Sprite(this.add.image(-120, 70, 'tree1')));
    sprites.push(new Sprite(this.add.image(-300, 450, 'tree1')));
    sprites.push(new Sprite(this.add.image(-200, 250, 'grass1')));
    sprites.push(new Sprite(this.add.image(100, 450, 'grass1')));
    sprites.push(new Sprite(this.add.image(-125, 450, 'rubble1')));
    sprites.push(new Sprite(this.add.image(50, 350, 'rubble1')));
    sprites.push(new Sprite(this.add.image(100, 150, 'rubble1')));

    for (i = 0; i < 50; i++) {
        sprites.push(new Sprite(this.add.image(random(-400,400), random(-400,400), 'grass1')));
        sprites.push(new Sprite(this.add.image(random(-400,400), random(-400,400), 'grass2')));
        var r = new Sprite(this.add.image(random(-400,400), random(-400,400), 'rubble1'));
        r.hasDepth = false;
        sprites.push(r);
    }

    player = new Sprite(this.add.image(0, 30, 'player2'));
    player.position.transformMat4(new Phaser.Math.Matrix4().rotateX(-0.01).rotateY(-0.02).rotateZ(0.01));
    sprites.push(player);
    // player = new Sprite(this.add.image(config.width/2, config.height/3 * 2, 'player1'));

    // camera.rotate(270);
    camera.rotateAround(player.position, camera.up, .01)
    updateScene();
}

function random(min, max) {
    return min + Math.random() * (max - min);
  }

var speed = 3;

function update() {
    var updated = false;
    if (keys.a.isDown) {
        camera.rotateAround(player.position, camera.up, .01)
        updated = true;
    }
    if (keys.d.isDown) {
        camera.rotateAround(player.position, camera.up, -.01)
        updated = true;
    }

    if (cursors)
    if (cursors.left.isDown)
    {
        camera.position.x -= speed;
        player.position.x -= speed;
        updated = true;
    }
    else if (cursors.right.isDown)
    {
        camera.position.x += speed;
        player.position.x += speed;
        updated = true;
    }

    if (cursors.up.isDown)
    {
        camera.position.z -= speed;
        player.position.z -= speed;
        updated = true;
    }
    else if (cursors.down.isDown)
    {
        camera.position.z += speed;
        player.position.z += speed;
        updated = true;
    }

    if (updated) {
        updateScene();
    }
}

function updateScene() {
    camera.update();
    for (i = 0; i < sprites.length; i++) {
        var sprite = sprites[i];
        sprite.project(camera);
    }
}

class Sprite {
    constructor(image) {
        image.setOrigin(.5, 1);

        this.image = image;
        this.position = new Phaser.Math.Vector4(image.x, 0, image.y);
        this.size = new Phaser.Math.Vector2(1, 1);
        // this.size = new Phaser.Math.Vector2(image.width, image.height);
        this.scale = new Phaser.Math.Vector2(1, 1);
        this.adjustScaleX = false;
        this.adjustScaleY = false;
        this.hasDepth = true;
    }

    project(camera) {
        var pos = this.position;

        var gameObject = this.image;

        camera.project(pos, gameObject);

        camera.getPointSize(pos, this.size, this.scale);

        if (this.scale.x <= 0 || this.scale.y <= 0)
        {
            gameObject.setVisible(false);
        }
        else
        {
            if (!gameObject.visible)
            {
                gameObject.setVisible(true);
            }

            if (this.adjustScaleX)
            {
                gameObject.scaleX = this.scale.x;
            }
            if (this.adjustScaleY)
            {
                gameObject.scaleY = this.scale.y;
            }
            var scale = (this.scale.x + this.scale.y);
            gameObject.setScale(scale);

            gameObject.setDepth(this.hasDepth ? gameObject.z * -1 : -1000);
        }
    }
}

class Camera {
    constructor(viewportWidth, viewportHeight) {
        this.viewportWidth = viewportWidth;
        this.viewportHeight = viewportHeight;

        this.pixelScale = 4;

        this.position = new Phaser.Math.Vector3();
        this.degrees = 0;
        this.direction = new Phaser.Math.Vector3(0, 0.35, 0);
        this.up = new Phaser.Math.Vector3(0, 1, 0);
        // this.rotate2(0);

        this.fieldOfView = 80 * Math.PI / 180;
        this.near = 1;
        this.far = 100;
        this.projection = new Phaser.Math.Matrix4();
        this.invProjectionView = new Phaser.Math.Matrix4();
        this.view = new Phaser.Math.Matrix4();
        this.combined = new Phaser.Math.Matrix4();
    
        this.tmpVec3 = new Phaser.Math.Vector3();
        this.tmpVec4 = new Phaser.Math.Vector4();
        this.dirvec = new Phaser.Math.Vector3();
        this.rightvec = new Phaser.Math.Vector3();
        this.billboardMatrix = new Phaser.Math.Matrix4();
        this.billboardMatrixDirty = true;
    }

    rotate(degrees) {
        this.degrees += degrees;
        this.direction.x = Math.cos(this.degrees * Math.PI / 180);
        this.direction.z = Math.sin(this.degrees * Math.PI / 180);
        console.log(this.direction);
    }

    rotateAround(rotationCenter, rotationAxis, angle) {
        this.lookAt(rotationCenter)
        const quat = new Quaternion();
        quat.setFromAxisAngle(rotationAxis, angle);
        this.position = quat.vmult(this.position.subtract(rotationCenter)).add(rotationCenter);
        this.direction.y = 0.35
        this.up.set(0,1,0)
    }

    lookAt(x, y, z) {
        var dir = this.direction;
        var up = this.up;

        if (typeof x === 'object')
        {
            dir.copy(x);
        }
        else
        {
            dir.set(x, y, z);
        }

        dir.subtract(this.position).normalize();

        //  Calculate right vector
        this.tmpVec3.copy(dir).cross(up).normalize();

        //  Calculate up vector
        up.copy(this.tmpVec3).cross(dir).normalize();
    }

    update() {
        // var aspect = this.viewportWidth / this.viewportHeight;
        var aspect = 1.0;

        //  Create a perspective matrix for our camera
        this.projection.perspective(
            this.fieldOfView,
            aspect,
            Math.abs(this.near),
            Math.abs(this.far)
        );

        //  Build the view matrix
        this.tmpVec3.copy(this.position).add(this.direction);

        this.view.lookAt(this.position, this.tmpVec3, this.up);

        //  Projection * view matrix
        this.combined.copy(this.projection).multiply(this.view);

        //  Invert combined matrix, used for unproject
        this.invProjectionView.copy(this.combined).invert();

        this.billboardMatrixDirty = true;

        // this.updateChildren();

        return this;
    }

    project(vec, out) {
        if (out === undefined) { out = new Phaser.Math.Vector4(); }

        //  TODO: support viewport XY
        var viewportWidth = this.viewportWidth;
        var viewportHeight = this.viewportHeight;
        var n = 0.0; //Camera.NEAR_RANGE;
        var f = 1.0; //Camera.FAR_RANGE;

        //  For useful Z and W values we should do the usual steps: clip space -> NDC -> window coords

        //  Implicit 1.0 for w component
        this.tmpVec4.set(vec.x, vec.y, vec.z, 1.0);

        //  Transform into clip space
        this.tmpVec4.transformMat4(this.combined);

        //  Avoid divide by zero when 0x0x0 camera projects to a 0x0x0 vec3
        if (this.tmpVec4.w === 0) {
            this.tmpVec4.w = 1;
        }

        //  Now into NDC
        this.tmpVec4.x = this.tmpVec4.x / this.tmpVec4.w;
        this.tmpVec4.y = this.tmpVec4.y / this.tmpVec4.w;
        this.tmpVec4.z = this.tmpVec4.z / this.tmpVec4.w;

        //  And finally into window coordinates
        out.x = viewportWidth / 2.0 * this.tmpVec4.x + (0 + viewportWidth / 2.0);
        out.y = viewportHeight / 2.0 * this.tmpVec4.y + (0 + viewportHeight / 2.0);
        out.z = (f - n) / 2.0 * this.tmpVec4.z + (f + n) / 2.0;

        //  If the out vector has a fourth component, we also store (1/clip.w), same idea as gl_FragCoord.w
        if (out.w === 0 || out.w)
        {
            out.w = 1 / this.tmpVec4.w;
        }

        return out;
    }

    getPointSize(vec, size, out) {
        if (out === undefined) { out = new Phaser.Math.Vector2(); }

        // TODO: optimize this with a simple distance calculation:
        // https://developer.valvesoftware.com/wiki/Field_of_View

        if (this.billboardMatrixDirty)
        {
            this.updateBillboardMatrix();
        }

        var tmp = this.tmpVec3;

        var dx = size.x / this.pixelScale;
        // var dx = (size.x / this.pixelScale) / 2.0;
        var dy = size.y / this.pixelScale;
        // var dy = (size.y / this.pixelScale) / 2.0;

        tmp.set(-dx, -dy, 0).transformMat4(this.billboardMatrix).add(vec);

        this.project(tmp, tmp);

        var tlx = tmp.x;
        var tly = tmp.y;

        tmp.set(dx, dy, 0).transformMat4(this.billboardMatrix).add(vec);

        this.project(tmp, tmp);

        var brx = tmp.x;
        var bry = tmp.y;

        // var w = Math.abs(brx - tlx);
        // var h = Math.abs(bry - tly);

        //  Allow the projection to get negative ...
        var w = brx - tlx;
        var h = bry - tly;

        return out.set(w, h);
    }

    updateBillboardMatrix() {
        var dir = this.dirvec.set(this.direction).negate();

        // Better view-aligned billboards might use this:
        // var dir = tmp.set(camera.position).subtract(p).normalize();

        var right = this.rightvec.set(this.up).cross(dir).normalize();
        var up = this.tmpVec3.set(dir).cross(right).normalize();

        var out = this.billboardMatrix.val;

        out[0] = right.x;
        out[1] = right.y;
        out[2] = right.z;
        out[3] = 0;

        out[4] = up.x;
        out[5] = up.y;
        out[6] = up.z;
        out[7] = 0;

        out[8] = dir.x;
        out[9] = dir.y;
        out[10] = dir.z;
        out[11] = 0;

        out[12] = 0;
        out[13] = 0;
        out[14] = 0;
        out[15] = 1;

        this.billboardMatrixDirty = false;
    }
}
