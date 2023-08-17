"use strict";

const myLibrary = [
  {subject : "array" , href : "assets/jsClass/jsClassSession1.html", description : "this is array"},
  {subject : "function" , href : "assets/jsClass/jsClassSession2.html" , description : "this is function"},
  {subject : "function" , href : "assets/jsClass/jsClassSession3.html" , description : "33this is function"},
];

function remove(){  
  let elements = document.querySelectorAll("article.exercise");
  for (let element of elements){
    element.remove();
  }
}

function search() {
  const searchItem = document.getElementById("searchbar").value.toLowerCase(); 
  let resultItems = searchItem.split(" ");
  let match = [];  
  for(let resultItem of resultItems){
    for(let index of myLibrary){
      if(resultItem === index.subject){        
        match.push(index);
      }
    }
  }
  remove(); //remove all previous elements that contain from last search
  for(let matchItem of match){    
    let section = document.getElementById("result");
    let article = document.createElement("article");      
    let a = document.createElement("a");
    a.className = "a";
    a.id = matchItem.subject;
    a.setAttribute("href",matchItem.href);
    a.textContent = matchItem.description;      
    article.className = "exercise";
    article.appendChild(a);
    section.appendChild(article);      
  }  
}