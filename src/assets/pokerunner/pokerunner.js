/* eslint-disable */
// Directions
const UP = 0;
const DOWN = 1;
const LEFT = 2;
const RIGHT = 3;

// Globals games variables
let snake
let ball
let newPoke = []
let cursors
let score = 0
let scoreText


// Start Scene
const startScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function startScene() {
        Phaser.Scene.call(this, {key: 'startScene'})

        this.logo
        this.title
        this.btnStart
        this.rules
    },
    preload: function () {
        // Add custom materialise class for html canvas
        this.game.canvas.classList.add('hide')
        this.game.canvas.id = 'poke_runner'

        // Change background color
        this.cameras.main.backgroundColor.setTo(100, 10, 2)
        this.load.image('logoSnake', 'images/logo_pokeSnake.png')
        this.load.image('titleSnake', 'images/title_pokeSnake.png')
    },
    create: function () {
        // If player click, change to game scene
        this.input.on('pointerup', function (pointer) {
            this.scene.start('pokeSnake')
        }, this);
        this.logo = this.add.image(400, 250, 'logoSnake')
        this.title = this.add.image(400, 100, 'titleSnake').setScale(0.4)
        this.btnStart = this.add.text(60, 300, ` Cliquez sur l'écran pour commencer\nAppuyez sur ↑ ou ↓ pour lancer Sacha`, {fontSize: '32px', fill: 'rgba(17,17,17)'})
        this.rules = this.add.text(70, 400, `Objectif :\nAttrappez le plus de Pikachu possible`, {fontSize: '20px', fill: 'rgba(255,255,255,0.71)'})
    },
    update: function () {
    }
})


// GameOver Scene
const gameoverScene = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function startScene() {
        Phaser.Scene.call(this, {key: 'gameoverScene'})

        this.title
        this.message
        this.help
    },
    preload: function () {
        // Change background color
        this.cameras.main.backgroundColor.setTo(100, 10, 2)
        this.load.image('logoSnake', 'images/logo_pokeSnake.png')
    },
    create: function () {
        // If player click, change to game scene
        this.input.on('pointerup', function (pointer) {
            this.scene.start('startScene');
        }, this);
        this.logo = this.add.image(400, 100, 'logoSnake')
        this.title = this.add.text(255, 200, `GAME OVER`, {fontSize: '50px', fill: 'rgba(17,17,17)'})
        this.message = this.add.text(255, 300, `Score: ${score}`, {fontSize: '50px', fill: 'rgba(255,255,255,0.71)'})
        this.help = this.add.text(20, 400, `T'es un Zéro !! Cliques pour recommencer !!`, {fontSize: '30px', fill: 'rgba(255,255,255)'})
        score = 0
    },
    update: function () {
    }
})


// Game Scene
const pokeSnake = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize: function () {
        Phaser.Scene.call(this, {key: 'pokeSnake'})
        this.ball
    },

    preload: function () {
        // Change background color
        this.cameras.main.backgroundColor.setTo(100, 10, 2)
        // Load images
        this.load.image('ball', 'images/ballSnake.png')
        this.load.spritesheet('player', 'images/player.png', {
            frameHeight: 25,
            frameWidth: 25
        })
        this.load.spritesheet('snake', 'images/pokeSnake.png', {
            frameHeight: 64,
            frameWidth: 64
        })
    },

    create: function () {

        this.ball = this.physics.add.image(200, 100, 'ball').setCollideWorldBounds(true).setImmovable(true)
        scoreText = this.add.text(16, 16, `Score: ${score}`, {fontSize: '32px', fill: 'rgba(17,17,17,0.71)'})

        // Head animation
        this.anims.create({
            key: 'onDown',
            frameRate: 16, // Numbers of pictures in picture
            repeat: -1, // Always execute
            frames: this.anims.generateFrameNumbers('player', {
                frames: [0, 1, 2, 3]
            })
        })
        this.anims.create({
            key: 'onLeft',
            frameRate: 16, // Numbers of pictures in picture
            repeat: -1, // Always execute
            frames: this.anims.generateFrameNumbers('player', {
                frames: [4, 5, 6, 7]
            })
        })
        this.anims.create({
            key: 'onRight',
            frameRate: 16, // Numbers of pictures in picture
            repeat: -1, // Always execute
            frames: this.anims.generateFrameNumbers('player', {
                frames: [8, 9, 10, 11]
            })
        })
        this.anims.create({
            key: 'onUp',
            frameRate: 16, // Numbers of pictures in picture
            repeat: -1, // Always execute
            frames: this.anims.generateFrameNumbers('player', {
                frames: [12, 13, 14, 15]
            })
        })

        // Call class for create the snake in the center of map
        // Call ball before for poke walk up the ball
        snake = new Snake(this, 70, 100)

        this.physics.overlap(this, snake);
        this.physics.add.collider(this.ball, snake.body, catchBall)

        cursors = this.input.keyboard.createCursorKeys();
    },

    update: function (time) {
        if (!snake.alive)
        {
            // GameOver Scene
            this.scene.start('gameoverScene');
        }


        if (cursors.left.isDown)
        {
            if (snake.direction === UP || snake.direction === DOWN)
            {
                snake.heading = LEFT;
                snake.head.play('onLeft')
            }
        }
        else if (cursors.right.isDown)
        {
            if (snake.direction === UP || snake.direction === DOWN)
            {
                snake.heading = RIGHT;
                snake.head.play('onRight')
            }
        }
        else if (cursors.up.isDown)
        {
            if (snake.direction === LEFT || snake.direction === RIGHT)
            {
                snake.heading = UP;
                snake.head.play('onUp')
            }
        }
        else if (cursors.down.isDown)
        {
            if (snake.direction === LEFT || snake.direction === RIGHT)
            {
                snake.heading = DOWN;
                snake.head.play('onDown')
            }
        }

        // Check collision whith ball
        snake.update(time)
    }

})


