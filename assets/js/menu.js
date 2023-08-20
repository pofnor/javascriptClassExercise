"use strict";

const menuItem = [  
  {id:"jsClass"     , href:"board.html"            , text:"Board"},
  {id:"jsClass"     , href:"regExp.html"           , text:"RegExp"},
  {id:"jsClass"     , href:"devTools.html"         , text:"DevTools"},
  {id:"jsClass"     , href:"jsClassQuestion.html"  , text:"Question"},
  {id:"jsClass"     , href:"carSearch.html"        , text:"Cars Search"},  
  {id:"jsClass"     , href:"jsClassSession1.html"  , text:"JS Class Session 1"},
  {id:"jsClass"     , href:"jsClassSession2.html"  , text:"JS Class Session 2"},
  {id:"jsClass"     , href:"jsClassSession3.html"  , text:"JS Class Session 3"},
  {id:"jsClass"     , href:"jsClassSession4.html"  , text:"JS Class Session 4"},  
  {id:"jsClass"     , href:"jsClassSession5.html"  , text:"JS Class Session 5"},
]

function menuFilter(menuItem,id,isHome){  
  let menuSelect = menuItem.filter(item => {
            if(item.id === id) return item;            
  });
  let menuParent = document.getElementById("mySidenav");    
  for (let index in menuSelect){    
    if(isHome) menuSelect[index].href = `assets/jsClass/${menuSelect[index].href}`;
    const menuA = document.createElement('a');    
    menuA.setAttribute("href",menuSelect[index].href);    
    menuA.textContent = menuSelect[index].text;    
    menuParent.appendChild(menuA);
  }  
}