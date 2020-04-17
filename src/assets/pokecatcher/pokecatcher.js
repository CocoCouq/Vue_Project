/* eslint-disable */
// Globals variables
let scoreText
let score = 0
let life = 3
let lifePosition = 40
let pokeCount = 6
let gameOverText
let restartText

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
        this.game.canvas.id = 'poke_catcher'

        // Change background color
        this.cameras.main.backgroundColor.setTo(100, 10, 2)
        this.load.image('logoCatcher', 'images/logo_pokecatcher.png')
        this.load.image('titleCatcher', 'images/title_catcher.png')
    },
    create: function () {
        // If player click, change to game scene
        this.input.on('pointerup', function (pointer) {
            this.scene.start('pokeCatcher');
        }, this);
        this.logo = this.add.image(400, 250, 'logoCatcher')
        this.title = this.add.image(400, 100, 'titleCatcher').setScale(0.4)
        this.btnStart = this.add.text(70, 350, `Cliquez sur l'écran pour commencer`, {fontSize: '32px', fill: 'rgba(17,17,17)'})
        this.rules = this.add.text(70, 400, `Objectifs :\nAttrappez 6 pokemons avec seulement 3 pokeballs\nNe laissez pas les pokémons s'enfuir`, {fontSize: '20px', fill: 'rgba(255,255,255)'})
    },
    update: function () {
    }
})

// Game Scene
const pokeCatcher = new Phaser.Class({
    Extends: Phaser.Scene,
    initialize: function pokeCatcher() {
        Phaser.Scene.call(this, {key: 'pokeCatcher'})

        this.paddle
        this.ball
        this.poke1
        this.poke2
        this.poke3
        this.poke4
        this.poke5
        this.poke6
        this.tabLife = []
        this.cursor

    },

    preload: function () {
        // Change background color
        this.cameras.main.backgroundColor.setTo(125, 190, 2)
        // Load images
        this.load.image('paddle', 'images/paddle.png')
        this.load.image('ball', 'images/ball.png')
        this.load.image('life', 'images/life.png')
        this.load.image('poke1', 'images/poke1.png')
        this.load.image('poke2', 'images/poke2.png')
        this.load.image('poke3', 'images/poke3.png')
        this.load.image('poke4', 'images/poke4.png')
        this.load.image('poke5', 'images/poke5.png')
        this.load.image('poke6', 'images/poke6.png')
        this.load.image('poke7', 'images/poke7.png')
        this.load.image('poke8', 'images/poke8.png')
        this.load.image('poke9', 'images/poke9.png')
        this.load.image('poke10', 'images/poke10.png')
        this.load.image('poke11', 'images/poke11.png')
        this.load.image('poke12', 'images/poke12.png')
    },

    create: function () {
        // Disable right border
        this.physics.world.setBoundsCollision(true, true, true, false)
        // Create the cursor listener
        this.cursor = this.input.keyboard.createCursorKeys()

        // Create paddle and ball
        this.paddle = this.physics.add.image(350, 470, 'paddle').setCollideWorldBounds(true).setImmovable()
        this.ball = this.physics.add.image(350, 350, 'ball').setCollideWorldBounds(true).setBounce(1)
        // Resize body for do like a rebound
        this.paddle.body.setSize(90, 12)
        this.ball.setScale(0.04)

        // Add Physics relations
        this.physics.add.collider(this.ball, this.paddle, hitPaddle)
        // Add Velocity
        this.ball.setVelocity(20, 50)

        // Create Pokemons
        this.poke1 = createPoke(this.poke1, 0.08, 'poke1', catchPoke, this)
        this.poke2 = createPoke(this.poke2, 0.15, 'poke2', catchPoke, this)
        this.poke3 = createPoke(this.poke3, 0.08, 'poke3', catchPoke, this)
        this.poke4 = createPoke(this.poke4, 0.05, 'poke4', catchPoke, this)
        this.poke5 = createPoke(this.poke5, 0.25, 'poke5', catchPoke, this)
        this.poke6 = createPoke(this.poke6, 0.20, 'poke6', catchPoke, this)

        // Score display
        let i = 0;
        scoreText = this.add.text(16, 16, `Pokémons: ${score}`, {fontSize: '32px', fill: 'rgba(17,17,17,0.71)'})
        while (i < life) {
            this.tabLife[i++] = this.add.image(lifePosition, 65, 'life')
            lifePosition += 50
        }
        // Game Over Display
        gameOverText = this.add.text(50, 200, ``, {fontSize: '32px', fill: 'rgba(17,17,17)'})
        gameOverTitle = this.add.text(250, 100, ``, {fontSize: '50px', fill: 'rgba(17,17,17)'})
        restartText = this.add.text(200, 400, ``, {fontSize: '20px', fill: 'rgba(255,255,255)'})
    },

    update: function () {
        // Check if win
        if (life > -1 && pokeCount == 0) {
            gameWin(this)
        }

        // Velocity Speeder
        let xVelocity = this.ball.body.velocity.x
        if (xVelocity < 400 && xVelocity > -400) {
            xVelocity = xVelocity > 0 ? xVelocity + 0.5 : xVelocity - 0.5
        }
        let yVelocity = this.ball.body.velocity.y
        if (yVelocity < 400 && yVelocity > -400) {
            yVelocity = yVelocity > 0 ? yVelocity + 0.5 : yVelocity - 0.5
        }

        // Keyboard Controls
        if (this.cursor.left.isDown) {
            this.paddle.setVelocity(-800, 0)
            this.ball.setVelocity(xVelocity, yVelocity)
        }
        if (this.cursor.right.isDown) {
            this.paddle.setVelocity(800, 0)
            this.ball.setVelocity(xVelocity, yVelocity)
        }
        if (this.cursor.right.isUp && this.cursor.left.isUp) {
            this.paddle.setVelocity(0, 0)
        }

        // Ball out
        if (this.ball.y > 500) {
            this.ball.body.x = 350
            this.ball.body.y = 300
            this.ball.setVelocity(30, 200)
            gameOver(this)

        }
        // Pokemon out
        if (this.poke1.y > 500) {
            this.poke1 = createPoke(this.poke1, 0.08, 'poke7', catchPoke, this)
            gameOver(this)
        }
        if (this.poke2.y > 500) {
            this.poke2 = createPoke(this.poke2, 0.10, 'poke8', catchPoke, this)
            gameOver(this)
        }
        if (this.poke3.y > 500) {
            this.poke3 = createPoke(this.poke3, 0.12, 'poke9', catchPoke, this)
            gameOver(this)
        }
        if (this.poke4.y > 500) {
            this.poke4 = createPoke(this.poke4, 0.25, 'poke10', catchPoke, this)
            gameOver(this)
        }
        if (this.poke5.y > 500) {
            this.poke5 = createPoke(this.poke5, 0.08, 'poke11', catchPoke, this)
            gameOver(this)
        }
        if (this.poke6.y > 500) {
            this.poke6 = createPoke(this.poke6, 0.12, 'poke12', catchPoke, this)
            gameOver(this)
        }
    }
})

