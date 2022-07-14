let dice = document.getElementById("die");
let i=1;
let last=-1;
let loop;
let random;
let gameOn= true;
let playerTurn= 1;
let diceRoll= true;
let knock = false;
let boxTurn= document.getElementById("turn");
let colourArray= ["red","blue","yellow","green"];
let redWin=0;
let blueWin=0;
let greenWin=0;
let yellowWin=0;
function die(){
    if(i>6){
        clearInterval(loop);
        i=1;
        movablePeice();

    }
    else{
        random= Math.floor(Math.random()*6+1);
        if(last==random){
            return;
        }
        else{
         dice.setAttribute('src',''+random+'.png');
         last=random;
         i++;      
        }
    }
    
}
dice.addEventListener("click",()=>{
  if(diceRoll){
    diceRoll=false;
    loop= setInterval(die, 100);
  }    
})
let bluePath = new Array(56);
let yellowPath = new Array(56);
let greenPath = new Array(56);
let redPath = new Array(56);

for (let i = 0; i <= 51; i++) {
    if(i<51){
      bluePath[i]=document.getElementById("B"+(i+1));
    }
    //yellow
    if(i<12){
      yellowPath[39+i]=document.getElementById("B"+(i+1));
   
     }
     if(i>12){
      yellowPath[i-13]=document.getElementById("B"+(i+1));
     }
     // green
     if(i<25){
      greenPath[26+i]=document.getElementById("B"+(i+1));
   
     }
     if(i>25){
      greenPath[i-26]=document.getElementById("B"+(i+1));
     }
     //red
     if(i<38){
      redPath[13+i]=document.getElementById("B"+(i+1));
   
     }
     if(i>38){
      redPath[i-39]=document.getElementById("B"+(i+1));
     }
}
var count=1;
for (let i = 51; i<56; i++) {
     bluePath[i]=document.getElementById("b"+count);
  redPath[i]=document.getElementById("r"+count);
  greenPath[i]=document.getElementById("g"+count);
  yellowPath[i]=document.getElementById("y"+count);
  count++;
}

class Peice{
    currPos= -1;
    Path = new Array(57);
    home;
    curr;
    color;
    movable= false;
    win=false;
    open=false;
    constructor(ref1,ref2){
        this.home=ref1
        this.curr=ref2;
    }
    
    findcolor(obj){
      switch(true){
        case obj.classList.contains("red"): return "red";
                                          
        case obj.classList.contains("blue"): return "blue";
                                          
        case obj.classList.contains("green"): return "green";
                                          
        case obj.classList.contains("yellow"): return "yellow";
                                          
      }
    }
    move(event,result){
      
        let dest;
        let temp= event.target.id;//it can be deleted
        event.target.parentElement.removeChild(event.target);
        if(!this.open && result==6){
            dest=this.Path[this.currPos+1];
            this.currPos= this.currPos+1;

        }
        else if(this.currPos+random==56){
          let Div= document.createElement('img');
          Div.setAttribute("src","crown.png");
          Div.classList.add("peice");
          this.home.appendChild(Div);
          this.win=true;
          setWinner(this);
          return;
        }
        else{
            dest=this.Path[this.currPos+result];
            if(!this.Path[this.currPos+random].classList.contains("stop") && dest.childElementCount==1 && !dest.childNodes[1].classList.contains(this.color) && !dest.classList.contains("stop")){
              let colour= this.findcolor(dest.firstChild.nextSibling);
              let temp1= dest.childNodes[1].id;
              dest.removeChild(dest.childNodes[1]);
              let Div= document.createElement('div');
              Div.setAttribute('id',temp1);
              console.log(Div);
              Div.classList.add("peice");
             // console.log(dest.firstChild.nextSibling);
              Div.classList.add(colour);
              appendElement(Div);
            }
            this.currPos= this.currPos+result;
        }
        let newDiv= document.createElement('div');
        newDiv.setAttribute('id',temp);
        if(dest.classList.contains("stop")){
          if(dest.firstChild.childElementCount>=1){
            console.log("here");
            newDiv.style.display="none";
          }
          dest.firstChild.appendChild(newDiv);
        }
        else{
          dest.appendChild(newDiv);
        }
        if(newDiv.parentElement.parentElement.classList.contains("pathh-item"))
        {
          newDiv.classList.add('horiz');
        }
        else{
          newDiv.classList.add('vert');
        }
        newDiv.classList.add(this.color);
   //     newDiv.classList.add("canMove");
        document.getElementById(event.target.id).addEventListener('click',(event)=>{
            go(event,this);
        });
        this.curr=newDiv;
        this.open= true;
    }
    
}
let cont2= document.getElementsByClassName("cont2");
class RedPeice extends Peice{
    color="red";
    Path=redPath;
    textbox= cont2[0];
 }
 class BluePeice extends Peice{
    color="blue";
    Path=bluePath;
    textbox= cont2[1];
 }
 class GreenPeice extends Peice{
    color="green";
    Path=greenPath;
    textbox= cont2[2];
 }
 class YellowPeice extends Peice{
    color="yellow";
    Path=yellowPath;
    textbox= cont2[3];
}

