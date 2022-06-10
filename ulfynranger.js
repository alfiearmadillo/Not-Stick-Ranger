//stages
//shop
//world map

// skill points
// defence
// paladin mechanic
// save / load
// ranged projectile?
// sprites?
// levels?

// Idle game? Random enemy stats, weapon stats, scale off level
// auto sell from floor upgrade, item despawn timer, shop for upgrades
// enemy attacks, revival, auto revive


var nearTarget=0
var myGamePiece;
//let dmgNum=[]
let items=[]
let droppedItem = []
let div = document.createElement("div");
div.setAttribute("id", "container")
document.body.insertBefore(div, document.body.childNodes[0])
let divcontainer = document.getElementById("container")
let emptySlot = -1
let money = 0
let lastmoney = -1
let playerNumberStatsShown
let playerNumberStatsChanged=-1
let itemNumberStatsChanged=-1
let level = 0
let totalEXP=0
let lastEXP = -1
let expToLevelUp=50
let lastLevelExp=0
let gameover = 100

function startGame() {
    myGamePiece = new component(30, 30, "#ff0000", 160, 270);
    myGamePiece.gravity = 0.5;
    myGamePiece.type="player"
    myGamePiece.colour="#ff0000"
    myGamePiece.id="0"
    myGamePiece.maxhp=100
    myGamePiece.hp=100
    myGamePiece.atkCD=0
    myGamePiece.atkRateMult=1
    myGamePiece.damageMult=1
    myGamePiece.rangeMult=1
    myGamePiece.size=30
    myGamePiece.item=items[0]
    myGamePiece2 = new component(30, 30, "#0000ff", 120, 270);
    myGamePiece2.gravity = 0.5;
    myGamePiece2.type="player"
    myGamePiece2.colour="#0000ff"
    myGamePiece2.id="1"
    myGamePiece2.hp=100
    myGamePiece2.maxhp=100
    myGamePiece2.atkCD=0
    myGamePiece2.atkRateMult=1
    myGamePiece2.damageMult=1
    myGamePiece2.rangeMult=1
    myGamePiece2.size=30
    myGamePiece2.item=items[0]
    myGamePiece3 = new component(30, 30, "#00ff00", 80, 270);
    myGamePiece3.gravity = 0.5;
    myGamePiece3.type="player"
    myGamePiece3.colour="#00ff00"
    myGamePiece3.id="2"
    myGamePiece3.hp=100
    myGamePiece3.maxhp=100
    myGamePiece3.atkCD=0
    myGamePiece3.atkRateMult=1
    myGamePiece3.damageMult=1
    myGamePiece3.rangeMult=1
    myGamePiece3.size=30
    myGamePiece3.item=items[0]
    myGamePiece4 = new component(30, 30, "#ffff00", 40, 270);
    myGamePiece4.gravity = 0.5;
    myGamePiece4.type="player"
    myGamePiece4.colour="#ffff00"
    myGamePiece4.id="3"
    myGamePiece4.hp=100
    myGamePiece4.maxhp=100
    myGamePiece4.atkCD=0
    myGamePiece4.atkRateMult=1
    myGamePiece4.damageMult=1
    myGamePiece4.rangeMult=1
    myGamePiece4.size=30
    myGamePiece4.item=items[0]
    playerNumberStatsShown=myGamePiece
    myGameArea.start();
}



items[0]={name:"None",damageMin:1,damageMax:1,range:11,atkRate:100,lifeSteal:0,defence:0,type:"None", colour:'#b4b4b4', worth:0, multi:0}
items[1]={name:"Test Sword",damageMin:2,damageMax:4,range:25,atkRate:50,lifeSteal:0,defence:0,type:"Sword", colour:'#a83232', worth:10, multi:0}
items[2]={name:"Test Shield",damageMin:1,damageMax:1,range:15,atkRate:100,lifeSteal:0,defence:1,type:"Shield", colour:'#75a832', worth:10, multi:0}
items[3]={name:"Test Bow",damageMin:1,damageMax:3,range:160,atkRate:66,lifeSteal:0,defence:0,type:"Bow", colour:'#634f1c', worth:10, multi:0}
items[4]={name:"Test Staff",damageMin:0,damageMax:1,range:300,atkRate:200,lifeSteal:0,defence:0,type:"Staff", colour:'#660033', worth:10, multi:0}
items[5]={name:"CR_Room1Basic",damageMin:1,damageMax:2,range:45,atkRate:200,lifeSteal:0,defence:0,type:"CR_Melee", colour:'#191919', worth:-1, multi:0}
items[6]={name:"CR_Room1Boss",damageMin:5,damageMax:18,range:300,atkRate:200,lifeSteal:0,defence:0,type:"CR_Special1", colour:'#191919', worth:-1, multi:1}

function addItem(player, itemID){
    switch(player){
        case 0:
            player=myGamePiece4
            break;
        case 1:
            player=myGamePiece3
            break;
        case 2:
            player=myGamePiece2
            break;
        case 3:
            player=myGamePiece
            break;
        default:
            break;
    }
    player.item=items[itemID]
}

let buttonsToMake=15
let inv = []
let pIcons = []

makeButtons(buttonsToMake);

