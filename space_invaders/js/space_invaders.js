//alert('a');
document.write("Welcome to the Space Invaders Tutorial");
KEY_CODES = {
    32: 'space',
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
};
KEY_STATUS = {};
for (code in KEY_CODES) {
    KEY_STATUS[KEY_CODES[code]] = false;
}
document.onkeydown = function(e) {
    // Firefox and opera use charCode instead of keyCode to
    // return which key was pressed.
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = true;
    }
};
document.onkeyup = function(e) {
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
        e.preventDefault();
        KEY_STATUS[KEY_CODES[keyCode]] = false;
    }
};

imageRepository = new App_images();
game = new Game();

function init() {
    if (game.init()) {
        game.start();
    }
}

function App_images() {
    this.background = new Image();
    this.spaceship = new Image();
    this.bullet = new Image();
    this.enemy = new Image();
    this.enemyBullet = new Image();
    var numImages = 5;
    var numLoaded = 0;
    function imageLoaded() {
        numLoaded++;
        if (numLoaded === numImages) {
            window.init();
        }
    }
    this.background.onload = function() {
        imageLoaded();
    };
    this.spaceship.onload = function() {
        imageLoaded();
    };
    this.bullet.onload = function() {
        imageLoaded();
    };
    this.enemy.onload = function() {
        imageLoaded();
    };
    this.enemyBullet.onload = function() {
        imageLoaded();
    };
    this.background.src = "imgs/bg.png";
    this.spaceship.src = "imgs/ship.png";
    this.bullet.src = "imgs/bullet.png";
    this.enemy.src = "imgs/enemy.png";
    this.enemyBullet.src = "imgs/bullet_enemy.png";
}

function Drawable() {
    this.init = function(x, y, width, height) {
    // Defualt variables
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    };
    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;
    // Define abstract function to be implemented in child objects
    this.draw = function() {
    };
    this.move = function() {
    };
}

function Bullet(object) {
    this.alive = false;
    var self = object;
    this.spawn = function(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.alive = true;
    };
    this.draw = function() {
        this.context.clearRect(this.x-1, this.y-1, this.width+1, this.height+1);
        this.y -= this.speed;
        if (self === "bullet" && this.y <= 0 - this.height) {
            return true;
        }
        else if (self === "enemyBullet" && this.y >= this.canvasHeight) {
            return true;
        }
        else {
            if (self === "bullet") {
                this.context.drawImage(imageRepository.bullet, this.x, this.y);
            }
            else if (self === "enemyBullet") {
                this.context.drawImage(imageRepository.enemyBullet, this.x, this.y);
            }
            return false;
        }
    };
    this.clear = function() {
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.alive = false;
    };
}
Bullet.prototype = new Drawable();

function Enemy() {
    var percentFire = 0.005;
    var chance = 0;
    this.alive = false;
    this.checkBottom = true;
    this.spawn = function(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.speedX = 0;
        this.speedY = speed;
        this.alive = true;
        this.leftEdge = this.x - 90;
        this.rightEdge = this.x + 90;
        this.bottomEdge = this.y + 160;
    };
    this.draw = function() {
        this.context.clearRect(this.x-1, this.y, this.width+1, this.height);
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x <= this.leftEdge) {
            this.speedX = this.speed;
        }
        else if (this.x >= this.rightEdge + this.width) {
            this.speedX = -this.speed;
        }
        else if (this.y >= this.bottomEdge && this.checkBottom) {
            this.speed = 1.0;
            this.speedY = 0;
            this.checkBottom = false;
            this.speedX = -this.speed;
        }
        this.context.drawImage(imageRepository.enemy, this.x, this.y);
        chance = Math.random();
        if (chance < percentFire) {
            this.fire();
        }
    };
    this.fire = function() {
        game.enemyBulletPool.get(this.x+this.width/2, this.y+this.height, -1.5);
    };
    this.clear = function() {
        this.x = 0;
        this.y = 0;
        this.speed = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.alive = false;
    };
}
Enemy.prototype = new Drawable();

function Pool(maxSize) {
    var size = maxSize; // Max bullets allowed in the pool
    var pool = [];
    this.init = function(object) {
        if (object == "bullet") {
            for (var i = 0; i < size; i++) {
                // Initalize the object
                var bullet = new Bullet("bullet");
                bullet.init(0,0, imageRepository.bullet.width, imageRepository.bullet.height);
                pool[i] = bullet;
            }
        }
        else if (object == "enemy") {
            for (var i = 0; i < size; i++) {
                var enemy = new Enemy();
                enemy.init(0,0, imageRepository.enemy.width, imageRepository.enemy.height);
                pool[i] = enemy;
            }
        }
        else if (object == "enemyBullet") {
            for (var i = 0; i < size; i++) {
                var bullet = new Bullet("enemyBullet");
                bullet.init(0,0, imageRepository.enemyBullet.width, imageRepository.enemyBullet.height);
                pool[i] = bullet;
            }
        }
    };
    this.get = function(x, y, speed) {
        if(!pool[size - 1].alive) {
            pool[size - 1].spawn(x, y, speed);
            pool.unshift(pool.pop());
        }
    };
    this.getTwo = function(x1, y1, speed1, x2, y2, speed2) {
        if(!pool[size - 1].alive &&
            !pool[size - 2].alive) {
            this.get(x1, y1, speed1);
            this.get(x2, y2, speed2);
        }
    };
    this.animate = function() {
        for (var i = 0; i < size; i++) {
            // Only draw until we find a bullet that is not alive
            if (pool[i].alive) {
                if (pool[i].draw()) {
                    pool[i].clear();
                    pool.push((pool.splice(i,1))[0]);
                }
            }
            else
                break;
        }
    };
}

