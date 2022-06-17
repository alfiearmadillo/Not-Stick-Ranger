//SP Respec in starting area w/ shop, hp regen, free revivals
//shop contains items, enemy info, bonus SP (10,100,1000 etc.)
// save / load // Item stored in all inv slots, money, HP, assigned SP, spare SP, XP, LV
//game over tp to town after wait
//Projectiles for players & enemies
//enemy types (flying random movent every x time), player like walker
//terrain side collision?
//textures?
//more levels, enemies, weapons, content

let signY=0
let saveCode=0
let area = []
let loadedAreaID=0
let subArea = 1
let p1Held=0
let p3Held=0
let p2Held=0
let p4Held=0
var pointerX = -1;
var pointerY = -1;
var blockToMouseX
var blockToMouseY
var nearTarget=0
var myGamePiece;
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
let lastRevCostShown=-1
let land=[]

function startGame() {
    myGamePiece = new component(30, 30, "#ff0000", 130, 370);
    myGamePiece.gravity = 0.5;
    myGamePiece.type="player"
    myGamePiece.colour="#ff0000"
    myGamePiece.id="0"
    myGamePiece.maxhp=100
    myGamePiece.hp=100
    myGamePiece.atkCD=0
    myGamePiece.size=30
    myGamePiece.skillPoints=0
    myGamePiece.hpPoints=0
    myGamePiece.dmgPoints=0
    myGamePiece.rangePoints=0
    myGamePiece.cdPoints=0
    myGamePiece.item=items[0]
    myGamePiece2 = new component(30, 30, "#0000ff", 90, 370);
    myGamePiece2.gravity = 0.5;
    myGamePiece2.type="player"
    myGamePiece2.colour="#0000ff"
    myGamePiece2.id="1"
    myGamePiece2.hp=100
    myGamePiece2.maxhp=100
    myGamePiece2.atkCD=0
    myGamePiece2.size=30
    myGamePiece2.skillPoints=0
    myGamePiece2.hpPoints=0
    myGamePiece2.dmgPoints=0
    myGamePiece2.rangePoints=0
    myGamePiece2.cdPoints=0
    myGamePiece2.item=items[0]
    myGamePiece3 = new component(30, 30, "#00ff00", 50, 370);
    myGamePiece3.gravity = 0.5;
    myGamePiece3.type="player"
    myGamePiece3.colour="#00ff00"
    myGamePiece3.id="2"
    myGamePiece3.hp=100
    myGamePiece3.maxhp=100
    myGamePiece3.atkCD=0
    myGamePiece3.size=30
    myGamePiece3.skillPoints=0
    myGamePiece3.hpPoints=0
    myGamePiece3.dmgPoints=0
    myGamePiece3.rangePoints=0
    myGamePiece3.cdPoints=0
    myGamePiece3.item=items[0]
    myGamePiece4 = new component(30, 30, "#ffff00", 10, 370);
    myGamePiece4.gravity = 0.5;
    myGamePiece4.type="player"
    myGamePiece4.colour="#ffff00"
    myGamePiece4.id="3"
    myGamePiece4.hp=100
    myGamePiece4.maxhp=100
    myGamePiece4.atkCD=0
    myGamePiece4.size=30
    myGamePiece4.skillPoints=0
    myGamePiece4.hpPoints=0
    myGamePiece4.dmgPoints=0
    myGamePiece4.rangePoints=0
    myGamePiece4.cdPoints=0
    myGamePiece4.item=items[0]
    playerNumberStatsShown=myGamePiece
    renderStage(loadedAreaID)
    myGameArea.start();
}



items[0]={name:"None",damageMin:1,damageMax:1,range:11,atkRate:100,lifeSteal:0,defence:0,type:"None", colour:'#b4b4b4', worth:0, multi:0, rangeMult:0.1}
items[1]={name:"Test Sword",damageMin:2,damageMax:4,range:25,atkRate:50,lifeSteal:0,defence:0,type:"Sword", colour:'#a83232', worth:10, multi:0, rangeMult:0.1}
items[2]={name:"Test Shield",damageMin:1,damageMax:1,range:15,atkRate:100,lifeSteal:0,defence:1,type:"Shield", colour:'#75a832', worth:10, multi:0, rangeMult:0.1}
items[3]={name:"Test Bow",damageMin:1,damageMax:3,range:160,atkRate:66,lifeSteal:0,defence:0,type:"Bow", colour:'#634f1c', worth:10, multi:0, rangeMult:3}
items[4]={name:"Test Staff",damageMin:0,damageMax:1,range:300,atkRate:200,lifeSteal:0,defence:0,type:"Staff", colour:'#660033', worth:10, multi:0, rangeMult:3}
items[5]={name:"CR_IntoAveBasic",damageMin:1,damageMax:2,range:45,atkRate:200,lifeSteal:0,defence:0,type:"CR_Melee", colour:'#191919', worth:-1, multi:0, rangeMult:0.1}
items[6]={name:"CR_IntroAveBoss",damageMin:5,damageMax:18,range:300,atkRate:200,lifeSteal:0,defence:0,type:"CR_Special1", colour:'#191919', worth:-1, multi:1, rangeMult:3}
items[7]={name:"CR_IntroAveRanged",damageMin:1,damageMax:2,range:130,atkRate:200,lifeSteal:0,defence:0,type:"CR_Ranged", colour:'#191919', worth:-1, multi:0, rangeMult:3}
items[8]={name:"CR_IntroAveStrong",damageMin:5,damageMax:10,range:45,atkRate:200,lifeSteal:0,defence:0,type:"CR_Ranged", colour:'#191919', worth:-1, multi:0, rangeMult:0.1}
items[9]={name:"CR_IntroAveWeak",damageMin:0,damageMax:1,range:45,atkRate:400,lifeSteal:0,defence:0,type:"CR_Ranged", colour:'#191919', worth:-1, multi:0, rangeMult:0.1}

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

expBarUnder=document.createElement("div");
expBarUnder.setAttribute("id", `expBarUnder`)
divcontainer.appendChild(expBarUnder, divcontainer.firstChild)
expBarOver=document.createElement("div");
expBarOver.setAttribute("id", `expBarOver`)
divcontainer.appendChild(expBarOver, divcontainer.firstChild)
reviveButton=document.createElement("div");
reviveButton.setAttribute("id", `reviveButton`)
divcontainer.appendChild(reviveButton, divcontainer.firstChild)

