var canvas=document.getElementById('myCanvas')
var ctx=canvas.getContext("2d")

setInterval(draw,10)

var x=canvas.width/2
var y=canvas.height/2
var dx=2
var dy=-2

function drawBall(){
    ctx.beginPath()
    ctx.arc(x,y,10,0,Math.PI*2)
    ctx.fillStyle="lightblue"
    ctx.fill()
    ctx.closePath()
}

function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    drawBall()
    x=x+dx
    y=y+dy
}