const rp1= new RedPeice(document.getElementById('rh1'),document.getElementById('rp1'));
const rp2= new RedPeice(document.getElementById('rh2'),document.getElementById('rp2'));
const rp3= new RedPeice(document.getElementById('rh3'),document.getElementById('rp3'));
const rp4= new RedPeice(document.getElementById('rh4'),document.getElementById('rp4'));
const arrayRed = [rp1,rp2,rp3,rp4];
const bp1= new BluePeice(document.getElementById('bh1'),document.getElementById('bp1'));
const bp2= new BluePeice(document.getElementById('bh2'),document.getElementById('bp2'));
const bp3= new BluePeice(document.getElementById('bh3'),document.getElementById('bp3'));
const bp4= new BluePeice(document.getElementById('bh4'),document.getElementById('bp4'));
const arrayBlue = [bp1,bp2,bp3,bp4];
const gp1= new GreenPeice(document.getElementById('gh1'),document.getElementById('gp1'));
const gp2= new GreenPeice(document.getElementById('gh2'),document.getElementById('gp2'));
const gp3= new GreenPeice(document.getElementById('gh3'),document.getElementById('gp3'));
const gp4= new GreenPeice(document.getElementById('gh4'),document.getElementById('gp4'));
const arrayGreen = [gp1,gp2,gp3,gp4];
const yp1= new YellowPeice(document.getElementById('yh1'),document.getElementById('yp1'));
const yp2= new YellowPeice(document.getElementById('yh2'),document.getElementById('yp2'));
const yp3= new YellowPeice(document.getElementById('yh3'),document.getElementById('yp3'));
const yp4= new YellowPeice(document.getElementById('yh4'),document.getElementById('yp4'));
const arrayYellow = [yp1,yp2,yp3,yp4];

function go(event,ob){
   if(ob.curr.parentElement.classList.contains("stop-cont") && ob.curr.parentElement.childElementCount>1 &&  !ob.curr.parentElement.classList.contains("expand")){
    ob.curr.parentElement.classList.add("expand");
    Array.from(ob.curr.parentElement.children).forEach(el => {
      if(el.style.display=="none"){
        el.style.display="block";
        
      }

    });
    event.stopPropagation();
  }  
  else if(ob.movable){
      if(ob.curr.parentElement.classList.contains("stop-cont") && ob.curr.parentElement.childElementCount>1){
        if(ob.curr.previousSibling!=null){
          ob.curr.previousSibling.style.display="block";
        }
        else if(ob.curr.nextSibling!=null){
          ob.curr.nextSibling.style.display="block";
        }
        

      }
      remove();
     // console.log("hi");
      ob.move(event,random);
    
     // console.log("hello");
      endGame(ob);
    
       if(random!=6){
            if(playerTurn==4){
             playerTurn=1;
            }
            else{
             playerTurn++;
            }
            playerTurn= checkforNextTurn(playerTurn);
            
            boxTurn.style.backgroundColor= colourArray[playerTurn-1];
            boxTurn.textContent="player: "+playerTurn;
            if(playerTurn==3){
              boxTurn.style.color="black";
              console.log("its here");
            }
            else{
              boxTurn.style.color="white";
            }
       }
        diceRoll=true;
            
      }

  
}
let winnerfound=false;
let runnerUp1Found = false;
let runnerUp2Found= false;

