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