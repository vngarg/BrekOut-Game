var canvas=document.getElementById('myCanvas')
var ctx=canvas.getContext("2d")

ctx.beginPath()
ctx.rect(40,50,50,60)
ctx.fillStyle="red"
ctx.fill()
ctx.closePath()

ctx.beginPath()
ctx.arc(120,120,20,15,Math.PI,true)
ctx.fillStyle="green"
ctx.fill() 
ctx.closePath()

ctx.beginPath()
ctx.rect(200,100,40,40)
ctx.strokeStyle="rgba(0,0,0,0.2)"
ctx.stroke()
ctx.closePath()