function endGame(obj){
 // console.log('working');
  let count=0;
  if (redWin==4) {
    count++;
  }
  if (blueWin==4) {
    count++;
  }
  if (yellowWin==4) {
    count++;
  }
  if (greenWin==4) {
    count++;
  }
  if(count==1 && !winnerfound){
    obj.textbox.innerHTML="WINNER";
    winnerfound=true;
  }
  if(count==2 && !runnerUp1Found){
    obj.textbox.innerHTML="1st RUNNERUP";
    runnerUp1Found=true;
  }
  if(count>2){
    obj.textbox.innerHTML="2nd RUNNERUP";
    alert("game ends");
    location.reload();
  }
}

document.getElementById('rp1').addEventListener('click',(event)=>{
    go(event,rp1);
   
});
   
document.getElementById('rp2').addEventListener('click',(event)=>{
       go(event,rp2);
     
});
   
document.getElementById('rp3').addEventListener('click',(event)=>{
    go(event,rp3);
  
});
   
document.getElementById('rp4').addEventListener('click',(event)=>{
       go(event,rp4);
     
});
document.getElementById('bp1').addEventListener('click',(event)=>{
 go(event,bp1);
 
});

document.getElementById('bp2').addEventListener('click',(event)=>{
    go(event,bp2);
   
});

document.getElementById('bp3').addEventListener('click',(event)=>{
 go(event,bp3);
 
});

document.getElementById('bp4').addEventListener('click',(event)=>{
    go(event,bp4);
   
});

document.getElementById('gp1').addEventListener('click',(event)=>{
    go(event,gp1);
   
});
   
document.getElementById('gp2').addEventListener('click',(event)=>{
       go(event,gp2);
     
});
   
document.getElementById('gp3').addEventListener('click',(event)=>{
    go(event,gp3);
   
});
   
document.getElementById('gp4').addEventListener('click',(event)=>{
       go(event,gp4);
     
});

document.getElementById('yp1').addEventListener('click',(event)=>{
    go(event,yp1);
   
});
   
document.getElementById('yp2').addEventListener('click',(event)=>{
       go(event,yp2);
     
});
   
document.getElementById('yp3').addEventListener('click',(event)=>{
    go(event,yp3);
  
});
   
document.getElementById('yp4').addEventListener('click',(event)=>{
       go(event,yp4);
     
});

function setMovable(el,cp){
  if (!el.open && random==6) {
    el.curr.classList.add("canMove");
    el.movable=true;  
    cp++;
  }
  else if(el.open && el.currPos+random<56){
    if(!el.Path[el.currPos+random].classList.contains("stop") && el.Path[el.currPos+random].childElementCount==1 && el.Path[el.currPos+random].childNodes[1].classList.contains(el.color)) {
      
    }
    else{
      if(el.curr.parentElement.classList.contains("stop-cont") && el.curr.parentElement.childElementCount>1){
       el.curr.parentElement.parentElement.style.border="2px solid black";
      }
      el.curr.classList.add("canMove");
      el.movable=true;    
      cp++;
    }
  }//kuch locha hai
  else if(el.currPos+random==56){
    el.curr.classList.add("canMove");
    el.movable=true;    
    cp++;
  }
  return cp;
}
 
