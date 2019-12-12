var canvas=document.getElementById('myCanvas')
var ctx=canvas.getContext("2d")

var x=canvas.width/2
var y=canvas.height/2
var ballRadius=10
var dx=2
var dy=-2
var paddleHeight=10
var paddleWidth=75
var paddleX=(canvas.width-paddleWidth)/2
var rightPressed=false
var leftPressed=false
var brickRowCount=3
var brickColCount=5
var brickPadding=10
var brickOffsetTop=30
var brickOffsetLeft=30
var brickHeight=20
var brickWidth=75
var score=0
var lives=3

var bricks=[]
for(c=0;c<brickColCount;c++){
    bricks[c]=[]
    for(r=0;r<brickRowCount;r++)
    bricks[c][r]={ x:0 , y:0 , status:1 }
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
                    alert("CONGRATS....YOU WON..")
                    document.location.reload()
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
                x=canvas.width/2
                y=canvas.height/2
                dx=2
                dy=-2
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
}

setInterval(draw,10)