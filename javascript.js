var canvas=document.getElementById('myCanvas')
var ctx=canvas.getContext("2d")

var x=(canvas.width)+Math.floor(Math.random()*150)-10
var y=(canvas.height)+Math.floor(Math.random()*150)-60
var ballRadius=10
var dx=5
var dy=-5
var paddleHeight=10
var paddleWidth=75
var paddleX=(canvas.width-paddleWidth)/2
var rightPressed=false
var leftPressed=false
var brickRowCount=7
var brickColCount=Math.floor((screen.width-10)/85)
var brickPadding=10
var brickOffsetTop=30
var brickOffsetLeft=10
var brickHeight=20
var brickWidth=75
var score=0
var lives=3
var level=1
var maxLevel=5
var paused=false

var bricks=[]
initBricks()
function initBricks(){
    for(c=0;c<brickColCount;c++){
        bricks[c]=[]
        for(r=0;r<brickRowCount;r++)
        bricks[c][r]={ x:0 , y:0 , status:1 }
    }
}


function drawScore(){
    ctx.font="16px Arial"
    ctx.fillStyle="#0095DD"
    ctx.fillText("Score: "+score,8,20)
}

function drawLives(){
    ctx.font="16px Arial"
    ctx.fillStyle="#0095DD"
    ctx.fillText("Lives: "+lives,canvas.width-65,20)
}

function drawLevel(){
    ctx.font="16px Arial"
    ctx.fillStyle="#0095DD"
    ctx.fillText("Level: "+level,630,20)
}

function collisionDetection(){
    for(c=0;c<brickColCount;c++){
        for(r=0;r<brickRowCount;r++){
            var b=bricks[c][r]
            if(b.status==1){
                if(x>b.x && x<b.x+brickWidth && y>b.y && y<b.y+brickHeight){
                    dy=-dy
                    b.status=0
                    score++
                if(score==brickRowCount*brickColCount){
                    if(level===maxLevel){
                        alert("CONGRATS....YOU WON..")
                        document.location.reload()
                    }else{
                        level++
                        score=0
                        brickRowCount++
                        initBricks()
                        dx+=2
                        dy=-dy
                        dy-=2
                        x=(canvas.width/2)+Math.floor(Math.random()*50)-20
                        y=(canvas.height-30)+Math.floor(Math.random()*50)-20
                        paddleX=(canvas.width-paddleWidth)/2
                        ctx.beginPath()
                        ctx.rect(0,0,canvas.width,canvas.height)
                        ctx.fillStyle="#0095DD"
                        ctx.fill()
                        ctx.font="16px Arial"
                        ctx.fillStyle="#FFFFFF"
                        ctx.fillText("Level "+(level-1)+" Completed..Starting New Level",110,150)
                        ctx.closePath()
                        paused=true
                        setTimeout(function(){
                            paused=false
                            draw()
                        },1000)
                    }
                }
                }
            }
        }
    }
}

document.addEventListener("keydown",keyDownHandler)
document.addEventListener("keyup",keyUpHandler)

function keyDownHandler(e){
    if(e.keyCode==39)
    rightPressed=true
    else if(e.keyCode==37)
    leftPressed=true
}

function drawBricks(){
    for(c=0;c<brickColCount;c++){
        for(r=0;r<brickRowCount;r++){
            if(bricks[c][r].status==1){
                var brickX=(c*(brickWidth+brickPadding))+brickOffsetLeft
                var brickY=(r*(brickHeight+brickPadding))+brickOffsetTop
                bricks[c][r].x=brickX
                bricks[c][r].y=brickY

                ctx.beginPath()
                ctx.rect(brickX,brickY,brickWidth,brickHeight)
                ctx.fillStyle="#0095DD"
                ctx.fill()
                ctx.closePath()
            }
        }
    }
}

function keyUpHandler(e){
    if(e.keyCode==39)
    rightPressed=false
    else if(e.keyCode==37)
    leftPressed=false
}

function drawBall(){
    ctx.beginPath()
    ctx.arc(x,y,ballRadius,0,Math.PI*2)
    ctx.fillStyle="#0095DD"
    ctx.fill()
    ctx.closePath()
}

function drawPaddle(){
    ctx.beginPath()
    ctx.rect(paddleX,canvas.height-paddleHeight,paddleWidth,paddleHeight)
    ctx.fillStyle="#0095DD"
    ctx.fill()
    ctx.closePath()
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawBall()
    drawBricks()
    drawPaddle()
    drawScore()
    collisionDetection()
    drawLives()
    drawLevel()

    if(y+dy<ballRadius)
    dy=-dy
    else if(y+dy>canvas.height-ballRadius){
        if( x > paddleX && x < paddleX+paddleWidth)
        dy=-dy
        else{
            lives--
            if(!lives){
                alert("GAME OVER....")
                document.location.reload()
            }else{
                x=(canvas.width/2)+Math.floor(Math.random()*50)-20
                y=(canvas.height/2)+Math.floor(Math.random()*50)-20
                paddleX=(canvas.width-paddleWidth)/2
            }
        }
    }
    if( x+dx<ballRadius || x+dx>canvas.width-ballRadius )
    dx=-dx

    if(rightPressed && paddleX < canvas.width-paddleWidth)
    paddleX+=7
    else if(leftPressed && paddleX > 0)
    paddleX-=7
    
    x=x+dx
    y=y+dy
    if(!paused)
    requestAnimationFrame(draw)
}

document.addEventListener("mousemove",mouseMoveHandler)

function mouseMoveHandler(e){
    var relativeX=e.clientX-canvas.offsetLeft
    if(relativeX>0+paddleWidth/2 && relativeX<canvas.width-paddleWidth/2)
    paddleX=relativeX-paddleWidth/2     
}

draw()