// Destroy game objects
function endGame(context)
{
    context.ball.disableBody(true, true)
    context.poke1.disableBody(true, true)
    context.poke2.disableBody(true, true)
    context.poke3.disableBody(true, true)
    context.poke4.disableBody(true, true)
    context.poke5.disableBody(true, true)
    context.poke6.disableBody(true, true)
    // If player click, restart game
    context.input.on('pointerup', function (pointer) {
        context.scene.start('pokeCatcher');
    }, context);
}

// GAME OVER
function gameOver(context)
{
    context.tabLife[--life].visible = false
    if (life < 1){
        endGame(context)
        gameOverText.setText(`T'es pas le meilleur dresseur\nC'est indégniable\nRetourne cirer les pompes d'Ondine !!\n\nT'es pas à la hauteur gamin..`)
        gameOverTitle.setText(`GAME OVER`)
        restartText.setText(`Cliquez sur l'écran pour rejouer`)
        life = 3
        pokeCount = 6
        score = 0
        lifePosition = 40
    }
}

// WINNER
function gameWin(context)
{
    endGame(context)
    gameOverText.setText(`Ma Zette\n\nTu sais dégainer tes balls !!`)
    gameOverTitle.setText(`YOU WIN !!`)
    restartText.setText(`Cliquez sur l'écran pour rejouer`)
    life = 3
    pokeCount = 6
    score = 0
    lifePosition = 40

}

// Hit Paddle for rebounds seem reals
function hitPaddle(ball, paddle) {
    let diff = 0;

    if (ball.x < paddle.x)
    {
        //  Top of paddle
        diff = paddle.x - ball.x;
        ball.setVelocityX(-8 * diff);
    }
    else if (ball.x > paddle.x)
    {
        //  Bottom of paddle
        diff = ball.x - paddle.x;
        ball.setVelocityX(8 * diff);
    }
    else
    {
        //  Add a little random X to stop it bouncing straight up!
        ball.setVelocityX(2 + Math.random() * 8);
    }

}

// Function for generate Pokemon
function createPoke(elem, scale, name, deleteFunction, context) {

    elem = context.physics.add.image((Math.random() * 800), (Math.random() * 300), name).setCollideWorldBounds(true).setBounce(1)
    elem.setScale(scale)
    context.physics.add.collider(elem, context.paddle)
    context.physics.add.collider(elem, context.ball, deleteFunction)
    elem.setVelocity(Math.random() * 150, Math.random() * 150)
    return elem
}

// Catch Pokemon
function catchPoke(poke)
{
    poke.disableBody(false, true);
    scoreText.setText(`Pokémons: ${++score}`)
    pokeCount--
}

let CONFIG = {
    type: Phaser.AUTO,
    width: 800,
    height: 500,
    scene: [startScene, pokeCatcher],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0}
        },
    }
}

let game = new Phaser.Game(CONFIG)