function movablePeice(){
  let countPeice=0;
 // console.log(playerTurn);  
    if(playerTurn==1){
      arrayRed.forEach(element => {
        if(!element.win){
          countPeice= setMovable(element,countPeice);
        }
      });
    }
    else if(playerTurn==2){
      //blue's turn
      arrayBlue.forEach(element => {
        if(!element.win){
          countPeice= setMovable(element,countPeice);
        }
      });
    }
    else if(playerTurn==3){
      //yellow's turn
      arrayYellow.forEach(element => {
        if(!element.win){
          countPeice= setMovable(element,countPeice);
        }
      });
    }
    else{
      //green's turn
      arrayGreen.forEach(element => {
        if(!element.win){
          countPeice= setMovable(element,countPeice);
        }
      });
    }
    
    
    if(countPeice==0){
      
      if(playerTurn==4){
        playerTurn=1;
      }
      else{
        playerTurn++;
      }
      playerTurn= checkforNextTurn(playerTurn);
      
      boxTurn.style.backgroundColor= colourArray[playerTurn-1];
      boxTurn.textContent="player: "+playerTurn;
      if(playerTurn==3){
        boxTurn.style.color="black";
       // console.log("its here");
      }
      else{
        boxTurn.style.color="white";
      }
      diceRoll=true;
    }
    else{
      diceRoll=false;
    }
}

function checkforNextTurn(turn){

  switch(turn){
    case 1: if(redWin==4){
             turn++;
             break;
            }
            else{
              return turn;
            }
    case 2: if(blueWin==4){
             turn++;
             break;
            }
            else{
              return turn;
            }
    case 3: if(yellowWin==4){
             turn++;
             break;
            }
            else{
              return turn;
            }
    default: if(greenWin==4){
             turn=1;
             break;
             }
             else{
              return turn;
            }
  }
 
  let res= checkforNextTurn(turn);
  return res;
}



function thatRemoves(ob){
  ob.curr.classList.remove("canMove");
  ob.movable=false;
  if(ob.curr.parentElement!=null && ob.curr.parentElement.classList.contains("stop-cont") && ob.curr.parentElement.childElementCount>1){
    ob.curr.parentElement.parentElement.style.border= "none";
  }
}

function remove(){

   //
    if(playerTurn==1){
     arrayRed.forEach(element => {
        thatRemoves(element);
    }); 
    }
    else if(playerTurn==2){
      //blue's turn
      arrayBlue.forEach(element => {
        thatRemoves(element);
    });
  
    }
    else if(playerTurn==3){
      //yellow's turn
      arrayYellow.forEach(element => {
        thatRemoves(element);
    });
    }
    else{
      //green's turn
      arrayGreen.forEach(element => {
        thatRemoves(element);
    });
    }   
}


function checkforCut(ob){
  if(ob.Path[ob.currPos+1].childElementCount==0){

  }
}

function appendElement(div){
  elId= div.id;
  let ob;
  switch(elId){
    case "rp1": ob= rp1;
                break;
    case "rp2": ob= rp2;
                break;
    case "rp3": ob= rp3;
                break;
    case "rp4": ob= rp4;
                break;
    case "bp1": ob= bp1;
                break;
    case "bp2": ob= bp2;
                break;
    case "bp3": ob= bp3;
                break;
    case "bp4": ob= bp4;
                break;
    case "yp1": ob= yp1;
                break;
    case "yp2": ob= yp2;
                break;
    case "yp3": ob= yp3;
                break;
    case "yp4": ob= yp4;
                break;
    case "gp1": ob= gp1;
                break;
    case "gp2": ob= gp2;
                break;
    case "gp3": ob= gp3;
                break;
    default :   ob= gp4;
  }
  ob.home.appendChild(div);
  document.getElementById(div.id).addEventListener('click',(event)=>{
    go(event,ob);
});
  ob.open= false;
  ob.movable= false;
  ob.currPos=-1;
  ob.curr= div;
}

let list= document.getElementsByClassName("stop-cont");
addEventListenerlist(list,"click");
function addEventListenerlist(list,click){
 Array.from(list).forEach(element => {
   element.addEventListener(click,(event)=>{
     if(element.classList.contains("expand")){
      element.classList.remove("expand");
      Array.from(element.children).forEach(el => {
        if(el.style.display=="block" && element.firstChild!=el){
          el.style.display="none";
        }
      });
     }
   },false);
 });
}

function setWinner(obj){
  switch(obj.color){
    case "red": redWin=redWin+1;
                break;
    case "blue": blueWin= blueWin+1;
                 break;
    case "green": greenWin= greenWin+1;
                 break;
    default: yellowWin= yellowWin+1;
  }
}