function makeButtons(count){
    for(p=0;p<count;p++){
        if(p<4){
            pIcons[p]=document.createElement("div");
            pIcons[p].classList.add("pIcon")
            pIcons[p].setAttribute("id", `icon${p}`)
            divcontainer.insertBefore(pIcons[p], divcontainer.firstChild)
        }
        inv[p] = document.createElement("button");
        inv[p].classList.add('button')
        inv[p].setAttribute("onmousedown", `clickButton(${p})`)
        inv[p].setAttribute("id", `${p}`)
        divcontainer.appendChild(inv[p]);
    }
}

moneyBox=document.createElement("div");
moneyBox.setAttribute("id", `moneybox`)
divcontainer.insertBefore(moneyBox, divcontainer.firstChild)
sellItemBox=document.createElement("div");
sellItemBox.setAttribute("id", `sellItemBox`)
divcontainer.insertBefore(sellItemBox, divcontainer.firstChild)
playerStatsBox=document.createElement("div");
playerStatsBox.setAttribute("id", `playerStatsBox`)
divcontainer.appendChild(playerStatsBox, divcontainer.firstChild)
playerStatsPic=document.createElement("div");
playerStatsPic.setAttribute("id", `playerStatsPic`)
divcontainer.appendChild(playerStatsPic, divcontainer.firstChild)
itemStatsBox=document.createElement("div");
itemStatsBox.setAttribute("id", `itemStatsBox`)
divcontainer.appendChild(itemStatsBox, divcontainer.firstChild)
itemStatsPic=document.createElement("div");
itemStatsPic.setAttribute("id", `itemStatsPic`)
divcontainer.appendChild(itemStatsPic, divcontainer.firstChild)
dirt=document.createElement("div");
dirt.setAttribute("id", `dirt`)
divcontainer.appendChild(dirt, divcontainer.firstChild)
grass=document.createElement("div");
grass.setAttribute("id", `grass`)
divcontainer.appendChild(grass, divcontainer.firstChild)
expBarUnder=document.createElement("div");
expBarUnder.setAttribute("id", `expBarUnder`)
divcontainer.appendChild(expBarUnder, divcontainer.firstChild)
expBarOver=document.createElement("div");
expBarOver.setAttribute("id", `expBarOver`)
divcontainer.appendChild(expBarOver, divcontainer.firstChild)
reviveButton=document.createElement("div");
reviveButton.setAttribute("id", `reviveButton`)
divcontainer.appendChild(reviveButton, divcontainer.firstChild)

for(n=0;n<buttonsToMake;n++){
    inv[n]={
        invSlot:n,
        storedItem:0,
    }
}

for(n=0;n<buttonsToMake;n++){
document.getElementById(n).addEventListener("mouseover", makeButtonLight);
function makeButtonLight(){
    if(this.style.background==="rgb(180, 180, 180)" || this.style.background===""){
    this.style.background='#d2d2d2'
    }
    if(lastslot===14){
        
        if(items[inv[this.id].storedItem].worth===0){
            sellItemBox.innerHTML = `Sell<br />Item`
        }else{
        sellItemBox.innerHTML = `Sell<br />£${items[inv[this.id].storedItem].worth}`
        }
    }
}
document.getElementById(n).addEventListener("mouseout", makeButtonDark);
function makeButtonDark(){
    if(this.style.background==="rgb(210, 210, 210)"||this.style.background===""){
    this.style.background='#b4b4b4'
    }
}
}

reviveButton.innerHTML="Player Alive"
document.getElementById("reviveButton").style.background="#517a59"
document.getElementById("reviveButton").addEventListener("mouseup", revivePlayer);
document.getElementById("reviveButton").addEventListener("mouseover", revivePlayerActiveColour);
function revivePlayer(){
    if(myGamePiece.hp===0&&myGamePiece2.hp===0&&myGamePiece3.hp===0&&myGamePiece4.hp===0){}else{
    if(playerNumberStatsShown.hp===0){
    if(money>=Math.floor((money/2)+5+(level*2))){
    playerNumberStatsShown.hp=playerNumberStatsShown.maxhp/2
    money=money-Math.floor((money/2)+5+(level*2))
    document.getElementById("reviveButton").style.background="#517a59"
    reviveButton.innerHTML="Player Alive"
    }
    }
}
}
function revivePlayerActiveColour(){
        if(playerNumberStatsShown.hp===0){
            if(money>=Math.floor((money/2)+5+(level*2))){
                this.style.background="#517a59"
            }else{
                this.style.background="#9c4c4c" 
            }
    }
}

//inventory stuff area
let lastslot= -1
let tmpObj

// if(inv.findIndex(thing => thing.storedItem===4)>-1){ //change this to for, add colour to item
// document.getElementById(inv.findIndex(thing => thing.storedItem===4)).style.background='#660033'
// }

for(e=0;e<inv.length;e++){
    document.getElementById(e).style.background=items[inv[e].storedItem].colour
}



