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
let vx=1/2;
let vy=-1/2;
let tiles={};
let cheat = false;
let done = false;
let everStarted=false;
let platformWidth = 3;
let tileWidth = 2;
let message = "Level: " + level + ", Score: " + score;
let startTime;
let power = false;
let powers = [];
let pewpew = [];
let powerTimeout;
let powerCount=0;
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
            interval = setInterval(game, 25);
        }
        if(started && cheat)
        {
            clearInterval(interval);
            interval = setInterval(game, 2);
        }
    });
    cheat = document.getElementById("cheat").checked;
    populateTiles();
    resize();
}
function startGame()
{
    if(everStarted)
    {
        populateTiles();
    }
    everStarted=true;
    if(level == 0)
    {
        startTime = new Date();
    }
    if(cheat)
    {
        interval = setInterval(game, 2);
    }
    else
    {
        interval = setInterval(game, 25);
    }
}
function startMouse()
{
    mouseFunction();
    mouseInterval=setInterval(mouseFunction, 25);
    if(!started && !done)
    {
        vx=-1/2;
        started=true;
        startGame();
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
    height = window.innerHeight - 105;
    canvas.width = width;
    canvas.height = height;
    redraw();
}
function populateTiles()
{
    tiles={};
    let power1 = Math.floor(Math.random() * (level/2+3)*6.5);
    let power2;
    do
    {
        power2 = Math.floor(Math.random() * (level/2+3)*6.5); 
    }while(power2 == power1)
    let p=0;
    for(let i=0; i<level/2+3; i++)
    {
        tiles[i*3]=[];
        if(level%2 == 0 && i%2==1)
        {
            for(let j=5.5; j < 47; j+=3+tileWidth*2)
            {
                tiles[i*3].push({x: j, power: p==power1 || p==power2});
                p++;
            }
        }
        else
        {
            for(let j=2.5; j < 49; j+=3+tileWidth*2)
            {
                tiles[i*3].push({x: j, power: p==power1 || p==power2});
                p++;
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
            if(!started && !done)
            {
                vx=-1/2;
                started=true;
                startGame();
            }
        break;
        case 39:
            keyright=true;
            if(!started && !done)
            {
                vx=1/2;
                started=true;
                startGame();
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
    if(y == 37 && x <= position + platformWidth + 0.5 && x >= position - platformWidth - 0.5 && vy > 0)
    {
        vy = -1/2;
        y+=vy*2;
        if(x <= position + platformWidth + 0.5  && x > position)
        {
            if(x <= position + platformWidth + 0.5 && x >= position + platformWidth - 0.5)
            {
                vx=1;
            }
            else if(x <= position + platformWidth - 0.5 && x > position + 0.5)
            {
                vx=1/2;
            }
            else
            {
                if(cheat)
                {
                    vx=1/2;
                }
                else
                {
                    vx=0;
                }
            }
        }
        if(x >= position - platformWidth - 0.5 && x <= position)
        {
            if(x >= position - platformWidth - 0.5 && x <= position - platformWidth + 0.5)
            {
                vx=-1;
            }
            else if(x >= position - platformWidth + 0.5 && x < position - 0.5)
            {
                vx=-1/2;
            }
            else
            {
                if(cheat)
                {
                    vx = -1/2;
                }
                else
                {
                    vx=0;
                }
            }
        }
    }
    if(y == 40)
    {
        if(cheat)
        {
            vy=-1/2;
        }
        else
        {
            endGame();
            return;
        }
    }
    if(y <= 0)
    {
        y = 0;
        vy = 1/2;
    }
    x+=vx;
    if(tiles[y] != undefined)
    {
        for(let j=0; j<tiles[y].length; j++)
        {
            if(tiles[y][j].x - tileWidth + 0.5  <= x && tiles[y][j].x + tileWidth + 1.5 >= x)
            {
                score++;
                message = "Level: " + level + ", Score: " + score;
                if((tiles[y][j].x - tileWidth + 0.5 <= x && tiles[y][j].x - tileWidth + 1.5 > x && vx >= 0) || (tiles[y][j].x + tileWidth + 1.5 >= x && tiles[y][j].x + tileWidth + 0.5 < x && vx <= 0))
                {
                    vx = 0 - vx;
                }
                if(tiles[y][j].power)
                {
                    powers.push({x: tiles[y][j].x+tileWidth-1, y: y});
                }
                tiles[y].splice(j, 1);
                y-=2*vy;
                vy = 0 - vy;
                if(checkLevelPassed())
                {
                    return;
                }
                break;
            }
        }
    }
    if(powers.length > 0)
    {
        for(let i = 0; i<powers.length; i++)
        {
            powers[i].y+=1/4;
            if(powers[i].y == 37 && powers[i].x <= position + platformWidth + 0.5 && powers[i].x >= position - platformWidth - 0.5)
            {
                powers.splice(i, 1);
                power = true;
                clearTimeout(powerTimeout);
                powerTimeout = setTimeout(endPower, 10000);
            }
            if(powers[i].y > 40)
            {
                powers.splice(i, 1);
            }
        }
    }
    if(power)
    {
        if(powerCount==0)
        {
            pewpew.push({x: position, y: 36});
        }
        powerCount++;
        if(powerCount>=39)
        {
            powerCount=0;
        }
    }
    let spliced;
    for(let i = 0; i<pewpew.length; i++)
    {
        spliced=false;
        pewpew[i].y--;
        if(tiles[pewpew[i].y]!= undefined)
        {
            for(let j=0; j<tiles[pewpew[i].y].length; j++)
            {
                if(tiles[pewpew[i].y][j].x - tileWidth + 0.5  <= pewpew[i].x && tiles[pewpew[i].y][j].x + tileWidth + 1.5 >= pewpew[i].x)
                {
                    if(tiles[pewpew[i].y][j].power)
                    {
                        powers.push({x: tiles[pewpew[i].y][j].x+tileWidth-1, y: pewpew[i].y});
                    }
                    tiles[pewpew[i].y].splice(j, 1);
                    pewpew.splice(i, 1);
                    spliced = true;
                    if(checkLevelPassed())
                    {
                        return;
                    }
                    break;
                }
            }
        }
        if(spliced)
        {
            break;
        }
        if(pewpew[i].y < 0)
        {
            pewpew.splice(i, 1);
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
            message = "You Win, Score:" + score + ", Time: "  + msToTime(new Date() - startTime);
            scoreLabel.innerHTML = message;
            done = true;
            return true;
        }
        else
        {
            level++;
            message = "Level: " + level + ", Score: " + score;
            position = 25;
            x=25;
            y=36;
            vx=1;
            vy=-1;
            powers = [];
            power = false;
            everStarted = false;
            populateTiles();
            redraw();
            return false;
        }
    }
}
function endGame()
{
    started = false;
    powers = [];
    clearInterval(interval);
    message = "Game Over, Score: " + score;
    scoreLabel.innerHTML = message;
    level = 0;
    score = 0;
    x=25;
    y=36;
    vx=1;
    vy=-1;
}
function redraw()
{
    scoreLabel.innerHTML= message;
    context.fillStyle = "#323232";
    context.fillRect(0,0, width, height);
    if(power)
    {
        context.fillStyle = "orange";
    }
    else
    {
        context.fillStyle = "orangered";
    }
    context.fillRect(width/50*position-platformWidth*width/50, height/40*37, width/50*(1+platformWidth*2), height/40); 
    context.fillStyle = "orangered";
    context.beginPath();
    context.arc(width/50*(x+0.5), height/40*(y+0.5), height/60, 0, 2 * Math.PI);
    context.fill();
    for(let i=0; i<level/2+3; i++)
    {
        for(let j=0; j<tiles[i*3].length; j++)
        {
            if(tiles[i*3][j].power)
            {
                context.fillStyle = "orange"; 
            }
            context.fillRect(width/50*(tiles[i*3][j].x-1), height/40*i*3, width/50*(1+tileWidth*2), height/40);
            if(tiles[i*3][j].power)
            {
                context.fillStyle = "orangered";
            }
        }
    }
    if(powers.length > 0)
    {
        context.fillStyle = "orange"; 
        for(let i = 0; i<powers.length; i++)
        {
            context.beginPath();
            context.arc(width/50*(powers[i].x+0.5), height/40*(powers[i].y+0.5), height/100, 0, 2 * Math.PI);
            context.fill();
        }
        context.fillStyle = "orangered";
    }
    for(let i = 0; i<pewpew.length; i++)
    {
        context.beginPath();
        context.arc(width/50*(pewpew[i].x+0.5), height/40*(pewpew[i].y+0.5), height/100, 0, 2 * Math.PI);
        context.fill();
    }
}
function msToTime(duration) {
    let seconds = Math.floor((duration / 1000) % 60);
    let  minutes = Math.floor((duration / (1000 * 60)) % 60);
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
}
function endPower()
{
    powerCount=0;
    power=false;
}