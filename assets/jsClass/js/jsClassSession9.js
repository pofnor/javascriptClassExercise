"use strict";
function convertPersianToEnglish(){
  const persian = document.getElementById("persian");
  const english = document.getElementById("english");
  let input = persian.value;
  let output;
  let temp;
  for(let char of input){        
    if     (char === "1") temp="1";
    else if(char === "2") temp="2";
    else if(char === "3") temp="3";
    else if(char === "4") temp="4";
    else if(char === "5") temp="5";
    else if(char === "6") temp="6";
    else if(char === "7") temp="7";
    else if(char === "8") temp="8";
    else if(char === "9") temp="9";
    else if(char === "0") temp="0";
    else temp = char;

    if(output) output += temp;
    else output=temp;
  }  
  english.value = output; 
}