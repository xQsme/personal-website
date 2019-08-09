let canvas;
let context;
let level = 0;
let score = 0;
let scoreLabel;
let interval;
let mouseInterval;
let mouseX;
let started = false;
let position = 25;
let width;
let height;
let keyleft = false;
let keyright = false;
let x=25;
let y=36;
let vx=1;
let vy=-1;
let tiles={};
let cheat = false;
window.onload = function() {
    scoreLabel=document.getElementById("score");
    canvas = document.getElementById("game");
    context= canvas.getContext("2d");
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", changeDirection);
    window.addEventListener("keyup", stopMoving);
    canvas.addEventListener("mousedown", startMouse);
    canvas.addEventListener("mouseup", endMouse);
    canvas.addEventListener("mousemove", mousePosition);
    canvas.addEventListener("touchstart", startMouse);
    canvas.addEventListener("touchend", endMouse);
    canvas.addEventListener("touchmove", mousePosition);
    document.getElementById("cheat").addEventListener("change", e => {
        cheat = e.target.checked;
        if(started && !cheat)
        {
            clearInterval(interval);
            interval = setInterval(game, 50);
        }
        if(started && cheat)
        {
            clearInterval(interval);
            interval = setInterval(game, 5);
        }
    });
    cheat = document.getElementById("cheat").checked;
    populateTiles();
    resize();
}
function startMouse()
{
    mouseFunction();
    mouseInterval=setInterval(mouseFunction, 50);
    if(!started)
    {
        vx=-1;
        started=true;
        populateTiles();
        if(cheat)
        {
            interval = setInterval(game, 5);
        }
        else
        {
            interval = setInterval(game, 50);
        }
    }
}
function endMouse()
{
    clearInterval(mouseInterval);
}
function mouseFunction()
{
    position = mouseX/width*50;
}
function mousePosition(event)
{
    if(event.changedTouches != undefined)
    {
        mouseX = event.changedTouches[0].clientX;
    }
    else
    {
        mouseX=event.clientX;
    }
}
function resize()
{
    width = window.innerWidth;
    height = window.innerHeight - 104;
    canvas.width = width;
    canvas.height = height;
    redraw();
}
function populateTiles()
{
    tiles={};
    for(let i=0; i<level/2+3; i++)
    {
        tiles[i*3]=[];
        if(level%2 == 0 && i%2==1)
        {
            for(let j=7; j < 47; j+=5)
            {
    
                tiles[i*3].push(j);
            }
        }
        else
        {
            for(let j=4; j < 49; j+=5)
            {
    
                tiles[i*3].push(j);
            }
        }

    }
}
function changeDirection(event)
{
    switch(event.keyCode)
    {
        case 37:
            keyleft=true;
            if(!started)
            {
                vx=-1;
                started=true;
                populateTiles();
                if(cheat)
                {
                    interval = setInterval(game, 5);
                }
                else
                {
                    interval = setInterval(game, 50);
                }
            }
        break;
        case 39:
            keyright=true;
            if(!started)
            {
                vx=1;
                started=true;
                populateTiles();
                if(cheat)
                {
                    interval = setInterval(game, 5);
                }
                else
                {
                    interval = setInterval(game, 50);
                }
            }
        break;
    }
}
function stopMoving(event)
{
    switch(event.keyCode)
    {
        case 37:
            keyleft=false;
        break;
        case 39:
            keyright=false;
        break;
    }
}
function game()
{
    if(keyleft)
    {
        position--;
    }
    if(keyright)
    {
        position++;
    }
    if(position > 48)
    {
        position = 48;
    }
    if(position < 2)
    {
        position=2;
    }
    y+=vy;
    if(x <= 0)
    {
        x = 0;
        vx = 0-vx;
    }
    if(x >= 49)
    {
        x = 49
        vx = 0-vx;
    }
    if(y == 37 && (x <= position + 3 && x >= position - 3))
    {
        y = 35;
        vy = -1;
        if(x <= position + 3 && x > position)
        {
            if(x == position + 3)
            {
                vx=1;
            }
            else if(x == position +2)
            {
                vx=1/2;
            }
            else
            {
                vx=1/3;
            }

        }
        if(x >= position - 3 && x < position)
        {
            vx=-1;
        }
    }
    if(y == 40)
    {
        if(cheat)
        {
            vy=-1;
        }
        else
        {
            endGame();
            return;
        }
    }
    if(y < 1)
    {
        y = 0;
        vy = 1;
    }
    x+=vx;
    if(tiles[y] != undefined)
    {
        for(let j=0; j<tiles[y].length; j++)
        {
            if(tiles[y][j] - 2 <= x && tiles[y][j] + 2 >= x)
            {
                score++;
                if((tiles[y][j] - 2 == x && vx > 0) || (tiles[y][j] + 2 == x && vx < 0))
                {
                    vx = 0 - vx;
                }
                tiles[y].splice(j, 1);
                vy = 0 - vy;
    
                if(checkLevelPassed())
                {
                    return;
                }
                break;
            }
        }
    }
    redraw();
}
function checkLevelPassed()
{
    let check=true;
    for(let i=0; i<level/2+3; i++)
    {
        if(tiles[i*3].length != 0)
        {
            check=false;
            break;
        }
    }
    if(check)
    {
        started = false;
        clearInterval(interval);
        if(level == 10)
        {
            redraw();
            scoreLabel.innerHTML = "You Win, Score:" + score;
            return true;
        }
        else
        {
            level++;
            scoreLabel.innerHTML = "Level " + level + ", Score " + score;
            position = 25;
            x=25;
            y=36;
            vx=1;
            vy=-1;
            populateTiles();
            redraw();
            return false;
        }
    }
}
function endGame()
{
    started = false;
    clearInterval(interval);
    scoreLabel.innerHTML = "Game Over, Score: " + score;
    level = 0;
    score = 0;
    x=25;
    y=36;
    vx=1;
    vy=-1;
}
function redraw()
{
    scoreLabel.innerHTML= "Level " + level + ", Score " + score;
    context.fillStyle = "#323232";
    context.fillRect(0,0, width, height);
    context.fillStyle = "orangered";
    context.fillRect(width/50*position-width/25, height/40*37, width/10, height/40); 
    context.beginPath();
    context.arc(width/50*(x+0.5), height/40*(y+0.5), width/100, 0, 2 * Math.PI);
    context.fill();
    for(let i=0; i<level/2+3; i++)
    {
        for(let j=0; j<tiles[i*3].length; j++)
        {
            context.fillRect(width/50*tiles[i*3][j], height/40*i*3, width/50*3, height/40);
        }
    }

}