function clickButton(num){

    if(num<4){
        switch(num){
            case 0:
                playerNumberStatsShown=myGamePiece4
                break;
            case 1:
                playerNumberStatsShown=myGamePiece3
                break;
            case 2:
                playerNumberStatsShown=myGamePiece2
                break;
            case 3:
                playerNumberStatsShown=myGamePiece
                break;
            default:
                break;
        }
        if(playerNumberStatsShown.hp>0){
            reviveButton.innerHTML="Player Alive"
            document.getElementById("reviveButton").style.background="#517a59"
        }
    }
    
    if(lastslot>-1){
    tmpObj=inv[num].storedItem
    if(lastslot!==inv.length-1 && num!== inv.length-1){//switching inv slots around
        inv[num].storedItem=inv[lastslot].storedItem
        
    }else{
        inv[14].storedItem=0
        money=money+items[inv[num].storedItem].worth
        money=money+items[inv[lastslot].storedItem].worth
        inv[num].storedItem=0
    }
    inv[lastslot].storedItem=tmpObj
    tmpObj=null
    console.log(inv[num])
    if(lastslot<4){
        addItem(lastslot, inv[lastslot].storedItem)
    }
    lastslot=-1
    for(x=0;x<inv.length;x++){
        document.getElementById(x).style.background='#b4b4b4'
        document.getElementById(x).style.borderColor='#8a8a8a'
        document.getElementById(inv.length-1).style.background='#5c5c5c'
    } 
    }else{
    lastslot = num
    document.getElementById(lastslot).style.borderColor='#7a7bb7'
    }
    if(num<4){
        addItem(num, inv[num].storedItem)
    }
    
    for(e=0;e<inv.length;e++){
        document.getElementById(e).style.background=items[inv[e].storedItem].colour
    }
    document.getElementById(inv.length-1).style.background='#5c5c5c'
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 960;
        this.canvas.height = 540;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function randomDmg(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function refreshPlayerStatsBox(){
    //if(playerNumberStatsChanged!==playerNumberStatsShown||totalEXP!==lastEXP){
    switch(playerNumberStatsShown){
        case 0:
            playerNumberStatsShown=myGamePiece4
            break;
        case 1:
            playerNumberStatsShown=myGamePiece3
            break;
        case 2:
            playerNumberStatsShown=myGamePiece2
            break;
        case 3:
            playerNumberStatsShown=myGamePiece
            break;
        default:
            break;
    }
    if(playerNumberStatsShown.hp>0){
    reviveButton.innerHTML="Player Alive"
            document.getElementById("reviveButton").style.background="#517a59"
        }
    playerStatsBox.innerHTML=`
    <br />
    Health: ${playerNumberStatsShown.hp}/${playerNumberStatsShown.maxhp}<br/>
    Damage: ${playerNumberStatsShown.item.damageMin*playerNumberStatsShown.damageMult} - ${playerNumberStatsShown.item.damageMax*playerNumberStatsShown.damageMult}<br/>
    Range: ${playerNumberStatsShown.item.range*playerNumberStatsShown.rangeMult}<br/>
    Attack Delay: ${playerNumberStatsShown.item.atkRate*playerNumberStatsShown.atkRateMult}<br/>
    Defence: ${playerNumberStatsShown.item.defence}<br/>
    Lifesteal: ${playerNumberStatsShown.item.lifeSteal}<br/>
    <br/>
    <br/>
    Level: ${level}<br/>
    EXP: ${totalEXP}
    `
    playerStatsPic.style.background=playerNumberStatsShown.colour
    playerNumberStatsChanged=playerNumberStatsShown
//}
}

function refreshItemStatsBox(){
    if(lastslot!==-1&&items[inv[lastslot].storedItem].name!=="None"){
        if(itemNumberStatsChanged!==items[inv[lastslot].storedItem]){
    itemStatsBox.innerHTML=`
    <br/>
    Name: ${items[inv[lastslot].storedItem].name}<br/>
    Damage: ${items[inv[lastslot].storedItem].damageMin} - ${items[inv[lastslot].storedItem].damageMax}<br/>
    Range: ${items[inv[lastslot].storedItem].range}<br/>
    Attack Delay: ${items[inv[lastslot].storedItem].atkRate}<br/>
    Defence: ${items[inv[lastslot].storedItem].defence}<br/>
    Lifesteal: ${items[inv[lastslot].storedItem].lifeSteal}<br/>
    Value: £${items[inv[lastslot].storedItem].worth}
    `
    itemStatsPic.style.background=items[inv[lastslot].storedItem].colour
itemNumberStatsChanged=lastslot
        }
    }
}


function component(width, height, color, x, y) {//draw new boxes
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;
    this.gravity = 0;
    this.gravitySpeed = 0;
    this.update = function() {
        if(this.type==="item"||this.type==="health"||this.type==="coin"){
            if((Math.floor(this.data.cooldown/5))%2===1){
                
            }else{
                ctx = myGameArea.context;
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }else{
            ctx = myGameArea.context;
            
            if(this.hp<=0){
                ctx.fillStyle = "#666666"
                ctx.fillRect(this.x+1, this.y+2, this.width-2, this.height-2);
            }else{
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
            
        }
        
        if(this.type==="enemy"||this.type==="player" && this.hp>0){
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(this.x, this.y-15, this.size, 2);
            ctx.fillStyle = "#007f00";
            
            ctx.fillRect(this.x-1, this.y-16, ((this.hp/this.maxhp)*this.size)+2, 4);
        }
        
    }
    this.newPos = function() {//find new positions
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;

        if(this.type==="player" && this.hp>0){
            for(b=0;b<droppedItem.length;b++){
                if(Math.abs(droppedItem[b].x - this.x) < 50 &&
                (Math.abs(droppedItem[b].y - this.y) < 50)){

                    emptySlot=inv.findIndex(element => element.storedItem===0 && element.invSlot>3) //picking up items

                    if(droppedItem[b].type==="coin"&&droppedItem[b].data.cooldown===0){
                        money=money+droppedItem[b].data.value
                        droppedItem.splice(b, 1)
                    }else if(droppedItem[b].type==="health"&&droppedItem[b].data.cooldown===0){
                        if(this.hp!==this.maxhp){
                        this.hp=this.hp+droppedItem[b].data.value
                        if(this.hp>this.maxhp){
                            this.hp=this.maxhp
                        }
                        droppedItem.splice(b, 1)
                    }
                    }else if(droppedItem[b].type==="item"&&droppedItem[b].data.cooldown===0){
                        if(emptySlot!==-1&&emptySlot!==inv.length-1){
                            inv[emptySlot].storedItem=droppedItem[b].data.value
                            droppedItem.splice(b, 1)
                            for(e=0;e<inv.length;e++){
                                document.getElementById(e).style.background=items[inv[e].storedItem].colour
                            }


                        }
                    }
                }
            }
            document.getElementById(inv.length-1).style.background='#5c5c5c'
        }

        this.hitBottom();
        this.hitLeft();
        this.hitRight();
    }

//let h=0;

    this.hitBottom = function() {//floor bounce
        var rockbottom = myGameArea.canvas.height - this.height-30;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed=0
            this.speedX=this.speedX-this.speedX*0.3
            if(this.hp>0||this.type!=="player"){
            this.speedY=this.speedY-this.speedY*0.3
            }else{
                this.speedY=0
            }
            if(this.type==="player" && this.hp>0){
            nearTarget = closestEnemy(enemy, this.x)//logic to do only while on floor
            if(enemy.length!==0){
                if (Math.abs(enemy[nearTarget].x+(enemy[nearTarget].size/2-15) - this.x) < this.item.range+(enemy[nearTarget].size/2)+15&&
                   ((Math.abs(enemy[nearTarget].y+(enemy[nearTarget].size/2) - this.y) < this.item.range+(enemy[nearTarget].size/2)) || (enemy[nearTarget].gravity>0&&enemy[nearTarget].gravitySpeed===0))) {
                    
                if(this.atkCD<=0){
                    // if(this.item.pierce!==0){
                    //     for(m=0;m<this.item.pierce;m++){
                    //         if  (Math.abs(enemy[m].x - this.x) < this.range&&
                    //             (Math.abs(enemy[m].y - this.y) < this.range)) {
                    //             enemy[m].hp=enemy[m].hp-1
                    //         }
                    //     }
                    // } else {
                    enemy[nearTarget].hp=enemy[nearTarget].hp-randomDmg(this.item.damageMin, this.item.damageMax)//damage enemy, will need to be changed for ranged
                    // }
                    // dmgNum[h]=new component(5, 20, "blue", this.x, this.y);
                    // dmgNum[h].gravity = -0.5;
                    // dmgNum[h].lifetime = 100;
                    // h++
                    this.atkCD=this.item.atkRate
                }else{
                    this.atkCD=this.atkCD-1
                }

                if(enemy[nearTarget].hp<=0){//enemy drops to 0 hp
                    
                    if(Object.keys(enemy[nearTarget].drops).length>0){ //enemy dropping items

                        lootRoll=Math.random()*100
                        if(enemy[nearTarget].drops.coinChance!==0){
                            if(lootRoll<enemy[nearTarget].drops.coinChance){
                                console.log("dropped coin")
                                droppedItem[droppedItem.length] = new component(15, 15, "gold", enemy[nearTarget].x, enemy[nearTarget].y);
                                droppedItem[droppedItem.length-1].data={
                                    value:enemy[nearTarget].drops.coin,
                                    cooldown:150
                                }
                                droppedItem[droppedItem.length-1].type="coin"
                                droppedItem[droppedItem.length-1].gravity = 0.5;
                                droppedItem[droppedItem.length-1].speedX=(Math.random()*6)-3+(enemy[nearTarget].size/200)
                                droppedItem[droppedItem.length-1].speedY=-Math.random()*9-(enemy[nearTarget].size/100)
                            }
                        }
                        lootRoll=Math.random()*100
                        if(enemy[nearTarget].drops.healChance!==0){
                            if(lootRoll<enemy[nearTarget].drops.healChance){
                                console.log("dropped hp")
                                droppedItem[droppedItem.length] = new component(15, 15, "#ff756b", enemy[nearTarget].x+(enemy[nearTarget].size/2), enemy[nearTarget].y+(enemy[nearTarget].size/2));
                                droppedItem[droppedItem.length-1].data={
                                    value:enemy[nearTarget].drops.healPotion,
                                    cooldown:150
                                }
                                droppedItem[droppedItem.length-1].type="health"
                                droppedItem[droppedItem.length-1].gravity = 0.5;
                                droppedItem[droppedItem.length-1].speedX=(Math.random()*3)-1.5+(enemy[nearTarget].size/400)
                                droppedItem[droppedItem.length-1].speedY=-Math.random()*9-(enemy[nearTarget].size/200)
                            }
                        }
                        lootRoll=Math.random()*100
                        if(enemy[nearTarget].drops.itemID1Chance!==0){
                            if(lootRoll<enemy[nearTarget].drops.itemID1Chance){
                                console.log("dropped item 1")
                                droppedItem[droppedItem.length] = new component(15, 15, items[enemy[nearTarget].drops.itemID1].colour, enemy[nearTarget].x+(enemy[nearTarget].size/2), enemy[nearTarget].y+(enemy[nearTarget].size/2));
                                droppedItem[droppedItem.length-1].data={
                                    value:enemy[nearTarget].drops.itemID1,
                                    cooldown:150
                                }
                                droppedItem[droppedItem.length-1].type="item"
                                droppedItem[droppedItem.length-1].gravity = 0.5;
                                droppedItem[droppedItem.length-1].speedX=(Math.random()*6)-3+(enemy[nearTarget].size/200)
                                droppedItem[droppedItem.length-1].speedY=-Math.random()*9-(enemy[nearTarget].size/100)
                            }
                        }
                        lootRoll=Math.random()*100
                        if(enemy[nearTarget].drops.itemID2Chance!==0){
                            if(lootRoll<enemy[nearTarget].drops.itemID2Chance){
                                console.log("dropped item 2")
                                droppedItem[droppedItem.length] = new component(15, 15, items[enemy[nearTarget].drops.itemID2].colour, enemy[nearTarget].x+(enemy[nearTarget].size/2), enemy[nearTarget].y+(enemy[nearTarget].size/2));
                                droppedItem[droppedItem.length-1].data={
                                    value:enemy[nearTarget].drops.itemID2,
                                    cooldown:150
                                }
                                droppedItem[droppedItem.length-1].type="item"
                                droppedItem[droppedItem.length-1].gravity = 0.5;
                                droppedItem[droppedItem.length-1].speedX=(Math.random()*6)-3+(enemy[nearTarget].size/200)
                                droppedItem[droppedItem.length-1].speedY=-Math.random()*9-(enemy[nearTarget].size/100)
                            }
                        }
                        lootRoll=Math.random()*100
                        if(enemy[nearTarget].drops.itemID3Chance!==0){
                            if(lootRoll<enemy[nearTarget].drops.itemID3Chance){
                                console.log("dropped item 3")
                                droppedItem[droppedItem.length] = new component(15, 15, items[enemy[nearTarget].drops.itemID3].colour, enemy[nearTarget].x+(enemy[nearTarget].size/2), enemy[nearTarget].y+(enemy[nearTarget].size/2));
                                droppedItem[droppedItem.length-1].data={
                                    value:enemy[nearTarget].drops.itemID3,
                                    cooldown:150
                                }
                                droppedItem[droppedItem.length-1].type="item"
                                droppedItem[droppedItem.length-1].gravity = 0.5;
                                droppedItem[droppedItem.length-1].speedX=(Math.random()*6)-3+(enemy[nearTarget].size/200)
                                droppedItem[droppedItem.length-1].speedY=-Math.random()*9-(enemy[nearTarget].size/100)
                            }
                        }
                        lootRoll=Math.random()*100
                        if(enemy[nearTarget].drops.itemID4Chance!==0){
                            if(lootRoll<enemy[nearTarget].drops.itemID4Chance){
                                console.log("dropped item 4")
                                droppedItem[droppedItem.length] = new component(15, 15, items[enemy[nearTarget].drops.itemID4].colour, enemy[nearTarget].x+(enemy[nearTarget].size/2), enemy[nearTarget].y+(enemy[nearTarget].size/2));
                                droppedItem[droppedItem.length-1].data={
                                    value:enemy[nearTarget].drops.itemID4,
                                    cooldown:150
                                }
                                droppedItem[droppedItem.length-1].type="item"
                                droppedItem[droppedItem.length-1].gravity = 0.5;
                                droppedItem[droppedItem.length-1].speedX=(Math.random()*6)-3+(enemy[nearTarget].size/200)
                                droppedItem[droppedItem.length-1].speedY=-Math.random()*9-(enemy[nearTarget].size/100)
                            }
                        }
                    totalEXP=totalEXP+enemy[nearTarget].exp
                    enemy.splice(nearTarget,1)
                    i=enemy.length 
                    }
                }
            }else{
            if(enemy.length!==0){//if not in range move towards
                if ((Math.abs(enemy[nearTarget].x+(enemy[nearTarget].size/2) - this.x) < this.item.range+350+(enemy[nearTarget].size/2)||
                    (Math.abs(enemy[nearTarget].x - this.x)) < this.item.range+350)&&
                    ((Math.abs(enemy[nearTarget].y+(enemy[nearTarget].size/2) - this.y) < this.item.range+350+(enemy[nearTarget].size/2))||
                    (Math.abs(enemy[nearTarget].y - this.y)) < this.item.range+350)){
                if(enemy[nearTarget].x+(enemy[nearTarget].size/2)<this.x){
                    this.speedX=this.speedX-Math.random()
                    this.speedY=this.speedY-Math.random()*2
                }else{
                    this.speedX=this.speedX+Math.random()
                    this.speedY=this.speedY-Math.random()*2
                }
            }
            }
        }
    }
}
}
}

    this.hitLeft = function() {//bounce off left wall
        var rockleft = 0;
        if (this.x < rockleft) {
            this.x = rockleft;
            if(this.hp>0){
            this.speedX=this.speedX-this.speedX*1.5
            }else{
                this.speedX=this.speedX-this.speedX*1.03
            }
            }
    }
    this.hitRight = function() {//bounce off right wall
        var rockRight = 930;
        if (this.x > rockRight) {
            this.x = rockRight;
            if(this.hp>0){
            this.speedX=this.speedX-this.speedX*1.5
            }else{
                this.speedX=this.speedX-this.speedX*1.03
            }
            }
    }
}

function closestEnemy(enemy, playerpos){//finding closesnt enemy to given coordinate
    var closest={
        x : 99999,
        Dist : 99999
    }
    var indexLoop = 0
    for (let k = 0; k < enemy.length ; k++) {

        if(Math.abs(enemy[k].x-playerpos)<closest.Dist){
            closest.Dist=Math.abs(enemy[k].x-playerpos)
            closest.x = enemy[k].x
            indexLoop=k
        } 
        if(Math.abs(playerpos-enemy[k].x)<closest.Dist){
            closest.Dist=Math.abs(playerpos-enemy[k].x)
            closest.x = enemy[k].x
            indexLoop=k
        }
    }
    return indexLoop;
}

var move = 0//updating all entities each frame
function updateGameArea() {
    myGameArea.clear();
    myGameArea.frameNo += 1;

    for(j=0;j<enemy.length;j++){
        if(enemy[j].movementType="SlowWalk"){
            move = Math.floor(Math.random() * 1000);
            if(move>10&&move<20 ){
                enemy[j].x=enemy[j].x+1
            }
            if(move>20&&move<32){
                enemy[j].x=enemy[j].x-1
            }
        }
        enemy[j].update()
        enemy[j].newPos()
        
        redPDist=Math.abs(myGamePiece.x-(enemy[j].x-15+(enemy[j].size/2)))
        bluPDist=Math.abs(myGamePiece2.x-(enemy[j].x-15+(enemy[j].size/2)))
        grnPDist=Math.abs(myGamePiece3.x-(enemy[j].x-15+(enemy[j].size/2)))
        ylwPDist=Math.abs(myGamePiece4.x-(enemy[j].x-15+(enemy[j].size/2)))

        if(enemy[j].atkCD<=0){
            if(enemy[j].weapon.multi===1){
                if(redPDist<enemy[j].weapon.range&&myGamePiece.hp>0){
                    myGamePiece.hp=myGamePiece.hp-randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)
                    if(myGamePiece.hp<0){
                        myGamePiece.hp=0
                    }
                }
                if(bluPDist<enemy[j].weapon.range&&myGamePiece2.hp>0){
                    myGamePiece2.hp=myGamePiece2.hp-randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)
                    if(myGamePiece2.hp<0){
                        myGamePiece2.hp=0
                    }
                }
                if(grnPDist<enemy[j].weapon.range&&myGamePiece3.hp>0){
                    myGamePiece3.hp=myGamePiece3.hp-randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)
                    if(myGamePiece3.hp<0){
                        myGamePiece3.hp=0
                    }
                }
                if(ylwPDist<enemy[j].weapon.range&&myGamePiece4.hp>0){
                    myGamePiece4.hp=myGamePiece4.hp-randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)
                    if(myGamePiece4.hp<0){
                        myGamePiece4.hp=0
                    }
                }
                enemy[j].atkCD=enemy[j].weapon.atkRate
            }else{
                if(redPDist<enemy[j].weapon.range &&redPDist<bluPDist&&redPDist<grnPDist&&redPDist<ylwPDist&&myGamePiece.hp>0){
                    myGamePiece.hp=myGamePiece.hp-randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)
                    if(myGamePiece.hp<0){
                        myGamePiece.hp=0
                    }
                }else if(bluPDist<enemy[j].weapon.range&&bluPDist<grnPDist&&bluPDist<ylwPDist&&myGamePiece2.hp>0){
                    myGamePiece2.hp=myGamePiece2.hp-randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)
                    if(myGamePiece2.hp<0){
                        myGamePiece2.hp=0
                    }
                }else if(grnPDist<enemy[j].weapon.range&&grnPDist<ylwPDist&&myGamePiece3.hp>0){
                    myGamePiece3.hp=myGamePiece3.hp-randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)
                    if(myGamePiece3.hp<0){
                        myGamePiece3.hp=0
                    }
                }else if(ylwPDist<enemy[j].weapon.range&&myGamePiece4.hp>0){
                    myGamePiece4.hp=myGamePiece4.hp-randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)
                    if(myGamePiece4.hp<0){
                        myGamePiece4.hp=0
                    }
                }
            enemy[j].atkCD=enemy[j].weapon.atkRate
            }

        }else{
            enemy[j].atkCD=enemy[j].atkCD-1
        }

    }

    myGamePiece.newPos();
    myGamePiece.update();
    myGamePiece2.newPos();
    myGamePiece2.update();
    myGamePiece3.newPos();
    myGamePiece3.update();
    myGamePiece4.newPos();
    myGamePiece4.update();
    inv[14].storedItem=0
    
    if(myGamePiece.hp===0&&myGamePiece2.hp===0&&myGamePiece3.hp===0&&myGamePiece4.hp===0&&gameover>-1){
        gameover=gameover-1
        if(gameover===0){
            alert("Game Over")
        }
    }

    refreshItemStatsBox()

    if(playerNumberStatsShown.hp===0){
        document.getElementById("reviveButton").innerHTML=`Revive: £${Math.floor((money/2)+5+(level*2))}`
            if(money>=Math.floor((money/2)+5+(level*2))){
                document.getElementById("reviveButton").style.background="#517a59"
            }else{
                document.getElementById("reviveButton").style.background="#9c4c4c" 
            }
    }

    if(lastmoney!==money){
        moneyBox.innerHTML = `Money: £${money}`;
        lastmoney=money
        document.getElementById("reviveButton").innerHTML=`Revive: £${Math.floor((money/2)+5+(level*2))}`
            if(money>=Math.floor((money/2)+5+(level*2))){
                document.getElementById("reviveButton").style.background="#517a59"
            }else{
                document.getElementById("reviveButton").style.background="#9c4c4c" 
            }
    }

    if(lastslot!==-1){
        if(items[inv[lastslot].storedItem].worth!==(undefined^0^null)){
    sellItemBox.innerHTML = `Sell<br />£${items[inv[lastslot].storedItem].worth}`;
        }
    }else if(sellItemBox.innerHTML !== `Sell<br>Item`){
        sellItemBox.innerHTML = `Sell<br />Item`;
    }

    for(r=0;r<droppedItem.length;r++){
        if(droppedItem[r].data.cooldown>0){
            droppedItem[r].data.cooldown=droppedItem[r].data.cooldown-1
        }
    droppedItem[r].newPos()
    droppedItem[r].update()
    }

    if(totalEXP!==lastEXP){
        if(totalEXP>=expToLevelUp){
            level++
            lastLevelExp=expToLevelUp
            expToLevelUp=expToLevelUp+Math.floor(expToLevelUp*1.3)
        }
        expBarOver.style.maxWidth = `${((totalEXP-lastLevelExp)/expToLevelUp)*131}px`
        expBarOver.style.minWidth = `${((totalEXP-lastLevelExp)/expToLevelUp)*131}px`
        refreshPlayerStatsBox()
        lastEXP=totalEXP
    }
    refreshPlayerStatsBox()


    // for(j=0;j<dmgNum.length;j++){
    // dmgNum[j].lifetime=dmgNum[j].lifetime-1
    // dmgNum[j].update()
    // dmgNum[j].newPos()
    // if(dmgNum[j].lifetime<=0){
    //     dmgNum.splice(0,1)
    // }
    // }

    

}