// Games configurations
const CONFIG = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    scene: [startScene, pokeSnake, gameoverScene],
    physics: {
        default: 'arcade',
        arcade: {
            // debug: true
        },
    }
};

function catchBall(ball, scene) {
    ball.body.x = (Math.random()*740) + 30
    ball.body.y = (Math.random()*440) + 30
    snake.grow()
    score++
    scoreText.setText(`Score: ${score}`)
}

////////////////////////////////////////////////////////////////////

// Create a Snake class for diffents parts of snake
const Snake = new Phaser.Class({

    initialize: function Snake (scene, x, y) {
        // Add head of snake
        this.headPosition = new Phaser.Geom.Point(x, y);

        // create the group for body
        this.body = scene.physics.add.group()

        // Add body content
        this.head = this.body.create(x, y, 'player').setSize(5, 5);
        this.head.setOrigin(0);

        this.head.play('onRight')

        // Start alive
        this.alive = true;

        // Default speed (Make more to slowly)
        this.speed = 100;

        // Move time for the body follow head
        this.moveTime = 0;

        // Global direction and Heading direction
        this.heading = RIGHT;
        this.direction = RIGHT;

        // Snake tail
        this.tail = new Phaser.Geom.Point(x, y);

    },

    update: function (time)
    {
        // Recover the time to move
        if (time >= this.moveTime)
        {
            return this.move(time);
        }
    },

    move: function (time)
    {
        // Use this to define the area limit and make like is a loop
        switch (this.heading)
        {
            case LEFT:
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x - 0.005, -0.01, 0.52);
                break;

            case RIGHT:
                this.headPosition.x = Phaser.Math.Wrap(this.headPosition.x + 0.005, -0.01, 0.52);
                break;

            case UP:
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y - 0.005, -0.01, 0.32);
                break;

            case DOWN:
                this.headPosition.y = Phaser.Math.Wrap(this.headPosition.y + 0.005, -0.01, 0.32);
                break;
        }

        this.direction = this.heading;

        //  Update the body segments
        Phaser.Actions.ShiftPosition(this.body.getChildren(), this.headPosition.x * 1500, this.headPosition.y * 1500, 1, this.tail);

        //  Update the timer ready for the next movement with the velocity
        let hitBody = Phaser.Actions.GetFirst(this.body.getChildren(), { x: this.head.x, y: this.head.y }, 1);

        if (hitBody)
        {
            console.log('dead');

            this.alive = false;
        }
        else {
            //  Update the timer ready for the next movement
            this.moveTime = time + 30;
            return true;
        }
    },

    grow: function ()
    {
        newPoke[score] = this.body.create(this.tail.x, this.tail.y, 'snake').setSize(5,5);
        newPoke[score].setOrigin(0);
    }
})


//////////////////////////////////////////////////////////////////

const game = new Phaser.Game(CONFIG);

