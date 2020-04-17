/* eslint-disable */
// GLOBAL CONFIG
const CONFIG = {
    width: 800,
    height: 500,
    type: Phaser.AUTO,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 0}
        },
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
}

// CREATE GAME WITH PHASER
let game = new Phaser.Game(CONFIG)

// Pokemons to catch
let poke1, poke2, poke3, poke4, poke5, poke6
let pokeCount = 6

// Uniques elements
let ball, paddle, cursor

// Scores elements
let scoreText, gameOverText, gameOverTitle
let score = 0
let life = 3
let lifePosition = 40
let tabLife = []

// Before start game
function preload() {
    // Add custom materialise class for html canvas
    this.game.canvas.classList.add('hide')
    this.game.canvas.id = 'poke_catcher'
    // Change background color
    this.cameras.main.backgroundColor.setTo(125,190,2)
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
}

// Games elements definitions
function create() {

    // Disable right border
    this.physics.world.setBoundsCollision(true, true, true, false)
    // Create the cursor listener
    cursor = this.input.keyboard.createCursorKeys()

    // Create paddle and ball
    paddle = this.physics.add.image(350, 470, 'paddle').setCollideWorldBounds(true).setImmovable()
    ball =  this.physics.add.image(350, 350, 'ball').setCollideWorldBounds(true).setBounce(1)
    // Resize body for do like a rebound
    paddle.body.setSize(90, 12)
    ball.setScale(0.04)

    // Add Physics relations
    this.physics.add.collider(ball, paddle, hitPaddle)
    // Add Velocity
    ball.setVelocity(20, 100)

    // Create Pokemons
    poke1 = createPoke(poke1, 0.08, 'poke1', catchPoke1, this)
    poke2 = createPoke(poke2, 0.15, 'poke2', catchPoke2, this)
    poke3 = createPoke(poke3, 0.08, 'poke3', catchPoke3, this)
    poke4 = createPoke(poke4, 0.05, 'poke4', catchPoke4, this)
    poke5 = createPoke(poke5, 0.25, 'poke5', catchPoke5, this)
    poke6 = createPoke(poke6, 0.20, 'poke6', catchPoke6, this)

    // Score display
    let i = 0;
    scoreText = this.add.text(16, 16, `Pokémons: ${score}`, { fontSize: '32px', fill: 'rgba(17,17,17,0.71)' })
    while (i < life) {
        tabLife[i++] = this.add.image(lifePosition, 65, 'life')
        lifePosition += 50
    }
    // Game Over Display
    gameOverText = this.add.text(50, 200, ``, { fontSize: '32px', fill: 'rgba(17,17,17,0.71)' })
    gameOverTitle = this.add.text(250, 100, ``, { fontSize: '50px', fill: 'rgba(17,17,17,0.71)' })
}

// Function to play
function update() {
    // Check if win
    if (life > -1 && pokeCount == 0)
    {
        gameWin()
    }

    // Velocity Speeder
    let xVelocity = ball.body.velocity.x
    if (xVelocity < 400 && xVelocity > -400) {
        xVelocity = xVelocity > 0 ? xVelocity + 0.5 : xVelocity - 0.5
    }
    let yVelocity = ball.body.velocity.y
    if (yVelocity < 400 && yVelocity > -400) {
        yVelocity = yVelocity > 0 ? yVelocity + 0.5 : yVelocity - 0.5
    }

    // Keyboard Controls
    if (cursor.left.isDown){
        paddle.setVelocity(-800, 0)
        ball.setVelocity(xVelocity, yVelocity)
    }
    if (cursor.right.isDown){
        paddle.setVelocity(800, 0)
        ball.setVelocity(xVelocity, yVelocity)
    }
    if (cursor.right.isUp && cursor.left.isUp)
    {
        paddle.setVelocity(0, 0)
    }

    // Ball out
    if(ball.y > 500)
    {
        ball.body.x = 350
        ball.body.y = 300
        ball.setVelocity(30, 200)
        gameOver()

    }
    // Pokemon out
    if (poke1.y > 500) {
        poke1 = createPoke(poke1, 0.08, 'poke7', catchPoke1, this)
        gameOver()
    }
    if (poke2.y > 500) {
        poke2 = createPoke(poke2, 0.10, 'poke8', catchPoke2, this)
        gameOver()
    }
    if (poke3.y > 500) {
        poke3 = createPoke(poke3, 0.12, 'poke9', catchPoke3, this)
        gameOver()
    }
    if (poke4.y > 500) {
        poke4 = createPoke(poke4, 0.25, 'poke10', catchPoke4, this)
        gameOver()
    }
    if (poke5.y > 500) {
        poke5 = createPoke(poke5, 0.08, 'poke11', catchPoke5, this)
        gameOver()
    }
    if (poke6.y > 500) {
        poke6 = createPoke(poke6, 0.12, 'poke12', catchPoke6, this)
        gameOver()
    }

}

// GAME OVER
function gameOver()
{
    if (life > 0){
        tabLife[--life].visible = false
    }
    else{
        endGame()
        gameOverText.setText(`T'es pas le meilleur dresseur\nC'est indégniable\nRetourne cirer les pompes d'Ondine !!\n\nT'es pas à la hauteur gamin..`)
        gameOverTitle.setText(`GAME OVER`)
    }
}

// WINNER
function gameWin()
{
    endGame()
    gameOverText.setText(`Ma Zette\n\nTu sais dégainer tes balls !!`)
    gameOverTitle.setText(`YOU WIN !!`)
}


// Hit Paddle for rebounds seem reals
function hitPaddle() {
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

// Destroy game objects
function endGame()
{
    ball.disableBody(true, true)
    poke1.disableBody(true, true)
    poke2.disableBody(true, true)
    poke3.disableBody(true, true)
    poke4.disableBody(true, true)
    poke5.disableBody(true, true)
    poke6.disableBody(true, true)
}

// Function for generate Pokemon
function createPoke(elem, scale, name, deleteFunction, context) {

    elem = context.physics.add.image((Math.random() * 800), (Math.random() * 300), name).setCollideWorldBounds(true).setBounce(1)
    elem.setScale(scale)
    context.physics.add.collider(elem, paddle)
    context.physics.add.collider(ball, elem, deleteFunction)
    elem.setVelocity(Math.random() * 150, Math.random() * 150)
    return elem
}

// Catch Pokemon
function catchPoke1()
{
    poke1.disableBody(true, true);
    scoreText.setText(`Pokémons: ${++score}`)
    pokeCount--
}
function catchPoke2()
{
    poke2.disableBody(true, true);
    scoreText.setText(`Pokémons: ${++score}`)
    pokeCount--
}
function catchPoke3()
{
    poke3.disableBody(true, true);
    scoreText.setText(`Pokémons: ${++score}`)
    pokeCount--
}
function catchPoke4()
{
    poke4.disableBody(true, true);
    scoreText.setText(`Pokémons: ${++score}`)
    pokeCount--
}
function catchPoke5()
{
    poke5.disableBody(true, true);
    scoreText.setText(`Pokémons: ${++score}`)
    pokeCount--
}
function catchPoke6()
{
    poke6.disableBody(true, true);
    scoreText.setText(`Pokémons: ${++score}`)
    pokeCount--
}