function Ship() {
    this.speed = 1;
    this.bulletPool = new Pool(30);
    this.bulletPool.init("bullet");
    var fireRate = 85;
    var counter = 0;
    this.draw = function() {
        this.context.drawImage(imageRepository.spaceship, this.x, this.y);
    };
    this.move = function() {
        counter++;
        // Determine if the action is move action
        if (KEY_STATUS.left || KEY_STATUS.right || KEY_STATUS.down || KEY_STATUS.up) {
            this.context.clearRect(this.x, this.y, this.width, this.height);
            if (KEY_STATUS.left) {
                this.x -= this.speed;
                if (this.x < 0)
                    this.x = -this.speed;
            } else if (KEY_STATUS.right) {
                this.x += this.speed;
                if (this.x >= this.canvasWidth - this.width)
                    this.x = this.canvasWidth - this.width;
            } else if (KEY_STATUS.up) {
                this.y -= this.speed;
                if (this.y <= this.canvasHeight/4*3)
                    this.y = this.canvasHeight/4*3;
            } else if (KEY_STATUS.down) {
                this.y += this.speed;
                if (this.y >= this.canvasHeight - this.height)
                    this.y = this.canvasHeight - this.height;
            }
            this.draw();
        }
        if (KEY_STATUS.space && counter >= fireRate) {
            this.fire();
            counter = 0;
        }
    };
    this.fire = function() {
        this.bulletPool.get(this.x+6, this.y, 2);
        //this.bulletPool.getTwo(this.x+6, this.y, 3, this.x+33, this.y, 3);
    };
}
Ship.prototype = new Drawable();

function Background() {
    this.speed = .5;
    // Implement abstract function
    this.draw = function() {
        this.y += this.speed;
        this.context.drawImage(imageRepository.background, this.x, this.y);
        this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);
        if (this.y >= this.canvasHeight)
            this.y = 0;
    };
}
// Set Background to inherit properties from Drawable
Background.prototype = new Drawable();

function Game() {
    this.init = function() {
        this.bgCanvas = document.getElementById('background');
        this.shipCanvas = document.getElementById('ship');
        this.mainCanvas = document.getElementById('main');
        // Test to see if canvas is supported. Only need to
        // check one canvas
        if (this.bgCanvas.getContext) {
            this.bgContext = this.bgCanvas.getContext('2d');
            this.shipContext = this.shipCanvas.getContext('2d');
            this.mainContext = this.mainCanvas.getContext('2d');
            // Initialize objects to contain their context and canvas
            // information
            Background.prototype.context = this.bgContext;
            Background.prototype.canvasWidth = this.bgCanvas.width;
            Background.prototype.canvasHeight = this.bgCanvas.height;
            Ship.prototype.context = this.shipContext;
            Ship.prototype.canvasWidth = this.shipCanvas.width;
            Ship.prototype.canvasHeight = this.shipCanvas.height;
            Bullet.prototype.context = this.mainContext;
            Bullet.prototype.canvasWidth = this.mainCanvas.width;
            Bullet.prototype.canvasHeight = this.mainCanvas.height;
            Enemy.prototype.context = this.mainContext;
            Enemy.prototype.canvasWidth = this.mainCanvas.width;
            Enemy.prototype.canvasHeight = this.mainCanvas.height;
            this.background = new Background();
            this.background.init(0,0); // Set draw point to 0,0
            this.ship = new Ship();
            var shipStartX = this.shipCanvas.width/2 - imageRepository.spaceship.width;
            var shipStartY = this.shipCanvas.height/4*3 + imageRepository.spaceship.height*2;
            this.ship.init(shipStartX, shipStartY, imageRepository.spaceship.width, imageRepository.spaceship.height);
            // Initialize the enemy pool object
            this.enemyPool = new Pool(30);
            this.enemyPool.init("enemy");
            var height = imageRepository.enemy.height;
            var width = imageRepository.enemy.width;
            var x = 100;
            var y = -height;
            var spacer = y * 1.5;
            for (var i = 1; i <= 10; i++) {
                this.enemyPool.get(x+width,y-height,0.5);
                x += width + 25;
                if (i % 5 == 0) {
                    x = 100;
                    y += spacer
                }
            }
            this.enemyBulletPool = new Pool(50);
            this.enemyBulletPool.init("enemyBullet");
            return true;
        } else {
            return false;
        }
    };
    // Start the animation loop
    this.start = function() {
        animate();
    };
}

// This function must be global
function animate() {
    requestAnimFrame( animate );
    game.background.draw();
    game.ship.move();
    game.ship.bulletPool.animate();
    game.enemyPool.animate();
    game.enemyBulletPool.animate();
}

//Finds the first API that works to optimize the animation loop,
//otherwise defaults to setTimeout().
window.requestAnimFrame = (function(){
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
        };
})();