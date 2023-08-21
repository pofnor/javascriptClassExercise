"use strict";

const indexDataBase = [
  {
    keyword: "Regular Expression,RegEx,RegExp",
    href: "assets/jsClass/regExp.html",
    description: "Regular Expression article with some practical examples",
  },  
  {
    keyword: "Chrome,DevTools,DevTool,Performance,Memory,Leaks,Memory Leaks",
    href: "assets/jsClass/devTools.html",
    description: "The Chrome DevTools Tips with some practical examples",
  },
  {
    keyword: "Equal,Double equals,Triple equals,=,==,===",
    href: "assets/jsClass/jsClassQuestion.html#Q1",
    description: "Difference Between =, == and === in JavaScript?",
  },
  {
    keyword: "Object,Array",
    href: "assets/jsClass/jsClassQuestion.html#Q2",
    description: "Objects vs. Arrays ?",
  },
  {
    keyword: "Statically,dynamically",
    href: "assets/jsClass/jsClassQuestion.html#Q3",
    description: "Statically vs. dynamically typed languages ?",
  },
  {
    keyword: "JavaScript",
    href: "assets/jsClass/jsClassQuestion.html#Q4",
    description: "What does JavaScript do at web browser ?",
  },
  {
    keyword: "Statement,Expression",
    href: "assets/jsClass/jsClassQuestion.html#Q5",
    description: "Statement vs Expression ?",
  },
  {
    keyword: "Variable",
    href: "assets/jsClass/jsClassQuestion.html#Q6",
    description: "JavaScript Variables Identifiers ?",
  },
  {
    keyword: "function",
    href: "assets/jsClass/jsClassQuestion.html#Q7",
    description: "What are the types of functions in JavaScript and why and when do we use functions?",
  },
  {
    keyword: "Interpreter,Compiler",
    href: "assets/jsClass/jsClassQuestion.html#Q8",
    description: "Interpreter Vs Compiler ?",
  },
  {
    keyword: "Iterate,Array",
    href: "assets/jsClass/jsClassQuestion.html#Q9",
    description: "Iterates Array",
  },
  {
    keyword: "this",
    href: "assets/jsClass/jsClassQuestion.html#Q10",
    description: "What is this?",
  },
];

// ability to use multi words as keywords at indexDB
function convertKeywordsToKeyword(indexDB){
  let resultDB = [];  
  for(let item of indexDB){
    if(item.keyword.includes(",")){
      let keywords = item.keyword.split(",");      
      for(let key of keywords){
        let tempObj = {};
        tempObj.keyword = key;
        tempObj.href = item.href;
        tempObj.description = item.description;
        resultDB.push(tempObj);
      }      
    } else {
      resultDB.push(item);
    }
  }
  return resultDB;
}

// make a new object without keywords
const indexDB = convertKeywordsToKeyword(indexDataBase);

const indexDBKey = indexDB.map(value => value.keyword);
/// new set to remove duplicate and again convert to array by ...
const indexDBKeyword = [...new Set(indexDBKey)];

function remove(){  
  let elements = document.querySelectorAll("article.exercise");
  for (let element of elements){
    element.remove();
  }
}

function search() {
  const searchItem = document.getElementById("searchbar").value.toLowerCase(); 
  let resultItems = searchItem.split("&");  
  let match = [];  
  for(let resultItem of resultItems){
    for(let index of indexDB){
      if(resultItem.toLowerCase().trim() === index.keyword.toLowerCase()){        
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
    a.id = matchItem.keyword;
    a.setAttribute("href",matchItem.href);
    a.textContent = matchItem.description;      
    article.className = "exercise";
    article.appendChild(a);
    section.appendChild(article);      
  }  
}

function autocomplete(inp, arr) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;  
  /*execute a function when someone writes in the text field:*/
  inp.addEventListener("input", function(e) {      
      let a, b, i, val = this.value;
      /*close any already open lists of autocompleted values*/
      closeAllLists();      
      if (!val) { return false;}
      currentFocus = -1;
      /*create a DIV element that will contain the items (values):*/
      a = document.createElement("DIV");      
      a.setAttribute("id", this.id + "autocomplete-list");
      a.setAttribute("class", "autocomplete-items");
      /*append the DIV element as a child of the autocomplete container:*/
      this.parentNode.appendChild(a);
      /*for each item in the array...*/
      for (i = 0; i < arr.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {          
          /*create a DIV element for each matching element:*/
          b = document.createElement("DIV");
          /*make the matching letters bold:*/
          b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
          b.innerHTML += arr[i].substr(val.length);
          /*insert a input field that will hold the current array item's value:*/          
          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";          
          /*execute a function when someone clicks on the item value (DIV element):*/
              b.addEventListener("click", function(e) {
              /*insert the value for the autocomplete text field:*/
              inp.value = this.getElementsByTagName("input")[0].value;
              /*close the list of autocompleted values,
              (or any other open lists of autocompleted values:*/
              closeAllLists();
          });
          a.appendChild(b);
        }
      }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function(e) {
      var x = document.getElementById(this.id + "autocomplete-list");
      if (x) x = x.getElementsByTagName("div");
      if (e.keyCode == 40) {
        /*If the arrow DOWN key is pressed,
        increase the currentFocus variable:*/
        currentFocus++;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 38) { //up
        /*If the arrow UP key is pressed,
        decrease the currentFocus variable:*/
        currentFocus--;
        /*and and make the current item more visible:*/
        addActive(x);
      } else if (e.keyCode == 13) {        
        if (currentFocus > -1) {
          /*and simulate a click on the "active" item:*/
          if (x) x[currentFocus].click();
        }
      }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/    
    let x = document.getElementsByClassName("autocomplete-items");    
    for (let i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
      x[i].parentNode.removeChild(x[i]);
    }
  }
}
/*execute a function when someone clicks in the document:*/
document.addEventListener("click", function (e) {
    closeAllLists(e.target);
});
}