dmgSPButton=document.createElement("div");
dmgSPButton.setAttribute("id", `dmgSPButton`)
divcontainer.appendChild(dmgSPButton, divcontainer.firstChild)
hpSPButton=document.createElement("div");
hpSPButton.setAttribute("id", `hpSPButton`)
divcontainer.appendChild(hpSPButton, divcontainer.firstChild)
rangeSPButton=document.createElement("div");
rangeSPButton.setAttribute("id", `rangeSPButton`)
divcontainer.appendChild(rangeSPButton, divcontainer.firstChild)
delaySPButton=document.createElement("div");
delaySPButton.setAttribute("id", `delaySPButton`)
divcontainer.appendChild(delaySPButton, divcontainer.firstChild)

function goToMap(){
    loadedAreaID=2
    subArea=1
    renderStage()
}


document.getElementById("dmgSPButton").addEventListener("mouseup", addSP);
document.getElementById("hpSPButton").addEventListener("mouseup", addSP);
document.getElementById("rangeSPButton").addEventListener("mouseup", addSP);
document.getElementById("delaySPButton").addEventListener("mouseup", addSP);
function addSP(){
    if(playerNumberStatsShown.skillPoints>0){
    switch(this.id){
        case "dmgSPButton":
            playerNumberStatsShown.skillPoints-=1
            playerNumberStatsShown.dmgPoints+=1
            lastmoney=-1
            lastEXP=-1
            break;
        case "hpSPButton":
            playerNumberStatsShown.skillPoints-=1
            playerNumberStatsShown.hpPoints+=1
            lastmoney=-1
            lastEXP=-1
            break;
        case "rangeSPButton":
            playerNumberStatsShown.skillPoints-=1
            playerNumberStatsShown.rangePoints+=1
            lastmoney=-1
            lastEXP=-1
            break;
        case "delaySPButton":
            
            playerNumberStatsShown.skillPoints-=1
            playerNumberStatsShown.cdPoints+=1
            lastmoney=-1
            lastEXP=-1
            break;
                                
    }
}
}

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
    playerNumberStatsShown.hp=(playerNumberStatsShown.maxhp+playerNumberStatsShown.hpPoints*5)/2
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
        lastmoney=-1
        addItem(num, inv[num].storedItem)
    }
    
    for(e=0;e<inv.length;e++){
        document.getElementById(e).style.background=items[inv[e].storedItem].colour
    }
    document.getElementById(inv.length-1).style.background='#5c5c5c'
    lastEXP=-1
    lastRevCostShown=-1
}

function loadSaveFromCode(){//todo
    loadedAreaID=1
    renderStage()
}

//update for each new level when make level making levels
area[0]={name:"Menu",subAreaCount:1,unlocked:0,cleared:-1} //Stage list
area[1]={name:"Town",subAreaCount:1,unlocked:1,x:100,y:300,cleared:2,stageToUnlock1:3,stageToUnlock2:3}
area[2]={name:"Map",subAreaCount:1,unlocked:0,cleared:-1}
area[3]={name:"Intro Avenue",subAreaCount:9,unlocked:1,x:150,y:300,cleared:0,stageToUnlock1:4,stageToUnlock2:3}
area[4]={name:"Grassy Fields",subAreaCount:7,unlocked:0,x:140,y:230,cleared:0,stageToUnlock1:5,stageToUnlock2:3}

