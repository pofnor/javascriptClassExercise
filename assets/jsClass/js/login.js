"use strict";

let isSignup = false;

function login(){
  const result = document.getElementById("result");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");
  const loginHeader = document.getElementById("loginHeader");

  axios.get("http://localhost:3000/account")
  .then((response) => {
    // console.log(response.data);
    // console.log(response.status);
    // console.log(response.statusText);
    // console.log(response.headers);
    // console.log(response.config);
    for (let index in response.data){
      if ((response.data[index].username === username.value.trim()) &&
      (response.data[index].password === password.value)){
        result.innerHTML = "Welcome <span>" + response.data[index].name + "</span><br>" + "You have successfully logged in";
        signupBtn.style.display = "none";
        loginBtn.style.display = "none";
        username.style.display = "none";
        password.style.display = "none";
        loginHeader.style.display = "none";
        break;
      } else {
        result.textContent = "Wrong Username or Password";
      }
    }
  })
  .catch(error => {
    result.innerHTML = error.message + "<br>" + error.config.url;
  })
}

// make it with .then and axios
function post1(name,mobile,username,password){
  const result = document.getElementById("result");  
    // get last ID from database
    axios.get("http://localhost:3000/account")
    .then((response)=>{
      return response.data[response.data.length-1].id;      
    })
    .then((lastId)=>{
      // Add new user
      const newId = +lastId + 1;
      axios.post("http://localhost:3000/account",{
      "id": String(newId),
      "name": String(name),
      "mobile": String(mobile),
      "username": String(username),
      "password": String(password)
    })
    .then((response) => {      
      if(response.status === 201){
        result.textContent = "Your Account have successfully created";
      } else {
        result.textContent = "Error = " + response.status;
      }
    }, (error) => {
      result.textContent = "Error" + error.message;
    })
    });   
}  

// make it with async and await and axios
async function post2(name,mobile,username,password){
  const result = document.getElementById("result");
  try{
    // get last ID from database
    const id = await axios.get("http://localhost:3000/account");      
    const lastId = id.data[id.data.length-1].id;      
    // Add new user
    const newId = +lastId + 1;
    axios.post("http://localhost:3000/account",{
      "id": String(newId),
      "name": String(name),
      "mobile": String(mobile),
      "username": String(username),
      "password": String(password)
    })
    .then((response) => {      
      if(response.status === 201){
        result.textContent = "Your Account have successfully created";
      } else {
        result.textContent = "Error = " + response.status;
      }
    }, (error) => {
      result.textContent = "Error" + error.message;
    });            
  }
  catch(error){
    console.log("Error on post2()",error.message);
  }
}  

// make it with async and await and fetch
async function postJSON(data) {
  try {
    const response = await fetch("http://localhost:3000/account", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log("Success:", result);
  } catch (error) {
    console.error("Error:", error);
  }
}
 
async function post3(name,mobile,username,password){
  const result = document.getElementById("result");
  try{
    // get last ID from database
    const accounts = await fetch("http://localhost:3000/account");
    let accountsJson = await accounts.json();          
    const lastId = accountsJson[accountsJson.length-1].id;      
    // Add new user
    const newId = +lastId + 1;    
    const data = {
        "id": String(newId),
        "name": String(name),
        "mobile": String(mobile),
        "username": String(username),
        "password": String(password)        
      };
    postJSON(data);  
  //   .then((response) => {      
  //     if(response.status === 201){
  //       result.textContent = "Your Account have successfully created";
  //     } else {
  //       result.textContent = "Error = " + response.status;
  //     }
  //   }, (error) => {
  //     result.textContent = "Error" + error.message;
  //   });            
  }
  catch(error){
    console.log("Error on post3()",error.message);
  }
}  

function signup(){
  const loginHeader = document.getElementById("loginHeader");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");      
  const loginContainer = document.getElementById("loginContainer");    
  if (!isSignup){
    isSignup = true;    
    let nameInput = document.createElement("input");
    let mobileInput = document.createElement("input");
    nameInput.className="inputText";
    nameInput.id="name";
    nameInput.placeholder="Name and Family";
    mobileInput.className="inputText";
    mobileInput.id="mobile";
    mobileInput.placeholder="Mobile Number";  
    loginContainer.insertBefore(mobileInput,username);
    let mobile = document.getElementById("mobile");
    loginContainer.insertBefore(nameInput,mobile);
    loginBtn.style.display = "none" ;
    loginHeader.textContent = "Create New Account";
    signupBtn.textContent = "Sign up";    
  } else if (isSignup){
    isSignup = false;
    let name = document.getElementById("name");
    let mobile = document.getElementById("mobile");
    // post1(name.value.trim(),mobile.value.trim(),username.value.trim(),password.value.trim());
    // post2(name.value.trim(),mobile.value.trim(),username.value.trim(),password.value.trim());
    post3(name.value.trim(),mobile.value.trim(),username.value.trim(),password.value.trim());
  } 
}