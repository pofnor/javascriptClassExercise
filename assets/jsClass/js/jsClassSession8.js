"use strict";

let xhr = new XMLHttpRequest();
xhr.open('GET','https://mocki.io/v1/ea6d1ed9-2a9b-4ec8-ad87-93c0d320d5be');
xhr.setRequestHeader("ahmad","isHere");
xhr.send();
xhr.onreadystatechange = function() {
  if(this.readyState === 4 && this.status === 200){
    console.log('ajax was succeeded');
    console.log(JSON.parse(this.response));
  }
}