var pointerX = -1;
    var pointerY = -1;
    var blockToMouseX
    var blockToMouseY
    

drag()
function drag(){
    document.onmousedown = function(event){
        pointerX = event.pageX-15-(window.innerWidth-960)/2;
        pointerY = event.pageY-15-(window.innerHeight-540)/2;
        blockToMouseX = Math.abs(myGamePiece.x+15-pointerX)
        blockToMouseY = Math.abs(myGamePiece.y+15-pointerY)
        block2ToMouseX = Math.abs(myGamePiece2.x+15-pointerX)
        block2ToMouseY = Math.abs(myGamePiece2.y+15-pointerY)
        block3ToMouseX = Math.abs(myGamePiece3.x+15-pointerX)
        block3ToMouseY = Math.abs(myGamePiece3.y+15-pointerY)
        block4ToMouseX = Math.abs(myGamePiece4.x+15-pointerX)
        block4ToMouseY = Math.abs(myGamePiece4.y+15-pointerY)
        if(blockToMouseX<30 && blockToMouseY<30){
        document.onmousemove = function(event) {
            myGamePiece.atkCD=myGamePiece.item.atkRate
            if(playerNumberStatsShown.id!==0){
            playerNumberStatsShown=myGamePiece
            }
            pointerX = event.pageX-15-(window.innerWidth-960)/2;
        pointerY = event.pageY-15-(window.innerHeight-540)/2;
            blockToMouseX = Math.abs(myGamePiece.x-pointerX)
            blockToMouseY = Math.abs(myGamePiece.y-pointerY)
            if(myGamePiece.x<pointerX){
                myGamePiece.speedX = blockToMouseX/8
            };
            if(myGamePiece.x>pointerX){
                myGamePiece.speedX = -blockToMouseX/8
            };
            if(myGamePiece.y<pointerY){
                myGamePiece.speedY = blockToMouseY/8
            };
            if(myGamePiece.y>pointerY){
                myGamePiece.speedY = -blockToMouseY/8
            };
            
            myGamePiece.gravitySpeed = 0
            }
        }//dragging p1
        if(block2ToMouseX<30 && block2ToMouseY<30){
            document.onmousemove = function(event) {
                if(playerNumberStatsShown.id!==1){
                playerNumberStatsShown=myGamePiece2
                }
                myGamePiece2.atkCD=myGamePiece2.item.atkRate
                pointerX = event.pageX-15-(window.innerWidth-960)/2;
        pointerY = event.pageY-15-(window.innerHeight-540)/2;
                block2ToMouseX = Math.abs(myGamePiece2.x-pointerX)
                block2ToMouseY = Math.abs(myGamePiece2.y-pointerY)
                if(myGamePiece2.x<pointerX){
                    myGamePiece2.speedX = block2ToMouseX/8
                };
                if(myGamePiece2.x>pointerX){
                    myGamePiece2.speedX = -block2ToMouseX/8
                };
                if(myGamePiece2.y<pointerY){
                    myGamePiece2.speedY = block2ToMouseY/8
                };
                if(myGamePiece2.y>pointerY){
                    myGamePiece2.speedY = -block2ToMouseY/8
                };
                
                myGamePiece2.gravitySpeed = 0
                }
        }//dragging p2
        if(block3ToMouseX<30 && block3ToMouseY<30){
            document.onmousemove = function(event) {
                if(playerNumberStatsShown.id!==2){
                playerNumberStatsShown=myGamePiece3
                }
                myGamePiece3.atkCD=myGamePiece3.item.atkRate
                pointerX = event.pageX-15-(window.innerWidth-960)/2;
        pointerY = event.pageY-15-(window.innerHeight-540)/2;
                block3ToMouseX = Math.abs(myGamePiece3.x-pointerX)
                block3ToMouseY = Math.abs(myGamePiece3.y-pointerY)
                if(myGamePiece3.x<pointerX){
                    myGamePiece3.speedX = block3ToMouseX/8
                };
                if(myGamePiece3.x>pointerX){
                    myGamePiece3.speedX = -block3ToMouseX/8
                };
                if(myGamePiece3.y<pointerY){
                    myGamePiece3.speedY = block3ToMouseY/8
                };
                if(myGamePiece3.y>pointerY){
                    myGamePiece3.speedY = -block3ToMouseY/8
                };
                
                myGamePiece3.gravitySpeed = 0
                }
        }//dragging p3
        if(block4ToMouseX<30 && block4ToMouseY<30){
            document.onmousemove = function(event) {
                if(playerNumberStatsShown.id!==3){
                playerNumberStatsShown=myGamePiece4
                }
                myGamePiece4.atkCD=myGamePiece4.item.atkRate
                pointerX = event.pageX-15-(window.innerWidth-960)/2;
        pointerY = event.pageY-15-(window.innerHeight-540)/2;
                block4ToMouseX = Math.abs(myGamePiece4.x-pointerX)
                block4ToMouseY = Math.abs(myGamePiece4.y-pointerY)
                if(myGamePiece4.x<pointerX){
                    myGamePiece4.speedX = block4ToMouseX/8
                };
                if(myGamePiece4.x>pointerX){
                    myGamePiece4.speedX = -block4ToMouseX/8
                };
                if(myGamePiece4.y<pointerY){
                    myGamePiece4.speedY = block4ToMouseY/8
                };
                if(myGamePiece4.y>pointerY){
                    myGamePiece4.speedY = -block4ToMouseY/8
                };
                
                myGamePiece4.gravitySpeed = 0
                }
        }//dragging p4
    }
    document.onmouseup = async function(){
        document.onmousemove = function() {
        }
    }
}