function renderStage(){ //Stage loading
    land=[]
    enemy=[]
    i=0
    droppedItem=[]//update for each new level when make level making levels
    if(area[loadedAreaID].name==="Menu"){//Main menu
        newLand(-1,510,1000,5400)
        newLand(-1,495,200,5400)
        newLand(760,495,1000,5400)
        myGamePiece4.x=260;myGamePiece4.y=370;myGamePiece4.speedX=0;myGamePiece4.speedY=0
        myGamePiece3.x=400;myGamePiece3.y=370;myGamePiece3.speedX=0;myGamePiece3.speedY=0
        myGamePiece2.x=560;myGamePiece2.y=370;myGamePiece2.speedX=0;myGamePiece2.speedY=0
        myGamePiece.x=700;myGamePiece.y=370;myGamePiece.speedX=0;myGamePiece.speedY=0
        signY=-1
    }
    if(area[loadedAreaID].name==="Town"){//Main menu
        newLand(-1,510,1000,5400)
        myGamePiece4.x=10;myGamePiece4.y=370;myGamePiece4.speedX=0;myGamePiece4.speedY=0
        myGamePiece3.x=50;myGamePiece3.y=370;myGamePiece3.speedX=0;myGamePiece3.speedY=0
        myGamePiece2.x=90;myGamePiece2.y=370;myGamePiece2.speedX=0;myGamePiece2.speedY=0
        myGamePiece.x=130;myGamePiece.y=370;myGamePiece.speedX=0;myGamePiece.speedY=0
        signY=478
    }
    if(area[loadedAreaID].name==="Map"){//Main menu
        p1Held=0
        p2Held=0
        p3Held=0
        p4Held=0
        myGamePiece4.x=10;myGamePiece4.y=1370;myGamePiece4.speedX=0;myGamePiece4.speedY=0
        myGamePiece3.x=50;myGamePiece3.y=1370;myGamePiece3.speedX=0;myGamePiece3.speedY=0
        myGamePiece2.x=90;myGamePiece2.y=1370;myGamePiece2.speedX=0;myGamePiece2.speedY=0
        myGamePiece.x=130;myGamePiece.y=1370;myGamePiece.speedX=0;myGamePiece.speedY=0
        signY=-1
    }
    if(area[loadedAreaID].name==="Intro Avenue"){
        if(subArea===1){
        newLand(-1,510,1000,5400)
        spawnEnemy(20,"#8e17b3",550,400,0.5,5,"SlowWalk",1,1,1,55,0.1,10,1,1,2,1,3,1,4,1)
            myGamePiece4.x=10;myGamePiece4.y=370;myGamePiece4.speedX=0;myGamePiece4.speedY=0
            myGamePiece3.x=50;myGamePiece3.y=370;myGamePiece3.speedX=0;myGamePiece3.speedY=0
            myGamePiece2.x=90;myGamePiece2.y=370;myGamePiece2.speedX=0;myGamePiece2.speedY=0
            myGamePiece.x=130;myGamePiece.y=370;myGamePiece.speedX=0;myGamePiece.speedY=0
            signY=478
        }
        if(subArea===2){//Main menu
            newLand(-1,510,1000,5400)
            newLand(320,490,710,5400)
            spawnEnemy(20,"#7b139c",350,400,0.5,8,"SlowWalk",1,1,1,55,0.1,10,1,1,2,1,3,1,4,1)
            spawnEnemy(20,"#7b139c",600,400,0.5,8,"SlowWalk",1,1,1,55,0.1,10,1,1,2,1,3,1,4,1)
            spawnEnemy(20,"#7b139c",870,400,0.5,8,"SlowWalk",1,1,1,55,0.1,10,1,1,2,1,3,1,4,1)
            myGamePiece4.x=10;myGamePiece4.y=370;myGamePiece4.speedX=0;myGamePiece4.speedY=0
            myGamePiece3.x=50;myGamePiece3.y=370;myGamePiece3.speedX=0;myGamePiece3.speedY=0
            myGamePiece2.x=90;myGamePiece2.y=370;myGamePiece2.speedX=0;myGamePiece2.speedY=0
            myGamePiece.x=130;myGamePiece.y=370;myGamePiece.speedX=0;myGamePiece.speedY=0
            signY=478
        }
        if(subArea===3){//Main menu
            newLand(-1,510,1000,5400)
            newLand(520,495,1000,5400)
            newLand(650,470,1000,5400)
            newLand(880,450,1000,5400)
            spawnEnemy(20,"#6a0f87",470,400,0.5,10,"SlowWalk",2,1,2,55,0.1,10,1,2,2,2,3,2,4,2)
            spawnEnemy(20,"#6a0f87",490,400,0.5,10,"SlowWalk",2,1,2,55,0.1,10,1,2,2,2,3,2,4,2)
            spawnEnemy(15,"#1b1280",550,400,0.5,5,"SlowWalk",3,7,10,25,0.1,10,1,5,2,5,3,5,4,5)
            myGamePiece4.x=10;myGamePiece4.y=370;myGamePiece4.speedX=0;myGamePiece4.speedY=0
            myGamePiece3.x=50;myGamePiece3.y=370;myGamePiece3.speedX=0;myGamePiece3.speedY=0
            myGamePiece2.x=90;myGamePiece2.y=370;myGamePiece2.speedX=0;myGamePiece2.speedY=0
            myGamePiece.x=130;myGamePiece.y=370;myGamePiece.speedX=0;myGamePiece.speedY=0
            signY=418
        }
        if(subArea===4){//Main menu
            newLand(-1,510,1000,5400)
            newLand(-1,490,243,5400)
            newLand(875,480,1000,5400)
            newLand(900,460,1000,5400)
            spawnEnemy(12,"#067806",337,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",353,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",362,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",391,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",440,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",457,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",470,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",485,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",500,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",550,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",637,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",653,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",662,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",691,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",740,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",757,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",770,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",785,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",800,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            spawnEnemy(12,"#067806",850,400,0.5,3,"SlowWalk",1,9,1,30,0.1,35,1,1,2,1,3,1,4,1)
            myGamePiece4.x=10;myGamePiece4.y=370;myGamePiece4.speedX=0;myGamePiece4.speedY=0
            myGamePiece3.x=50;myGamePiece3.y=370;myGamePiece3.speedX=0;myGamePiece3.speedY=0
            myGamePiece2.x=90;myGamePiece2.y=370;myGamePiece2.speedX=0;myGamePiece2.speedY=0
            myGamePiece.x=130;myGamePiece.y=370;myGamePiece.speedX=0;myGamePiece.speedY=0
            signY=428
        }
        if(subArea===5){//Main menu
            newLand(-1,510,1000,5400)
            myGamePiece4.x=10;myGamePiece4.y=370;myGamePiece4.speedX=0;myGamePiece4.speedY=0
            myGamePiece3.x=50;myGamePiece3.y=370;myGamePiece3.speedX=0;myGamePiece3.speedY=0
            myGamePiece2.x=90;myGamePiece2.y=370;myGamePiece2.speedX=0;myGamePiece2.speedY=0
            myGamePiece.x=130;myGamePiece.y=370;myGamePiece.speedX=0;myGamePiece.speedY=0
            signY=478
        }
        if(subArea===6){//Main menu
            newLand(-1,510,1000,5400)
            myGamePiece4.x=10;myGamePiece4.y=370;myGamePiece4.speedX=0;myGamePiece4.speedY=0
            myGamePiece3.x=50;myGamePiece3.y=370;myGamePiece3.speedX=0;myGamePiece3.speedY=0
            myGamePiece2.x=90;myGamePiece2.y=370;myGamePiece2.speedX=0;myGamePiece2.speedY=0
            myGamePiece.x=130;myGamePiece.y=370;myGamePiece.speedX=0;myGamePiece.speedY=0
            signY=478
        }
        if(subArea===7){//Main menu
            newLand(-1,510,1000,5400)
            myGamePiece4.x=10;myGamePiece4.y=370;myGamePiece4.speedX=0;myGamePiece4.speedY=0
            myGamePiece3.x=50;myGamePiece3.y=370;myGamePiece3.speedX=0;myGamePiece3.speedY=0
            myGamePiece2.x=90;myGamePiece2.y=370;myGamePiece2.speedX=0;myGamePiece2.speedY=0
            myGamePiece.x=130;myGamePiece.y=370;myGamePiece.speedX=0;myGamePiece.speedY=0
            signY=478
        }
        if(subArea===8){//Main menu
            newLand(-1,510,1000,5400)
            myGamePiece4.x=10;myGamePiece4.y=370;myGamePiece4.speedX=0;myGamePiece4.speedY=0
            myGamePiece3.x=50;myGamePiece3.y=370;myGamePiece3.speedX=0;myGamePiece3.speedY=0
            myGamePiece2.x=90;myGamePiece2.y=370;myGamePiece2.speedX=0;myGamePiece2.speedY=0
            myGamePiece.x=130;myGamePiece.y=370;myGamePiece.speedX=0;myGamePiece.speedY=0
            signY=478
        }
        if(subArea===9){//Main menu
            newLand(-1,510,1000,5400)
            myGamePiece4.x=10;myGamePiece4.y=370;myGamePiece4.speedX=0;myGamePiece4.speedY=0
            myGamePiece3.x=50;myGamePiece3.y=370;myGamePiece3.speedX=0;myGamePiece3.speedY=0
            myGamePiece2.x=90;myGamePiece2.y=370;myGamePiece2.speedX=0;myGamePiece2.speedY=0
            myGamePiece.x=130;myGamePiece.y=370;myGamePiece.speedX=0;myGamePiece.speedY=0
            signY=478
        }
    }
    if(area[loadedAreaID].name==="Grassy Fields"&&subArea===1){//Main menu
        newLand(-1,510,1000,5400)
        myGamePiece4.x=10;myGamePiece4.y=370;myGamePiece4.speedX=0;myGamePiece4.speedY=0
        myGamePiece3.x=50;myGamePiece3.y=370;myGamePiece3.speedX=0;myGamePiece3.speedY=0
        myGamePiece2.x=90;myGamePiece2.y=370;myGamePiece2.speedX=0;myGamePiece2.speedY=0
        myGamePiece.x=130;myGamePiece.y=370;myGamePiece.speedX=0;myGamePiece.speedY=0
        signY=478
    }
}

//create more terrain
//createland create land
function newLand(x1,y1,x2,y2){
land[land.length]={
    x1:x1,
    y1:y1,
    x2:x2,
    y2:y2
}



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
    if(playerNumberStatsChanged!==playerNumberStatsShown.hp||totalEXP!==lastEXP||lastmoney!==money){
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

    if(playerNumberStatsShown.skillPoints>0){
        document.getElementById("dmgSPButton").style.borderColor="#5e130e"
        document.getElementById("dmgSPButton").style.background="#911616"
        document.getElementById("rangeSPButton").style.borderColor="#5e130e"
        document.getElementById("rangeSPButton").style.background="#911616"
        document.getElementById("delaySPButton").style.borderColor="#5e130e"
        document.getElementById("delaySPButton").style.background="#911616"
        document.getElementById("hpSPButton").style.borderColor="#5e130e"
        document.getElementById("hpSPButton").style.background="#911616"
    }else{
        document.getElementById("dmgSPButton").style.borderColor="#8a8a8a"
        document.getElementById("dmgSPButton").style.background="#a2a2a2"
        document.getElementById("rangeSPButton").style.borderColor="#8a8a8a"
        document.getElementById("rangeSPButton").style.background="#a2a2a2"
        document.getElementById("delaySPButton").style.borderColor="#8a8a8a"
        document.getElementById("delaySPButton").style.background="#a2a2a2"
        document.getElementById("hpSPButton").style.borderColor="#8a8a8a"
        document.getElementById("hpSPButton").style.background="#a2a2a2"
    }

    if(playerNumberStatsShown.hp>0){
    reviveButton.innerHTML="Player Alive"
            document.getElementById("reviveButton").style.background="#517a59"
        }

    playerStatsBox.innerHTML=`
    <br />
    Health: ${playerNumberStatsShown.hp}/${(playerNumberStatsShown.maxhp+playerNumberStatsShown.hpPoints*5)}<br/>
    Damage: ${Math.floor((playerNumberStatsShown.item.damageMin+(playerNumberStatsShown.dmgPoints*0.2))*((100+playerNumberStatsShown.dmgPoints)/100))} - ${Math.floor((playerNumberStatsShown.item.damageMax+(playerNumberStatsShown.dmgPoints*0.3))*((100+playerNumberStatsShown.dmgPoints)/100))}<br/>
    Range: ${playerNumberStatsShown.item.range+Math.round((playerNumberStatsShown.rangePoints*playerNumberStatsShown.item.rangeMult) * 10) / 10}<br/>
    Attack Delay: ${Math.floor(playerNumberStatsShown.item.atkRate/((100+playerNumberStatsShown.cdPoints*2.5)/100))}<br/>
    Defence: ${playerNumberStatsShown.item.defence}<br/>
    Lifesteal: ${playerNumberStatsShown.item.lifeSteal}<br/>
    <br/>
    <br/>
    Level: ${level} SP: ${playerNumberStatsShown.skillPoints}<br/>
    EXP: ${totalEXP}
    `
    playerStatsPic.style.background=playerNumberStatsShown.colour
    playerNumberStatsChanged=playerNumberStatsShown.hp
}
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
        
        if(land.length>0){//draw new land
            for(w=0;w<land.length;w++){
                ctx = myGameArea.context;
                ctx.fillStyle = "#7b531b"
                ctx.fillRect(land[w].x1+1, land[w].y1+1, land[w].x2-land[w].x1-2, land[w].y2-land[w].y1-2);
                ctx = myGameArea.context;
                ctx.fillStyle = "#17740b"
                ctx.fillRect(land[w].x1, land[w].y1, land[w].x2-land[w].x1, 10);
            }
        }

        if(area[loadedAreaID].name==="Menu"){
            ctx = myGameArea.context;
            ctx.font = '80px serif';
            ctx.fillStyle = "#4832a8"
            ctx.fillText("Ulfyn Ranger", 280, 150)
            ctx.font = '50px serif';
            ctx.fillStyle = "#1d6f82"
            ctx.fillRect(372, 260, 240, 48);
            ctx.fillStyle = "#4832a8"
            ctx.fillText("New Game", 380, 300)
            ctx.fillStyle = "#1d6f82"
            ctx.fillRect(381, 330, 224, 48);
            ctx.fillStyle = "#4832a8"
            ctx.fillText("Load Save", 387, 370)
        }

        if(area[loadedAreaID].name==="Map"){
            for(r=0;r<area.length;r++){
                if(area[r].unlocked===1){
                    ctx = myGameArea.context;
                    switch(area[r].unlocked){
                        case 0:
                            break;
                        case 1:
                            if(area[r].cleared===0){//draw stages on map
                                ctx.fillStyle = "#e0dd1d"
                                ctx.fillRect(area[r].x, area[r].y, 20, 20);
                                if(pointerX>area[r].x-16&&pointerX<area[r].x+5&&pointerY>area[r].y-15&&pointerY<area[r].y+5){
                                    ctx.fillStyle = "#800b15"
                                    ctx.globalCompositeOperation='destination-over';
                                    ctx.fillRect(area[r].x-7, area[r].y-7, 34, 34);
                                    ctx.globalCompositeOperation="source-over";
                                    ctx.font = '16px serif';
                                    ctx.fillStyle = "#000000"
                                    ctx.fillText(`${area[r].name}`, area[r].x-10, area[r].y-20)
                                }
                            }else if(area[r].cleared===1){
                                ctx.fillStyle = "#2bc4a1"
                                ctx.fillRect(area[r].x, area[r].y, 20, 20);
                                if(pointerX>area[r].x-16&&pointerX<area[r].x+5&&pointerY>area[r].y-15&&pointerY<area[r].y+5){
                                    ctx.fillStyle = "#800b15"
                                    ctx.globalCompositeOperation='destination-over';
                                    ctx.fillRect(area[r].x-7, area[r].y-7, 34, 34);
                                    ctx.globalCompositeOperation="source-over";
                                    ctx.font = '16px serif';
                                    ctx.fillStyle = "#000000"
                                    ctx.fillText(`${area[r].name}`, area[r].x-10, area[r].y-20)
                                }
                            }else if(area[r].cleared===2){
                                ctx.fillStyle = "#FFFFFF"
                                ctx.fillRect(area[r].x, area[r].y, 20, 20);
                                if(pointerX>area[r].x-16&&pointerX<area[r].x+5&&pointerY>area[r].y-15&&pointerY<area[r].y+5){
                                    ctx.fillStyle = "#800b15"
                                    ctx.globalCompositeOperation='destination-over';
                                    ctx.fillRect(area[r].x-7, area[r].y-7, 34, 34);
                                    ctx.globalCompositeOperation="source-over";
                                    ctx.font = '16px serif';
                                    ctx.fillStyle = "#000000"
                                    ctx.fillText(`${area[r].name}`, area[r].x-10, area[r].y-20)
                                }
                            }
                            break;
                        default:
                            break;
                    }
                    
                    
                }
            }
        }

        if(signY>0 && (enemy.length===0||area[loadedAreaID].subAreaCount!==subArea)){
            ctx = myGameArea.context;
            ctx.fillStyle = "#61330b"
            ctx.fillRect(895, signY+7, 53, -26);
            ctx.fillRect(917, signY+7, 10, 25);
            ctx.font = '16px serif';
            ctx.fillStyle = "#140b02"
            ctx.fillText("NEXT", 900, signY)
        }

        ctx = myGameArea.context;
        ctx.fillStyle = "#8a8a8a"
        ctx.fillRect(7, 50, 144,35);
        ctx.fillStyle = "#b4b4b4"
        ctx.fillRect(12, 55, 134, 25);
        ctx.font = '16px serif';
        ctx.fillStyle = "#000000"
        if(area[loadedAreaID].subAreaCount>1){
            ctx.fillText(`${area[loadedAreaID].name}:${subArea}`, 18,72)
        }else{
            ctx.fillText(`${area[loadedAreaID].name}`, 18,72)
        }


        if(this.type==="item"||this.type==="health"||this.type==="coin"){//draw hp item coin
            if((Math.floor(this.data.cooldown/5))%2===1){
                
            }else{
                ctx = myGameArea.context;
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
        }else{
            ctx = myGameArea.context;
            
            if(this.hp<=0){//draw dead player
                ctx.fillStyle = "#666666"
                ctx.fillRect(this.x+1, this.y+2, this.width-2, this.height-2);
            }else{
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
            
        }
        
        if(this.type==="enemy"||this.type==="player" && this.hp>0){//draw hp bars
            ctx.fillStyle = "#ff0000";
            ctx.fillRect(this.x, this.y-15, this.size, 2);
            ctx.fillStyle = "#007f00";
            if(this.type==="player"){
            ctx.fillRect(this.x-1, this.y-16, ((this.hp/(this.maxhp+this.hpPoints*5))*this.size)+2, 4);
            }else{
                ctx.fillRect(this.x-1, this.y-16, ((this.hp/this.maxhp)*this.size)+2, 4);
            }
        }
        
    }
    this.newPos = function() {//find new positions
        this.speedY += this.gravity;
        if(this.speedX>30){
            this.speedX=30
        }
        if(this.speedX<-30){
            this.speedX=-30
        }
        if(this.speedY>30){
            this.speedY=30
        }
        if(this.speedY<-30){
            this.speedY=-30
        }
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
                        this.hp=this.hp+Math.floor(droppedItem[b].data.value*(this.maxhp+(this.hpPoints*5)))
                        if(this.hp>(this.maxhp+this.hpPoints*5)){
                            this.hp=(this.maxhp+this.hpPoints*5)
                        }
                        lastEXP=-1
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
        this.hitLeft();
        this.hitRight();
        this.hitNewLand();
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
    
    this.hitNewLand = function(){
        if(land.length>0){
            for(c=0;c<land.length;c++){
                if (this.y <land[c].y2 && this.y+this.size >land[c].y1 && this.x<land[c].x2 && this.x>land[c].x1-this.size) {
                    if(this.y+this.size/2 <(land[c].y2+land[c].y1)/2){
                        this.y =land[c].y1-this.size;
                    if(this.hp>0){
                        this.speedY=-Math.abs(this.speedY-this.speedY*0.3)
                        this.speedX=this.speedX-this.speedX*0.3

                        if(this.type==="player" && this.hp>0){//logic to do only while on floor
                            nearTarget = closestEnemy(enemy, this.x)
                            if(enemy.length!==0){
                                if (Math.abs(enemy[nearTarget].x+(enemy[nearTarget].size/2-(this.size/2)) - this.x) < this.item.range+(this.rangePoints*this.item.rangeMult)+(enemy[nearTarget].size/2)+(this.size/2)&&
                                   ((Math.abs(enemy[nearTarget].y+(enemy[nearTarget].size/2) - this.y) < this.item.range+(this.rangePoints*this.item.rangeMult)+(enemy[nearTarget].size/2)) || (enemy[nearTarget].gravity>0&&enemy[nearTarget].gravitySpeed===0))) {
                                    
                                if(this.atkCD<=0){
                
                                    enemy[nearTarget].hp=enemy[nearTarget].hp-randomDmg(Math.floor((this.item.damageMin+(this.dmgPoints*0.2))*((100+this.dmgPoints)/100)), Math.floor((this.item.damageMax+(this.dmgPoints*0.3))*((100+this.dmgPoints)/100)))//damage enemy, will need to be changed for ranged
                
                                    this.atkCD=Math.floor(this.item.atkRate/((100+this.cdPoints*2.5)/100))
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
                                                droppedItem[droppedItem.length-1].size=15
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
                                                droppedItem[droppedItem.length-1].size=15
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
                                                droppedItem[droppedItem.length-1].size=15
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
                                                droppedItem[droppedItem.length-1].size=15
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
                                                droppedItem[droppedItem.length-1].size=15
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
                                                droppedItem[droppedItem.length-1].size=15
                                                droppedItem[droppedItem.length-1].type="item"
                                                droppedItem[droppedItem.length-1].gravity = 0.5;
                                                droppedItem[droppedItem.length-1].speedX=(Math.random()*6)-3+(enemy[nearTarget].size/200)
                                                droppedItem[droppedItem.length-1].speedY=-Math.random()*9-(enemy[nearTarget].size/100)
                                            }
                                        }
                                    totalEXP=totalEXP+enemy[nearTarget].exp
                                    lastmoney=-1
                                    enemy.splice(nearTarget,1)
                                    i=enemy.length 
                                    }
                                }
                            }else{
                            if(enemy.length!==0){//if not in range move towards
                                if ((Math.abs(enemy[nearTarget].x+(enemy[nearTarget].size/2) - this.x) < this.item.range+(this.rangePoints*this.item.rangeMult)+350+(enemy[nearTarget].size/2)||
                                    (Math.abs(enemy[nearTarget].x - this.x)) < this.item.range+(this.rangePoints*this.item.rangeMult)+350)&&
                                    ((Math.abs(enemy[nearTarget].y+(enemy[nearTarget].size/2) - this.y) < this.item.range+(this.rangePoints*this.item.rangeMult)+350+(enemy[nearTarget].size/2))||
                                    (Math.abs(enemy[nearTarget].y - this.y)) < this.item.range+(this.rangePoints*this.item.rangeMult)+350)){
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




                    }else if(this.type==="player"){
                        this.speedY=0
                        this.speedX=this.speedX*0.5
                    }else{
                        this.speedY=-Math.abs(this.speedY-this.speedY*0.3)
                        this.speedX=this.speedX-this.speedX*0.3
                    }
            }else{
                this.y =land[c].y2;
                    if(this.hp>0){
                        this.speedY=Math.abs(this.speedY-this.speedY*0.3)
                        this.speedX=this.speedX-this.speedX*0.3
                    }else{
                        this.speedY=0
                    }
            }
            }
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
        
        redPDist=Math.abs(myGamePiece.x-(enemy[j].x-(myGamePiece.size/2)+(enemy[j].size/2)))
        bluPDist=Math.abs(myGamePiece2.x-(enemy[j].x-(myGamePiece2.size/2)+(enemy[j].size/2)))
        grnPDist=Math.abs(myGamePiece3.x-(enemy[j].x-(myGamePiece3.size/2)+(enemy[j].size/2)))
        ylwPDist=Math.abs(myGamePiece4.x-(enemy[j].x-(myGamePiece4.size/2)+(enemy[j].size/2)))

        if(enemy[j].atkCD<=0){
            if(enemy[j].weapon.multi===1){
                if(redPDist<enemy[j].weapon.range&&myGamePiece.hp>0){
                    if(enemy[j].weapon.damageMin-myGamePiece.item.defence<1){
                    myGamePiece.hp=myGamePiece.hp-1
                    }else{
                    myGamePiece.hp=myGamePiece.hp-Math.max(0, randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)-myGamePiece.item.defence)
                    }
                    if(myGamePiece.hp<0){
                        myGamePiece.hp=0
                    }
                }
                if(bluPDist<enemy[j].weapon.range&&myGamePiece2.hp>0){
                    if(enemy[j].weapon.damageMin-myGamePiece2.item.defence<1){
                        myGamePiece2.hp=myGamePiece2.hp-1
                        }else{
                    myGamePiece2.hp=myGamePiece2.hp-Math.max(0, randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)-myGamePiece2.item.defence)
                        }
                    if(myGamePiece2.hp<0){
                        myGamePiece2.hp=0
                    }
                }
                if(grnPDist<enemy[j].weapon.range&&myGamePiece3.hp>0){
                    if(enemy[j].weapon.damageMin-myGamePiece3.item.defence<1){
                        myGamePiece3.hp=myGamePiece3.hp-1
                        }else{
                    myGamePiece3.hp=myGamePiece3.hp-Math.max(0, randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)-myGamePiece3.item.defence)
                        }
                    if(myGamePiece3.hp<0){
                        myGamePiece3.hp=0
                    }
                }
                if(ylwPDist<enemy[j].weapon.range&&myGamePiece4.hp>0){
                    if(enemy[j].weapon.damageMin-myGamePiece4.item.defence<1){
                        myGamePiece4.hp=myGamePiece4.hp-1
                        }else{
                    myGamePiece4.hp=myGamePiece4.hp-Math.max(0, randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)-myGamePiece4.item.defence)
                        }
                    if(myGamePiece4.hp<0){
                        myGamePiece4.hp=0
                    }
                }
                enemy[j].atkCD=enemy[j].weapon.atkRate
            }else{
                if(redPDist<enemy[j].weapon.range &&redPDist<bluPDist&&redPDist<grnPDist&&redPDist<ylwPDist&&myGamePiece.hp>0){
                    if(enemy[j].weapon.damageMin-myGamePiece.item.defence<1){
                        myGamePiece.hp=myGamePiece.hp-1
                        }else{
                    myGamePiece.hp=myGamePiece.hp-Math.max(0, randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)-myGamePiece.item.defence)
                        }
                    if(myGamePiece.hp<0){
                        myGamePiece.hp=0
                    }
                }else if(bluPDist<enemy[j].weapon.range&&bluPDist<grnPDist&&bluPDist<ylwPDist&&myGamePiece2.hp>0){
                    if(enemy[j].weapon.damageMin-myGamePiece2.item.defence<1){
                        myGamePiece2.hp=myGamePiece2.hp-1
                        }else{
                    myGamePiece2.hp=myGamePiece2.hp-Math.max(0, randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)-myGamePiece2.item.defence)
                        }
                    if(myGamePiece2.hp<0){
                        myGamePiece2.hp=0
                    }
                }else if(grnPDist<enemy[j].weapon.range&&grnPDist<ylwPDist&&myGamePiece3.hp>0){
                    if(enemy[j].weapon.damageMin-myGamePiece3.item.defence<1){
                        myGamePiece3.hp=myGamePiece3.hp-1
                        }else{
                    myGamePiece3.hp=myGamePiece3.hp-Math.max(0, randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)-myGamePiece3.item.defence)
                        }
                    if(myGamePiece3.hp<0){
                        myGamePiece3.hp=0
                    }
                }else if(ylwPDist<enemy[j].weapon.range&&myGamePiece4.hp>0){
                    if(enemy[j].weapon.damageMin-myGamePiece4.item.defence<1){
                        myGamePiece4.hp=myGamePiece4.hp-1
                        }else{
                    myGamePiece4.hp=myGamePiece4.hp-Math.max(0, randomDmg(enemy[j].weapon.damageMin, enemy[j].weapon.damageMax)-myGamePiece4.item.defence)
                        }
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
    
    if(p1Held===1){ //Check if any player is held, if they are, start dragging them
        playerMoveToMouse(myGamePiece)
    }
    if(p2Held===1){
        playerMoveToMouse(myGamePiece2)
    }
    if(p3Held===1){
        playerMoveToMouse(myGamePiece3)
    }
    if(p4Held===1){
        playerMoveToMouse(myGamePiece4)
    }

    if(myGamePiece.hp===0&&myGamePiece2.hp===0&&myGamePiece3.hp===0&&myGamePiece4.hp===0&&gameover>-1){ //Check for TPK, game over
        gameover=gameover-1
        if(gameover===0){
            alert("Game Over")
        }
    }

    refreshItemStatsBox()

    if(playerNumberStatsShown.hp===0 && lastRevCostShown!==playerNumberStatsShown){ //Revive button updating when changing selected player & player is dead
        document.getElementById("reviveButton").innerHTML=`Revive: £${Math.floor((money/2)+5+(level*2))}`
            if(money>=Math.floor((money/2)+5+(level*2))){
                document.getElementById("reviveButton").style.background="#517a59"
            }else{
                document.getElementById("reviveButton").style.background="#9c4c4c" 
            }
        lastRevCostShown=playerNumberStatsShown
    }

    

    if(lastslot!==-1){ //Updating the sell button
        if(items[inv[lastslot].storedItem].worth!==(undefined^0^null)){
    sellItemBox.innerHTML = `Sell<br />£${items[inv[lastslot].storedItem].worth}`;
        }
    }else if(sellItemBox.innerHTML !== `Sell<br>Item`){
        sellItemBox.innerHTML = `Sell<br />Item`;
    }

    for(r=0;r<droppedItem.length;r++){ //Dropped items bouncing, redrawing
        if(droppedItem[r].data.cooldown>0){
            droppedItem[r].data.cooldown=droppedItem[r].data.cooldown-1
        }
    droppedItem[r].newPos()
    droppedItem[r].update()
    }

    if(totalEXP!==lastEXP){ //If amount of xp changes, refresh xp bar, check for level up
        if(totalEXP>=expToLevelUp){
            level++
            lastLevelExp=expToLevelUp
            expToLevelUp=Math.floor(expToLevelUp*1.2)
            myGamePiece.skillPoints+=2
            myGamePiece2.skillPoints+=2
            myGamePiece3.skillPoints+=2
            myGamePiece4.skillPoints+=2
            if(playerNumberStatsShown.skillPoints>0){
                document.getElementById("dmgSPButton").style.borderColor="#5e130e"
                document.getElementById("dmgSPButton").style.background="#911616"
                document.getElementById("rangeSPButton").style.borderColor="#5e130e"
                document.getElementById("rangeSPButton").style.background="#911616"
                document.getElementById("delaySPButton").style.borderColor="#5e130e"
                document.getElementById("delaySPButton").style.background="#911616"
                document.getElementById("hpSPButton").style.borderColor="#5e130e"
                document.getElementById("hpSPButton").style.background="#911616"
            }
        }
        expBarOver.style.maxWidth = `${((totalEXP-lastLevelExp)/(expToLevelUp-lastLevelExp))*131}px`
        expBarOver.style.minWidth = `${((totalEXP-lastLevelExp)/(expToLevelUp-lastLevelExp))*131}px`
        lastEXP=totalEXP
    }
    refreshPlayerStatsBox()

    if(lastmoney!==money){ //if amount of money changes, refresh money & revive button
        moneyBox.innerHTML = `Money: £${money}`;
        lastmoney=money
        
        if(playerNumberStatsShown.hp===0){
            if(money>=Math.floor((money/2)+5+(level*2))){
                document.getElementById("reviveButton").innerHTML=`Revive: £${Math.floor((money/2)+5+(level*2))}`
                document.getElementById("reviveButton").style.background="#517a59"
            }else{
                document.getElementById("reviveButton").innerHTML=`Revive: £${Math.floor((money/2)+5+(level*2))}`
                document.getElementById("reviveButton").style.background="#9c4c4c" 
            }
        }
    }

    //check if hit sign
    if( (myGamePiece.x>920&&myGamePiece.y>signY-40&&myGamePiece.y<signY+20&&signY>0&&myGamePiece.hp>0)||
        (myGamePiece2.x>920&&myGamePiece2.y>signY-40&&myGamePiece2.y<signY+20&&signY>0&&myGamePiece2.hp>0)||
        (myGamePiece3.x>920&&myGamePiece3.y>signY-40&&myGamePiece3.y<signY+20&&signY>0&&myGamePiece3.hp>0)||
        (myGamePiece4.x>920&&myGamePiece4.y>signY-40&&myGamePiece4.y<signY+20&&signY>0&&myGamePiece4.hp>0)){
        if(area[loadedAreaID].subAreaCount===subArea){
            clearStage() 
            loadedAreaID=2
            subArea=1
            renderStage()
        }else{
            subArea=subArea+1
            renderStage()
        }
    }
}

function clearStage(){
    if(area[loadedAreaID].cleared!==2){
    area[loadedAreaID].cleared=1
    if(area[loadedAreaID].stageToUnlock1>area.length||area[loadedAreaID].stageToUnlock2>area.length){
        alert("All current stages unlocked!")//todo
    }else{
    area[area[loadedAreaID].stageToUnlock1].unlocked=1
    area[area[loadedAreaID].stageToUnlock2].unlocked=1
    }
}
}

drag()
function drag(){ //Find which player clicked on / near, set to held
    document.onmousedown = function(event){
        pointerX = event.pageX-(window.innerWidth-960)/2;
        pointerY = event.pageY-(window.innerHeight-540-250)/2;
        blockToMouseX = Math.abs(myGamePiece.x+(myGamePiece.size/2)-pointerX)
        blockToMouseY = Math.abs(myGamePiece.y+(myGamePiece.size/2)-pointerY)
        block2ToMouseX = Math.abs(myGamePiece2.x+(myGamePiece2.size/2)-pointerX)
        block2ToMouseY = Math.abs(myGamePiece2.y+(myGamePiece2.size/2)-pointerY)
        block3ToMouseX = Math.abs(myGamePiece3.x+(myGamePiece3.size/2)-pointerX)
        block3ToMouseY = Math.abs(myGamePiece3.y+(myGamePiece3.size/2)-pointerY)
        block4ToMouseX = Math.abs(myGamePiece4.x+(myGamePiece4.size/2)-pointerX)
        block4ToMouseY = Math.abs(myGamePiece4.y+(myGamePiece4.size/2)-pointerY)
        if(block4ToMouseX<15 && block4ToMouseY<15){
            p4Held=1
        }else
        if(block3ToMouseX<15 && block3ToMouseY<15){
            p3Held=1
        }else
        if(block2ToMouseX<15 && block2ToMouseY<15){
            p2Held=1
        }else
        if(blockToMouseX<15 && blockToMouseY<15){
            p1Held=1
        }else
        if(block4ToMouseX<40 && block4ToMouseY<40){
            p4Held=1
        }else
        if(block3ToMouseX<40 && block3ToMouseY<40){
            p3Held=1
        }else
        if(block2ToMouseX<40 && block2ToMouseY<40){
            p2Held=1
        }else
        if(blockToMouseX<40 && blockToMouseY<40){
            p1Held=1
        }
        if(area[loadedAreaID].name==="Menu"&&pointerX>372&&pointerX<372+240&&pointerY>260&&pointerY<260+48){

            mapButton=document.createElement("div");
            mapButton.setAttribute("id", `mapButton`)
            divcontainer.appendChild(mapButton, divcontainer.firstChild)
            document.getElementById("mapButton").addEventListener("mouseover", makeButtonLight);
            document.getElementById("mapButton").addEventListener("mouseout", makeButtonDark);
            document.getElementById("mapButton").addEventListener("mouseup", goToMap);
            document.getElementById("mapButton").innerHTML="Return to Map"

            loadedAreaID=1
            renderStage()
        }
        if(area[loadedAreaID].name==="Menu"&&pointerX>381&&pointerX<381+224&&pointerY>330&&pointerY<330+48){

            mapButton=document.createElement("div");
            mapButton.setAttribute("id", `mapButton`)
            divcontainer.appendChild(mapButton, divcontainer.firstChild)
            document.getElementById("mapButton").addEventListener("mouseover", makeButtonLight);
            document.getElementById("mapButton").addEventListener("mouseout", makeButtonDark);
            document.getElementById("mapButton").addEventListener("mouseup", goToMap);
            document.getElementById("mapButton").innerHTML="Return to Map"

            saveCode = prompt("Paste your save code here:")
            loadSaveFromCode()
        }
    checkClickOnLevelOnMap()
    }
}

function checkClickOnLevelOnMap(){
    for(aa=0;aa<area.length;aa++){
        if(area[aa].cleared>-1){
    if(area[loadedAreaID].name==="Map"&&pointerX>area[aa].x&&pointerX<area[aa].x+20&&pointerY>area[aa].y&&pointerY<area[aa].y+20){
        loadedAreaID=aa
        renderStage()
    }
    }
    }
}

document.addEventListener("mouseup",releasePlayers)
function releasePlayers(){ //Stop holding any held players, on mouse up
    p1Held=0
    p2Held=0
    p3Held=0
    p4Held=0
}

document.addEventListener("mousemove",updateMouseCoords)
function updateMouseCoords(event){ //Mouse position tracking
    pointerX = event.pageX-(myGamePiece.size/2)-(window.innerWidth-960)/2;
    pointerY = event.pageY-(myGamePiece.size/2)-(window.innerHeight-540-250)/2;
}

function playerMoveToMouse(playerHeld, event){ //Move player currently held towards mouse
    playerHeld.atkCD=Math.floor(playerHeld.item.atkRate/((100+playerHeld.cdPoints*2.5)/100))
            if(playerNumberStatsShown.id!==0){
            playerNumberStatsShown=playerHeld
            }
            lastmoney=-1
            blockToMouseX = Math.abs(playerHeld.x-pointerX)
            blockToMouseY = Math.abs(playerHeld.y-pointerY)
            if(playerHeld.x<pointerX){
                playerHeld.speedX = blockToMouseX/8
            };
            if(playerHeld.x>pointerX){
                playerHeld.speedX = -blockToMouseX/8
            };
            if(playerHeld.y<pointerY){
                playerHeld.speedY = blockToMouseY/8
            };
            if(playerHeld.y>pointerY){
                playerHeld.speedY = -blockToMouseY/8
            };
            playerHeld.gravitySpeed = 0
}

let i = 0
let enemy=[]
function spawnEnemy(_size,_colour,_posX,_posY,_gravity,_hp,_movementType,_exp,_weapon,_coinValue,_coinChance,
    _healValue,_healChance,_drop1ID,_drop1Chance,_drop2ID,_drop2Chance,_drop3ID,_drop3Chance,_drop4ID,_drop4Chance){
    enemy[i] = new component(_size, _size, _colour, _posX, _posY);
    enemy[i].size=_size
    enemy[i].gravity = _gravity;
    enemy[i].hp=_hp
    enemy[i].maxhp=enemy[i].hp
    enemy[i].type="enemy"
    enemy[i].movementType=_movementType
    enemy[i].exp=_exp
    enemy[i].weapon=items[_weapon]
    enemy[i].atkCD=0
    enemy[i].drops={
        coin:_coinValue,
        coinChance:_coinChance,
        healPotion:_healValue,
        healChance:_healChance,
        itemID1:_drop1ID,
        itemID1Chance:_drop1Chance,
        itemID2:_drop2ID,
        itemID2Chance:_drop2Chance,
        itemID3:_drop3ID,
        itemID3Chance:_drop3Chance,
        itemID4:_drop4ID,
        itemID4Chance:_drop4Chance
    }
    i++
}

// document.addEventListener('keydown', logKey);//enemy spawning

// function logKey(e) {
//   if(e.code==="KeyA"){
//     enemy[i] = new component(20, 20, "purple", 480, 270);
//     enemy[i].size=20
//     enemy[i].gravity = 0.5;
//     enemy[i].hp=10
//     enemy[i].maxhp=enemy[i].hp
//     enemy[i].type="enemy"
//     enemy[i].movementType="SlowWalk"
//     enemy[i].exp=1
//     enemy[i].weapon=items[5]
//     enemy[i].atkCD=0
//     enemy[i].drops={
//         coin:1,
//         coinChance:100,
//         healPotion:0.1,
//         healChance:10,
//         itemID1:1,
//         itemID1Chance:100,
//         itemID2:2,
//         itemID2Chance:1,
//         itemID3:3,
//         itemID3Chance:1,
//         itemID4:4,
//         itemID4Chance:1
//     }
//     i++
//   }
//   if(e.code==="KeyS"){
//     enemy[i] = new component(200, 200, "purple", 680, 270);
//     enemy[i].size=200
//     enemy[i].gravity = 0.5;
//     enemy[i].hp=100
//     enemy[i].maxhp=enemy[i].hp
//     enemy[i].type="enemy"
//     enemy[i].movementType="SlowWalk"
//     enemy[i].exp=15
//     enemy[i].weapon=items[6]
//     enemy[i].atkCD=0
//     enemy[i].drops={
//         coin:100,
//         coinChance:20,
//         healPotion:1,
//         healChance:100,
//         itemID1:1,
//         itemID1Chance:10,
//         itemID2:2,
//         itemID2Chance:10,
//         itemID3:3,
//         itemID3Chance:10,
//         itemID4:4,
//         itemID4Chance:10
//     }
//     i++
//   }
// }

document.getElementById(inv.length-1).style.background='#5c5c5c' //Page background