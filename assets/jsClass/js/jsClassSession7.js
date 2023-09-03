"use strict";

function capture(useCapture){  
  const result = document.getElementById("eventOutput");  
  const eventParent = document.getElementById("eventParent");
  const eventChild = document.getElementById("eventChild");
  
  result.innerHTML = "";
    
  function parent(){
    result.innerHTML += "Parent <br>" ;
    eventParent.removeEventListener("click", parent );
    eventParent.removeEventListener("click", parent, true );
  }
  function child(){
    result.innerHTML += "Child <br>" ;
    eventChild.removeEventListener("click", child );
  }
  
  if(useCapture){    
    eventParent.addEventListener("click", parent, true);
    eventChild.addEventListener("click", child);    
  }
  if(!useCapture){    
    eventParent.addEventListener("click", parent);
    eventChild.addEventListener("click", child);
  }  
}

console.groupCollapsed("Lesson");
// Lesson
var x=10;
var y=20;
console.log("window.x",window.x);
window.console.log("y",y);

console.log("window",window);
console.log("document",document);
console.log("window.document",window.document);
console.log("window.location.hostname",window.location.hostname);
console.log("window.location.pathname",window.location.pathname);
// window, see the methods
console.log("Math",window.Math);

// Location
console.log(window.location);
// window.location.href = "https://172.30.200.201/";

// addEventListener('click',function(e){
//   const newWindow = this.window.open("https://172.30.50.6/adminlogin",'MyNewPage','width:500,height:500')
// });

// find user screen size
console.log("screen size",screen.width , screen.height);

//
console.log("document.documentElement.clientWidth",document.documentElement.clientWidth);
// console.log("document.body.clientWidth",document.body.clientWidth);
console.log("window.innerWidth",window.innerWidth);
console.log("screen.width",screen.width);
console.groupEnd("Lesson");

// Analog Clock
function clock(){    
  const hour = document.getElementById('hour');
  const minute = document.getElementById('minute');
  const second = document.getElementById('second');
  setInterval(() => {
  let day = new Date();
  let hr_rotation = 30 * (day.getHours()-1) + day.getMinutes() / 2; //converting current time
  let min_rotation = 6 * day.getMinutes();
  let sec_rotation = 6 * day.getSeconds(); 
  hour.style.transform = `rotate(${hr_rotation}deg)`;
  minute.style.transform = `rotate(${min_rotation}deg)`;
  second.style.transform = `rotate(${sec_rotation}deg)`;
  },1000);  
}