"use strict";

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


  // result.textContent = "You click on Login button";
}

function signup(){
  const loginHeader = document.getElementById("loginHeader");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const loginBtn = document.getElementById("loginBtn");
  const signupBtn = document.getElementById("signupBtn");
  const result = document.getElementById("result");    
  let nameInput = document.createElement("input");
  let mobileInput = document.createElement("input");
  const loginContainer = document.getElementById("loginContainer");  
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
  result.textContent = "You click on signup button";
}