document.addEventListener('keydown', logKey);//enemy spawning
let i = 0
let enemy=[]
function logKey(e) {
  if(e.code==="KeyA"){
    enemy[i] = new component(20, 20, "purple", 480, 270);
    enemy[i].size=20
    enemy[i].gravity = 0.5;
    enemy[i].hp=10
    enemy[i].maxhp=enemy[i].hp
    enemy[i].type="enemy"
    enemy[i].movementType="SlowWalk"
    enemy[i].item=items[0]
    enemy[i].exp=1
    enemy[i].weapon=items[5]
    enemy[i].atkCD=0
    enemy[i].drops={
        coin:1,
        coinChance:50,
        healPotion:10,
        healChance:10,
        itemID1:1,
        itemID1Chance:1,
        itemID2:2,
        itemID2Chance:1,
        itemID3:3,
        itemID3Chance:1,
        itemID4:4,
        itemID4Chance:1
    }
    i++
  }
  if(e.code==="KeyS"){
    enemy[i] = new component(200, 200, "purple", 680, 270);
    enemy[i].size=200
    enemy[i].gravity = 0.5;
    enemy[i].hp=100
    enemy[i].maxhp=enemy[i].hp
    enemy[i].type="enemy"
    enemy[i].movementType="SlowWalk"
    enemy[i].item=items[0]
    enemy[i].exp=15
    enemy[i].weapon=items[6]
    enemy[i].atkCD=0
    enemy[i].drops={
        coin:100,
        coinChance:20,
        healPotion:100,
        healChance:100,
        itemID1:1,
        itemID1Chance:10,
        itemID2:2,
        itemID2Chance:10,
        itemID3:3,
        itemID3Chance:10,
        itemID4:4,
        itemID4Chance:10
    }
    i++
  }
}

document.getElementById(inv.length-1).style.background='#5c5c5c'
// document.addEventListener("click", wipeInvActives);
// function wipeInvActives(){
//     test = inv.findIndex(element => element.storedItem=2)
//     document.getElementById(test).style.background='#660033'

// for(x=0;x<inv.length;x++){
//     inv[x].active=0
// }
// }