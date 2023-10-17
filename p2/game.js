let canvasX=1535,canvasY=721;
let pol=[[0,0,0],
         [0,0,0],
         [0,0,0]];
let x=200,y=100,turn=1,win=0;
function checkIfPlayerWinsByRow(row, player) {
    return pol[row].filter(function (obj) {return obj == player}).length > 1 && pol[row].filter(function (obj) {return obj == player}).length < 3;
}

function checkIfPlayerWinsByCol(col, player) {
    return pol.map(function (obj) { return obj[col]; }).filter(function (obj) { return obj == player}).length > 1 && pol.map(function (obj) { return obj[col]; }).filter(function (obj) { return obj == player}).length < 3 ;
}
function minimax(pole,which){
    let score=0
    let won=false;
    for(let tx=0;tx<3;tx++){
        for(let ty=0;ty<3;ty++){
            if(pole[tx][ty]==0){
                pole[tx][ty]=which;
                //  score-=2
                for(let tx1=0;tx1<3;tx1++){
                    if(pole[tx1][0]==which){
                        if(pole[tx1][1]==which){
                            if(pole[tx1][2]==which){
                                if(which==1){
                                    score--
                                    won=true
                                }else{
                                    score++
                                    won=true
                                }
                            }
                        }
                    }
                }
                for(let ty1=0;ty1<3;ty1++){
                    if(pole[0][ty1]==which){
                        if(pole[1][ty1]==which){
                            if(pole[2][ty1]==which){
                                if(which==1){
                                    score--
                                    won=true
                                }else{
                                    score++
                                    won=true
                                }
                            }
                        }   
                    }
                }
                if(pole[0][0]==which){
                    if(pole[1][1]==which){
                        if(pole[2][2]==which){
                            if(which==1){
                                score--
                                won=true
                            }else{
                                score++
                                won=true
                            }
                        }
                    }
                }
                if(pole[0][2]==which){
                    if(pole[1][1]==which){
                        if(pole[2][0]==which){
                            if(which==1){
                                score--
                                won=true
                            }else{
                                score++
                                won=true
                            }
                        }
                    }
                }
                if(!won){
                    if(which==1){
                        score+= minimax(pole,2)
                    }else{
                        score+= minimax(pole,1)
                    }
                }
                pole[tx][ty]=0
            }
        }
    }
    return score 
}
function ai(pole){
    for(let col=0;col<3;col++){
        if(checkIfPlayerWinsByCol(col,2)){
            for(let i=0;i<3;i++){
                if(pol[i][col]==0){
                    pol[i][col]=2
                    return 0
                }
            }
        }
    }
    for(let row=0;row<3;row++){
        if(checkIfPlayerWinsByRow(row,2)){
            for(let i=0;i<3;i++){
                if(pol[row][i]==0){
                    pol[row][i]=2
                    return 0
                }
            }
        }
    }
    let di=0;
    for(let i=0;i<3;i++){
        if(pol[i][i]==2){
            di++
        }
    }
    if(di>1 && di<3){
        for(let i=0;i<3;i++){
            if(pol[i][i]==0){
                pol[i][i]=2
                return 0
            }
        }
    }
    di=0
    for(let i=0;i<3;i++){
        if(pol[i][2-i]==2){
            di++
        }
    }
    if(di>1 && di<3){
        for(let i=0;i<3;i++){
            if(pol[i][2-i]==0){
                pol[i][2-i]=2
                return 0
            }
        }
    }
    for(let col=0;col<3;col++){
        if(checkIfPlayerWinsByCol(col,1)){
            for(let i=0;i<3;i++){
                if(pol[i][col]==0){
                    pol[i][col]=2
                    return 0
                }
            }
        }
    }
    for(let row=0;row<3;row++){
        if(checkIfPlayerWinsByRow(row,1)){
            for(let i=0;i<3;i++){
                if(pol[row][i]==0){
                    pol[row][i]=2
                    return 0
                }
            }
        }
    }
    di=0;
    for(let i=0;i<3;i++){
        if(pol[i][i]==1){
            di++
        }
    }
    if(di>1 && di<3){
        for(let i=0;i<3;i++){
            if(pol[i][i]==0){
                pol[i][i]=2
                return 0
            }
        }
    }
    di=0
    for(let i=0;i<3;i++){
        if(pol[i][2-i]==1){
            di++
        }
    }
    if(di>1 && di<3){
        for(let i=0;i<3;i++){
            if(pol[i][2-i]==0){
                pol[i][2-i]=2
                return 0
            }
        }
    }
    let aipol=[[],[],[]];
    let score=[[-Infinity,-Infinity,-Infinity],
               [-Infinity,-Infinity,-Infinity],
               [-Infinity,-Infinity,-Infinity]];
    let mx,my,hs=-Infinity;
    for(let tx2=0;tx2<3;tx2++){
        for(let ty2=0;ty2<3;ty2++){
            for(let tx=0;tx<3;tx++){
                aipol[tx]=[]
                for(let ty=0;ty<3;ty++){
                    aipol[tx][ty]=pole[tx][ty]
                }
            }
            if(aipol[tx2][ty2]==0){
                aipol[tx2][ty2]=2
                score[tx2][ty2]=minimax(aipol,1)
                if(tx2<3&&ty2<3){
                    aipol[tx2][ty2]=0 
                }
            }
        }
    }
    for(let tx=0;tx<3;tx++){
        for(let ty=0;ty<3;ty++){
            if(score[tx][ty]>hs){
                hs=score[tx][ty]
                mx=tx
                my=ty
            }
        }
    }
    for(let tx=0;tx<3;tx++){
        for(let ty=0;ty<3;ty++){
            context.font="30px Arial"
            context.fillText(score[tx][ty],tx*100+x+30,ty*100+y+30)
            
        }
    }
    pol[mx][my]=2
}
function update() {
    for(let tx=0;tx<3;tx++){
        if(pol[tx][0]==1){
            if(pol[tx][1]==1){
                if(pol[tx][2]==1){
                    win=1
                }
            }
        }
        if(pol[tx][0]==2){
            if(pol[tx][1]==2){
                if(pol[tx][2]==2){
                    win=2
                }
            }
        }
    }
    for(let ty=0;ty<3;ty++){
        if(pol[0][ty]==1){
            if(pol[1][ty]==1){
                if(pol[2][ty]==1){
                    win=1
                }
            }
        }
        if(pol[0][ty]==2){
            if(pol[1][ty]==2){
                if(pol[2][ty]==2){
                    win=2
                }
            }
        }
    }
    if(pol[0][0]==1){
        if(pol[1][1]==1){
            if(pol[2][2]==1){
                win=1
            }
        }
    }
    if(pol[0][2]==1){
        if(pol[1][1]==1){
            if(pol[2][0]==1){
                win=1
            }
        }
    }
    if(pol[0][0]==2){
        if(pol[1][1]==2){
            if(pol[2][2]==2){
                win=2
            }
        }
    }
    if(pol[0][2]==2){
        if(pol[1][1]==2){
            if(pol[2][0]==2){
                win=2
            }
        }
    }
    let dodraw=true
    for(let tx=0;tx<3;tx++){
        for(let ty=0;ty<3;ty++){
            if(pol[tx][ty]==0){
                dodraw=false
            }
        }
    }
    if(dodraw){win=3}
    if(win>0){turn=10}
    if(turn==1){
        ai(pol);
        turn=0
    }
};
function draw() {
    context.fillStyle="black"
    context.fillRect(0,0,canvasX,canvasY)
    context.lineWidth=5
    context.globalAlpha=1
    context.strokeStyle="white"
    drawLine(100+x,0+y,100+x,300+y)
    drawLine(200+x,0+y,200+x,300+y)
    drawLine(0+x,100+y,300+x,100+y)
    drawLine(0+x,200+y,300+x,200+y)
    context.lineWidth=3
    context.globalAlpha=0.25
    context.strokeStyle="white"
    drawLine(100+x,0+y,100+x,300+y)
    drawLine(200+x,0+y,200+x,300+y)
    drawLine(0+x,100+y,300+x,100+y)
    drawLine(0+x,200+y,300+x,200+y)
    for(let tx=0;tx<3;tx++){
        for(let ty=0;ty<3;ty++){
            if(pol[tx][ty]==1){
                context.lineWidth=1*1.7
                context.globalAlpha=1
                context.strokeStyle="orange"
                drawLine(tx*100+x+14,ty*100+y+15,tx*100+x-15+100,ty*100+y-15+100)
                drawLine(tx*100+x+14,ty*100+y-15+100,tx*100+x-15+100,ty*100+y+15)
                context.lineWidth=5*1.7
                context.globalAlpha=0.5
                context.strokeStyle="orange"
                drawLine(tx*100+x+14,ty*100+y+15,tx*100+x-15+100,ty*100+y-15+100)
                drawLine(tx*100+x+14,ty*100+y-15+100,tx*100+x-15+100,ty*100+y+15)
                context.lineWidth=10*1.7
                context.globalAlpha=0.1
                context.strokeStyle="orange"
                drawLine(tx*100+x+14,ty*100+y+15,tx*100+x-15+100,ty*100+y-15+100)
                drawLine(tx*100+x+14,ty*100+y-15+100,tx*100+x-15+100,ty*100+y+15)
            }
            if(pol[tx][ty]==2){
                context.lineWidth=1*1.7
                context.globalAlpha=1
                context.strokeStyle="lightgray"
                context.beginPath()
                context.arc(tx*100+x+50,ty*100+y+50,37.5,0,2*Math.PI)
                context.stroke();
                context.lineWidth=5*1.7
                context.globalAlpha=0.5
                context.strokeStyle="lightgray"
                context.beginPath()
                context.arc(tx*100+x+50,ty*100+y+50,37.5,0,2*Math.PI)
                context.stroke();
                context.lineWidth=10*1.7
                context.globalAlpha=0.1
                context.strokeStyle="lightgray"
                context.beginPath()
                context.arc(tx*100+x+50,ty*100+y+50,37.5,0,2*Math.PI)
                context.stroke();
            }
        }
    }
    if(win>0){

        if(win==1){
            context.globalAlpha=1
            context.lineWidth=10
            context.font="100px Arial"
            context.fillStyle="white"
            context.fillText('won',1000,325)
            context.lineWidth=1*1.7
            context.globalAlpha=1
            context.strokeStyle="orange"
            drawLine(850,250,850+100,250+100)
            drawLine(850,250+100,850+100,250)
            context.lineWidth=5*1.7
            context.globalAlpha=0.5
            context.strokeStyle="orange"
            drawLine(850,250,850+100,250+100)
            drawLine(850,250+100,850+100,250)
            context.lineWidth=10*1.7
            context.globalAlpha=0.1
            context.strokeStyle="orange"
            drawLine(850,250,850+100,250+100)
            drawLine(850,250+100,850+100,250)
        }
        if(win==2){
            context.globalAlpha=1
            context.lineWidth=10
            context.font="100px Arial"
            context.fillStyle="white"
            context.fillText('won',1000,325)
            context.lineWidth=1*1.7
            context.globalAlpha=1
            context.strokeStyle="lightgray"
            context.beginPath()
            context.arc(925,250+50,40,0,2*Math.PI)
            context.stroke();
            context.lineWidth=5*1.7
            context.globalAlpha=0.5
            context.strokeStyle="lightgray"
            context.beginPath()
            context.arc(925,250+50,40,0,2*Math.PI)
            context.stroke();
            context.lineWidth=10*1.7
            context.globalAlpha=0.1
            context.strokeStyle="lightgray"
            context.beginPath()
            context.arc(925,250+50,40,0,2*Math.PI)
            context.stroke();
        }
        if(win==3){
            context.globalAlpha=1
            context.lineWidth=10
            context.font="100px Arial"
            context.fillStyle="white"
            context.fillText('draw',1000,325)
            
        }
    }
}

function keyup(key) {
}

function mouseup() {
    if(turn==0){
        if(pol[Math.floor((mouseX-x)/100)][Math.floor((mouseY-y)/100)]==0){
            pol[Math.floor((mouseX-x)/100)][Math.floor((mouseY-y)/100)]=1
            turn=1
        }
    }
}
