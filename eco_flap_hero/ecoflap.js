let board;
const BOARD_WIDTH = 720
const BOARD_HEIGHT = 1280
const HITBOX_RED = 80

// HERO

let char_height = 120
let char_width = 160

let charX  = BOARD_WIDTH/8
let charY = BOARD_HEIGHT/2

// Maybe class character?

let pipes = []
const PIPE_WIDTH = 250
const PIPE_HEIGHT = 1080
let pipeX = BOARD_WIDTH
let pipeY = 0

let bottomPipeAsset
let topPipeAsset
let inBottomPipeAsset
let inTopPipeAsset

let isGameOver = false
let score = 0

// Physics

let dx = -3 // Velocity in X
let dy = 0 // Velocity in Y
let d2y = 0.4 // Gravity accel 
const GEN_INTERVAL = 3100

let character = {
    height : char_height-80,
    width: char_width,
    x : charX,
    y : charY
}

let context;

window.onload = function(){
    board = document.getElementById("board")
    board.height = BOARD_HEIGHT
    board.width = BOARD_WIDTH
    context = board.getContext("2d")

    context.fillStyle = "green"
    context.fillRect(character.x,character.y, character.width, character.height)
    
    charAsset = new Image()
    charAsset.src = "./media/character.png"
    charAsset.onload = function(){
        context.drawImage(charAsset ,character.x,character.y, character.width, character.height+80)
    }

    topPipeAsset = new Image()
    topPipeAsset.src = "./media/top_pipe_org.png"

    bottomPipeAsset = new Image()
    bottomPipeAsset.src = "./media/bottom_pipe_org.png"

    inTopPipeAsset = new Image()
    inTopPipeAsset.src = "./media/top_pipe_in.png"

    inBottomPipeAsset = new Image()
    inBottomPipeAsset = "./media/bottom_pipe_in.png"

    requestAnimationFrame(update)
    setInterval(generatePipes, GEN_INTERVAL)
    document.addEventListener("keydown", jump)
}

function update(){
    requestAnimationFrame(update)
    if(isGameOver){
        return;
    }
    context.clearRect(0,0,board.width,board.height)

    dy += d2y
    character.y = Math.max(character.y + dy,0)
    context.drawImage(charAsset ,character.x,character.y-40, character.width, character.height+80)


    let hitboxWidth = character.width;
    let hitboxHeight = character.height;
    let hitboxX = character.x + (character.width - hitboxWidth);
    let hitboxY = character.y + (character.height - hitboxHeight);

    context.strokeStyle = "red"; // Color for hitbox
    context.lineWidth = 2; // Thickness of hitbox lines
    context.strokeRect(hitboxX, hitboxY, hitboxWidth, hitboxHeight);

    if(character.y > board.height){
        isGameOver = true
    }

    for(let i=0; i<pipes.length; i++){
        let pipe = pipes[i]
        pipe.x += dx
        context.drawImage(pipe.asset, pipe.x, pipe.y, pipe.width, pipe.height)

        if(!pipe.passed && passCheck(character,pipe)){
            score += 0.5
            pipe.passed = true
        }


        if(checkCollision(character,pipe)){
            isGameOver = true
        }
    }

    while(pipes.length > 0 && pipes[0].x + pipes[0].width < 0){
        pipes.shift()
    }

    context.fillStyle = "black"
    context.font = "45px 'Press Start 2P', cursive"
    context.fillText(score,5,45)
}

function generatePipes(){
    
    if(isGameOver){
        return;
    }

    let randY = pipeY - PIPE_HEIGHT/4 - Math.random()*(PIPE_HEIGHT/2)
    let spacing = BOARD_HEIGHT/4

    let topPipe = {
        asset: topPipeAsset,
        x: pipeX,
        y: randY,
        width : PIPE_WIDTH,
        height : PIPE_HEIGHT,
        isPassed : false
    }

    let bottomPipe = {
        asset: bottomPipeAsset,
        x: pipeX,
        y: randY + PIPE_HEIGHT + spacing,
        width : PIPE_WIDTH,
        height : PIPE_HEIGHT,
        isPassed : false
    }

    pipes.push(topPipe)
    pipes.push(bottomPipe)
}

function jump(e){
    if(e.code == "Space" || e.code == "ArrowUp"){
        dy = -10


        // Reset game, TODO: Improve with a menu
        if(isGameOver){
            character.y =  charY
            pipes = []
            score = 0
            isGameOver = false
        }
    }
}

function checkCollision(objA, objB){
    return (objA.x  < objB.x + objB.width &&
           objA.x + objA.width > objB.x &&
           objA.y < objB.y + objB.height &&
           objA.y + objA.height > objB.y)
}

function passCheck(objA,objB){
    return objA.x > objB.x + objB.width
}