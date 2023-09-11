"use strict";

// ---------------------- AJAX ----------------------------------------
function ajax(){
  console.log("AJAX");
  let xhr = new XMLHttpRequest();
  xhr.open('GET','https://mocki.io/v1/ea6d1ed9-2a9b-4ec8-ad87-93c0d320d5be');
  xhr.setRequestHeader("ahmad","isHere");
  xhr.send();
  xhr.onreadystatechange = function() {
    console.log("readyState",this.readyState);
    // readyState: 0=UNSENT , 1=OPENED , 2=HEADERS_RECEIVED
    // readyState: 3=LOADING , 4=DONE 
    if(this.readyState === 4 && this.status === 200){
      console.log('ajax was succeeded',JSON.parse(this.response));    
    }
  }
}
// ---------------------- Promise ----------------------------------------
function promise(isReject=false){
  const promise_a = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Loaded Textures');
    }, 3000);
  });
  const promise_b = new Promise((resolve,reject) => {
      setTimeout(() => {
        if(!isReject) resolve('Loaded Music');
        if(isReject)  reject(new Error('Could Not Load Music'));
      }, 2000);
  });
  const promise_c = new Promise((resolve) => {
      setTimeout(() => {
        resolve('Loaded Dialogues');
      }, 4000);
  });
  const promises = [
    promise_a, promise_b, promise_c
  ];

  // The Promise.all() method accepts an iterable of promises as input 
  // and returns a single Promise object. 
  // ---------------------- Promise.all -------------------
  Promise.all(promises)
    .then((values) => {
      console.log(values);
      console.log('Start the Game by Promise.all!')
    })
    .catch((reject)=>{
      console.error(reject.message);
      console.log('Stop the Game by Promise.all!');
    });

  // ---------------------- Promise.allSettled -------------
  Promise.allSettled(promises)
  .then((values) => {
    console.log(values);
    console.log('Start the Game by Promise.allSettled!')
  })
  .catch((reject)=>{
    console.error(reject.message);
    console.log('Stop the Game by Promise.allSettled!');
  });

  // ---------------------- Promise.any --------------------
  Promise.any(promises)
  .then((values) => {
    console.log(values);
    console.log('Start the Game by Promise.any!')
  })
  .catch((reject)=>{
    console.error(reject.message);
    console.log('Stop the Game Promise.any!');
  });

  console.log('Hello, Promises!');
}
// ---------------------- HTTP Status Codes -------------------------------------
function hsc(){
  fetch("https://httpstat.us/200") //OK
  .then((response)=>{
    console.log(response.status,response.statusText);
  });
  fetch("https://httpstat.us/201") //Created
  .then((response)=>{
    console.log(response.status,response.statusText);
  });
  fetch("https://httpstat.us/202") //Accepted
  .then((response)=>{
    console.log(response.status,response.statusText);
  });
  fetch("https://httpstat.us/304") //Not Modified
  .then((response)=>{
    console.log(response.status,response.statusText);
  });
  fetch("https://httpstat.us/400") //Bad request
  .then((response)=>{
    console.log(response.status,response.statusText);
  });
  fetch("https://httpstat.us/401") //Unauthorized
  .then((response)=>{
    console.log(response.status,response.statusText);
  });
  fetch("https://httpstat.us/403") //Forbidden
  .then((response)=>{
    console.log(response.status,response.statusText);
  });
  fetch("https://httpstat.us/404") //Not found
  .then((response)=>{
    console.log(response.status,response.statusText);
  });
  fetch("https://httpstat.us/405") //Method not allowed
  .then((response)=>{
    console.log(response.status,response.statusText);
  });
  fetch("https://httpstat.us/500") //Internal Server Error
  .then((response)=>{
    console.log(response.status,response.statusText);
  });
  fetch("https://httpstat.us/502") //Bad Gateway
  .then((response)=>{
    console.log(response.status,response.statusText);
  });
  fetch("https://httpstat.us/503") //Service Unavailable
  .then((response)=>{
    console.log(response.status,response.statusText);
  });
}
// -------------------------------------------------
// ajax();
// promise();
// promise(true);
// hsc();